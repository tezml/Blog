var mongoose=require('mongoose');
var blogScema=require('../schemas/blog');
var Blog= mongoose.model('Blog',blogScema);

module.exports=Blog;

