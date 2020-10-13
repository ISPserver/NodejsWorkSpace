/*웹서버 구축*/
var http=require("http");
var url=require("url");//내부모듈
var mysql=require("mysql");//외부모듈
var fs=require("fs");//file system 내장모듈
var con;//접속 성공시 그 정보를 보유한 객체,이 객체가 있어야 접속된 상태에서 쿼리문 수행가능

//서버 객체 생성
var server=http.createServer(function(request, response){
  //클라이언트가 원하는 것이 무엇인지를 구분하기 위한 url 분석
  //console.log(request.url);
  //섞여있는 url을 분석(파싱)하기 위해서는 전담 모듈을 이용(url)
  var parseObj = url.parse(request.url,true); //분석 시작
  
  response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
  if(parseObj.pathname=="/member/registForm"){//회원가입 양식디자인 폼
    fs.readFile("./registForm.html","utf-8",function(error,data){
      if(error){
        console.log("읽기 실패",error);
      }else{
        response.end(data);//html파일을 읽어들인 결과문자열을 클라이언트 응답정보로 저장
      }
    })
  }
  else if(parseObj.pathname=="/member/regist"){//회원가입 원할시
    //mysql에 insert
    //클라이언트의 브라우저에서 전송되어온 파라미터들 받기
    var param=parseObj.query;//파라미터를 보유한 json객체
    var sql="insert into member2(uid,password,uname,phone,email,receive,addr,memo)";
    sql+=" values(?,?,?,?,?,?,?,?)"; //바인드 변수 이용

    con.query(sql,[param.uid,
      param.password,
      param.uname,
      param.phone,
      param.email,
      param.receive,
      param.addr,
      param.memo],function(error,result,fields){
        if(error){
          console.log("등록실패",error);
        }else{
          var msg="<script>";
          msg+="alert('가입 성공');"
          msg+="location.href='/member/list';" //<a href="">와 동일
          // /member/list로 재접속(클라이언트가 지정한 주소로)
          msg+="</script>";

          response.end(msg);//응답정보 구성
        }
    });

  }else if(parseObj.pathname=="/member/list"){//회원목록을 원하면
    //mysql에 select 할 예정
    var sql="select * from member2";
    con.query(sql, function(error,record,fields){
      if(error){
        console.log("가져오기 실패",error);
      }else{
       var tag="<table border='1px' width='80%'>";
        tag+="<tr>";
        tag+="<td>member2_id</td>";
        tag+="<td>uid</td>";
        tag+="<td>password</td>";
        tag+="<td>uname</td>";
        tag+="<td>phone</td>";
        tag+="<td>email</td>";
        tag+="<td>receive</td>";
        tag+="<td>addr</td>";
        tag+="<td>memo</td>";
        tag+="</tr>";

        for(var i=0; i<record.length; i++){
          var json=record[i]; //select문 결과의 배열 요소 반환

          tag+="<tr>";
          tag+="<td>"+json.member2_id+"</td>";
          tag+="<td>"+json.uid+"</td>";
          tag+="<td>"+json.password+"</td>";
          tag+="<td>"+json.uname+"</td>";
          tag+="<td>"+json.phone+"</td>";
          tag+="<td>"+json.email+"</td>";
          tag+="<td>"+json.receive+"</td>";
          tag+="<td>"+json.addr+"</td>";
          tag+="<td>"+json.memo+"</td>";
          tag+="</tr>";
        }
        tag+="</table>";
        response.end(tag);
      }
    })
    
  }
  else if(parseObj.pathname=="/member/del"){//회원탈퇴를 원하면
    //mysql에 select 할 예정
    response.end("회원삭제");
  }
  else if(parseObj.pathname=="/member/edit"){//회원수정을 원하면
    //mysql에 select 할 예정
    response.end("회원정보수정");
  }

});
//mysql 접속
function connectDB(){
  con=mysql.createConnection({
    url:"localhost",
    user:"root",
    password:"1234",
    database:"node"
  })
}
//서버 가동
server.listen(9999,function(){
  console.log("Server is running at port 9999");
  connectDB();
})