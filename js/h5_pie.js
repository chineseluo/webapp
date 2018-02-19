// 饼图
var h5_pie=function (cfg,name) {
    var component = new H5CompontentBase(cfg, name);
//绘制网格线
    var w=cfg.width;
    var h=cfg.height;
    //加入一个画布-背景层
    var cns =document.createElement("canvas");
    var ctx=cns.getContext('2d');
    $(cns).css('zIndex',1);
    cns.width=cfg.width;
    cns.height=cfg.height;
    component.append(cns);
//一个底图层

    var r =w/2;
    ctx.beginPath();
    ctx.fillStyle="#eee";
    ctx.strokeStyle="#eee";
    ctx.lineWidth=1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    //绘制一个数据层
    var cns =document.createElement("canvas");
    var ctx=cns.getContext('2d');
    cns.width=cfg.width;
    cns.height=cfg.height;
    $(cns).css('zIndex',2);

    component.append(cns);

    var colors=['red','green','blue','orange','black','red','skyblue'];
    var sAngel=1.5*Math.PI;//设置开始角度在12点的位置
    var eAngel=0;//结束角度
    var aAngel=Math.PI*2;//100%的圆结束角度
    // ctx.beginPath();
    // ctx.fillStyle="#f00";
    // ctx.strokeStyle="#f00";
    // ctx.lineWidth=1;
    // ctx.moveTo(r,r);
    // ctx.arc(r,r,r,sANgel,aAngel);
    // ctx.fill();
    // ctx.stroke();
var step=cfg.data.length;
for (var i=0;i<step;i++){
    var item=cfg.data[i];
    var color=item[2]||(item[2]=colors.pop());
    eAngel=sAngel+aAngel*item[1];
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.strokeStyle=color;
    ctx.lineWidth=.1;
    ctx.moveTo(r,r);
    ctx.arc(r,r,r,sAngel,eAngel);
    ctx.fill();
    ctx.stroke();
    sAngel=eAngel;
//加入所有的项目文本和百分比
    var text=$('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        var per=$('<div class="per"></div>');
        per.text(cfg.data[i][1]*100+'%');
        text.append(per);
        component.append(text);
        text.css('opacity',0);
        var x=r+Math.sin(.5*Math.PI-sAngel)*r;
        var y=r+Math.cos(.5*Math.PI-sAngel)*r;
        if(x>w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2+10);
        }
        if(y>h/2){
            text.css('top',y/2);
        }else {
            text.css('bottom',(h-y)/2+10);
        }
    if(cfg.data[i][2]){
        text.css('color',cfg.data[i][0]);
    }
}
//加入一个蒙版层
var cns =document.createElement("canvas");
    var ctx=cns.getContext('2d');
    cns.width=cfg.width;
    cns.height=cfg.height;
    $(cns).css('zIndex',3);
    component.append(cns);
    var r =w/2;
    ctx.beginPath();
    ctx.fillStyle="#eee";
    ctx.strokeStyle="#eee";
    ctx.lineWidth=1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    //生长动画，运用蒙版层

    var draw=function(per){
ctx.clearRect(0,0,w,h);
ctx.beginPath();
ctx.moveTo(r,r);
if(per<=0){
    ctx.arc(r,r,r,0,2*Math.PI);

}else{
    ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
}
        ctx.fill();
        ctx.stroke();
        if (per>=1){
            component.find('.text').css('opacity',1);
        }
        if(per<=1){
            component.find(".text").css('opacity',0);
        }

    };

//入场动画
    component.on('onLoad',function(){
        var s=0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
            draw(s);
            },i*10+500)
        }
    });
    //退场动画
    component.on('onLeave',function(){
        var s=1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
             draw(s);
            },i*10)
        }
    });
    return component;
};