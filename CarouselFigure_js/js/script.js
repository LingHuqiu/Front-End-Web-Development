// 封装一个代替getElementById的方法
function byId(id){
  return typeof(id)==="string"?document.getElementById(id):id;
}

//全局变量
var index =0,
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    size = pics.length,
    prev = byId("prev"),
    next = byId("next"),
    menuItems = byId("menu-content").getElementsByTagName("div"),
    subMenu = byId("sub-menu"),
    subItems = subMenu.getElementsByClassName("inner-box");


function onload(){
  var main = byId("main");
  var banner = byId("banner");
  var menuContent = byId("menu-content");

  //滑过清除定时器，离开继续
  main.onmouseover = function(){
    //滑过清除定时器
    stopAutoPlay();
  }
  main.onmouseout = function(){
    startAutoPlay();
  }
  //点击上一张、下一张按钮切换图片
  prev.onclick = function(){
    index--;
    if(index<0){
      index = size-1;
    }
    changeImg();
  }
  next.onclick = function(){
    index++;
    if(index>=size){
      index=0
    }
    changeImg();
  }
  //点击圆形按钮切换图片
  for(var i=0;i<size;i++){
    dots[i].id = i;
    dots[i].onclick = function(){
      index = this.id;
      changeImg();
    }
  }

  //菜单
  for(var m=0;m<menuItems.length;m++){
    menuItems[m].setAttribute("menuItems-index",m);
    menuItems[m].onmouseover = function(){
      // 去掉hidden的类名
      subMenu.className="sub-menu";
      var idx = this.getAttribute("menuItems-index");

      for(var j=0;j<subItems.length;j++){
        subItems[j].style.display = "none";
        menuItems[j].style.background = "none";
      }
      subItems[idx].style.display = "block";
      menuItems[idx].style.background = "rgba(0,0,0,0.1)";
    }

  }



  menuContent.onmouseout = function(){
    subMenu.className = "sub-menu hidden";
    for(var m=0;m<subItems.length;m++){
      if("block"==subItems[m].style.display){
        // console.log("index=",m);
        menuItems[m].style.background = "none";
      }
    }
  }

  subMenu.onmouseover = function(){
      this.className = "sub-menu";
      for(var m=0;m<subItems.length;m++){
        if("block"==subItems[m].style.display){
          // console.log("index=",m);
          menuItems[m].style.background = "rgba(0,0,0,0.1)";
        }
      }
  }
  subMenu.onmouseout = function(){
    this.className = "sub-menu hidden";
    for(var m=0;m<subItems.length;m++){
      if("block"==subItems[m].style.display){
        // console.log("index=",m);
        menuItems[m].style.background = "none";
      }
    }
  }
  main.onmouseout();
}

function startAutoPlay(){
  timer = setInterval(function(){
    index++;
    if(index>=size){
      index=0;
    }
    changeImg();
  },2000)
}

function stopAutoPlay(){
  if(timer){
    clearInterval(timer);
  }
}

function changeImg(){
  for(var i=0;i<size;i++){
    pics[i].classList.remove("slide-active");
    dots[i].className="";
  }
  pics[index].classList.add("slide-active");
  dots[index].className="active";
}

onload();
