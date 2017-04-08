/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 var aqiData = {};
 function $(ele){
 	return document.getElementById(ele);
 }
var btn = $("add-btn");
var cityName = $("aqi-city-input");
var airNum = $("aqi-value-input");
var table = $("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function addAqiData() {
 	/*获取两个输入框中的信息*/
 	var cityValue=cityName.value.trim();
 	var airValue = airNum.value.trim();
 /*	var ree = /^[a-zA-Z]+$/;  //匹配英文字母
 	var rez = /^[\u0391-\uFFE5]+$/; //匹配中文
 	*/
 	var ren = /\d/; //匹配数字
 	/*如果在cityValue中匹配到数字，则ture 否则false*/
 	if( ren.test(cityValue) || cityValue ==""){  //排除数字 只取字母或者中文 用到正则表达式
 		alert("城市名有问题");
 		return;
 	}
 	// 如果在airValue匹配到数字，则！true = false 否则 匹配不到则！false = true；
 	//这里有个bug 就是输入中文+数字 或者英文+数字的话 ren.test的值还是会是true；待解决
 	if(!ren.test(airValue) || airValue==""){
 		alert("空气质量填写错误");
 		return;
 	}
 	aqiData[cityValue] = airValue;
 }

/**
 * 渲染aqi-table表格
 */
 function renderAqiList() {
 	function addTr(){
 		//函数：想表格里面添加一行；
		var tr= document.createElement("tr");
		if(cityName.value !="" && airNum.value !=""){
		tr.innerHTML="<td>"+cityName.value+"</td>"+"<td>"+airNum.value+"</td>"+"<td><button class=\"del\" >删除</button></td>";
		table.appendChild(tr);
	}
	}
	if(!table.firstElementChild){ //因为空格也算文本元素 所以用firstChild的话 table里面是有元素的
		table.setAttribute("border",1);
		table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
		addTr();
	}
	else{addTr();}
 }

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
 function addBtnHandle() {
 	addAqiData();
 	renderAqiList();
 	var button = table.getElementsByTagName("button");
	for(var i = 0; i<button.length;i++){
	button[i].onclick = function(){
		delBtnHandle(this);}}
 	cityName.value = null;
	airNum.value = null;
 }

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
 function delBtnHandle(elem) {
  // do sth.
var farther = elem.parentNode.parentNode;
table.removeChild(farther);

}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
btn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 /*  本来是这样写的：
 	var button = table.getElementByTagName("button");
	for(var i = 0; i<button.length;i++){
	button[i].onclick = function(){
		delBtnHandle(this);}}
       但是table.getElementByTagName("button")读取不到任何元素;
       可能是在加载的时候，页面中table标签下还没有button这个标签。
       所以只能把onclick事件直接镶在<button>
       事件委托！！！！事件委托！！！
 	*/
}
init();

