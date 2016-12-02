require(["../scss/pinghezhi.scss","../main.js"]);
//当点击宜食
    var yishi=$(".suit_title h2 span");
yishi.on("click",function(){
    if(yishi.hasClass("down_arrow")){
        $(".suit_content").slideDown();
        $(this).addClass("up_arrow").removeClass("down_arrow");
    }
    else{
        $(".suit_content").slideUp();
        $(this).addClass("down_arrow").removeClass("up_arrow");
    }
});


//不宜食
var buyishi=$(".unsuit_title h2 span");
buyishi.on("click",function(){
    if(buyishi.hasClass("down_arrow")){
        $(".unsuit_content").slideDown();
        $(this).addClass("up_arrow").removeClass("down_arrow");
    }
    else{
        $(".unsuit_content").slideUp();
        $(this).addClass("down_arrow").removeClass("up_arrow");
    }
});

//当点击 de_title时  隐藏  显示de_titles
$(".right-arrow").on("click",function () {
    $(".de_title").addClass("hide");
    $(".bottom").addClass("show");
});
$(".read").on("click",function(){
   $(".info_bot").addClass("show");
});
