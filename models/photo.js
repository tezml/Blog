var mongoose=require('mongoose');
var PhotoScema=require('../schemas/photo');
var Photo= mongoose.model('Photo',PhotoScema);

module.exports=Photo;

