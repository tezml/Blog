$(function(){
    var ue = UE.getEditor('myEditor');
    var form=$('#form')[0];
    form.action="/ueditor/ue/";
    $('#btn').click(function(){
        //手动提交需要手动同步编辑器数据
        ue.sync();
        $('#form')[0].submit();
    });
    //--自动切换提交地址----

});
