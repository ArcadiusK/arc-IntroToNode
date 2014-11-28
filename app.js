//run typying into the console the following
//node app.js file1.txt file2.txt file3.txt

var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var async = require('async');
 var ejs = require('ejs'); 
 var http = require('http');

// take a list of files from the command line
// now we can run our app like:
// node app.js file1.js file2.js file3.js
// and it will watch all three files
var files = Array.prototype.slice.call(process.argv, 2);
console.log(files);
 
// create the express app
var app = express();
 
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.use(logger('dev'));
 
// // listen on port 1234
// app.listen(1234);

server.listen(1234);


// after initializing app
app.set('view engine', 'ejs');

 
// // when someone comes to http://localhost:1234/, run the callback
// // function listed here and send down the data
// // we call this the: '/' route (or the Root route).
// app.get("/", function(request, response) {
//   fs.readFile(files[0], function(err, data) {
//     response.send('<link rel="icon" href="./favicon.ico" type="image/x-icon">'+'<link rel="shortcut icon" href="./favicon.ico" type="image/x-icon"> '+'<pre>' + data.toString() + '</pre>');
//   });
// });


// // // when someone comes to http://localhost:1234/, run the callback
// // // function listed here and send down the data
// // // we call this the: '/' route (or the Root route)
// app.get("/", function(request, response){
//     var fileContents = "";
//     var readFileCount = 0;
//     files.forEach(function(fileName){
//         fs.readFile(fileName, function(err, fileData){
//             fileContents += '<pre>'+ fileData.toString() +'</pre>';
//                 readFileCount++;
//                 if(readFileCount >= files.length){
//                     response.send(fileContents);
//                 }
//         });
//     });
// });


// fs.watch('.', {}, function(event,filename){
// console.log('file',filename,'has changed')
// io.sockets.emit("filechanged");
// //io.sockets.emit("filechanged", { filename: filename, filetext: data.toString() });

// });

app.get("/", function(request, response) {
    var mapFilesToFileObjects = function(fileName, doneCallback) {
        fs.readFile(fileName, function(err, fileData){
              doneCallback(null,{ id: fileName.replace(/[^0-9]/ig, ""),
              data: fileData.toString(),
              filename: fileName
          })
      });
    };


    async.mapSeries(files, mapFilesToFileObjects, function(err, results) {
    //response.send('<pre>' + results.join("\n\n") + '</pre>');
   



    response.render('filelist', { files: results})
    });
});


fs.watch(".", {}, function(event, filename) {
    console.log('file',filename,'has changed')
    io.sockets.emit("filechanged", {});
});

//above OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS OURS

	// var x; 

	// fs.readFile(filename, function(err, filebuffer) {
	// 	x = filebuffer;
	// })

// // GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE 
// 	var mapOneFileToOneObject = function(oneFile, doneMappingOneFile) {
// 		fs.readFile(oneFile, function(err, oneFileBuffer) {
// 			var oneFileData = oneFileBuffer.toString();
// 			doneMappingOneFile(err, oneFileData);
// 		});
		
// 	};

// 	var finishMapAllFiles = function(err, resultsFromFiles) {
// 		//console.log(resultsFromFiles);
// 		response.send('<pre>' + resultsFromFiles.join("\n\n") + '</pre>');
// 	};


// 	async.mapSeries(files, mapOneFileToOneObject, finishMapAllFiles);
// // GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE GOOD CODE 







// // console.log(process.argv);

// // var nodeStartingFunctionFileCode = require("./nodeStartingFunction");
// // nodeStartingFunctionFileCode.nodeStartingFunction();
// // var fs = require('fs');
// // for(var i = 2; i< process.argv.length; i++){
// //     fs.readFile(process.argv[i], function(err, data){
// //     console.log(data.toString());  // buffer object
// //  console.log("nNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
// //   });
// // }





// console.log("Node starting...");
// var buffer = '';
// var fs = require('fs');
// // fs.readFile('./file1.txt', function(err, data) {
// //      buffer = data.toString();  // buffer object
// //      console.log(buffer);
// // });
 
 
// fs.watchFile('./file1.txt', {interval:10}, function(prev, curr) {
//  //  console.log('updated file');
//   fs.readFile('./file1.txt', function(err, data) {
//      buffer = data.toString();  // buffer object
//      console.log(buffer);
// });
//   // display an update was made, then console.log the new updated file!
  
// });