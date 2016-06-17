var port =process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var path = require('path');
var app =express();
app.set('views','./jade');//视图
app.set('view engine', 'jade');//模板引擎
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('端口号：'+port+'已启动');


//路由

app.get('/',function(req,res){
   res.render("index",{
       title:"Tezml"
   })
});
app.get('/blog/',function(req,res){
    res.render("blog",{
        title:"Tezml"
    })
});

app.get('/gallery/',function(req,res){
    res.render("gallery",{
        title:"Tezml"
    })
});
app.get('/board/',function(req,res){
    res.render("board",{
        title:"Tezml"
    })
});
app.get('/contact/',function(req,res){
    res.render("contact",{
        title:"Tezml"
    })
});
app.get('/blog/',function(req,res){
    res.render("blog",{
        title:"Tezml"
    })
});











