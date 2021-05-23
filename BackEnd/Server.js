
var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");

const fs = require('fs');
const child_process = require('child_process');
var exec = require('child_process').exec;

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
    var dehazedImage = '';
    const form = new multiparty.Form();
    form.parse(req, async(error, _fields, files) => {
       imagePath = files.file[0].path;
       //console.log(imagePath)
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
      let cmd = 'zsh ~/Desktop/520yyh.sh'
      let cmd2 = "conda run -n py39t python ./refineDCPNet.py " + destPath + " " + "/Users/overainy/Desktop/ImageData/dehazedImage/";
      dehazedImage = 'file:///Users/overainy/Desktop/ImageData/dehazedImage/'+fileName + '_dehaze.jpg'
      fs.writeFile("/Users/overainy/Desktop/520yyh.sh", cmd2, error => {console.log(error);});
      exec(cmd, function(error, stdout, stderr) {
        if(error) console.log(error)
        else console.log('success')
      });

      return res.status(200).json({filename: dehazedImage});
      

      
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
