$(function(){
    new AnimOnScroll( document.getElementById( 'grid' ), {
        minDuration : 0.1,
        maxDuration : 0.6,
        viewportFactor : 0.2
    } );
    $("#form_board .head_photo").css("background","url('../img/s"+tools.rnd(1,8)+".PNG')");
    $("#form_board .head_photo").on("click",function(){
        $("#form_board .head_photo").css("background","url('../img/s"+tools.rnd(1,8)+".PNG')");
    });
    $(".submit").on("click",function(){
        $.ajax({
            url: '/board/add/',
            data: {
                img:$("#form_board .head_photo").css("backgroundImage"),
                nickName:$(".nickName").val(),
                message:$("#comment").val()
            },
            type: 'post',
            dataType: 'json',
            success:function(){
                window.location.href="/board/";
            }
        })
    })


});