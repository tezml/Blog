$(function(){
    var _id=$(".content").attr("sid");
    //加载博客信息
    $.ajax({
        url: '/blog/content/',
        data: {
            _id:_id
        },
        type: 'post',
        dataType: 'json',
        success:function(res){
            $(".content").append(res.inner);
        }
    });
    //滑动解锁
    $('#drag').drag();

    $(".relpy").on("click",function(){
        $(".reply_box").remove();
        $("#form_reply h4").after("<span class='reply_box'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回复：<h5>"+$(this).parents(".title_box").find(".nickName").html()+"</h5><a class='back'>取消回复</a></span>")
        $("#form_reply").addClass("reply");
        $(".reply_box").attr("lou",$(this).attr("lou"));
        $(".back").bind("click",function(){
            $("#form_reply .reply_box").remove();
            $("#form_reply").removeClass("reply");
        });
        $(document).scrollTop($(document).height());
    });

    //提交评论
    $(".submit").on("click",function(){
        if($("#nikeName").val()==""){
            alert("请输入昵称");
            return false
        }else if($("#comment").val()==""){
            alert("请输入评论");
            return false
        }else if($(".handler").hasClass("handler_ok_bg")==false){
            alert("请解锁验证");
            return false
        }
        if($("#form_reply").hasClass("reply")){
            var type="reply"
        }else{
            var type="comment"
        }
        if($("#form_reply").hasClass("reply")){
            var lou=$(".reply_box").attr("lou");
            console.log("reply");
        }else{
            var lou=$(".talk_box").length+1;
            console.log("comment");
        }

        $.ajax({
            url: '/comment/add/',
            data: {
                img:"../img/s"+tools.rnd(1,8)+".PNG",
                nickName:$("#nikeName").val(),
                time:tools.getLocalTime(tools.getTimestamp()),
                message:$("#comment").val(),
                blogId:_id,
                lou:lou,
                type:type
            },
            type: 'post',
            dataType: 'json',
            success:function(res){
                window.location.href="/inner/"+_id;
            }
        });
    });
});