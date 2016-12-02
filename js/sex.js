require(["../scss/sex.scss","../main.js"]);
    //判断当性别选中任意一个时，继续按钮可点击
    $(".go-medical").on("click",function(){
        $(".choice_sex input").each(function(){
            if($(this).prop("checked")){
                window.location.href="Medical_history.html";
            }
        });
    });
