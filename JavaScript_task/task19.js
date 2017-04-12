var numarr = [];//数组；
var ul = $("wrapQueue");//父容器
function $(id){ //封装获取ID的方法
	return document.getElementById(id);
}
function leftDel(ele){//接受容器节点(父节点)，删除父容器的第一个节点
	if(!ele.firstElementChild){
		alert("没有节点可以删除")
		return;
	}
	var num = ele.removeChild(ele.firstElementChild).title;
	alert("删除"+num);
}
function rightDel(ele){//接受容器节点(父节点)，删除父容器最后一个子节点
	if(!ele.firstElementChild){
		alert("没有节点可以删除")
		return;
	}
	var num = ele.removeChild(ele.lastChild).title;
	alert("删除"+num);
	
}

function getInputValue(){//获取input里的value，限定文本类型和范围
	var num =$("input").value;
	$("input").value = null; //获取输入框里的值后，将其初始化；
	if(!num.match(/^(\d)*$/)){
		alert("请输入数字!");
		return false;
	}
	if(num<10 ||  num>100){
		alert("请输入10-100内的整数");
		return false;
	}
	return Number(num);
}
function createEle(numarr){//传入整个数组，根据数组创建子元素，插入页面
	var ul = $("wrapQueue");
	var fg = document.createDocumentFragment();//虚拟节点，当个容器用，插入页面的时候虚拟节点不存在dom树中。
	ul.innerHTML = "";
	for(var i = 0; i<numarr.length;i++){
		var li = document.createElement("li");
		li.setAttribute("title",numarr[i]);
		li.style.height = numarr[i]+ "%";
	//	li.innerHTML = numarr[i];
		fg.appendChild(li);
	}
	ul.appendChild(fg);

}

function insertion(arr){ //插入算法，这个写的不是很好，不能一步步吧可视化过程展现出来。setInsertval 参考红宝书204页
			// 有延迟。延迟
	var len = arr.length;
	var i = 0;
	var intervalId = null;
	function show(){
		if(i>len){
			clearInterval(intervalId);
		}
		var j=i;
		var aa = null;
		function showIn(){
			if(j<0){
				clearInterval(aa);
			}
			if(arr[j-1]>arr[j]){
				var temp = arr[j];
				arr[j] = arr[j-1];
				arr[j-1] = temp;	
				createEle(arr);
			}
			j--;
		}
		aa = setInterval(showIn,20);
		i++;
	}
	intervalId = setInterval(show,500);
}
	
//插入一组随机数
function insertArr(){
	for(var i = 0;i<60;i++){
		numarr[i] = Math.floor(Math.random()*90+10);
	}
	createEle(numarr);
}
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
//添加事件！
	leftIn.onclick = function(){
		var num = getInputValue();
		if(num){
			if(numarr.length>=60){
				alert("太多了，不要进来了兄弟！");
				return;
			}
			numarr.unshift(num);
		}
		createEle(numarr);	
	}
	rightIn.onclick = function(){
		var num = getInputValue();
		if(num){
			if(numarr.length>=60){
				alert("太多了，不要进来了兄弟！");
				return;
			}
			numarr.push(num);	
		}
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
	//事件代理，给父元素绑定事件。点击子哪个元素就删除子元素
	ul.addEventListener("click",function(event){
		if(event.target && event.target.nodeName.toUpperCase() == "LI"){
			numarr.splice(eleIndex(event.target),1);
			createEle(numarr);
		}	
	});
	mysort.onclick = function(){
		insertion(numarr);
	}
	insertAr.onclick = function(){
		insertArr();
	}
	input.onfocus = function(){
		input.value = "";
	}
