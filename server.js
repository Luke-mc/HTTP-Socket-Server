const net = require("net");
const fs = require("fs");
const date = new Date();
let para = null;

var index = fs.readFileSync('./index.html');
var four0four = fs.readFileSync('./404.html');
var helium = fs.readFileSync('./helium.html');
var styles = fs.readFileSync('./styles.css');
var hydrogen = fs.readFileSync('./hydrogen.html');

let server = net.createServer((socket)=>{
  socket.on("data", (data)=>{
  data = data.toString().split(' ');
  switch(data[1]){
    case "/":
      para = index;
    break;
    case "/index.html":
      para = index;
    break;
    case "/helium.html":
      para = helium;
    break;
    case "/hydrogen.html":
      para = hydrogen;
    break;
    case "/css/styles.css":
      para = styles;
    break;
    default:
      para = four0four;
  }
  socket.write(header(para));
  });
});

function header(page){
  if(page === styles){
    return  `HTTP/1.1 200 OK\nServer: Luke's server\nDate: ${date} GMT\nContent-Type: text/CSS; charset=utf-8\nContent-Length: ${page.length}\nConnection: keep-alive\n\n${page}`;
  }else{
  return  `HTTP/1.1 200 OK\nServer: Luke's server\nDate: ${date} GMT\nContent-Type: text/html; charset=utf-8\nContent-Length: ${page.length}\nConnection: keep-alive\n\n${page}`;
  }
}

server.listen(8080);