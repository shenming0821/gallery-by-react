!function(e,t){"use strict";var i={};!function(){var n=t.querySelector('meta[name="viewport"]'),a=t.querySelector('meta[name="hotcss"]'),r=e.devicePixelRatio||1,d=640;if(r=r>=3?3:r>=2?2:1,a){var c=a.getAttribute("content");if(c){var m=c.match(/initial\-dpr=([\d\.]+)/);m&&(r=parseFloat(m[1]));var s=c.match(/design\-width=([\d\.]+)/);s&&(d=parseFloat(s[1]))}}t.documentElement.setAttribute("data-dpr",r),i.dpr=r,d&&(t.documentElement.setAttribute("design-width",d),i.designWidth=d);var o=1/r,u="width=device-width, initial-scale=1, user-scalable=no";n?n.setAttribute("content",u):(n=t.createElement("meta"),n.setAttribute("name","viewport"),n.setAttribute("content",u),t.head.appendChild(n))}(),i.mresize=function(){var n=t.documentElement.getBoundingClientRect().width||e.innerWidth;return n?(t.documentElement.style.fontSize=20*n/320+"px",void(i.callback&&i.callback())):!1},i.mresize(),e.addEventListener("resize",function(){clearTimeout(i.tid),i.tid=setTimeout(i.mresize,33)},!1),e.addEventListener("load",i.mresize,!1),setTimeout(function(){i.mresize()},333),e.hotcss=i}(window,document);