var mongoose=require('mongoose');
var commentScema=require('../schemas/comment');
var Comment= mongoose.model('Comment',commentScema);

module.exports=Comment;
