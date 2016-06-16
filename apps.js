var port =process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var path = require('path');
var app =express();
app.set('views','./html');//视图
app.set('view engine', 'jade');//模板引擎
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('端口号：'+port+'已启动');


//路由

app.get('/',function(req,res){
   res.render("index",{
       title:"Tezml"
   })
});/*
app.get('',function(req,res){
   // res.render("index")
});*/
