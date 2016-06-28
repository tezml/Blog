var mongoose=require('mongoose');
var commentScema= new mongoose.Schema({
    blogId:String,
    comment:Array
});

commentScema.pre("save",function(next){
    //this.createTime=this.createTime=Date.now();
    next();
});

commentScema.statics={
    fetch:function(cb){
        return this
            .find({})
            //.sort("createTime")
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({blogId:id})
            .exec(cb)
    }
}

//导出模式
module.exports=commentScema;
