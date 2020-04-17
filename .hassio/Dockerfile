FROM debian:buster-slim

# Default ENV
ENV LANG C.UTF-8

# Set default workspace
WORKDIR /workspaces

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install docker
# https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/
RUN apt-get update && apt-get install -y --no-install-recommends \
        apt-utils \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common \
        gnupg2 \
        dbus \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
    && apt-get update && apt-get install -y --no-install-recommends \
        docker-ce \
        docker-ce-cli \
        containerd.io

COPY build.sh /usr/local/bin/start_hassio.sh
COPY files /tmp/

# Generate a machine-id for this container
RUN rm /etc/machine-id && dbus-uuidgen --ensure=/etc/machine-id

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog

ENTRYPOINT [ "/usr/local/bin/start_hassio.sh" ]