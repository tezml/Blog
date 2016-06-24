var port =process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var path = require('path');
var multer = require('multer');
var mongoose=require('mongoose');
var app =express();
var Blog=require("./models/blog.js");
var _=require('underscore');

mongoose.connect("mongodb://localhost/tezml");

app.set('views','./jade/pages');//视图
app.set('view engine', 'jade');//模板引擎
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

var bodyParser = require('body-parser');
var ueditor = require("ueditor");
var jqupload = require("jquery-file-upload-middleware");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
console.log('端口号：'+port+'已启动');




//添加文章
app.use("/ueditor/ue/", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
// ueditor 客户发起上传图片请求
    if(req.query.action === 'uploadimage'){
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/imageData/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
//  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){
        var dir_url = '/imageData/ueditor/';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }
// 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
    }}));

app.use("/upload/",function(req,res,next){
    var uploadType=req.body.uploadType;
    var galleryType=req.body.galleryType;
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    jqupload.fileHandler({
        uploadDir:function(){
            console.log(uploadType);
            if(req.body.uploadType=="titleImg"){
                return __dirname+'/public/imageData/titleImg/';
            }else if(req.body.uploadType=="photo"){
                return __dirname+'/public/imageData/photo/'+galleryType;
            }
        },
        uploadUrl:function(){
            console.log(uploadType);
            if(req.body.uploadType=="titleImg"){
                return '/imageData/titleImg/';
            }else if(req.body.uploadType=="photo"){
                return '/imageData/photo/'+req.body.galleryType;
            }
        }
    })(req,res,next)
});



app.post('/blog/content/',function(req,res){
    var id=req.body._id;

    Blog.findById(id,function(err,blog){
        console.log(blog);
        if(err){
            console.log(err)
        }
        var json={inner:blog.inner};
        res.send(JSON.stringify(json));
        res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost:3000"});
        res.write(blog.inner);
        res.end();
    });
});

//添加文章
app.post('/blog/add/',function(req,res){

    //var id=req.body.id;
    var blogObj=req.body.blog;
    var _blog;
   /* if(id !="undefined"){
        Blog.findById(id,function(err,blog){
            if(err){
                console.log(err)
            }
            _blog= _.extend(blog,blogObj);
            _blog.save=(function(err,blog){
                if(err){
                    console.log(err)
                }
                res.redirect('/inner/' + blog._id)
            })
        })
    }else{*/
        _blog= new Blog({
            //id:blogObj.id,
            title:blogObj.title,
            outline:blogObj.outline,
            titleImg:blogObj.titleImg,
            createTime:blogObj.createTime,
            inner:blogObj.inner
        });
        _blog.save(function(err,blog){
            if(err){
                console.log(err)
            }
            console.log(blog);
            res.redirect('/inner/'+blog._id)
        });
    //}
});




//路由

app.get('/',function(req,res){
   res.render("index",{
       classSeleced:"index"
   })
});
app.get('/blog/',function(req,res){
    Blog.fetch(function(err,blog){
        if(err){
            console.log(err)
        }
        res.render("blog",{
            classSeleced:"blog",
            blogs:blog
        })
    });
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
    Blog.findById(id,function(err,blog){
        console.log(blog);
        if(err){
            console.log(err)
        }
        res.render("inner",{
            classSeleced:"Tezml",
            data:blog
        })
    });
});
app.get('/photo/:id',function(req,res){
    var id=req.params.id;
    blog.findById(id,function(err,blog){
        if(err){
            console.log(err)
        }
        res.render("photo",{
            classSeleced:"Tezml",
            data:blog
        })
    });


});
app.get('/createImg/',function(req,res){
    res.render("createImg",{

    })
});


app.get('/createBlog/',function(req,res){
    res.render("createBlog",{

    })
});










