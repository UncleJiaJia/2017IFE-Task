/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 /*
	what i learn:
		A: 遍历字面量对象 
			for（xx in 对象）{}
			删除对象属性
			delete 对象[key];
		B：正则匹配的两个方式
			1. var zz = /\d/;
			     var string = "213456";
			     zz.test(string);
			2. var string = "32156";
			     string.match(/\d/);
		C：判断对象是否为空对象
			JSON.stringify(aqiData) == "{}"；  true
		D：事件委托！ 冒泡
		E：dataset！
 */
 var aqiData = {};
 function $(ele){
 	return document.getElementById(ele);
 }
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function addAqiData() {
 	var cityValue = $("aqi-city-input").value.trim();
 	var airValue = $("aqi-value-input").value.trim();
 	if(cityValue.match(/\d/)){
 		alert("城市名必须是中文或者英文！");
 		return;
 	}
 	if(!airValue.match(/^\d+$/)){
 		alert("空气质量必须是整数！");
 		return;
 	}
 	aqiData[cityValue] = airValue;
 }

/**
 * 渲染aqi-table表格
 */
 function renderAqiList() {
 	var table = $("aqi-table");
 	var contant = "";
 	table.innerHTML = null;
 	if(JSON.stringify(aqiData) != "{}"){
 		contant = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
 	}
 	table.setAttribute("border",1);
 	for(cityValue in aqiData){
 		contant += "<tr><td>"+cityValue+"</td>"+"<td>"+aqiData[cityValue]+"</td>"+"<td><button myattr="+cityValue+" >删除</button></td></tr>";
 	}
 	table.innerHTML = contant;
 }

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
 function addBtnHandle() {
 	addAqiData();
 	renderAqiList();
 }

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
 function delBtnHandle(cityValue) {
  // do sth.
  delete aqiData[cityValue];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  btn =  $("add-btn");
  btn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table =$("aqi-table");
  table.addEventListener("click",function(event){
  	if (event.target.nodeName="button") {
  		var attr = event.target.getAttribute("myattr");
  		delBtnHandle(attr);
  	}
  });
}

init();

