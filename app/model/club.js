var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var clubSchema = mongoose.Schema({
	name : String,
	division : Schema.ObjectId
});
module.exports = mongoose.model('Club', clubSchema);