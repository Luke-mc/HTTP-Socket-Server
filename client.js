const net = require('net');
const socket = new net.Socket();
const date = new Date();
let arg = process.argv[2];
let flag = process.argv[3];
let port = 80;

if(arg === "localhost"){
  port = 8080;
}

socket.connect(port, arg, ()=>{
  socket.write(header());
});

socket.on("data", (data)=>{
  let words = data.toString();
  let head = words.split('\r\n\r\n')[0];
  let body = words.split('\r\n\r\n')[1];
  let code = head.split(' ')[1];

  switch(flag){
      case "H":
        errorHandler(code, head);
        break;
      case "B":
        errorHandler(code, body);
        break;
      default:
        errorHandler(code, words);
    }

  socket.destroy();
});


//Functions

function header(){
  return `GET / HTTP/1.1\r\nHost: ${arg}\r\nConnection: close\r\n\r\n`;
}

function errorHandler(code, data){
  let result = null;
  switch(code){
    case '301':
       result = "301 error";

    break;
    case '200':
       result = "200 OK";
    break;
    default:
      result = "404 Error";
  }
  console.log("\r\n"+ "Code Message:" +"\r\n"+  result + "\r\n\r\n" + data.toString());
}




