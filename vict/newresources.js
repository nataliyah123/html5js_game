(function (){
    //  All the function below are declarative
    var resourceCache={};
    
    
    function load(url){
        if(url instanceof Array){
            url.forEach(function(val){_loadImg(val)})
        }
        else{
            _loadImg(url);
        }
    };
    
    function _loadImg(val){
        var img= new Image();
        // console.log(img)
        img.onload=function(){  //don't use resourceCache inside onload it is not working
            // console.log(val);
            // resourceCache[val]=img;
        }
        resourceCache[val]=img;
        img.src=val;
        // console.log(resourceCache)
    }
    
    function get_img(url){
        // console.log(url)
        var new_get=resourceCache[url];
        // console.log(resourceCache);
        // console.log(new_get);
        return resourceCache[url];
    }
    window.Resources={
        load:load,
        get_img:get_img,
        
    }
    
}())
