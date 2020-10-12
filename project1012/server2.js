/*http모듈로 웹서버 구축하기*/
var http = require("http");
var fs = require("fs");

//서버객체를 생성
//서버 객체 생성시, 요청정보와 응답정보를 구성할 수 있는 res,req객체가 매개변수로 전달가능
var server = http.createServer(function(req,res){
  console.log("클라이언트 요청받음");//req객체로는 클라이언트의 요청정보를 처리할 수 있다.
  //res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});//편지봉투 구성!  
  // var tag="";
  // tag+="<input type=\"text\" />";

  //서버에 있는 파일을 읽어들여, 클라이언트에게 전송한다
  fs.readFile("./회원폼유효성체크.html","utf-8",function(error,data){
    res.end(data);//클라이언트에게 응답 정보 전송
  });

  //이미지를 클라이언트에게 보내되,파일을 읽어서 처리할것
  //참고로 이미지의 경우 content-type은 image/png, image/jpg 등...
  // res.writeHead(200,{"Content-Type":"image/png;"});
  // fs.readFile("../images/hero/image1.png",function(error,data){
  //   res.end(data);
  // })
});

// //접속자를 감지
// server.on("connection", function(){
//   console.log("접속자 감지");
// });
//서버 가동
server.listen(7777,function(){
  console.log("Server is runnging");
});