## Overview

This is a Restaurant Reviewer application built using Angular 2 for frontend and REST APIs in Node.js using Express for backend.
It lets the users search for restaurants near their location, read the reviews and submit a review.

The app uses Yelp Business Search V3 API to load real time data for restaurants at a particular location.

## Home Screen
![Home screen](/static/images/home.png?raw=true)

## Restaurant detail screen
![Restaurant detail](/static/images/restaurant.png?raw=true)
![Restaurant reviews](/static/images/restaurant-2.png?raw=true)

## Code coverage (29/6/2017)
![Code Coverage](/static/images/codeCoverage.png?raw=true)

## Getting Started

Clone the repo:
```sh
git clone git@github.com:karanbhomiagit/restaurant-reviewer-app
cd restaurant-reviewer-app
```

Install node modules:
```js
npm install
```

Set environment (vars):
```sh
cp /env/development.json.reference env/development.json
```

Start the server:
```js
NODE_ENV=development npm start
```

Open http://localhost:8081


Tests:
```sh
# Run tests
make test

# Run test along with code coverage
npm run coverage
```

## Deployment



## CI

Travis CI has already been integrated. The build is triggered at git commit/push.
![CI](/static/images/travis.png?raw=true)

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

## Features to be added in future

1. Login feature - Maintaining session using redis. Also, add token based authentication to the REST API.
2. Editing an already submitted review.
3. Allow only 1 review per login/email id.
4. Caching for results of list of restaurants on home page. So that the API call is not made every time the page is loaded.
5. Add a 404 page for UI.
6. Show number of results for restaurant search > 20. Maybe have a “load more..” button at the end of the list.
7. Make the “Your location” text box as an auto-suggest drop down.
8. Allow user to sort the results via criteria like “Distance/Rating/Best Match” etc.
9. Ability to delete a review on the UI (Backend API already added)
10. Better CSS

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.

## License

This project is licensed under the [MIT License](https://github.com/karanbhomiagit/restaurant-reviewer-app/blob/master/LICENSE)

## Meta

Karan Bhomia – karanbhomia@gmail.com
