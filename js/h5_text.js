/**
 * 基本函数方法
 */
var jdata=[];
var H5=function () {
this.id=(('h5_'+Math.random()).replace('.','_'));
this.el=$('<div class="h5" id="'+this.id+'"></div>').hide();
this.page=[];
$('body').append(this.el);
this.addpage=function(name,text){
    jdata.push({ispage:true,name:name,text:text});
    var page=$("<div class='h5_page section'></div>");
    if(name!=undefined){
    page.addClass('h5_page_'+name);
    }
    if(text!=undefined){
        page.text(text);
    }
    this.el.append(page);
    this.page.push(page);
    if(typeof this.whenAddpage==='function'){
        this.whenAddpage();
    }
    return this;
};
/*新增一个组件*/
        this.addcomponent=function(name,cfg){
            jdata.push({ispage:false,name:name,cfg:cfg});
        var cfg=cfg||{};
        cfg=$.extend({
            type:'base'
        },cfg);
        var component;//定义一个变量存储组件元素
        var page=this.page.slice(-1)[0];
        switch (cfg.type){
            case "base":
                component=new H5CompontentBase(cfg,name);
             break;
            case "polyline":
                component=new h5_polyline(cfg,name);
                break;
            case "pie":
                component=new h5_pie(cfg,name);
                break;
            case "bar":
                component=new h5_bar(cfg,name);
                break;
            case "radar":
                component=new h5_radar(cfg,name);
                break;
            case "point":
                component=new h5_point(cfg,name);
                break;
            default:
        }
        page.append(component);
        return this;
    };
    /* h5对象初始化呈现*/
    this.loader=function(firstpage){
        this.el.fullpage({
            onLeave:function (index,nextIndex,direction) {
                $(this).find(".h5_component").trigger("onLeave");
                 console.log(4)
            },
            afterLoad:function (anchorLink,index) {
                $(this).find(".h5_component").trigger("onLoad");
                console.log(5)
            }
        });
        this.page[0].find(".h5_component").trigger("onLoad");
      this.el.show();
      if(firstpage){
          $.fn.fullpage.moveTo(firstpage);
      }
    };
    this.loader=typeof h5_loading=='function'?h5_loading:this.loader;
    return this;
};
