/**
 *基础
 */
var H5CompontentBase=function (cfg,name) {                   //定义一个方法
var cfg=cfg||{ };                                         //可以传进来一个参数，或者空数组
    var id=("h5_c"+Math.random()).replace(".","_");
    var cls=("h5_component_"+cfg.type);
var component=$('<div class="h5_component '+cls+' '+'h5_component_name_'+name+' " id="'+id+'"></div>'); //创建一个dom对象
    cfg.text&&component.text(cfg.text);                   //在conponent中写入来自cfg的text文本
    cfg.width&&component.width(cfg.width/2);
    cfg.height&&component.height(cfg.height/2);
    cfg.css&&component.css(cfg.css);

    cfg.bg&&component.css( 'backgroundImage','url('+cfg.bg+')');
    if(cfg.center===true){
        component.css({
            marginLeft:(cfg.width/4*-1)+"px",
            left:"50%"
        });
    }
    //自定义参数
    //back点击事件
    if(typeof cfg.onclick==='function'){
        component.on('click',cfg.onclick)
    }
            component.on('onLoad',function(){
           setTimeout(function () {
               component.addClass(cls+'_load').removeClass(cls+'_leave');
               cfg.animateIn&&component.animate(cfg.animateIn);

           },cfg.delay||0);
            return false;
});
            component.on('onLeave',function(){
             setTimeout(function () {
                 component.addClass(cls+'_leave').removeClass(cls+'_load');
                 cfg.animateOut&&component.animate(cfg.animateOut);
                 console.log(2);
             },cfg.data||0);
                return false;
            });
            return component;                                     //直接返回conponent,他是一个dom元素
};