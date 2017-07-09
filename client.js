const net = require('net');
const fs = require("fs");
const readline = require('readline');
var arg = process.argv[2];
var flag = process.argv[3];
const date = new Date();
var socket = new net.Socket();

var port = 80;

 if(arg === "localhost"){
    port = 8080;
  }

  socket.connect(port, arg, ()=>{
    socket.write(header());

  });

  socket.on("data", (data)=>{
    var words = data.toString();
    var head = words.split('\r\n\r\n')[0];
    var body = words.split('\r\n\r\n')[1];

    if(flag === "H"){
      process.stdout.write(head.toString());
    }else if (flag === "B"){
     process.stdout.write(body.toString());
    }else{
       process.stdout.write(words);
    }

    socket.destroy();
  });







// socket.connect(80, arg, ()=>{
//   if(socket.remotePort === 80){
//     socket.write(header());
//     socket.on("data", (data)=>{
//     var words = data.toString();
//     console.log(words);
//     socket.end();});
//   }else if(socket.remotePort === 8080){
//     var socket2 = createSocket();
//     socket2.connect(8080, arg,()=>{
//     socket2.write(header());
//     socket2.on("data", (data)=>{
//     var words = data.toString();
//     console.log(words);
//     socket2.end(); });});
//   }else if(socket.remotePort === 443){
//       var socket3 = createSocket();
//       socket3.connect(443, arg,()=>{
//       socket3.write(header());
//       socket3.on("data", (data)=>{
//       var words = data.toString();
//       console.log(words);
//       socket3.end();
//       }); });
//      }
//    });






function header(){
  return `GET / HTTP/1.1\r\nHost: ${arg}\r\nConnection: close\r\n\r\n`;
}

function createSocket(){
  var socket = new net.Socket();
  return socket;
}

function errorHandler(code){
  var result = null;
  switch(code){
    case 301:
       result = "301 error";
    break;
    case 200:
       result = "OK";

    break;
    default:
      result = "404 Error";

  }
}

