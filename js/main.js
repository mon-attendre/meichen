$(function(){
	$(".ipt_search").focus(function(){
		$(".search_box p").hide();
	});
	
//	全部商品分类鼠标滑动事件
	$(".all_sort").hover(function(){
		$(".all_sort_list").show();
	},function(){
		$(".all_sort_list").hide();
	});
	
	
//	首页遮罩层鼠标滑动事件
	$(".sort_section_el").hover(function(){
		$(this).find(".zhezhao").css("top","-30px");
	},function(){
		$(this).find(".zhezhao").css("top","320px");
	})
	
	
//	点击head的登录时
	$(".denglu_a").click(function(){
		$(".zhezhao_box").show();
		$(".denglu_box").show();
	})
//	点击head的注册时
	$(".zhuce_a").click(function(){
		$(".zhezhao_box").show();
		$(".zhuce_box").show();
	})
	//	点击登录页面的关闭按钮时
	$(".dl_close").click(function(){
		$(".zhezhao_box").hide();
		$(".denglu_box").hide();
	})
	//	点击注册页面的关闭按钮时
	$(".zc_close").click(function(){
		$(".zhezhao_box").hide();
		$(".zhuce_box").hide();
	})


	//当滚动条的位置处于距顶部1000像素以下时，跳转链接出现，否则消失
	$(window).scroll(function() {
		if($(window).scrollTop() > 400) {
			$("#back-to-top").fadeIn(500);
		} else {
			$("#back-to-top").fadeOut(500);
		}
	});
	//当点击跳转链接后，回到页面顶部位置
	$("#back-to-top").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	
	//当购物车里没有商品  显示购物车里没有商品
	



})
