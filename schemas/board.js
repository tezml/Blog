var mongoose=require('mongoose');
var BoardScema= new mongoose.Schema({
    nickName:String,
    img:String,
    message:String
});

BoardScema.pre("save",function(next){
    next();
});

BoardScema.statics={
    fetch:function(cb){
        return this
            .find({})
            //.sort("createTime")
            .exec(cb)
    }
}

//导出模式
module.exports=BoardScema;
