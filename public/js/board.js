$(function(){
    new AnimOnScroll( document.getElementById( 'grid' ), {
        minDuration : 0.1,
        maxDuration : 0.6,
        viewportFactor : 0.2
    } );
    function rnd(n,m){
        return parseInt(n+Math.random()*(m-n));
    }
    $(".head_photo").css("background","url('../img/s"+rnd(1,8)+".PNG')");
    $(".head_photo").on("click",function(){
        $(".head_photo").css("background","url('../img/s"+rnd(1,8)+".PNG')");
    });
    $(".submit").on("click",function(){
        $.ajax({
            url: '/board/add/',
            data: {
                img:"../img/s"+1+".PNG')",
                nickName:$(".nickName").val(),
                message:$("#comment").html()
            },
            type: 'post',
            dataType: 'json',
            success:function(){
                window.location.href="/board/";
            }
        })
    })


});