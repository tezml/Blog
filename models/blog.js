var mongoose=require('mongoose');
var blogScema=require('../schemas/blog');
var blog= mongoose.model('blog',blogScema);

module.exports=blog

