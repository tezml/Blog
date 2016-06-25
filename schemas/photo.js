var mongoose=require('mongoose');
var PhotoScema= new mongoose.Schema({
    type:String,
    img:Array,
    titleImg:String
});

PhotoScema.pre("save",function(next){
    //this.createTime=this.createTime=Date.now();
    next();
});

PhotoScema.statics={
    fetch:function(cb){
        return this
            .find({})
            //.sort("createTime")
            .exec(cb)
    },
    findById:function(type,cb){
        return this
            .findOne({type:type})
            .exec(cb)
    }
}

//导出模式
module.exports=PhotoScema;
