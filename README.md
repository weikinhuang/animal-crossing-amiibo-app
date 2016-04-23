# animal-crossing-amiibo-app
Animal Crossing Card Checklist

## Building the App
This is a [ionic](https://ionicframework.com/) mobile app

### Prerequisites
* Windows 8+, OSX, Linux
* Install nodejs
* Install cordova & ionic globally
```bash
npm install -g cordova ionic gulp
```
* Set up the proper development environments for [Android](http://cordova.apache.org/docs/en/edge/guide_platforms_android_index.md.html)

### Developing
After cloning the repo, run

```bash
npm install
bower install
ionic state restore
```

This will install the proper cordova platforms and plugins needed for development


### Development
[See docs](http://ionicframework.com/docs/guide/testing.html)

#### Run the development server to develop in the browser
```bash
ionic serve
```

#### Run on physical device
```bash
ionic run android
```

### Disclaimer
