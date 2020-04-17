# Walleon
Control panel for Home Assistant (HomeKit)

## Live demo
[View live demo](https://robvin.github.io/addon-walleon/)

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
* VS Code

In VS Code run following tasks:

```
Run Hass.io enviroment
```
Wait for the Supervisor to start, then run:
```
Start Addon
```

To get started with some fake devices run task:
```
Restore Home Assistant Snapshot
```
Login with master / password

#### Hassio `localhost:9123`
#### Walleon `localhost:8080`

## More
### Client lints and fixes files
```
npm run lint
```

### Publish
Publish contents of `/walleon/build` folder in the public folder of your web server.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
