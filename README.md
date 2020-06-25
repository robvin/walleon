# Walleon
Control panel for Home Assistant (HomeKit)

## Live demo
[View live demo](https://demo.walleon.io)

## Requirements
* Nodejs 12+

## Project setup
```
cd walleon
```

### Install dependencies
```
npm install
```

### Compiles for development and watches client files for changes
```
npm run watch
```

Vue CLI can serve and hot-reload with `npm run serve` but won't work with our backend. Use `npm run watch` and manually refresh page in browser.

### Compiles and minifies for production
```
npm run build
```

## Run addon with Hass.io
#### Prerequisite
* Docker 18.06.0+
* VS Code Remote Containers extension

In VS Code click the left bottom corner and Reopen in Container.
This will mount the project inside the container. To start Hass.io
go to tasks and select Start Hass.io.

The addon will be available in Supervisor.

## More
### Client lints and fixes files
```
npm run lint
```

### Publish
Publish contents of `/walleon/build` folder in the public folder of your web server.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
