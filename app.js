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
        classSeleced:"blog",
        blog:[
            {id:"1",title:"我是博客名字1",outline:"我是简介1",createTime:"2015/08/20",titleImg:"/img/work1.jpg"},
            {id:"2",title:"我是博客名字2",outline:"我是简介2",createTime:"2015/08/21",titleImg:"/img/work1.jpg"},
            {id:"3",title:"我是博客名字3",outline:"我是简介3",createTime:"2015/08/22",titleImg:"/img/work1.jpg"},
            {id:"4",title:"我是博客名字4",outline:"我是简介4",createTime:"2015/08/23",titleImg:"/img/work1.jpg"},
            {id:"5",title:"我是博客名字5",outline:"我是简介5",createTime:"2015/08/24",titleImg:"/img/work1.jpg"}
        ]
    })
});
app.get('/gallery/',function(req,res){
    res.render("gallery",{
        classSeleced:"gallery",
        gallery:[
            {id:"1",titleImg:"/img/work1.jpg",title:"代码"},
            {id:"2",titleImg:"/img/work2.jpg",title:"足球"},
            {id:"3",titleImg:"/img/work3.jpg",title:"热爱"},
            {id:"4",titleImg:"/img/work4.jpg",title:"梦想"},
            {id:"5",titleImg:"/img/work5.jpg",title:"其他"}
        ]
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
app.get('/inner/:id',function(req,res){
    res.render("inner",{
        classSeleced:"Tezml",
        data:{title:"我是博客名字1",id:"1"}
    })
});
app.get('/photo/:id',function(req,res){
    res.render("photo",{
        classSeleced:"Tezml",
        data:{id:"1"}
    })
});










