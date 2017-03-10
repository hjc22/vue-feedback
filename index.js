
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.install = factory());
}(this, (function () { 'use strict';

var locked=false,timer=null;
var vueTouchFeedback = function (Vue) {

        var touchFeedback={
            bind(el,binding){
               var value=binding.value;
               on(el,'touchstart',handleStart.bind(null,el,value))
               on(el,'touchmove',handleEnd.bind(null,el,value))
               on(el,'touchend',handleEnd.bind(null,el,value))
               on(el,'touchcancel',handleEnd.bind(null,el,value))
            },
            unbind(el,binding){
               var value=binding.value;
               off(el,'touchstart',handleStart.bind(null,el,value))
               off(el,'touchmove',handleEnd.bind(null,el,value))
               off(el,'touchend',handleEnd.bind(null,el,value))
               off(el,'touchcancel',handleEnd.bind(null,el,value))
               if(isButton(el)){
                   setStyle(el,{
                      'webkitTransition':"opacity 0",
                      'transition':'opacity 0',
                   })
               }
            }
        }
        Vue.directive('fb',touchFeedback);
};

return vueTouchFeedback;

function on(el,eventName,fn){
    el.addEventListener(eventName,fn,false);
}
function off(el,eventName,fn){
    el.removeEventListener(eventName,fn,false);
}

function handleStart(el,cls){
    clearTimeout(timer);
    timer=setTimeout(function(){
        locked=true;
        if(cls) return addClass(el,cls.cls);
        if(isButton(el)){
            setStyle(el,{
                'webkitTransition':"opacity 0.2s",
                'transition':'opacity 0.2s',
                 opacity:'0.3'
            })
        }
        else{
          setStyle(el,{
              opacity:'0.3'
          });
        }
    },50)


}
function handleEnd(el,cls){
      clearTimeout(timer);
      if(!locked) return;
      locked=false;
      if(cls) return removeClass(el,cls.cls);
      setStyle(el,{
         opacity:'1'
      })
}

function setStyle(el,data){
    if(!data && !el) return;
    for(var i in data){
        el.style[i]=data[i];
    }
}

function isButton(el){
   if(!el) return;
   return el.nodeName.toLowerCase() == 'button';
}

function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = curClass.trim();
  }
};



})));
