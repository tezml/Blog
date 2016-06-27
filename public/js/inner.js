$(function(){
    var _id=$(".content").attr("sid");
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
    })


    $('#drag').drag();
});