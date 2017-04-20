/*
要求:

    表单获得焦点时，下方显示表单填写规则 
    表单失去焦点时校验表单内容
    校验结果正确时，表单边框显示绿色，并在下方显示验证通过的描述文字
    校验结果错误时，表单边框显示红色，并在下方显示验证错误的描述文字
    点击提交按钮时，对页面中所有输入进行校验，校验结果显示方式同上。若所有表单校验通过，弹窗显示“提交成功”，否则显示“提交失败”

*/
function $(id){
	return document.getElementById(id);
}
var input = $("input");
var psw = $("psw");
var rpsw = $("rpsw");
var mail = $("mail");
var pnum = $("pnum");
function checkName(str){
	var re2 = /[a-zA-Z\u4e00-\u9fa5]{4,}/;
	var re =  /[a-zA-Z\u4e00-\u9fa5]{17,}/;
	if (!str) {
		return 0;
	}
	if (!re2.test(str) || re.test(str)) {
		return 2;
	}
	return 1;
}
function checkpsw(str){
	var re = /[a-zA-Z\d]{6,}/;
	if (!str) {
		return 3;//密码不为空
	}
	if(!re.test(str)){
		return 4; //密码应为英文或者数字且长度大于等于6位；
	}
	return 5; //密码格式正确
}
function checkRpsw(str){
	var psw = document.getElementById("psw");
	if(psw.value == ""){
		return 3;
	}
	if(str != psw.value){
		return 10;
	}
	return 5;
}
function checkMail(str){
	var re = /@.*\.com$/g;
	if(re.test(str)){
		return 6; //正确的邮箱格式
	}
	return 7; //请输入正确的邮箱格式
}
function checkTelNum(str){
	var re = /^1(3|4|5|7|8)\d{9}$/g;
	if (re.test(str)) {
		return 8; //正确的手机号码；
	}
	return 9; //请输入正确的手机号码；
}
function changeBT(ele,num){
	var next = ele.nextElementSibling;
	next.style.display = "block";
	switch(num){
		case 0:
			next.innerHTML = "姓名不能为空";
			ele.style.borderColor = "red";
			break;
		case 1:
			next.innerHTML = "名称格式正确";
			ele.style.borderColor = "green";
			break;
		case 2 :
			next.innerHTML = "长度应为4-16个字符";
			ele.style.borderColor = "red";
			break;
		case 3 :
			next.innerHTML = "密码不为空";
			ele.style.borderColor = "red";
			break;
		case 4 :
			next.innerHTML = "密码应为英文或者数字且长度大于等于6位";
			ele.style.borderColor = "red";
			break;
		case 5 :
			next.innerHTML = "密码格式正确";
			ele.style.borderColor = "green";
			break;
		case 6 :
			next.innerHTML = "正确的邮箱格式";
			ele.style.borderColor = "green";
			break;
		case 7 : 
			next.innerHTML = "请输入正确的邮箱格式";
			ele.style.borderColor = "red";
			break;
		case 8 :
			next.innerHTML ="正确的手机号码";
			ele.style.borderColor = "green";
			break;
		case 9 :
			next.innerHTML = "请输入正确的手机号码";
			ele.style.borderColor = "red";
			break;
		case 10 :
			next.innerHTML = "两次密码不一致";
			ele.style.borderColor = "red";
			break;
	}
}
function checkTF(form){
	var len = form.length;
	for(var i = 0;i<len;i++){
		if(form.elements[i].style.borderColor == "red"){
			alert("填写错误！");
			return;
		}
	}
	alert("填写格式正确！");
}
function handleL(ele,fn,num){
	var value = ele.value;
	var num = fn(value);
	changeBT(ele,num);
}
input.addEventListener("blur",function(){
	//获取框内值
	/*var value = event.target.value;
	//检查框内值，返回 检查结果
	var num = checknum(value);
	//根据检查的结果 匹配结果集中的？？
	changeBT(event.target,num);*/
	handleL(event.target,checkName);
});
psw.addEventListener("blur",function(){
	/*var value = event.target.value;
	var num = checkpwd(value);
	changeBT(event.target,num);*/
	handleL(event.target,checkpsw);
});
rpsw.addEventListener("blur",function(){
	/*var value = event.target.value;
	var num = checkRpsw(value);
	changeBT(event.target,num);*/
	handleL(event.target,checkRpsw);
});
mail.addEventListener("blur",function(){
	/*var value = event.target.value;
	var num = checkMail(value);
	changeBT(event.target,num);*/
	handleL(event.target,checkMail);
});
pnum.addEventListener("blur",function(){
	/*var value = event.target.value;
	var num = checkTelNum(value);
	changeBT(event.target,num);*/
	handleL(event.target,checkTelNum);
});
submit.addEventListener("click",function(){
	handleL(input,checkName);
	handleL(psw,checkpsw);
	handleL(rpsw,checkRpsw);
	handleL(mail,checkMail);
	handleL(pnum,checkTelNum);
	checkTF(submit.form);//检查框里的值有没有错误的 true & false;
});