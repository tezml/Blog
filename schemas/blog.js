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
    timeOriginal:Number,
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
        var arr=this.find({}).exec(cb);
        console.log(arr);
        for(var i=0;i<arr.length;i++){
            for(var j=i;j<arr.length;j++){
                if(arr[i].timeOriginal<arr[j].timeOriginal){
                    var tmp;
                    tmp = arr[i].timeOriginal;
                    arr[i].timeOriginal=arr[j].timeOriginal;
                    arr[j].timeOriginal=tmp;
                }
                console.log(arr[j].timeOriginal)
            }
        }
        return arr.exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

//导出模式
module.exports=blogScema;
