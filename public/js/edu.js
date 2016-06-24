$(function(){
    var ue = UE.getEditor('myEditor');
    setTimeout(function(){
        ue.setHeight(750);
    },1000);
    var form=$('#form')[0];
    form.action="/ueditor/ue/";
    $('#btn').click(function(){
        //手动提交需要手动同步编辑器数据
        ue.sync();
        var title=$(".title").val();
        var outline=ue.getContentTxt().substring(0,50);
        var blog={
            //id:"1",
            title:title,
            outline:outline,
            titleImg:"/img/e.jpg",
            createTime:tools.getLocalTime(tools.getTimestamp()),
            inner:ue.getContent()
        };

        $.ajax({
            url: '/blog/add/',
            data: {
                blog:blog
            },
            type: 'post',
            dataType: 'json',
            success:function(){

            }
        })



    });
    //--自动切换提交地址----

});
