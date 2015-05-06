var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var divisionSchema = mongoose.Schema({
	name : String,
	country : Schema.ObjectId
});
module.exports = mongoose.model('Division', divisionSchema);