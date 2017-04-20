/*
校验规则：

    1.字符数为4~16位
    2.每个英文字母、数字、英文符号长度为1
    3.每个汉字，中文符号长度为2
编码思路：
	按钮的时候触发事件。
	1：获取输入框的值
	2：检查值
		输入值不为空
		字符长度应在4-16个字符间
		输入为空返回0
		字符长度不符合返回2 
		满足条件返回1
	3：根据返回值处理改变边框颜色和提示
*/
var ts = document.getElementById("ts");
var input = document.getElementById("input");
var check = document.getElementById("check");
//获取元素的value
function getValue(eleid){
	var e = document.getElementById(eleid);
	if (e.value) {
	
		return e.value;
	}
}
function checknum(str){
	/*
	如果str为空，返回0
	如果字符数为4-16
		分割字符串成数组，循环数组，判断数组里每个值的长度
		如果值的类型是英文字母、数字、英文符号，但是长度不是1，则返回1
		如果值的类型是汉字，但是长度
	*/
	var re2 = /[a-zA-Z\u4e00-\u9fa5]{4,}/;
	var re =  /[a-zA-Z\u4e00-\u9fa5]{17,}/;
	if (str == null) {
		return 0;
	}
	if (!re2.test(str) || re.test(str)) {
		return 2;
	}
	return 1;


}
function changeBT(num){
	switch(num){
		case 0:
			ts.innerHTML = "姓名不能为空";
			input.style.borderColor = "red";
			break;
		case 1:
			ts.innerHTML = "名称格式正确";
			input.style.borderColor = "green";
			break;
		case 2 :
			ts.innerHTML = "长度应为4-16个字符";
			input.style.borderColor = "red";
			break;
	}
}
check.addEventListener("click",function(){
	var value = getValue("input");
	var rbNum = checknum(value);
	changeBT(rbNum);
});