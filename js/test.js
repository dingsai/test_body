require(["../scss/test.scss","../main.js"]);

var data4="";
var obj=new Object();
$.ajax({
    url:"../data/question.json",
    success:function(data){
        data4=data;
        str4="";
        for(var i=0;i<data4.length;i++){
            str4+=' <div class="test_question"><h2 title="'+data4[i].id+'">'+data4[i].qName+'</h2><span data-value="0">没有</span><span data-value="1">很少</span><span data-value="2">有时</span><span data-value="3">经常</span><span data-value="4">总是</span></div>'
        }
        $(".test_content").html(str4);


        //已经回答的span的个数
        var arr=[];
        $(".test_content span").each(function(){
            $(this).click(function(){
                var num=$(this).attr("data-value");//span的值的下标
                var idid=$(this).siblings("h2").attr("title");//.test_content id值
                //alert(num)
                // alert(idid)
                if(arr.indexOf(idid)==-1){
                    arr.push(idid);
                }
                for(var i in arr){
                    obj[arr[i]]=num;//对象[下标]=num
                }
                $(this).addClass("active").siblings().removeClass("active");
                //console.log(obj);
            })

        });
        //点击提交
        $(".submit").on("click",function(){
            var len=$(".test_section span").length;
            //alert(len)
            var complete=len/5;
            //判断答题是否已完成
            if(arr.length==complete){
                alert("答题已完成");
                window.location.href="pinghezhi.html";
            }
            else{
                alert("您还有"+(complete-arr.length)+"道题没有答");
            }
        })
    }
});