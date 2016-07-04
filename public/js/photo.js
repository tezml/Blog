$(function(){
    $("header").css("width","300px")
    new AnimOnScroll( document.getElementById( 'grid' ), {
        minDuration : 0.1,
        maxDuration : 0.6,
        viewportFactor : 0.2
    } );
});