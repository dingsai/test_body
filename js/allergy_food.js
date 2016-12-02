require(["../scss/allergy.scss","../main.js"]);
//有无过敏食物页面
var data2='';
$.ajax({
    url:"../data/illness.json",
    success:function(data){
        data2=data.food;
        console.log(data2);
        var str2="";
        for(var i=0;i<data2.length;i++){
            str2+="<li>"+data2[i]+"</li>"
        }
        $(".seek ol").html(str2)
    }
});

$(".choice_medical").on("click","span",function(){
    $(this).addClass("active").parent().siblings().find("span").removeClass("active");
    //判断  有  则seeks显示
    if($(this).parent("li").index()==1){
        $(".seek").show()
    }
    else{
        $(".seek").hide()
    }
});

//选择疾病
$(".seek ol").on("click","li",function(){
    if($(this).hasClass("li_active")){
        $(this).removeClass("li_active");
    }
    else{
        $(this).addClass("li_active");
    }
});
//点击继续显示有无过敏食物板块
$(".go-hate").on("click",function(){
    window.location.href="hate_food.html";
});