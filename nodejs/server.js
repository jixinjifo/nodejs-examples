var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mysql = require('./mysql');

http.createServer(function (req, resp) {
    console.log(req.headers);
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    switch(pathname) {
        case '/order/query':
            resp.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
            req.on('end', function(){
                body = querystring.parse(body);
                console.log('body:', body);
                if (body.orderId=="") {
                   resp.end("请输入订单号");
                }
                id = Number(body.orderId);
                console.log('id:', id);
                mysql.queryStatusById(id).then(function(res){
                    var results = res.results;
                    if (results.length==0) {
                        resp.end("对不起，没有查到此订单号");
                    } else {
                        status = results[0].status;
                        console.log('status:', status);
                        resp.end(status);
                    }
                }).catch(function(err){
                    console.log(err);
                });
            });
            break;
        case '/order/modify':
            resp.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
            req.on('end', function(){
                body = querystring.parse(body);
                console.log('body:', body);
                if (body.orderId=="") {
                   resp.end("请输入订单号");
                }
                id = Number(body.orderId);
                status = body.orderStatus;
                console.log('id:', id);
                console.log('status:', status);
                mysql.queryStatusById(id).then(function(res){
                    var results = res.results;
                    if (results.length==0) {
                        resp.end("对不起，没有查到此订单号");
                    }
                }).then(mysql.updateStatusById(status, id)).then(function(res){
                    resp.end("修改成功");
                }).catch(function(err){
                    console.log(err);
                    resp.end("修改失败");
                });
            });
            break;
        case '/login':
            resp.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
            req.on('end', function(){
                body = querystring.parse(body);
                console.log('body:', body);
                if (body.userName=="") {
                    resp.end("请输入用户名");
                    return;
                }
                if (body.password=="") {
                    resp.end("请输入密码");
                    return;
                }
                userName = body.userName;
                password = body.password;
                console.log('userName:', userName);
                console.log('password:', password);
                mysql.queryUserInfo(userName).then(function(res){
                    var results = res.results;
                    console.log(results);
                    if (results.length==0) {
                        resp.end("请输入正确的用户名和密码");
                    } else {
                        if (results[0].password==password) {
                            resp.end("登录成功");
                        } else {
                            resp.end("请输入正确的用户名和密码");
                        }
                    }
                }).catch(function(err){
                    console.log(err);
                    resp.end("请稍后再试");
                });
            });
            break;
        case '/register':
            resp.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
            req.on('end', function(){
                body = querystring.parse(body);
                console.log('body:', body);
                if (body.userName=="") {
                    resp.end("请输入用户名");
                    return;
                }
                if (body.password=="") {
                    resp.end("请输入密码");
                    return;
                }
                userName = body.userName;
                password = body.password;
                console.log('userName:', userName);
                console.log('password:', password);
                mysql.queryUserInfo(userName).then(function(res){
                    var results = res.results;
                    console.log(results);
                    if (results.length!=0) {
                        resp.end("用户名已存在，请直接登录");
                        return new Promise(function(){});
                    }
                }).then(function(res){
                    console.log(res);
                    mysql.insertUserInfo(userName, password)
                }).then(function(res){
                    resp.end("注册成功");
                }).catch(function(err){
                    console.log(err);
                    resp.end("请稍后再试");
                });
            });
            break;
        default:
            console.log('not supported route');
            resp.writeHead(404,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
            resp.end('404 page not found');
    }

}).listen(9999);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:9999/');