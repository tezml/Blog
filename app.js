var port =process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var path = require('path');
var app =express();
app.set('views','./jade/pages');//视图
app.set('view engine', 'jade');//模板引擎
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('端口号：'+port+'已启动');


//路由

app.get('/',function(req,res){
   res.render("index",{
       classSeleced:"index"
   })
});
app.get('/blog/',function(req,res){
    res.render("blog",{
        classSeleced:"blog"
    })
});
app.get('/gallery/',function(req,res){
    res.render("gallery",{
        classSeleced:"gallery"
    })
});
app.get('/board/',function(req,res){
    res.render("board",{
        classSeleced:"board"
    })
});
app.get('/contact/',function(req,res){
    res.render("contact",{
        classSeleced:"contact"
    })
});
app.get('/inner/',function(req,res){
    res.render("inner",{
        classSeleced:"Tezml"
    })
});
app.get('/photo/',function(req,res){
    res.render("photo",{
        classSeleced:"Tezml"
    })
});










