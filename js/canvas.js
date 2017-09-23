/**
 *
 * @authors WangLi (1790676280@qq.com)
 * @date    2016-07-07 21:09:15
 * @version $Id$
 */
//========================全局变量=====================
  var g_tool="qianbi";//当前工具（默认铅笔）qianbi(铅笔)shuazi wenben cazi zhixian sanjiaoxing juxing yuan xuanze xuanzhuan suofang yidong
  //canvas设置
  var g_canvas_width=500;
  var g_canvas_height=400;
  var g_canvas_background_color="white";
  //线设置
  var g_line_width=1;
  var g_line_cap="butt";//butt(默认)  round square
  var g_line_join="miter";//round   bevel   miter(默认)
  var g_line_dash_length=4;//虚线长度
  var g_line_dash_gap=2;//虚线间距setLineDash([4,2]);lineDashOffset
  var g_line_dash_offset=0;//初始位移
  //颜色设置
  var g_color_stroke="#000000";
  var g_color_fill="#ffffff";
  var g_color_shadow="#888888";
  var g_globalAlpha=1;
  //阴影设置
  var g_shadow_offsetX=0;
  var g_shadow_offsetY=0;
  var g_shadow_blur=0;
  //字体设置
  var g_font_style="normal";//normal italic  oblique
  var g_font_variant="normal";//normal small-caps
  var g_font_weight="normal";//normal bold bolder lighter 100 ~ 900
  var g_font_size="24px";
  var g_font_family="serif";

  //获取画布
  var myCanvas=document.getElementById("canvas");
  var canvas_show=document.getElementById("canvas_show");
  var ctx1=canvas_show.getContext("2d");
  //========================初始化=======================

  //========================元素动作=====================
/*g_tool工具元素动作*/
var lis1=$(".toolGroup-1>li");
var lis2=$(".toolGroup-2>li");
var lis3=$(".toolGroup-3>li");
var lis4=$(".insert-shape>li");
var lis5=$(".insert-pic>li");
toolClick(lis1);
toolClick(lis2);
toolClick(lis3);
toolClick(lis4);
toolClick(lis5);

/*线型粗细*/
$(".line-width").change(function() {
  g_line_width=parseInt($(this).find("option:selected").text());
})
$(".line-example li").click(function() {
  g_line_width=$(this).attr("class").substring(4,5);
})

/*字体大小 样式设置 */
$(".font-size select").change(function() {
  g_font_size=parseInt($(this).find("option:selected").text());
})
$(".font-family select").change(function() {
  g_font_line_family=$(this).find("option:selected").text();
})

/*g_globalAlpha透明度改变*/
$( "#master" ).slider({
  range: "max",
  max:100,
  value:100,
  slide: function( event, ui ) {
    $( ".intro" ).text(ui.value+"%");
    g_globalAlpha=ui.value/100;
  }
});

/*g_color_stroke g_color_fill边框色 填充色改变*/
$('.borderColorEdit,.fillColorEdit').iColor(function(hx) {
  this.css('background', '#' + hx);
  g_color_stroke=$(".borderColorEdit").css("background-color");
  g_color_fill=$(".fillColorEdit").css("background-color");
});

/*工具选中状态*/
$('.tool ul li,.insert ul li').click(function() {
  $(this).parents(".main").find(".tool .active,.insert .active").removeClass("active");
  $(this).addClass("active").siblings().removeClass("active");
})

$('.line-style ul.line-example li').click(function() {
  $(this).addClass("active").siblings().removeClass("active");
})


function toolClick(toolName) {
  toolName.click(function () {
    g_tool = $(this).attr("data-name");
  })
}
$("#tool-select").change(function(){
  g_tool=$(this).val();
});
var j=0;
$("#input_file").change(function(){
  var fileList=document.getElementById("input_file").files;
  console.log($("#input_file").val());
  for(var i=0;i<fileList.length;i++){
    var img=new Image();
    var reader = new FileReader();
    reader.onload = function(evt){
      img.src = evt.target.result;
     // ctx1.drawImage(img,j*200,0,150,200);
      $("body").append('<img src="'+evt.target.result+'" width="150px" height="200px">');
      j++;
    }
    reader.readAsDataURL(fileList[i]);
  }
});
  //========================画布监听=====================
$("#canvas").mousedown(function(e){//鼠标在画布上按下
  //初始化
  var ctx=myCanvas.getContext("2d");
  ctx.lineWidth=g_line_width;
  ctx.lineCap=g_line_cap;
  ctx.lineJoin=g_line_join;
  ctx.strokeStyle=g_color_stroke;
  ctx.globalAlpha=g_globalAlpha;
  ctx.fillStyle=g_color_fill;
  ctx.shadowColor=g_color_shadow;
  ctx.shadowOffsetX=g_shadow_offsetX;
  ctx.shadowOffsetY=g_shadow_offsetY;
  ctx.shadowBlur=g_shadow_blur;
  ctx.font=g_font_style+" "+g_font_variant+" "+g_font_weight+" "+g_font_size+" "+g_font_family;

  //鼠标按下分类处理
  console.log(g_tool);
  switch (g_tool){
    case "qianbi"://铅笔
          ctx.beginPath();
          ctx.moveTo(e.offsetX, e.offsetY);
          break;
    case "shuazi"://刷子
        ctx.lineWidth=g_line_width+10;
        ctx.lineCap="round";
        ctx.lineJoin="round";
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
          break;
    case "wenben"://文本

      break;
    case "cazi"://擦子

      break;
    case "zhixian"://直线

      break;
    case "sanjiaoxing"://三角形

      break;
    case "juxing"://矩形

      break;
    case "yuan"://圆

      break;
    case "xuanze"://选择
      break;
    case "xuanzhuan"://旋转

      break;
    case "suofang"://缩放

      break;
    case "yidong"://移动

      break;
    default ://默认处理
          break;
  }
  $(document).on("mousemove","body",function(e1){//鼠标移动
     console.log("move");
    //主要功能区域
    switch (g_tool){
      case "qianbi"://铅笔
        ctx.lineTo(e1.offsetX, e1.offsetY);
        ctx.stroke();
        break;
      case "shuazi"://刷子
        ctx.lineTo(e1.offsetX, e1.offsetY);
        ctx.stroke();
        break;
      case "wenben"://文本

        break;
      case "cazi"://擦子
          ctx1.clearRect(e1.offsetX-10, e1.offsetY-10,25,25);
        break;
      case "zhixian"://直线
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        ctx.lineTo(e1.offsetX, e1.offsetY);
        ctx.stroke();

        break;
      case "sanjiaoxing"://三角形
        ctx.beginPath();
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
        ctx.moveTo(e.offsetX, e.offsetY);
        ctx.lineTo(e1.offsetX, e1.offsetY);
        ctx.lineTo(2*e.offsetX-e1.offsetX, e1.offsetY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.fill();
        break;
      case "juxing"://矩形
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
        ctx.strokeRect(e.offsetX, e.offsetY,e1.offsetX-e.offsetX, e1.offsetY-e.offsetY);
        ctx.fillRect(e.offsetX, e.offsetY,e1.offsetX-e.offsetX, e1.offsetY-e.offsetY);
        break;
      case "yuan"://圆
        ctx.save();
        var r1=Math.sqrt(Math.pow(e1.offsetY-e.offsetY,2));
        var r2=Math.sqrt(Math.pow(e1.offsetX-e.offsetX,2));
        ctx.scale(1,r1/r2);
        ctx.beginPath();
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
        ctx.arc(e.offsetX, e1.offsetY*r2/r1,r2,0,2*Math.PI);
       ctx.stroke();
          ctx.fill();

        ctx.restore();
        break;
      case "xuanze"://选择

        break;
      case "xuanzhuan"://旋转

        break;
      case "suofang"://缩放

        break;
      case "yidong"://移动

        break;
      default ://默认处理
        break;
    }
    });
  $(document).on("mouseup","body",function(e2){//鼠标弹起
    $(document).off("mousemove","body");
    $(document).off("mouseup","body");
    //鼠标弹起分类处理
    switch (g_tool){
      case "qianbi"://铅笔
        break;
      case "shuazi"://刷子
        break;
      case "wenben"://文本
        $("#input_text").focus();
        $("#input_text").keydown(function(){
          ctx.fillText($("#input_text").val(),e.offsetX, e.offsetY);
        });
        break;
      case "cazi"://擦子
        break;
      case "zhixian"://直线
        break;
      case "sanjiaoxing"://三角形
        break;
      case "juxing"://矩形
        break;
      case "yuan"://圆
        break;
      case "xuanze"://选择
          var xz_with= e2.offsetX-e.offsetX;
        var xz_height= e2.offsetY-e.offsetY;
        ctx.drawImage(canvas_show, e.offsetX, e.offsetY,xz_with,xz_height,e.offsetX,e.offsetY,xz_with,xz_height);
        ctx1.clearRect(0,0,myCanvas.width,myCanvas.height);
        break;
      case "xuanzhuan"://旋转
        break;
      case "suofang"://缩放
        break;
      case "yidong"://移动
        break;
      default ://默认处理
        break;
    }
  //处理弹起;将canvas图形绘制到canvas_show
    var img_cvs=document.getElementById("canvas");
      ctx1.drawImage(img_cvs,0,0,canvas_show.width,canvas_show.height);//canvas绘制不用onload
      ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
  });
  });

  //========================全局函数=====================




