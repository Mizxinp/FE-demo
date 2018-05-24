window.onload = function(){

    document.querySelector('.commodity-list').addEventListener('touchmove',function(e){ 

        e.preventDefault();
    
    });
    document.querySelector('.commodity-detail').addEventListener('touchmove',function(e){ 
    
        e.preventDefault();
    
    });
    new IScroll(document.querySelector('.commodity-list'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.commodity-detail'),{
        scrollX:true,
        scrollY:false
    });
}