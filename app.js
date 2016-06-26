var port =process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var path = require('path');
var multer = require('multer');
var mongoose=require('mongoose');
var app =express();
var Blog=require("./models/blog.js");
var Photo=require("./models/photo.js");
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
//博客表头图片上传
app.use("/upload/blogTitleImg",function(req,res,next){
    jqupload.fileHandler({
        uploadDir:function(){
            return __dirname+'/public/imageData/blogTitleImg/';
        },
        uploadUrl:function(){
            return '/imageData/blogTitleImg/';
        }
    })(req,res,next)
});
//图片上传
app.use("/upload/Photo",function(req,res,next){
    jqupload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/imageData/photo/';

        },
        uploadUrl: function () {
            return '/imageData/photo/';
        }
    })(req,res,next)
});

//博客内容
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
            var json={blog:blog};
            res.send(JSON.stringify(json));
            res.end();
        });
    //}
});
//添加类
app.post('/photo/addType/',function(req,res){
    var photoObj=req.body;
    var _photo;
    _photo= new Photo({
        type:photoObj.type,
        img:[],
        titleImg:""
    });
    _photo.save(function(err,photo){
        if(err){
            console.log(err)
        }
        var json={type:photo.type};
        res.send(JSON.stringify(json));
        res.end();
    });
});
//提交给前台
app.post('/photo/addPhoto/',function(req,res){
    var photoObj=req.body;
    var type=photoObj.type;
    var _photo;
    Photo.findById(type,function(err,data){
        for (var i = 0; i < photoObj.img.length; i++) {
            data.img.push(photoObj.img[i])
        }
        data.titleImg=photoObj.titleImg;
        _photo= new Photo(data);
        /*res.send(JSON.stringify(data));
        res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost:3000"});
        res.end();*/
        _photo.save(function(err,photo){
            if(err){
                console.log(err)
            }
            res.send(JSON.stringify(photo));
            res.end();
        });
    });



});
//查询每个图片类型对应的所有信息
app.post('/photo/info/',function(req,res) {
    var photoObj=req.body;
    var type=photoObj.type;
    Photo.findById(type,function(err,data){
        res.send(JSON.stringify(data));
        res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost:3000"});
        res.end();
    });
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
    Photo.fetch(function(err,data) {
        if (err) {
            console.log(err)
        }
        res.render("gallery", {
            classSeleced: "gallery",
            gallery: data
        })
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
app.get('/photo/:type',function(req,res){
    var type=req.params.type;
    Photo.findById(type,function(err,data){
        if(err){
            console.log(err)
        }
        console.log(data)
        res.render("photo",{
            classSeleced:"Tezml",
            data:data
        })
    });


});
app.get('/createImg/',function(req,res){
    Photo.fetch(function(err,type){
        if(err){
            console.log(err)
        }
        res.render("createImg",{
            photos:type
        })
    });
});

app.get('/createBlog/',function(req,res){
    res.render("createBlog",{
    })
});

//获取四个contect里的jade
app.get('/welcome/',function(req,res){
    res.render("welcome",{
    })
});
app.get('/AboutMe/',function(req,res){
    res.render("AboutMe",{
    })
});
app.get('/AboutWebsite/',function(req,res){
    res.render("AboutWebsite",{
    })
});
app.get('/ContactMe/',function(req,res){
    res.render("ContactMe",{
    })
});







