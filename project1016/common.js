/*프로그램 개발시 전반적으로 사용될 공통 기능을 js로 정의*/
exports.getMsgURL=function(msg, url){
  var tag="<script>";
  tag+="alert('"+msg+"');";
  tag+="location.href='"+url+"';";
  tag+="</script>";

  return tag;
}
