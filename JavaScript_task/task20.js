/*
任务目的

    实践JavaScript数组、字符串相关操作

任务描述

    基于任务四进行升级
    将新元素输入框从input改为textarea
    允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，
    逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同
    内容的间隔
    增加一个查询文本输入框，和一个查询按钮，当点击查询时，将查询词在各个元
    素内容中做模糊匹配，将匹配到的内容进行特殊标识，如文字颜色等。举例，内
    容中有abcd，查询词为ab或bc，则该内容需要标识

*/
var numarr = [];//数组；
var ul = $("wrapQueue");//父容器
var input = $("input");
var searchArea = $("searchArea");
function $(id){ //封装获取ID的方法
	return document.getElementById(id);
}
function leftDel(ele){//接受容器节点(父节点)，删除父容器的第一个节点
	if(!ele.firstElementChild){
		alert("没有节点可以删除")
		return;
	}
	var num = ele.removeChild(ele.firstElementChild).innerHTML;
	alert("删除"+num);
}
function rightDel(ele){//接受容器节点(父节点)，删除父容器最后一个子节点
	if(!ele.firstElementChild){
		alert("没有节点可以删除")
		return;
	}
	var num = ele.removeChild(ele.lastChild).innerHTML;
	alert("删除"+num);
	
}
//返回两个数组中
function getSameItem(inputArr,searchArr){
	var arr = [];
	for(var i = 0;i<searchArr.length;i++){
		var re = new RegExp(searchArr[i],"i");
		for(var j = 0;j<inputArr.length;j++){
			if(re.test(inputArr[j])){
				arr.push(inputArr[j]);
			}
		}
	}
	return arr;
}
function getValue(inputEle){//获取传入元素里的value，限定文本类型和范围
			         //用正则匹配出所有分割符号。再用String的split(); 将文本分割成数组。输出数组。
	var str =inputEle.value;
	inputEle.value = null; //获取输入框里的值后，将其初始化；
	var re =  /[^a-zA-Z\d\u4e00-\u9fa5]+/g;
	var arr = str.replace(re," ").split(" ");
	return handle(arr);
}
function handle(arr){
	var newarr = [];
	for(var i = 0;i<arr.length;i++){
		if(arr[i]){
			newarr.push(arr[i]);
		}
	}
	return newarr;
}
function createEle(numarr){//传入整个数组，根据数组创建子元素，插入页面
	var fg = document.createDocumentFragment();//虚拟节点，当个容器用，插入页面的时候虚拟节点不存在dom树中。
	ul.innerHTML = "";
	for(var i = 0; i<numarr.length;i++){
		var li = document.createElement("li");
		li.innerHTML = numarr[i];
		fg.appendChild(li);
	}
	ul.appendChild(fg);

}	
//插入一组随机数
function eleIndex(ele){ //查看某元素在父元素中的位置，并返回该位置
	var count = 0,
	parent = ele.parentNode,
	len = parent.childNodes.length;
	for(var i = 0;i<len;i++){
		if(parent.childNodes[i] == ele){
			return count;
		}
		count ++;
	}
}
function changeColor(ele,arr){
	var len = ele.childNodes.length;
	for(var i = 0;i<len;i++){
		for(var j = 0;j<arr.length;j++){
			if(ele.childNodes[i].innerHTML == arr[j]){
				ele.childNodes[i].style.background = "orange";
			}
		}
	}
}
//添加事件！
	leftIn.onclick = function(){
		var arr = getValue(input);//获得原始去掉符号空格什么的数组
		numarr = arr.concat(numarr);
		createEle(numarr);
	}
	rightIn.onclick = function(){
		var arr = getValue(input);
		numarr = numarr.concat(arr);
		createEle(numarr);	
	}
	leftOut.onclick = function(){
		leftDel(ul);
		numarr.shift();
	}
	rightOut.onclick = function(){
		rightDel(ul);
		numarr.pop();
	} 
	search.onclick = function(){
		var arr = getValue(searchArea);//获取查询框的查询数组
		var sameArr = getSameItem(numarr,arr);//与输入框的数组相比，取匹配的项组成新数组。
		changeColor(ul,sameArr);
	}
	//事件代理，给父元素绑定事件。点击子哪个元素就删除子元素
	ul.addEventListener("click",function(event){
		if(event.target && event.target.nodeName.toUpperCase() == "LI"){
			numarr.splice(eleIndex(event.target),1);
			createEle(numarr);
		}	
	});
	input.onfocus = function(){
		input.value = "";
	}
	reset.onclick = function(){
		createEle(numarr);
	}
