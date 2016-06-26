$(function(){
    var ue = UE.getEditor('myEditor');
    setTimeout(function(){
        ue.setHeight(750);
    },1000);
    var form=$('#form')[0];
    form.action="/ueditor/ue/";

    var upload_cover = WebUploader.create({
        auto: true,
        chunked: false,
        pick: '#cover_upload',
        server: '/upload/blogTitleImg/',
        swf: '/js/lib/Uploader.swf',
        compress:false,
        accept: {
            title: 'Images',
            extensions: 'JPEG,jpg,png',
            mimeTypes: 'image'
        },
        fileSingleSizeLimit: 1 * 1024 * 1024,    // 1 M
        formData: {
        }
    });
    upload_cover.on('uploadSuccess', function (file, res) {
        var raw = res.files[0].url;
        $(".cover_img").remove();
        var img = $(new Image()).attr('src', raw).attr('class', 'cover_img');
        $(".cover_box").append(img);
    });






    $('#btn').click(function(){
        //手动提交需要手动同步编辑器数据
        ue.sync();
        var title=$(".title").val();
        var outline=ue.getContentTxt().substring(0,50);
        var titleImg=$(".cover_img").attr("src");
        var blog={
            //id:"1",
            title:title,
            outline:outline,
            titleImg:titleImg,
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
                alert("提交成功")
            }
        })



    });
    //--自动切换提交地址----

});
