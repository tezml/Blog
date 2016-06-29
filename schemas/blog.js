var mongoose=require('mongoose');
/*var Comment = new Schema({
    img  :String,
    nickName   :String,
    time   :String,
    message  :String
});*/
var blogScema= new mongoose.Schema({
    title:String,
    outline:String,
    titleImg:String,
    createTime:String,
    inner:String,
    length:Number,
    comment:[
        {
            img  :String,
            nickName   :String,
            time   :String,
            message  :String,
            reply:[
                {
                    img  :String,
                    nickName   :String,
                    time   :String,
                    message  :String
                }
            ],
            lou:Number
        }
    ]
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
