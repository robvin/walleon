# Walleon
Control panel for Home Assistant (HomeKit)

## Live demo
[View live demo](https://lejtzen.github.io/walleon/)

## Requirements
* Docker 18.06.0+
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

### Run Docker container
```
docker build -t walleon .
docker run -d -p 8080:8080 walleon
```

#### Now visit `localhost:8080`

## More
### Client lints and fixes files
```
npm run lint
```

### Publish
Publish contents of `/walleon/build` folder in the public folder of your web server.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
