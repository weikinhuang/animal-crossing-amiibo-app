FROM weikinhuang/ionic-android-build:android-23

# workdir
ENV APP_ROOT            /data
WORKDIR $APP_ROOT

# install local packages
ARG NODE_ENV=production
ENV NODE_ENV            $NODE_ENV
COPY /package.json ${APP_ROOT}/package.json
RUN npm install --quiet \
    && npm cache clear

# add node_modules to the path
ENV PATH                   ${PATH}:${APP_ROOT}/node_modules/.bin

# set up ionic
COPY /ionic.project ${APP_ROOT}/ionic.project
COPY /config.xml ${APP_ROOT}/config.xml
COPY /hooks ${APP_ROOT}/hooks
RUN mkdir -p ${APP_ROOT}/www \
    && ionic state restore

# install bower dependencies
COPY /.bowerrc ${APP_ROOT}/.bowerrc
COPY /bower.json ${APP_ROOT}/bower.json

# setup bower
RUN mkdir -p ${APP_ROOT}/www \
    && bower install --allow-root --quiet

# expose ports
EXPOSE 8100 35729

# copy over the application
COPY . ${APP_ROOT}/

# boot up the application
CMD [ "ionic", "serve", "--all" ]
