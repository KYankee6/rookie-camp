$(function(){
	setTimeout(function(){
		//인사이트
		$(".kt_pc .section_insight .bnr_thum").each(function(){
			if ($(this).find("a img").attr("alt") == "") {
				$(this).find("a img").attr("alt", "");
			}
		});
		$(".kt_mb .section_insight .thum").each(function(){
			if ($(this).find("a img").attr("alt", "") == "") {
				$(this).find("a img").attr("alt", "");
			}
		});
		
		//추천상품
		$(".kt_pc .section_recomm .bnr_thum").each(function(){
			if ($(this).find("a img").attr("alt") == "") {
				$(this).find("a img").attr("alt", "");
				$(this).closest("li").find("a").removeAttr("title");
			}
		});
		$(".kt_mb .section_recomm .title").each(function(){
			if ($(this).closest("div").siblings("a").find("img").attr("alt") == "") {
				$(this).closest("div").siblings("a").find("img").attr("alt", "");
				$(this).closest("div").siblings("a").removeAttr("title");
				$(this).removeAttr("title");
			}
		});
		
		//관련서비스
		$(".kt_pc .sv_box_list .img").each(function(){
			if ($(this).find("img").attr("alt") == "") {
				$(this).find("img").attr("alt","");
			}
		});
		$(".kt_mb .sv_box_list .img").each(function(){
			if ($(this).find("img").attr("alt") == "") {
				$(this).find("img").attr("alt","");
			}	
		});
		
		//고객 성공사례
		$(".kt_pc .btn_play").each(function(){
			if ($(this).siblings("img").attr("alt") == "") {
				$(this).siblings("img").attr("alt", "");
			}
		});
		$(".kt_mb .btn_play").each(function(){
			if ($(this).siblings("img").attr("alt") == "") {
				$(this).siblings("img").attr("alt", "");
			}
		});

		//공유하기
		$(".box_share > ul > li").each(function(){
			if( !($(this).hasClass("url")) ) $(this).find("a").attr("title", "새창열림");
		});
		
		//table summary 제거
		$("table").removeAttr("summary").removeAttr("summery");
		
		//모바일 컨설팅 신청 전화하기
		$(".kt_mb aside.aside li.tel a").html("<span class='hidden'>전화</span>");
		
	},1000);
}); 
