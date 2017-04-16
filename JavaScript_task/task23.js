var order = [];
var value = "";
var rootNode = document.getElementById("super");
//深度优先遍历
function traverseDF(node){
	order = [];
	(function recurse(currentNode){
		for(var i = 0,len = currentNode.children.length; i< len;i++){
			recurse(currentNode.children[i]);
		}
		order.push(currentNode);
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
	value = "";
	value = document.getElementById(eleId).value;
	if (!value) {
		alert("你倒是输入东西啊");
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
			arr[i].style.background = "#aaa";
		}
		i++;
	},250);
}
/*
原始showTrav 函数
function showTrav(arr){
	var i = 0;
	var set = setInterval(function(){
		if(i>arr.length-1){
			arr[arr.length-1].style.background = "#fff";
			clearInterval(set);
		}
		else{
			if(i>0){
				arr[i-1].style.background = "#fff";
			}
			arr[i].style.background = "#aaa";
		}
	},300);
	
}
*/
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
	getValue("input");
	if (value) {
		showTrav(order,value);
	}
}
search2.onclick = function(){
	traverseDF(rootNode);
	getValue("input");
	if(value){
		showTrav(order,value);
	}
}