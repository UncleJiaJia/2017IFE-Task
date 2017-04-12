function $(id){
	return document.getElementById(id);
}
/*
* 几个按钮可以有几个方法。
* 左插入 右插入  左删除 右删除 
* 删除任意元素方法
* 获取输入框里的值 值只能是数字,并创建节点的方法。
* 
*/
function leftDel(ele){//接受容器节点(父节点)
	if(!ele.firstElementChild){
		alert("没有节点可以删除")
		return;
	}
	var num = ele.removeChild(ele.firstElementChild).innerHTML;
	alert("删除"+num);
}
function rightDel(ele){//接受容器节点(父节点)
	if(!ele.firstElementChild){
		alert("没有节点可以删除")
		return;
	}
	var num = ele.removeChild(ele.lastChild).innerHTML
	alert("删除"+num);
	
}
function leftInsert(parentEle,newEle){//接受父节点，新子节点;
	if(! newEle){return;}
	parentEle.insertBefore(newEle,parentEle.childNodes[0]);
	
}
function rightInsert(parentEle,newEle){//接受父节点，新子节点;
	if(! newEle){return;}
	parentEle.appendChild(newEle);
}
function getInputValue(){//获取input里的value，限定文本类型
	var num = $("input").value;
	$("input").value = null; //获取输入框里的值后，将其初始化；
	if(!num.match(/^(\d)*$/)){
		alert("请输入数字!");
		return;
	}
	return num;
}
function createEle(num){//得到参数num，并将nm作为新节点的内容，创建新节点
	if(!num){return;}
	var li = document.createElement("li");
	li.style.height = num+ "%";
	li.innerHTML = num;
	return li;
}

function addEvent(){
	var ul = $("wrapQueue");
	/*
	   为什么省略这一句 var leftIn = $("leftIn"); 没有获取leftIn元素. 
	   leftIn.onclick也起作用！
	   如果把leftIn 改成其他 名字，就不行了

	   是不是只有leftIn 和相对应的 id名相匹配，省去获取元素这个步骤也可以为该元素添加事件？

	   好像是这样。但是如果 ID名字中间加了‘-’就不行了，比如 left-in；
	   待定！
	*/
	//为左插入绑定函数；
	//var leftIn = $("leftIn");
	leftIn.onclick = function(){
		var num = getInputValue();
		var ele = createEle(num);
		leftInsert(ul,ele);
	}
	//为右插入绑定事件
	//var rightIn = $("rightIn");
	rightIn.onclick = function(){
		var num = getInputValue();
		var ele = createEle(num);
		rightInsert(ul,ele);
	}
	//为左侧出绑定事件
	//var leftOut = $("leftOut");
	leftOut.onclick = function(){
		 leftDel(ul);	
	}
	//为右侧出绑定事件
	rightOut.onclick = function(){
		rightDel(ul);
	} 
	//用事件委托，为 ul 下的所有 li 元素绑定事件
	ul.addEventListener("click",function(event){
		if(event.target && event.target.nodeName.toUpperCase() == "LI"){
			ul.removeChild(event.target);
		}	
	});
	// 为input绑定事件
	//var input = $("input");
	input.onfocus = function(){
		input.value = "";
	}
}
addEvent();