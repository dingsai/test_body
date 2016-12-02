require(["../scss/Medical.scss","../main.js"]);
//有无病史页面
var data='';
$.ajax({
   url:"../data/illness.json",
    success:function(data){
        data=data.result;
        console.log(data);
        var str1="";
        for(var i=0;i<data.length;i++){
            str1+="<li>"+data[i]+"</li>"
        }
        $(".choice_medical .seeks ol").html(str1)
    }
});


$(".choice_medical").on("click","span",function(){
    $(this).addClass("active").parent().siblings().find("span").removeClass("active");
    //判断  有  则seeks显示
    if($(this).parent("li").index()==1){
        $(".seeks").show()
    }
    else{
        $(".seeks").hide()
    }
});

//选择疾病
$(".seeks ol").on("click","li",function(){
    if($(this).hasClass("li_active")){
        $(this).removeClass("li_active");
    }
    else{
        $(this).addClass("li_active");
    }
});
//点击继续显示有无过敏食物板块
$(".go-allergy").on("click",function(){
   window.location.href="allergy_food.html";
});

