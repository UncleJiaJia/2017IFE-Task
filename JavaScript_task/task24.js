var order = [];//数组存放树元素的子元素，顺序由遍历方法决定
var rootNode = document.getElementById("super");
var curNode; //鼠标点击的当前元素；

//深度优先遍历
function traverseDF(node){
	order = [];
	(function recurse(currentNode){
		order.push(currentNode);
		for(var i = 0,len = currentNode.children.length; i< len;i++){
			recurse(currentNode.children[i]);
		}
	})(node);
}
//广度优先搜索
function traverseBF(node){
	order = [];
	var arr = [];
	arr.push(node);
	var currentNode = arr.shift();
	while(currentNode){
		for(var i = 0,len = currentNode.children.length; i<len;i++){
			arr.push(currentNode.children[i]);
		}
		order.push(currentNode);
		currentNode = arr.shift();
	}
}
//获取搜索框中的值
function getValue(eleId){
	var value = "";
	value = document.getElementById(eleId).value;
	if (!value) {
		alert("你倒是输入值呀");
		return;
	}
	else{
		return value;
	}
}
//要遍历节点的话就传入"树"数组，如果想在树中搜索，则传入“树”数组和 值！
// 光遍历的时候，tag没用，不用看。 
//搜索的时候，初始化tag=fasle，当搜索的时候，tag=true，进入if（tag）条件，背景变色后又把tag设为false
//最后如果tag = true，最后一个元素的背景色为标记色！否则为白色；
//看不懂就看下面那个原始遍历函数。这个函数一步步加了条件，有点长了。
function showTrav(arr,value){
	var i = 0, tag = false,alertTag = false; //alertTag 是弹窗标记，如果搜索不到匹配的值，alertTag的值一值为false，最后弹窗提示。
	var set = setInterval(function(){
		if(i>arr.length-1){
			if(tag){
				arr[arr.length-1].style.background = "red";
			}else{
			arr[arr.length-1].style.background = "#fff";}
			clearInterval(set);
			//setInterval最终运行下面的if块。 如果存在搜索值value，并且alertTag为false（没有搜到），则显示弹窗；
			if(!alertTag && value){
				alert("没有在tree中找到要找的值！");
			}
		}
		else{
			if (i>0) {
				if(tag){
					arr[i-1].style.background = "red";
					tag = false;
				}
				else{
				arr[i-1].style.background = "#fff";
				}
			}
			//这个if  搜索到匹配的值，就改变tag
			if(arr[i].getAttribute("data") == value){
				tag = true;
				alertTag = true;
			}
			arr[i].style.background = "orange";
		}
		i++;
	},500);
}



//以下基于任务23添加
/*
点击某个节点元素，则该节点元素呈现一个特殊被选中的样式
增加一个删除按钮，当选中某个节点元素后，点击删除按钮，则将该节点及其所有子节点删除掉
增加一个输入框及一个“添加”按钮当选中某个节点元素后，点击增加按钮，则在该节点下增加
	一个子节点，节点内容为输入框中内容，插入在其子节点的最后一个位置
*/
function clearBC(arr){ //初始化tree背景颜色函数
	for(var i = 0;i<arr.length;i++){
		arr[i].style.background = "#fff";
	}
	
}

//——————————————————分割线
sbl.onclick = function(){
	traverseDF(rootNode);
	showTrav(order);
}
gbl.onclick = function(){
	traverseBF(rootNode);
	showTrav(order);
}
search1.onclick = function(){ //广度搜索
	traverseBF(rootNode);
	var value = getValue("input");
	if (value) {
		showTrav(order,value);
	}
}
search2.onclick = function(){
	traverseDF(rootNode);
	var value = getValue("input");
	if(value){
		showTrav(order,value);
	}
}
//以下为新添加事件————————————
//给tree添加事件监听
rootNode.addEventListener("click",function(event){
	if (event.target) {
		//在给被点击的元素变换背景颜色的时候，初始化所有的元素的背景颜色
		clearBC(order); //order里存放的是树里所有的子元素。
		event.target.style.background = "red";
		curNode = event.target;//当前元素为event.target;
	}
});
//删除节点
del.addEventListener("click",function(){
	if(curNode){//如果按了某个节点，则执行下面代码
		var parent = curNode.parentNode;
		parent.removeChild(curNode);
		curNode = "";//删除后讲当前节点标记为空
	}
});
//增加节点
add.addEventListener("click",function(){
	var value = getValue("addValue");
	if(curNode && value){//如果存在被点击的节点，就执行以下操作
		var ele = document.createElement("div");
		ele.innerHTML = value;
		ele.setAttribute("data",value);
		ele.setAttribute("id",value);
		curNode.appendChild(ele);
		traverseDF(rootNode); //添加节点后，更行order数组
	}
});
//重置背景颜色按钮
re.addEventListener("click",function(){
	clearBC(order);
	curNode = "";
});
input.onfocus = function(){this.value = "";}
addValue.onfocus = function(){this.value = "";}



//加载完毕就初始化order数组，使数组不为空，数组内存放着树的各个节点
window.onload = traverseDF(rootNode);//用两个遍历方法之一初始化。
