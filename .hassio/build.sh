#!/bin/bash
set -eE

HASSIO_PATH="/workspaces/hassio"

DOCKER_TIMEOUT=30
DOCKER_PID=0

function start_docker() {
    local starttime
    local endtime

    echo "Starting docker."
    dockerd 2> /dev/null &
    DOCKER_PID=$!

    echo "Waiting for docker to initialize..."
    starttime="$(date +%s)"
    endtime="$(date +%s)"
    until docker info >/dev/null 2>&1; do
        if [ $((endtime - starttime)) -le $DOCKER_TIMEOUT ]; then
            sleep 1
            endtime=$(date +%s)
        else
            echo "Timeout while waiting for docker to come up"
            exit 1
        fi
    done
    echo "Docker was initialized"
}


function stop_docker() {
    local starttime
    local endtime

    echo "Stopping in container docker..."
    if [ "$DOCKER_PID" -gt 0 ] && kill -0 "$DOCKER_PID" 2> /dev/null; then
        starttime="$(date +%s)"
        endtime="$(date +%s)"

        # Now wait for it to die
        kill "$DOCKER_PID"
        while kill -0 "$DOCKER_PID" 2> /dev/null; do
            if [ $((endtime - starttime)) -le $DOCKER_TIMEOUT ]; then
                sleep 1
                endtime=$(date +%s)
            else
                echo "Timeout while waiting for container docker to die"
                exit 1
            fi
        done
    else
        echo "Your host might have been left with unreleased resources"
    fi
}


function install() {
    docker pull homeassistant/amd64-hassio-supervisor:dev
    docker pull homeassistant/amd64-hassio-cli:dev

    mkdir -p $HASSIO_PATH

    cp /tmp/ha /usr/bin/
    cp -r /tmp/config/* $HASSIO_PATH
    rm -rf /tmp/*
}

function cleanup_docker() {
    echo "Cleaning up stopped containers..."
    docker rm $(docker ps -a -q)
}

function run_supervisor() {
    docker run -it --rm --privileged \
        --name hassio_supervisor \
        --security-opt seccomp=unconfined \
        --security-opt apparmor:unconfined \
        -v /run/docker.sock:/run/docker.sock \
        -v /run/dbus:/run/dbus \
        -v $HASSIO_PATH:/data \
        -v /etc/machine-id:/etc/machine-id:ro \
        -e SUPERVISOR_SHARE=$HASSIO_PATH \
        -e SUPERVISOR_NAME=hassio_supervisor \
        -e SUPERVISOR_DEV=1 \
        -e HOMEASSISTANT_REPOSITORY="homeassistant/qemux86-64-homeassistant" \
        homeassistant/amd64-hassio-supervisor:dev
}

function install_addon() {
    echo "Starting addon..."
    docker build --build-arg BUILD_FROM="homeassistant/amd64-base:latest" \
        -t local/walleon \
        -f $HASSIO_PATH/addons/local/walleon/Dockerfile.dev \
        $HASSIO_PATH/addons/local/walleon/ 

    docker run -it --rm \
        -v $HASSIO_PATH/addons/local/walleon:/data \
        -p 8081:8081 \
        --name addon_walleon \
        local/walleon \
        /bin/bash -c 'npm install && npm run serve'
}

function restore_snapshot() {
    echo "Restore Snapshot..."
    ha snapshot restore a8ddce8e --folders=homeassistant
}

case "$1" in
    "--start-addon")
        install_addon
        exit 0;;
    "--restore-snapshot")
        restore_snapshot
        exit 0;;
    "--cleanup")
        echo "Cleaning up old environment"
        cleanup_docker || true
        exit 0;;
    *)
        echo "Creating development Hass.io environment"
        start_docker
        trap "stop_docker" ERR
        install
        cleanup_docker || true
        run_supervisor
        stop_docker;; 
esac