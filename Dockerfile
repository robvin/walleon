ARG BUILD_FROM
# hadolint ignore=DL3006
FROM $BUILD_FROM

ENV LANG C.UTF-8

# Copy app files
COPY . /tmp

# Build arch argument
ARG BUILD_VERSION
ARG BUILD_ARCH

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install system
# hadolint ignore=DL3003,DL3018
RUN \
    set -o pipefail \
    #
    && apk update \
    #
    && apk add --no-cache --virtual .build-dependencies \
        curl=7.69.1-r0 \
        tar=1.32-r1 \
        npm=12.17.0-r0 \
    #
    && apk add --no-cache \
        nginx=1.18.0-r0 \
        bash=5.0.17-r0 \
        nodejs=12.17.0-r0 \
    #
    # Install app dependencies and compile
    && npm install --prefix /tmp \
    && npm run build --prefix /tmp \
    && mkdir -p /opt/walleon/public \
    && mv -f /tmp/build/public/* /opt/walleon/public/ \
    #
    && apk del --purge .build-dependencies \
    && rm -fr /etc/nginx/* \
    && rm -fr /tmp/*

# Copy root filesystem
COPY rootfs /

LABEL \
    io.hass.version="${BUILD_VERSION}" \
    io.hass.type="addon" \
    io.hass.arch="${BUILD_ARCH}"