// app/models/review.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReviewSchema   = new Schema({
  //_userId: {type: Schema.Types.ObjectId, required: true, ref: 'User', template: false},
  _userName : {type: String, required: true, maxSize: 200},
  _userEmail : {type: String, required: true, maxSize: 200},
  restaurantId: {type: String, required: true},
  review: {type: String, maxSize: 10 * 1024},
  rating: {type: String, enum: ['1', '2', '3', '4', '5'], required: true}
});

ReviewSchema.index({restaurantId: 1, key: 1})

module.exports = mongoose.model('Review', ReviewSchema);
