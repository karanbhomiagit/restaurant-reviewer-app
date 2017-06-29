'use strict'

var logger = require('winston')
var should = require('should')
var _ = require('lodash')
var assert = require('assert')
var request = require('request')
var app = require('../../app')

describe('Restaurant API Tests', function() {

  before(function (done) {
    done()
  })

  var baseURI = 'http://localhost:8081/'

  it('should check the server for status', function (done) {
    var opts = {
      uri : baseURI + 'api/status',
      method : 'GET',
      json : true
    }
    request(opts, function (err, res, body) {
      if(err) return done(err)
      //logger.info('res : ', JSON.stringify(res))
      assert.equal(res.statusCode, '200')
      assert.equal(body.message, 'Up and running !')
      done()
    })
  })

  describe('GET restaurants/:_restaurantId tests', function () {

    it('should return error when making a GET restaurants call for invalid restaurant id', function (done) {
      var opts = {
        uri : baseURI + 'api/restaurants/123',
        method : 'GET',
        json : true
      }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        var expectedBody = {"errors":[{"code":"INVALID_RESTAURANT_ID","message":"There are no restaurants listed on Yelp for the restaurant Id. Please provide a valid one."}]}
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '422')
        assert.deepEqual(body, expectedBody)
        done()
      })
    })

    it('should return proper response when making a GET restaurants call for valid restaurant id', function (done) {
      var opts = {
        uri : baseURI + 'api/restaurants/chicken-spot-rotterdam',
        method : 'GET',
        json : true
      }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '200')
        assert.ok(body.name)
        done()
      })
    })

  })

  describe('GET /restaurants tests', function() {

    it('should return proper response for the API call', function (done) {
      var opts = {
        uri : baseURI + 'api/restaurants/',
        method : 'GET',
        json : true
      }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '200')
        assert.equal(body.length, 20)
        done()
      })
    })

  })

  describe('POST /restaurants/search tests', function() {

    it('should return default search response for the API call, if no params provided', function (done) {
      var opts = {
        uri : baseURI + 'api/restaurants/search',
        method : 'POST',
        json : true
      }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '200')
        assert.equal(body.length, 20)
        done()
      })
    })

    it('should return proper search response for the API call, if params provided', function (done) {
      var opts = {
        uri : baseURI + 'api/restaurants/search',
        method : 'POST',
        json : {
            location: 'San Francisco',
            radius: '1000',
            sort_by: 'best_match'
          }
        }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '200')
        assert.equal(body.length, 20)
        done()
      })
    })


  })

  describe('POST and GET /restaurants/:id/reviews tests', function() {

    it('should return proper error if the :id is invalid for POST call', function (done) {
      var opts = {
        uri : baseURI + 'api/restaurants/' + 'xyz' + '/reviews',
        method : 'POST',
        json : {
        }
      }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        var expectedBody = {"errors":[{"code":"INVALID_RESTAURANT_ID","message":"There are no restaurants listed on Yelp for the restaurant Id. Please provide a valid one."}]}
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '422')
        assert.deepEqual(body, expectedBody)
        done()
      })
    })

    it('should return proper error if the body is invalid for POST call', function (done) {
      var opts = {
        uri : baseURI + 'api/restaurants/' + 'chicken-spot-rotterdam' + '/reviews',
        method : 'POST',
        json : {
        }
      }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        var expectedBody = {"errors":[{"code":"UNABLE_TO_SAVE_REVIEW","message":"Unable to save review. Error : Validation failed"}]}
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '422')
        assert.deepEqual(body, expectedBody)
        done()
      })
    })


    it('should be able to POST a review successfully and GET the list of reviews, DELETE the review', function (done) {
      this.timeout(75000)
      var opts = {
        uri : baseURI + 'api/restaurants/chicken-spot-rotterdam/reviews',
        method : 'POST',
        json : {
          username : 'Bruce Banner',
          email : 'thegreenguy@avengers.com',
          rating : '5',
          review : 'Gamma radiated chicken is the best here.'
        }
      }
      request(opts, function (err, res, body) {
        if(err) return done(err)
        //logger.info('res : ', JSON.stringify(res))
        assert.equal(res.statusCode, '201')
        assert.equal(body.message, 'Review created.')

        opts.method = 'GET'
        opts.json = true
        request(opts, function (err, res, body) {
          if(err) return done(err)
          logger.info('res : ', JSON.stringify(res))
          var reviewSaved = _.find(body, function (review) {
            return review._userEmail === 'thegreenguy@avengers.com' && review._userName === 'Bruce Banner'
          })
          assert.ok(reviewSaved._id)

          opts.method = 'DELETE'
          opts.uri = baseURI + 'api/restaurants/chicken-spot-rotterdam/reviews/' + reviewSaved._id
          request(opts, function (err, res, body) {
            if(err) return done(err)
            logger.info('res : ', JSON.stringify(res))
            assert.equal(res.statusCode, 204)
            done()
          })
        })
      })
    })

  })

})
