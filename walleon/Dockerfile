ARG BUILD_FROM=alpine:3.11.3
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

ENV LANG C.UTF-8

# Copy app files
COPY ["src", "public", ".browserslistrc", ".editorconfig", ".eslintrc.js", "package*.json", "babel.config.js", "tsconfig.json", "vue.config.js", "/tmp/"]

# Build arch argument
ARG BUILD_ARCH=amd64

# Set shell
SHELL ["/bin/ash", "-o", "pipefail", "-c"]

# Install system
# hadolint ignore=DL3003,DL3018
RUN set -o pipefail \
    #
    && apk update \
    #
    && apk add --no-cache --virtual .build-dependencies \
        curl=7.67.0-r0 \
        git=2.24.1-r0 \
        tar=1.32-r1 \
        npm=12.15.0-r1 \
    #
    && apk add --no-cache \
        nginx=1.16.1-r6 \
        bash=5.0.11-r1 \
        nodejs=12.15.0-r1 \
    #
    && S6_ARCH="${BUILD_ARCH}" \
    && if [ "${BUILD_ARCH}" = "arm32v6" ]; then S6_ARCH="armhf"; fi \
    && if [ "${BUILD_ARCH}" = "arm32v7" ]; then S6_ARCH="arm"; fi \
    && if [ "${BUILD_ARCH}" = "arm64v8" ]; then S6_ARCH="aarch64"; fi \
    && if [ "${BUILD_ARCH}" = "i386" ]; then S6_ARCH="x86"; fi \
    #
    && curl -L -s "https://github.com/just-containers/s6-overlay/releases/download/v1.22.1.0/s6-overlay-${S6_ARCH}.tar.gz" \
    | tar zxvf - -C / \
    #
    # Install app dependencies and compile
    && npm install --prefix /tmp \
    && npm run build --prefix /tmp \
    && mv /tmp/build/public /opt/walleon \
    #c 
    && apk del --purge .build-dependencies \
    && rm -fr /tmp/*

# Copy root filesystem
COPY rootfs /

# S6 Entrypoint
ENTRYPOINT ["/init"]

# Build arugments
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="Walleon" \
    io.hass.description="Control panel for Home Assistant" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="lejtzen, rabinage" \
    org.label-schema.description="Control panel for Home Assistant" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="Walleon" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.vcs-ref=${REF} \
    org.label-schema.vcs-url="https://github.com/lejtzen/addon-walleon" \
    org.label-schema.vendor="walleon"
