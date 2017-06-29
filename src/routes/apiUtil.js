'use strict'
var request = require('request')
var logger = require('winston')
var Review = require('../../models/review.js')

exports.getRestaurants = function(req, res, next) {
  var errors = []
  getBearerTokenForYelp(function (err, token) {
    if(err) return res.status(422).json({errors: [err]})
    var options = {
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      qs:
       { term: 'restaurant',
         location: req.body.location || '\'Rotterdam\'',
         radius: req.body.radius || '2000',
         limit: '20',
         sort_by : req.body.sort_by || 'distance'
       },
      headers:
       {
         authorization: 'Bearer ' + token
       }
     }

    request(options, function (err, response, body) {
      if (err) {
        logger.info('getRestaurants, error : ' + err.message)
        errors.push({code : err.code || err.name, message : err.message})
      }
      if (response.statusCode !== 200) {
        logger.info('getRestaurants, response : ' + JSON.stringify(response))
        errors.push({code : response.statusCode, message : 'Unable to load restaurants from Yelp. Please try again.'})
      }

      if(errors.length < 1) {
        body = JSON.parse(body)
        return res.status(200).json(body && body.businesses || [])
      } else {
        return res.status(422).json({errors: errors})
      }
    })
  })

}

function getBearerTokenForYelp(callback) {
  var options = {
    method: 'POST',
    url: 'https://api.yelp.com/oauth2/token',
    headers:
     { 'content-type': 'application/x-www-form-urlencoded' },
    form:
     { grant_type: 'client_credentials',
       client_id: 'ONfHAywmL_3aRDd_CAhhRA',
       client_secret: 'yNrOKI0av5MkLzp7dXmMuPG7vHofwZbjrXbx17gBtqQcqtowKw5syqKSJds1wQ3t'
     }
  }

  request(options, function (error, response, body) {
    if (error) return callback(error)
    if(response.statusCode !== 200) {
      logger.info('getBearerTokenForYelp, response : ' + JSON.stringify(response))
      return callback(new Error('Unable to connect to Yelp. Please try again.'))
    }
    body = JSON.parse(body)
    return callback(null, body && body.access_token || null)
  })
}

exports.getRestaurantById = function(req, res, next) {
  getRestaurantByIdHelper(req.params._restaurantId, function (errors, body) {
    if(errors.length < 1) {
      body = JSON.parse(body)
      return res.status(200).json(body)
    } else {
      return res.status(422).json({errors: errors})
    }
  })
}

function getRestaurantByIdHelper(restaurantId, callback) {
  var errors = []
  getBearerTokenForYelp(function (err, token) {
    if(err) return callback([err])
    var options = {
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/' + restaurantId,
      qs: {},
      headers:
       {
         authorization: 'Bearer ' + token
       }
     }

    request(options, function (err, response, body) {
      if (err) {
        logger.info('getRestaurantById, error : ' + err.message)
        errors.push({code : err.code || err.name, message : err.message})
      }
      if (response.statusCode !== 200) {
        logger.info('getRestaurantById, response : ' + JSON.stringify(response))
        if(response.statusCode === 404)
          errors.push({code : 'INVALID_RESTAURANT_ID', message : 'There are no restaurants listed on Yelp for the restaurant Id. Please provide a valid one.' })
        else
          errors.push({code : response.statusCode, message : 'Unable to load restaurants from Yelp. Please try again. Response : ' + JSON.stringify(response)})
      }
      return callback(errors, body)
    })
  })
}

exports.getReviewsByRestaurantId = function(req, res, next) {
  var query = {restaurantId: req.params._restaurantId}
  Review.find(query, function (err, reviews) {
    if (err) return next(err)
    if (!reviews) {
      var errors = [{ code : 'NO_REVIEWS_FOUND', message : 'Unable to find reviews.'}]
      return res.status(404).json({ errors: errors })
    }
    return res.status(200).json(reviews)
  })
}

exports.deleteReviewById = function(req, res, next) {
  var query = {restaurantId: req.params._restaurantId, _id : req.params._id}
  Review.findOneAndRemove(query, function (err, doc) {
    if (err) return next(err)
    return res.status(204).json({})
  })
}

exports.postReviewForRestaurant = function(req, res, next) {
  //Check if the restaurant exists
  getRestaurantByIdHelper(req.params._restaurantId, function (errors, body) {
    if(errors.length > 0) {
      return res.status(422).json({errors: errors})
    }
    //Add review to database
    var doc = {
      _userName: req.body.username,
      _userEmail: req.body.email,
      restaurantId: req.params._restaurantId,
      review : req.body.review || null,
      rating : req.body.rating
    }
    logger.info('doc : ', JSON.stringify(doc))
    var review = new Review(doc)
    review.save(function (err, doc) {
      if (err) {
        logger.info('postReviewForRestaurant, err : ' + err.message)
        errors.push({ code : 'UNABLE_TO_SAVE_REVIEW', message : 'Unable to save review. Error : ' + err.message })
        return res.status(422).json({errors: errors})
      }
      return res.status(201).json({ message : 'Review created.'})
    })
  })

}
