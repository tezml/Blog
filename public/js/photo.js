$(function(){
    function rnd(n,m)
    {
        return parseInt(n+Math.random()*(m-n));
    }

    function createLi()
    {
        var oLi = document.createElement('li');
        oLi.style.height=rnd(150,501)+'px';
        oLi.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
        return oLi;
    }



    window.onload=function(){
        var oBox =document.getElementById('box');
        var aUl = oBox.children;
        function create()
        {
            for(var i=0;i<20;i++){
                var oLi = createLi();
                var arr = [];
                for(var j=0;j<aUl.length;j++){
                    arr.push(aUl[j]);
                }
                arr.sort(function(u1,u2){
                    return u1.scrollHeight-u2.scrollHeight;
                });
                arr[0].appendChild(oLi);
            }
        }

        create();

        window.onscroll=function(){
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollTop>=document.body.scrollHeight-document.documentElement.clientHeight-500){
                create();
            }
        };
    };
});