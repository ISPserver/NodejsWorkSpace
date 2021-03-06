/*
★ejs란?★
-Only, Node.js 서버측에서만 해석 및 실행될 수 있는 파일
-js의 문법 사용이 가능(if,for...변수선언)
-다른 서버측 스크립트 언어인(php,jsp,asp와 같은 목적)
*/
var http=require("http");
var fs=require("fs");
var ejs=require("ejs");

var server=http.createServer(function(request, response){
  fs.readFile("./list.ejs", "utf-8", function(error,data){
    if(error){
      console.log("읽기실패",error);
    }else{
      response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
      response.end(ejs.render(data));
    }
  });
});

server.listen(8000, function(){
  console.log("Node Server is Running 8000");
});