function queryOrderStatus()
{
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
            document.getElementById("myDiv").innerHTML='订单状态：'+xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", "http://127.0.0.1:9999/order/query", true);
    var orderId = document.getElementById("orderId").value;
    xmlhttp.send('orderId='+orderId);
}

function modifyOrderStatus()
{
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
    xmlhttp.open("POST", "http://127.0.0.1:9999/order/modify", true);
    var orderId = document.getElementById("orderId").value;
    console.log(orderId);
    var obj = document.getElementsByName("orderStatus");
    var orderStatus;
    for(var i=0; i<obj.length; i++) {
        if(obj[i].checked) {
            orderStatus = obj[i].value;
        }
    }
    console.log(orderStatus);
    xmlhttp.send('orderId='+orderId+'&orderStatus='+orderStatus);
}
