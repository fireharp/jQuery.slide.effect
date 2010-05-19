(function($) {
    $.fn.slideEffect=function(Url,pageCount,settings){
         var settings = jQuery.extend({
          height:600
	  },settings);
          var centerAt;
          var x=0;
          var X;
          var drag=0;
          var dx=0;
          var dxold=0;
          var p0;
          var $l;
          var $c;
          var $r;
          var $paginator;
          var v=0;
          var pages=[];
          var data=[];
          var fn={
             resetPos:  function(offset){
                    $l.css('left',offset-width);
                    $c.css('left',offset);
                    $r.css('left',offset+width);
                },

             slideLeft: function (){
                centerAt+=1;
                if (centerAt>=pageCount)
                  centerAt-=pageCount;
                var rP=(centerAt+1);
                if (rP>=pageCount)
                  rP-=pageCount;
                var lP=(centerAt-1)
                if (lP<0)
                  lP+=parseInt(pageCount);
                $l.html($c.html());
                $c.html($r.html());
                 data['l']=lP;
                 data['c']=centerAt;
                 data['r']=rP;
                fn.getPage(pages,rP,pageCount);
          },

             slideRight: function(){
                centerAt-=1;
                if (centerAt<0)
                  centerAt+=pageCount;
                var lP=centerAt-1;
                if (lP<0)
                  lP+=pageCount;
                var rP=centerAt+1;
                if(rP>=pageCount)
                  rP-=pageCount;
                  $r.html($c.html());
                  $c.html($l.html());
                 data['l']=lP;
                 data['c']=centerAt;
                 data['r']=rP;
                 fn.getPage(pages,lP,pageCount);
              },

             getPage: function(Store,Page,Count){/* заполняем Target страницей Page, возможно из буфера Store  */
                var page=parseInt(Page);
                var target;
                if(data['l']==page)
                  target=$l;
                if(data['c']==page)
                  target=$c;
                if(data['r']==page)
                  target=$r;                
                if(page<0){
                  page-=-Count;
                }else if (page>=Count)
                  page-=parseInt(Count);
                if(!(page in Store)){
                  At=page;
                  target.html('Загрузка страницы...');
                  $.ajax({
                       url: Url,
                       data:{p:page},
                       dataType: "script",
                       success: function(data){
                         Store[page]=data;
                          if(data['l']==Page)
                            target=$l;
                          if(data['c']==Page)
                            target=$c;
                          if(data['r']==Page)
                            target=$r;
                         target.html(data);
                       }
                   });
                } else{
                target.html(Store[page]);
                }
              },

             mouseup: function (){
              if(drag==1){
                 drag=0;
                     dir=0;
                    if(v>3){
                          dir=1;
                    }else if(v<-3){
                          dir=-1;
                    }else{
                        if(dx>width*0.5){
                          dir=1;
                        }else if(dx<-width*0.5){
                          dir=-1;
                        }
                    }
                      p1=-parseInt($c.css('left'));                      
                      delta=p1+Number(dir*width);
                      fn.resetPos(-delta);
                      $l.stop().animate({"left":"+="+delta}, 400);
                      $c.stop().animate({"left":"+="+delta}, 400);
                      $r.stop().animate({"left":"+="+delta}, 400);
                      if(dir==1){
                        fn.slideRight();
                      }else if (dir==-1){
                        fn.slideLeft();
                      }
                      if(pageCount!=1){
                        dotline="";
                        for(i=0;i<centerAt;i++){
                          dotline+='.';
                        }
                        dotline+='<span style="color:#fff;font-size:34pt">.</span>';
                        for(i=centerAt+1;i<pageCount;i++){
                          dotline+='.';
                        }
                        $('#paginator').html(dotline);
                      }
                }
          }
          }
          this.each(function(){
              centerAt=0;
              pages=[];
              var $this =$(this);
              $this.addClass('ui-slide-effect');
              $this.append('<div id="ui-slider-left" class="page" unselectable="on"></div>');
              $this.append('<div id="ui-slider-center" class="page" unselectable="on"></div>');
              $this.append('<div id="ui-slider-right" class="page" unselectable="on"></div>');
              $this.append('<div id="ui-slider-paginator"unselectable="on"></div>');
              
              $l=$this.children('#ui-slider-left');
              $c=$this.children('#ui-slider-center');
              $r=$this.children('#ui-slider-right');
              $paginator=$this.children('#ui-slider-paginator');
              
              $this.css('height',parseInt( settings.height));
              $paginator.css('top',parseInt(settings.height-50));

              width= $this.width();
              $l.css('left',-width).css('width',width);
              $c.css('left',0).css('width',width);
              $r.css('left',width).css('width',width);

             data['l']=centerAt-1;
             data['c']=centerAt;
             data['r']=centerAt+1;
             
             fn.getPage(pages,centerAt,pageCount);
             fn.getPage(pages,centerAt-1,pageCount);
             fn.getPage(pages,centerAt+1,pageCount);

             if(pageCount!=1){
                 dotline="";
                for(i=0;i<centerAt;i++){
                  dotline+='.';
                }
                dotline+='<span>.</span>';
                for(i=centerAt+1;i<pageCount;i++){
                  dotline+='.';
                }
                $('#paginator').html(dotline);
             }
               $this.bind("mouseup",fn.mouseup);
               $this.bind("mouseleave",fn.mouseup);
               $this.bind("mousedown",function(e){
                  x=e.clientX;
                  $l.stop();
                  $c.stop();
                  $r.stop();
                  X=x;
                  dx=0;
                  dxold=dx;
                  drag=1;
                });
                $this.bind('mousemove',function(e){
                  x=e.clientX;
                  dxold=dx;
                  dx=x-X;
                  v=dx-dxold;
                  if(drag==1){
                    $l.css('left',dx-width);
                    $c.css('left',dx);
                    $r.css('left',dx+width);
                  }
                });
      } );

          return this;
    }
})(jQuery);
