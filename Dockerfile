FROM fedora:latest

# install dependencies
RUN dnf install -y \
        curl \
        findutils \
        gcc \
        gcc-c++ \
        git \
        glibc \
        java-1.8.0-openjdk-devel \
        java-1.8.0-openjdk-headless \
        tar \
        which \
        glibc.i686 \
        glibc-devel.i686 \
        libstdc++.i686 \
        ncurses-devel.i686 \
        zlib-devel.i686 \
    && dnf clean all

ENV APP_ROOT               /data
# create work directories
RUN mkdir -p \
    ${APP_ROOT}

# setup android env variables
ENV ANDROID_SDK_VERSION    24.4
ENV ANDROID_HOME           /opt/android-sdk-linux
ENV PATH                   ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
ENV JAVA_HOME              /usr/lib/jvm/java-1.8.0-openjdk
# a csv of android api levels
ENV ANDROID_API_LEVELS     android-22
ENV ANDROID_BUILD_TOOLS    23.0.1

# download the android sdk
RUN mkdir -p ${ANDROID_SDK_VERSION} \
    && curl -#L http://dl.google.com/android/android-sdk_r${ANDROID_SDK_VERSION}-linux.tgz \
        | tar -C /opt -xz

# install android sdk tools
RUN echo y \
    | android update sdk --no-ui --force --filter platform-tools,build-tools-${ANDROID_BUILD_TOOLS},extra-android-support,${ANDROID_API_LEVELS}

# setup node env variables
ENV NODE_VERSION 4.1.2
ENV NPM_VERSION 2.14.4

# install node.js
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz" \
    && npm install -g npm@"$NPM_VERSION" \
    && npm cache clear

# workdir
WORKDIR ${APP_ROOT}

# install ionic dependencies
RUN npm install -g --quiet \
        cordova \
        ionic \
        gulp \
    && npm cache clear

# copy over the startup script
COPY /docker/bootstrap.sh /bootstrap.sh
RUN chmod 755 /bootstrap.sh

# install local packages
COPY /package.json ${APP_ROOT}/package.json
RUN npm install --quiet \
    && npm cache clear

# add node_modules to the path
ENV PATH                   ${PATH}:${APP_ROOT}/node_modules/.bin

# set up ionic
# for some reason this isn't generating the platforms and plugins directories...
# COPY /ionic.project ${APP_ROOT}/ionic.project
# COPY /config.xml ${APP_ROOT}/config.xml
# RUN ionic state restore

# install bower dependencies
COPY /.bowerrc ${APP_ROOT}/.bowerrc
COPY /bower.json ${APP_ROOT}/bower.json

# setup gulpfile
RUN mkdir -p ${APP_ROOT}/www
RUN bower install --allow-root

# expose ports
EXPOSE 8100 35729

# copy over the application
COPY . ${APP_ROOT}/

# boot up the application
ENTRYPOINT [ "/bootstrap.sh" ]
CMD [ "ionic", "serve", "--all" ]
