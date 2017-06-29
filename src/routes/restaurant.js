'use strict'
var request = require('request')
var apiUtil = require('./apiUtil')

module.exports = function (app) {

  app.get('/status', function(req, res, next) {
    return res.status(200).json({message : 'Up and running !'})
  })

  app.get('/restaurants', apiUtil.getRestaurants)

  app.get('/restaurants/:_restaurantId',
    apiUtil.getRestaurantById
  )

  app.post('/restaurants/search',
    apiUtil.getRestaurants
  )

  app.post('/restaurants/:_restaurantId/reviews',
    checkIfRestaurantIdIsNull,
    apiUtil.postReviewForRestaurant
  )

  app.get('/restaurants/:_restaurantId/reviews',
    checkIfRestaurantIdIsNull,
    apiUtil.getReviewsByRestaurantId
  )

  app.delete('/restaurants/:_restaurantId/reviews/:_reviewId',
    checkIfRestaurantIdIsNull,
    apiUtil.deleteReviewById
  )

  function checkIfRestaurantIdIsNull(req, res, next) {
    var errors = []
    if(!req.params._restaurantId) {
      errors.push({code : 'EMPTY_RESTAURANT_ID', message : 'Please provide a restaurant Id.'})
      return res.status(422).json({errors: errors})
    }
    next()
  }

}
