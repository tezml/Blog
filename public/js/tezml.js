//全局js文件
$(function() {
    //判断当前页面选中哪个html
    var cClass="."+$(".bar ul").attr("bar");
    $(".bar ul").find(cClass).addClass("selected")



    function tool() {  //存
        this.elements = [];
        //把时间转化成时间轴
        this.getTimestamp = function() {
            var date = new Date(),
                formatTime = (date.getTime() / 1000).toFixed(0);
            return formatTime;
        };
        this.getLocalTime=function(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        }
    }

    function transition() {}
    transition.prototype = new tool();
    tools = new transition();
});