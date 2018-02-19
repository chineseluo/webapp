// 折线图
var h5_polyline=function (cfg,name) {
    var component = new H5CompontentBase(cfg, name);
//绘制网格线
    var w=cfg.width;
    var h=cfg.height;
    //加入一个画布-背景层
    var cns =document.createElement("canvas");
    var ctx=cns.getContext('2d');
    cns.width=cfg.width;
    cns.height=cfg.height;
    component.append(cns);
    //水平网格线
    var step=10;
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle="#AAAAAA";
    window.ctx=ctx;
        for(var i=0;i<step+1;i++){
            var y=(h/step)*i;
            ctx.moveTo(0,y);
            ctx.lineTo(w,y);
        }
        //垂直网格线(根据项目的个数区分)
    step=cfg.data.length+1;
    var text_w=w/step>>0;
    for (var i=0;i<step+1;i++){
        var x=(w/step)*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        console.log(10);
        if (cfg.data[i]) {
            var text = $('<div class="text"></div>');
            text.text(cfg.data[i][0]);
text.css('width',text/2).css('left',(x/2-text_w/4)+text_w/2);
            component.append(text);
        }
    }
        ctx.stroke();

    //加入画布数据层
    var cns =document.createElement("canvas");
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    component.append(cns);

    //制作动画，把连线部分封装成一个函数方法
    var draw=function(per){
        //清空画布
        ctx.clearRect(0,0,w,h);
    //绘制折线数据
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle="#ff8878";
    var x=0;
    var y=0;
   // step=cfg.data.length+1;
 //   ctx.moveTo(10,10);
   // ctx.arc(10,10,5,0,2*Math.PI);
    var row_w=(w/(cfg.data.length+1));
    //画点
    for(i in cfg.data){
    var item=cfg.data[i];
    x=row_w*i+row_w;
// y=h*(1-item[1]);
       y=h-(item[1]*h*per);
    ctx.moveTo(x,y);
    ctx.arc(x,y,5,0,2*Math.PI);
    }

    //连线
    ctx.moveTo(row_w,h*1-cfg.data[0][1]*h*per);
    for (i in cfg.data){
        var item=cfg.data[i];
        x=row_w*i+row_w;
  // y=h*(1-item[1]);
       y=h-(item[1]*h*per);
        ctx.lineTo(x,y);
    }
   ctx.stroke();//收线
    ctx.lineWidth=1;

    // 绘制阴影
    ctx.lineTo(x,h);
        ctx.lineTo(row_w,h);
        ctx.lineTo(row_w,h);
        ctx.fillStyle="rgba(255,0,0,0.19)";
        ctx.fill();
    //写数据
    for (i in cfg.data){
        var item=cfg.data[i][0];
        x=row_w*i+row_w;
        y=h*(1-item[1]);
        ctx.fillStyle=item[2]?item[2]:'#555';
        ctx.fillText(((item[1]*100)>>0)+'%',x-10,y-10)
    }
    };
    ctx.stroke();
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