require(["../scss/hate.scss","../main.js","./dialog.js"]);

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
    //调用插件
    //$.a();
    $(".product").on("click","button",function(){
        var li=$(this).parent();
        $.dialog({
            btn:["确认","取消"],
            callback:function(){//点击确定执行的动作
                li.remove();
            }
        });
    });

});


