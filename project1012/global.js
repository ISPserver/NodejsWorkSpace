console.time("mycpu");
for(var i=1; i<=1000000; i++){

}
console.log("100만번 수행 완료");
console.timeEnd("mycpu");//종료시간 출력
//console.log(process.arch);
//console.log(process.env);
console.log(process.platform);