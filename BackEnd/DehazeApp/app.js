var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456", // empty for Windows
  database: "Dehaze",
});

//create listen

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});



con.connect(function (error) {
  if (error) console.log(error);
  else console.log("connected");
});

//login
app.get("/login", (req, res) => {
  con.query(
    "SELECT * FROM User",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
        console.log(result)
        //console.log(username)
      } else {
        res.send({ message: "Wrong username/password conbination!" });
      }
      console.log(result)
    }
  );
});

app.post('/signUp',function (req,res) {
  connection.query('select * from Administrator', function(error, rows){
    if(error) console.log(error)
    
    else {
      
      console.log(rows)
      res.send(rows);  //服务器响应请求
    }
  });
  
});


// /Users/overainy/Desktop/ImageData

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