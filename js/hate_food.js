require(["../scss/hate.scss","../main.js"]);

       //渲染数据
        var data3="";
        $.ajax({
            url:"../data/illness.json",
            success:function(data){
                data3=data.hate;
                var str3="";
                for(var i=0;i<data3.length;i++){
                    str3+="<li><span></span><i>"+data3[i]+"</i></li>"
                }
                $(".hate_content ul").html(str3);

                //点击选中span
                $(".hate_content ul li").on("click","span",function(){
                    if($(this).hasClass("active")){
                        $(this).removeClass("active")
                    }
                    else{
                        $(this).addClass("active");
                    }

                });
            }
        });
$(".go-test").on("click",function(){
    $(".mask_layer").show();
    $(".tan").show();
    $(".quxiao").on("click",function(){
        $(".mask_layer").hide();
        $(".tan").hide();
    })
    $(".tan").on("click","a",function(){
        window.location.href="test.html";
    })
});


