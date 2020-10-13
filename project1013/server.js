/*웹 서버 구축*/
var http = require("http");
var fs = require("fs");
var url = require("url");// url정보를 해석해주는 모듈
var mysql = require("mysql");
var con; //DB 접속정보를 가진 변수
//서버 객체 생성
var server=http.createServer(function(req,res){  
  res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
  //전체 url중에서도 uri만을 추출해야 한다(파싱)
  //★파싱시 true 옵션을 주면, 파라미터의 매개변수에 접근할 수 있는 json을 추가해준다!!!
  var result=url.parse(req.url, true); //url 모듈 이용하여 전체 주소 해석 시작
  var paramObj = result.query;

  if(result.pathname=="/login"){      
    var sql="select * from hclass where id='"+paramObj.m_name+"'and pass='"+paramObj.m_pass+"'";
    con.query(sql,function(error,record,fields){
      if(error){
        console.log(error);
      }else{        
        //레코드가 있을때는(배열의 길이가1),로그인 성공
        if(record.length>0){          
          res.end("<script>alert('인증 성공')</script>");
        }else{
          res.end("<script>alert('인증 실패');history.back();</script>");
        }
        //레코드가 없을때는(배열의 길이가0),로그인 실패

      }
    });

  }else if(result.pathname=="/apple"){
    console.log("사과");
    res.end("사과를 연동");
  }
  else if(result.pathname=="/loginForm"){
  //클라이언트의 요청에 대한 응답 처리
  fs.readFile("./loginForm.html","utf-8",function(error,data){
    if(error){
      console.log("읽기 실패",error);
    }else{      
      res.end(data);      
    }
  })
};

});
//mysql 연동
function connectDB(){
  con=mysql.createConnection({
    url:"localhost",
    user:"root",
    password:"1234",
    database:"node"
  });
}
//서버가동
server.listen(8888,function(){
  console.log("Server is running at 8888 Port Number");
  connectDB();//웹서버 가동되면,mysql 접속
});