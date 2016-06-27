var mongoose=require('mongoose');
var BoardScema=require('../schemas/board');
var Board= mongoose.model('Board',BoardScema);

module.exports=Board;
