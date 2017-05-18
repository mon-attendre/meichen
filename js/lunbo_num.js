	//第一个参数是要轮播的对象
	//第二个参数是图片的范围
//	function changePic(obj,mImg){
	$(function(){
//实现无缝轮播的原理：
//做四张图片的轮播
//	 * 从左到右：
//	 * 		利用变量i，当i=size(即克隆第1张)时,再次点击 时 css设置left:0,迅速跳转到第一张，再将i的值设置为1，马上动画到第二张图片(i=1);
//	 * 		解释：当轮播到第5张(克隆的第一张)时，再次点击时，利用css('left','0px')直接跳到第一张(css比较迅速)，然后马上再动画到第二张
//	 * 从右到左：
//	 * 		获取size就是img的张数
//	 * 		当轮播到第一张的时候，点击时此时i=-1，迅速移动到第5张(left:size-1);动画到第四张：i=size-2
//	 * 圆点：
//	 * 		i = $(this).index() 此时i的值变成了保存移到哪个圆点的index； index是从0 开始，跟i是同步的
//	 * 		移到哪个点的时候，比如移到第二个点，表示第二张图片，动画到 i(此时为1)* imglength，就移动了一张图片的距离，图片变成了2个
//	 *计时器   
//	 * 		左移和右移写成函数，定时器直接调用函数							
//				滑动到小点标签的时候,图片进行改变
				$(".lunbo_num li").hover(function(){
					//记录当前点击的li的下标
					var index = $(this).index();
					btnIndex = index;
					$(this).addClass("num_active").siblings().removeClass();
					$(".lunbo_pic").stop().animate({left:-width*index});
				})
				//设置定时器
				var timer = setInterval(moveRight,4000);
				$(".content_center").hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(moveRight,4000);
				})
				
				//
				var clone = $(".lunbo_pic li").first().clone();
				$(".lunbo_pic").append(clone);;
				var length = $(".lunbo_pic li").length;
//				console.log(length);
				var width = $(".lunbo_pic li").width();
//				console.log(width);
				var btnIndex = 0;
				
				$(".next img").click(function(){
					moveRight();
				})
////				//往左的按钮
				$(".prev img").click(function(){
					moveLeft();
				})
				function moveRight(){
					btnIndex++;
					if(btnIndex == length){
						$(".lunbo_pic").css("left","0");
						btnIndex = 1;
					}
						$(".lunbo_pic").stop().animate({left:-width*btnIndex});
					if (btnIndex == length - 1) {
						$(".lunbo_num li").eq(0).addClass("num_active").siblings().removeClass();
					} else{
						$(".lunbo_num li").eq(btnIndex).addClass("num_active").siblings().removeClass();
					}	
					
				}
				function moveLeft(){
					btnIndex--;
					if(btnIndex == -1){
						$(".lunbo_pic").css("left",-width*(length-1));
						btnIndex = length-2;
					}
						$(".lunbo_pic").stop().animate({left:-width*btnIndex});
						$(".lunbo_num li").eq(btnIndex).addClass("num_active").siblings().removeClass();
				}
				
	})
