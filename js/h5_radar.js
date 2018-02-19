// 折线图
var h5_radar=function (cfg,name) {
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

    var r=w/2;
    var step=cfg.data.length;

//计算多变形定点坐标
    //已知:圆心坐标（a,b）、半径r;角度deg.
    //rad=(2*Math.PI/360)*(360/step)*i
    //x=a+Math.sin(rad)*r;
    //y=b+Math.cos(rad)*r;
//绘制网格背景
    var isBlue=false;
    for(var s=10;s>0;s--) {
        ctx.beginPath();
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r*(s/10);
            var y = r + Math.cos(rad) *r*(s/10);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle=(isBlue=!isBlue)?'#99c0ff':'#f1f9ff';
        ctx.fill();
    }
    //圆心
//ctx.arc(r,r,5,0,2*Math.PI);
//ctx.stroke();
//外层圆
//ctx.beginPath();
//ctx.arc(r,r,r,0,2*Math.PI);
//ctx.stroke();

    //绘制伞骨
    for(var i=0;i<step;i++){
        var rad=(2*Math.PI/360)*(360/step)*i;
        var x=r+Math.sin(rad)*r;
        var y=r+Math.cos(rad)*r;
        ctx.beginPath();
        // ctx.arc(x,y,5,0,2*Math.PI);
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        // ctx.stroke();
        //输出项目文字
        var text=$('<div class="text"></div>');
        text.text(cfg.data[i][0]);

        text.css('transition','all .5'+ i*.5+ 's');//设置每个text文本出现的时间
        console.log(text.css('transition','all .5'+ i*.5+ 's'));
        //text.css('left',x/2);
        //text.css('top',y/2);
        if(x>w/2){
            text.css('left',x/2)
        }else {
            text.css('right',(w-x)/2);
        }
        if(y>h/2){
            text.css('top',y/2+5);
        }else {
            text.css('bottom',(h-y)/2);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][0]);
        }
        text.css('opacity',0);
        component.append(text);
    }
    ctx.strokeStyle="#e0e0e0";
    ctx.stroke();
//数据层开发
    //加入一个画布
    var cns =document.createElement("canvas");
    var ctx=cns.getContext('2d');
    cns.width=cfg.width=w;
    cns.height=cfg.height=h;
    component.append(cns);
    ctx.fillStyle='#f00';

    var draw=function(per){

        if (per>=1){
            component.find('.text').css('opacity',1);
        }
        if(per<=1){
            component.find(".text").css('opacity',0);
        }

        //输出数据的折线
        ctx.clearRect(0,0,w,h);
    for (var i=0;i<step;i++){
            var rad=(2*Math.PI/360)*(360/step)*i;
            var rate=cfg.data[i][1]*per;
            var x=r+Math.sin(rad)*r*rate;
            var y=r+Math.cos(rad)*r*rate;
            ctx.lineTo(x,y);
    }
        ctx.closePath();
        ctx.stroke();
        //输出数据的点
        ctx.fillStyle='#ff7676';
        for (var i=0;i<step;i++){
            var rad=(2*Math.PI/360)*(360/step)*i;
            var rate=cfg.data[i][1]*per;
            var x=r+Math.sin(rad)*r*rate;
            var y=r+Math.cos(rad)*r*rate;
            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
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