/*------------------------------------
mysql 연동해보기
------------------------------------*/
var mysql=require("mysql");

//접속에 필요한 정보
let conStr= {
  url:"localhost",
  user:"root",
  password:"1234",
  database:"node"
}

//접속시도 후, 접속정보가 반환된다.
var con = mysql.createConnection(conStr);

//반환된 con을 이용하면 쿼리문 수행
var sql="insert into member(firstname,lastname,local,msg)";
sql+=" values('tiger','black','sapari','heung')";

con.query(sql,function(error,result,fields){
  if(error){
    console.log("등록실패",error);
  }else{
    console.log("등록성공");
  }
}); //쿼리 실행