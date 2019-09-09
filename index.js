/*var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var app = express();

app.use(bodyParser.json());

app.use(express.static('public'))

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage }).array('userPhoto',2);

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        //console.log(req.body);
        //console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(8080,function(){
    console.log("Working on port 8080");
});
*/
var number = 1;
var express = require('express'), multer = require('multer'), app = express(), port = 5000;

//var bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());



var fs = require('fs');
app.set('port', port); 

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, '/root/droppis/uploads/');
  },
  filename: function (request, file, callback) {
    console.log(file);

    callback(null, number+".jpg")
    number++;
  }
});

app.use(express.static(__dirname + '/public/' ) );
var upload = multer({storage: storage}).array('file', 3);

app.get('/', function(resuest, response) {
  response.sendFile('index.html');
});

app.post('/upload', function(request, response) {

  fs.writeFile('mynewfile3.txt', request, function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });

  //console.log("Username is :" + request.body.username);
  //console.log("Password is :" + request.body.password);
 
  upload(request, response, function(err) {
    if(err) {
      console.log('Error Occured' + err);
        return;
      }
    console.log(request.files);
    response.end('Your Files Uploaded');
    console.log('Photo Uploaded');
  })
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});