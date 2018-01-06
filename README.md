# Tea Shop

This is a Shop App for selling the most consumed beverage in the world, next to water of course.

## Demo
[Demo at Heroku](https://tea-shop.herokuapp.com/)

### Pre-run
To get the project up and running make sure to have `node` at least version `8.1.1` and `npm` at least `5.0.3` installed on your machine, then run:
```bash
$ npm install && npm install --prefix client
```
This project relies on [mLab](https://mlab.com/) to connect with mongoDB, so make sure to verify `config/keys.js` and check if `MONGO_URI` is setted for the desired environment.

## Run in Developer mode
Make sure to checked the pre-run steps, then:
```bash
# Initial setup
$ npm install
# Starts the server-side and client-side concurrently
$ npm run dev
```
## Automated tests
You can run tests both at client side and server side simply with:
```bash
$ npm run test-all
```
Or you can run the following and execute only for client-side or server-side:
```bash
$ npm run test # run server-side tests
$ npm run test --prefix client # run client-side tests
```

## Deploy at Heroku
Make sure to set the config var `MONGO_URI` to a valid remote URI set, then just push the project into your app repository and let Heroku take care of the magic. For example, at the project:
```bash
$ heroku create
$ heroku config:set MONGO_URI=<your_mongoUri_goes_here>
$ git remote add heroku <you_heroku_repository>
$ git push origin heroku
```

## Built With

* [Create-react-app](https://github.com/facebookincubator/create-react-app) to start a React/Redux project.
* [NodeJS](https://nodejs.org/en/) to build the server API.
* [mLab - MongoDB](https://mlab.com/) to store tea and session data.


## Author

* **Carlos Rafael Rêgo da Silva** - [rafaelrds](https://github.com/rafaelrds)