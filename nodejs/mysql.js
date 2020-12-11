var mysql = require('mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'order_db'
});

exports.queryStatusById = function queryStatusById(id){
    return new Promise(function (resolve, reject){
        pool.getConnection(function(err, conn){
            if (err) {
                reject(err);
            } else {
                var sql = 'select status from user_order_tbl where id = ?';
                var sqlParam = [id];
                conn.query(sql, function (err, results, fields) {
                    conn.release();
                    resolve({
                        "err": err,
                        "results": results,
                        "fields": fields
                    });
                });
            }
        });
    });
};

exports.updateStatusById = function updateStatusById(status, id){
    return new Promise(function (resolve, reject){
        pool.getConnection(function(err, conn){
            if (err) {
                reject(err);
            } else {
                var sql = 'update user_order_tbl set status = ? where id = ?';
                var sqlParams = [status, id];
                conn.query(sql, sqlParams, function (err, results, fields) {
                    conn.release();
                    resolve({
                        "err": err,
                        "results": results,
                        "fields": fields
                    });
                });
            }
        });
    });
}

exports.queryUserInfo = function queryUserInfo(userName){
    return new Promise(function (resolve, reject){
        pool.getConnection(function(err, conn){
           if (err) {
                reject(err);
            } else {
                var sql = 'select * from user_info_tbl where user_name = ?';
                var sqlParams = [userName];
                conn.query(sql, sqlParams, function (err, results, fields) {
                    conn.release();
                    resolve({
                        "err": err,
                        "results": results,
                        "fields": fields
                    });
                });
            }
        });
    });
}

exports.insertUserInfo = function insertUserInfo(userName, password){
    return new Promise(function (resolve, reject){
        pool.getConnection(function(err, conn){
           if (err) {
                reject(err);
            } else {
                var sql = 'insert into user_info_tbl (user_name, password) values (?, ?)';
                var sqlParams = [userName, password];
                conn.query(sql, sqlParams, function (err, results, fields) {
                    conn.release();
                    resolve({
                        "err": err,
                        "results": results,
                        "fields": fields
                    });
                });
            }
        });
    });
}
