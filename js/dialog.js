;(function($){
		var Dialog=function(opt){
			//创建默认参数
			var _default={
				title:"",
				txt:"确认删除吗？",
				btn:["确认"],
				callback:null
			}
			//扩展参数
			var settings=$.extend({},_default,opt);
			var btn="";
			//console.log(settings)
			$.each(settings.btn,function(i,e){
				btn+="<span>"+e+"</span>";
			})
			
			//功能语句：动态生成结构+css样式+动态脚本
			var htmlNode=$("<div class='mark'></div><div class='dialog'><p>"+settings.txt+"</p><section>"+btn+"</section></div>");
			$("body").prepend(htmlNode);

			//点击确认  取消按钮都关闭
			$(".dialog").on("click","span",function(){
				var btntxt=$(this).text();
				if(btntxt=="确认"){
					//if(settings.callback) settings.callback();
					settings.callback&&settings.callback();
				}
				close();
			})
			//关闭弹出框
			function close(){
				$(".mark").remove();
				$(".dialog").remove();
			}
		}
		


		$.dialog=function(opt){
			new Dialog(opt);
		}



		/*$.extend({
			//a:function(){alert("a")}

		})*/








})(jQuery);