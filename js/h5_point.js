/**
 * Created by asus on 2017/8/5.
 */
var h5_point=function (cfg,name) {
var component=new H5CompontentBase(cfg,name);
var base=cfg.data[0][1];//以第一个数据的比例大小为100%
    //输出每个point
$.each(cfg.data,function(index,item){
    var point=$('<div class="point point_'+index+'"></div>');
   // point.text(item[0]+'-'+item[1]);
    var name=$('<div class="name">'+item[0]+'</div>');
    var rate=$('<div class="per">'+(item[1]*100)+'%'+'</div>');
    name.append(rate);
    point.append(name);
    var per=(item[1]/base*100)+"%";
    console.log(per);
    point.width(per).height(per);
    if(item[2]){
        point.css('background-color',item[2])
    }
    if(item[3]!==undefined&&item[4]){
        point.css('left',item[3]).css('top',item[4])
    }
    //point.css('transition','all 1s'+index*.5+'s');
    component.append(point);
});

return component;

} ;