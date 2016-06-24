var mongoose=require('mongoose');
var blogScema= new mongoose.Schema({
    id:String,
    title:String,
    outline:String,
    titleImg:String,
    createTime:String,
    inner:String
});

blogScema.pre("save",function(next){
    //this.createTime=this.createTime=Date.now();
    next();
});

blogScema.statics={
    fetch:function(cb){
        return this
            .find({})
            //.sort("createTime")
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

//导出模式
module.exports=blogScema;
