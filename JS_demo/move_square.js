
/*
在输入框中允许输入如下指令，按下按钮后，使得正方形做相应动作

    GO：向蓝色边所面向的方向前进一格（一格等同于正方形的边长）
    TUN LEF：向左转（逆时针旋转90度）
    TUN RIG：向右转（顺时针旋转90度）
    TUN BAC：向后转（旋转180度）

移动不能超出格子空间
*/
/*
	一、旋转 改变transform
	二、向前移动 需要确定方向。
		值= 旋转的角度%90
		在top>0,且left<500 
			0或者null top -50px;
			1 left +50px
			2 top+50px
			3 left-50px;
*/
var direction = 0;
var lsq = document.getElementById("lsq");
var input = document.getElementById("input");

function  changeRotate(ele,deg){//传入元素 和 要该元素要旋转的度数
	if (!ele.style.transform) {
		ele.style.transform = "rotate(" + deg+"deg)";
		return (deg%360)/90;
	}
	else{
		var str = ele.style.transform
		var olddeg = str.match(/\-?\d/g).join("")/1;//匹配原来的角度数
		var newdeg = olddeg+deg;
		if (newdeg>360) {
			newdeg -=360;
		}
		ele.style.transform =  "rotate(" + newdeg+"deg)";
		return (newdeg%360)/90;
	}
}
function movelsq(ele,direction){
	var top = ele.style.top.match(/\d/g).join("")/1;
	var left = ele.style.left.match(/\d/g).join("")/1;	
	switch(direction){
		case 0 : //向上
			if (top==50) {
				top = 50;
			}
			else{
				top = top - 50;
			}
			break;
		case 1 : //向右
			if (left==500) {
				left = 500;
			}
			else{
				left = left + 50;
			}
			break;
		case 2 ://向下
			if (top==500) {
				top = 500;
			}
			else{
				top = top + 50;
			}
			break;
		case 3://向左
			if (left == 50) {
				left = 50;
			}
			else{
				left = left - 50;
			}
			break;
	}
	ele.style.top = ""+ top +"px";
	ele.style.left = "" + left + "px";
}
go.onclick = function(){
	var value = input.value;
	if (!value) {
		alert("请输入指令");
		return;
	}
	switch(value){
		case 'TUN LEF':
			direction = changeRotate(lsq,-90);
			break;
		case 'TUN RIG':
			direction = changeRotate(lsq,90);
			break;
		case 'TUN BAC':
			direction = changeRotate(lsq,180);
			break;
		case 'GO':
			movelsq(lsq,direction);
			break;
	}
}
tright.onclick = function(){
	direction = changeRotate(lsq,90);
}
tleft.onclick = function(){
	direction = changeRotate(lsq,270);
}
goahead.onclick = function(){
	movelsq(lsq,direction);
}
/*
	可以考虑用背景图、svg 、canvas等来实现格子图
*/