//全局js文件
$(function() {
    //判断当前页面选中哪个html
    var cClass="."+$(".bar ul").attr("bar");
    console.log(cClass);
    $(".bar ul").find(cClass).addClass("selected")
});