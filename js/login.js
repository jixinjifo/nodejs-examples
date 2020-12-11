function login(){
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", "http://127.0.0.1:9999/login", true);
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    console.log('userName:', userName);
    console.log('password:', password);
    xmlhttp.send('userName='+userName+'&password='+password);
}

function show_pwd(){
    var pwd  = document.getElementById("password");
    if(pwd.type == "password"){
        pwd.type = "text";  // 改变input的属即可实现
    }else {
        pwd.type = "password";
    }
}