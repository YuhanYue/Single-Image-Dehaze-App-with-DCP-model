
var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");

const fs = require('fs');
const child_process = require('child_process');

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

const multiparty = require('multiparty')

app.post('/upload',(req, res) =>{
    var imagePath =' ';
    var fileName = ' ';
    var sourceFile = ' ';
    var destPath = ' ';
    var desFile = ' ';
    const form = new multiparty.Form();
    form.parse(req, async(error, _fields, files) => {
       imagePath = files.file[0].path;
       console.log(imagePath)
       fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);

       
       var path = require('path');
        
       sourceFile = path.join(imagePath);
       destPath = path.join('/Users/overainy/Desktop/ImageData/hazyImage', fileName);
       desFile = destPath + '/'+fileName;
       fs.rename(sourceFile, destPath, function (err) {  
        if (err) throw err;
        fs.stat(destPath, function (err, stats) {
          if (err) throw err;
          //console.log('stats: ' + JSON.stringify(stats));
        });
      });

      var workerProcess = child_process.exec('python refineDCP.py '+i, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
 
      workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
    });

      //改dehazeImageURL
      // con.query('INSERT INTO `Dehaze`.`Image` ( `userID`,`hazyImageURL`,`dehazeImageURL`,`imageName`,) VALUES (1, ?, ?,1)', 
      // [sourceFile,desFile],
      // (error, rows) =>{
      //   if(error) console.log(error)
      //   else {  
      //     console.log(rows)
      //     res.send(rows);  //服务器响应请求
      //   }
      // });
    });

    
    
  });


// /Users/overainy/Desktop/ImageData
