/*Node.js가 인기있는이유
-> 모듈때문이다. 모듈이란?
우리가 지금까지 js 라이브러리를, 파일로 저장해놓은 단위
전세계 많은 개발자들이 각자 자신이 개발한 모듈 공유

[모듈 유형]
1)내장모듈
  os 모듈
  url 모듈
  file system 모듈(★★★)
2)사용자 정의모듈
*/
//모듈을 가져올때는 require() 함수를 이용
// var os = require("os");
// console.log(os.hostname());
// console.log(os.cpus());

//url 모듈: url의 정보를 분석해주는 모듈
// var url = require("url");
// var result = url.parse("https://terms.naver.com/search.nhn?query=car");
// console.log(result);

//로컬상의 파일을 읽어 오거나, 쓸 수 있는 모듈
var fs= require("fs");
fs.readFile("./data/memo.txt", function(error,data){
  console.log(data);
});
