/**
 * Created by asus on 2017/8/9.
 */
var h5_loading=function(images,firstpage){
  var id=this.id;
  if(this._images===undefined){
this._images=(images||[]).length;
this._loaded=0;
window[id]=this;
     for(s in images){
         var item =images[s];
         var img=new Image;
         img.onload=function(){
             window[id].loader();
         };
         img.src=item;
     }
     $("#rate").text('0%');
      return this;
  }else{
      this._loaded++;
      $('#rate').text(((this._loaded/this._images*100)>>0)+'%');
      if(this._loaded<this._images){
          return this;
      }
    }
window[id]=null;

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