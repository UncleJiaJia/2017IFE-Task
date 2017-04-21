/*
在页面中完成两个单选框，切换单选框的不同选项时下方显示的表单随之切换。
当选择在校生时，出现两个select下拉菜单，一个选择城市，一个选择学校，当选择非在校生时，出一个文本输入框
学校下拉菜单里的学校名单均为城市下拉菜单中所选的城市中的大学，当城市发生变化时，学校一起发生变化
城市及学校的数据随意编造即可，无需真实完整
*/
/*
	一、如果第一个按钮被选中，则显示选择框
	        如果第二个按钮被选中，则显示输入框
	二、当第一个下拉菜单中的内容被选中时，第二个下拉菜单的内容改变
*/
function $(id){
	return document.getElementById(id);
}
var city_school = {
	广州 : ["中山大学","广东金融学院","暨南大学","华南农业大学"],
	上海 : ["复旦大学","上海交通大学","同济大学","华东理工大学"],
	北京 : ["北京大学","清华大学","中国人民大学","中国师范大学"]
}
var inSchool = $("inSchool");
var outSchool = $("outSchool");
var wrap1 = $("wrap1");
var wrap2 = $("wrap2");
var city = $("city");
var school = $("school");
function check (){
	if (inSchool.checked) {
		wrap1.style.display = "block";
	}
}
function removeSelectBox(ele){
	for(var i = 0,len = ele.options.length;i<len;i++){
		ele.remove(0);
	}
}
function addOptionArr(ele,value){
	var len = city_school[value].length;
	var newOption;
	for(var i = 0;i<len;i++){
		newOption = document.createElement("option");
		newOption.setAttribute("value",city_school[value][i]);
		newOption.innerHTML = city_school[value][i];
		ele.appendChild(newOption);
	}
}
inSchool.onclick = function(){
	wrap2.style.display = "none";
	wrap1.style.display = "block";
}
outSchool.onclick = function(){
	wrap1.style.display = "none"
	wrap2.style.display = "block";
}
city.addEventListener("change",function(event){
		removeSelectBox(school);
		addOptionArr(school,event.target.value);
});
window.onload = function(){
	check();
}
