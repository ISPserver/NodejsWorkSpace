/*
Get / Post 전송을 이해하기 위한 서버
Get: 가져오다(서버로부터 콘텐츠를 가져올때 사용하는 방식)
     html<a>링크가 바로 get 방식 

POST: 보낸다는 의미(클라이언트가 서버에 데이터를 보낼때 사용하는 방식)
-> form 태그를 이용해서 요청할 수 있다.
*/
var http=require("http");
var url=require("url");
var queryString=require("querystring");//get , post 파싱 가능한 모듈

//서버객체 생성
var server=http.createServer(function(request,response){
  console.log("클라이언트 요청방식: "+request.method);
  if(request.method=="GET"){    
    response.writeHead(200,{"Content-Types":"text/html;charset=utf-8"});
    response.end("클라이언트가 GET방식 요청 ");

    //get 방식으로 전달된 파라미터 받기
    var urlJson=url.parse(request.url,true);//true 매개변수: 파라미터 정보를 json으로 변환해준다.
    console.log("URL분석 결과: ",urlJson);

    var paramJson= urlJson.query;//ID, PASS담겨있다.
    console.log("ID : ",paramJson.id);
    console.log("Pass : ",paramJson.pass);
  }

  else if(request.method=="POST"){
    response.writeHead(200,{"Content-Types":"text/html;charset=utf-8"});
    response.end("클라이언트가 Post방식 요청 ");
    
    //body로 전송된 데이터는 url분석만으로는 post해결 안된다.
    //post 방식으로 전달된 데이터를 받기 위한 이벤트를 감지
    request.on("data",function(param){
      //var postParam=url.parse(new String(param).toString(), true);
      var postParam=queryString.parse(new String(param).toString());
      //console.log("Post 전송된 파라미터는 :", postParam);
      console.log("ID : ",postParam.id);
      console.log("Pass : ",postParam.pass);
    });    
    
  }
});

//서버 연결
server.listen(4000,function(){
  console.log("Server is Running 4000 Port Num");
})