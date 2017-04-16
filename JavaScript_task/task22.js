/*
任务描述

    参考示例图，在页面中展现一颗二叉树的结构
    提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
    二叉树的遍历算法和方式自定，前序中序后序皆可，但推荐可以提供多种算法的展示（增加多个按钮，每个按钮对应不同的算法）
    当前被遍历到的节点做一个特殊显示（比如不同的颜色）
    每隔一段时间（500ms，1s等时间自定）再遍历下一个节点


     首先 要有个数组。
     二叉树遍历的时候，把遍历的节点依次push进数组里面。
     按按钮的时候，按顺序操作数组里面的节点，为其改变背景颜色！

*/
var nodeList = [];
var roote = document.getElementById("roote");
var preBtn = document.getElementById("preorder");
var inBtn = document.getElementById("inorder");
var postBtn = document.getElementById("postoreder");
var set;
function preorder(node){
	if(!(node==null)){
		nodeList.push(node);
		preorder(node.firstElementChild);
		preorder(node.lastElementChild);
	}
}
function inorder(node){
	if(!(node==null)){
		inorder(node.firstElementChild);
		nodeList.push(node);
		inorder(node.lastElementChild);
	}
}
function postorder(node){
	if(node!==null){
		postorder(node.firstElementChild);
		postorder(node.lastElementChild);
		nodeList.push(node);
	}
}

function showNode(arr){
	var i = 0;
	set = setInterval(function(){
		if(i>arr.length-1){
			arr[i-1].style.background = "#F0F8FF";
			clearInterval(set);
		}
		else{
			if(i>0){
				arr[i-1].style.background = "#F0F8FF";
			}
			arr[i].style.background = "#1C86EE";
		}
		i++; 
	},500);
}
function btnClick (fn){
	nodeList = [];
	fn(roote);
	showNode(nodeList);
}
var preBtn = document.getElementById("preorder");
preBtn.onclick = function(){	
	btnClick(preorder);
}
inBtn.onclick = function(){
	btnClick(inorder);
}
postBtn.onclick = function(){
	btnClick(postorder);
}