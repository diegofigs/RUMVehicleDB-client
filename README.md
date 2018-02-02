# RUM Vehicle - Web

A web application that handles all expenses related to UPRM's Vehicle fleet.

## Usage

First, install the package using npm:
```
npm install
```
Then, create a .env file for providing environment variables to build:
```
nano .env
```
define ASSET_PATH, PATH and PORT in .env and use it like so:
```
# Run application in dev mode
npm run dev

# Run application in prod mode (served by Express)
npm run prod
OR
npm run build && npm run server
```

## Distribution and Deployment
For distribution purposes, minified + gzipped web application with documentation
can be built using the following:
```
npm run build
```
Results can be found in /dist

## Documentation
Documentation can be generated using npm:
```
npm build:docs
```

## License

This library is licensed under MIT.
