var port =process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose=require('mongoose');
var app =express();
var blog=require("./models/blog");
app.set('views','./jade/pages');//视图
app.set('view engine', 'jade');//模板引擎
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

var bodyParser = require('body-parser');
var ueditor = require("ueditor");
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.use("/ueditor/ue/", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
// ueditor 客户发起上传图片请求
    if(req.query.action === 'uploadimage'){
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
//  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }
// 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
    }}));


console.log('端口号：'+port+'已启动');


mongoose.connect("mongodb:localhost/blog");


//路由

app.get('/',function(req,res){
   res.render("index",{
       classSeleced:"index"
   })
});
app.get('/blog/',function(req,res){
    blog.fetch(function(err,blog){
       if(err){
           console.log(err);
       }
    });
    res.render("blog",{
        classSeleced:"blog",
        blog:blog
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
    var id=req.params.id;
    blog.findById(id,function(err,blog){
        res.render("inner",{
            classSeleced:"Tezml",
            data:blog
        })
    });
});
app.get('/photo/:id',function(req,res){
    var id=req.params.id;
    blog.findById(id,function(err,blog){
        res.render("photo",{
            classSeleced:"Tezml",
            data:blog
        })
    });


});
app.get('/create/',function(req,res){
    res.render("createBlog",{

    })
});










