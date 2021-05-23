
var express = require('express');   //引入express模块
var mysql = require('mysql');     //引入mysql模块
var app = express();        //创建express的实例
var bodyParser = require('body-parser');
 
app.use(bodyParser.json({tyle:'application/json'}))
app.use(bodyParser.urlencoded({extended:true}))

var connection = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'123456',
  database:'Dehaze'
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});

connection.connect(function(error){
  if(error) console.log(error);
  else console.log('connected to Database');
})

app.get('/user',function (req,res) {
  connection.query('select * from User', function(error, rows){
    if(error) console.log(error)
    
    else {
      
      console.log(rows)
      res.send(rows);  //服务器响应请求
    }
  });
  
});

// var connection = mysql.createConnection({      //创建mysql实例
//   host:'localhost',
//   port:'3306',
//   user:'root',
//   password:'yy19990810',
//   database:'Dehaze'
// });
// connection.connect();
// var sql = 'SELECT * FROM Admin';
// var str = " ";


// connection.query(sql, function (err,result) {
//   if(err){
//       console.log('[SELECT ERROR]:',err.message);
//   }
//   str = JSON.stringify(result);
//   //数据库查询的数据保存在result中，但浏览器并不能直接读取result中的结果，因此需要用JSON进行解析
//   //console.log(result);   //数据库查询结果返回到result中
//   console.log(str);
// });

// app.get('/',function (req,res) {
//   res.send(str);  //服务器响应请求
// });
// connection.end();

// app.listen(3000,function () {    //监听3000端口
//   console.log('Server running at 3000 port');
// });