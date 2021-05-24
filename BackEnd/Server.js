
var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");

const fs = require('fs');
const child_process = require('child_process');
var exec = require('child_process').exec;

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
const multiparty = require('multiparty')
var path = require('path');

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
app.get("/login", function(req, res){
  con.query("SELECT * FROM User",function(err, result) {
      if (err) {
        res.send({ err: err });}
       else{
        res.send(result);
        console.log(result)
        //console.log(username)
       } 
       console.log(result);
    }
   
  );
});


app.get('/signUp',function (req,res) {
  con.query('select * from Administrator', function(error, rows){
    if(error) console.log(error)
    
    else {
      
      console.log(rows)
      res.send(rows);  //服务器响应请求
    }
  });
  
});




//上传图片  -> 去雾 -> 保存图片到数据库 -> 返回图片本地url
app.post('/upload',(req, res) =>{
    var imagePath =' ';//临时存放文件夹
    var fileName = ' ';//image name
    var sourceFile = ' ';//临时存放文件夹
    var destPath = ' ';//hazy Image存放路径
    var desFile = ' ';//hazy image URL ?
    var dehazedImage = ''; //dehazedImageURL
    var hazyImageURL = ' ';//hazyImageURL
    const form = new multiparty.Form();
    form.parse(req, async(error, _fields, files) => {
       imagePath = files.file[0].path;
       //console.log(imagePath)
       fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);


         
       sourceFile = path.join(imagePath);
       destPath = path.join('/Users/overainy/Desktop/ImageData/hazyImage', fileName);

       hazyImageURL = 'file:///'+destPath;
       

       fs.rename(sourceFile, destPath, function (err) {  
        if (err) throw err;
        fs.stat(destPath, function (err, stats) {
          if (err) throw err;
          //console.log('stats: ' + JSON.stringify(stats));
        });
      });
      let cmd = 'zsh ~/Desktop/520yyh.sh'
      let cmd2 = "conda run -n py39t python ./refineDCPNet.py " + destPath + " " + "/Users/overainy/Desktop/ImageData/dehazedImage/";
      //destPath是hazyimage的路径，后面是要保存的路径
      dehazedName = fileName.substring(0, fileName.lastIndexOf('.'))+"_dehaze.jpg";
      dehazedImage = 'file:///Users/overainy/Desktop/ImageData/dehazedImage/'+ dehazedName
      fs.writeFile("/Users/overainy/Desktop/520yyh.sh", cmd2, error => {console.log(error);});
      exec(cmd, function(error, stdout, stderr) {
        if(error) console.log(error)
        else {
          console.log('dehazed success')
          console.log('hazyImageURL',hazyImageURL)
          console.log('dehazedImageURL', dehazedImage)
          return res.status(200).json({filename: dehazedImage});
        }
      });
      //将图片写入数据库，用户id全部设置为1
      //只需要名字两两对应即可

      con.query(
        "INSERT INTO Image(userID, hazyImageURL, dehazedImageURL, imageName) VALUES(1,?,?,?)",
      [hazyImageURL, dehazedImage, fileName],
      (err, result) => {
        if(err) console.log(err)
        else console.log('successfully save image to database')
      }
      );
      
    });
  
  });

  //去雾历史读取
  app.get("/history", function(req, res){
    con.query("SELECT * FROM Image",function(err, result) {
        if (err) {
          res.send({ err: err });}
         else{
          res.send(result);
          console.log(result)
         } 
         console.log(result);
      }
     
    );
  });



