# Walleon
Control panel for Home Assistant (HomeKit)

## Live demo
[View live demo](https://lejtzen.github.io/walleon/)

## Requirements
* Docker
* Nodejs

## Project setup
```
cd walleon
```

### Install dependencies
```
npm install --prefix client && npm install --prefix server
```

### Compiles and hot-reloads for development
```
npm run serve --prefix client
npm run build --prefix server && npm start --prefix server
```

### Compiles and minifies for production
```
npm run build --prefix client && npm run build --prefix server
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
npm run lint --prefix client
```

### Publish
Publish contents of `/client/dist` folder in the public folder of your web server.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
