var mode_chk = '';
var chatbotSessionKey = '';

$(function(){
	
	//본문바로가기
	$("#skipNav").find("a").click(function(){
		if(mode_chk=="pc"){
			$(".kt_pc").find("a").eq(0).focus();
		}else{
			if($(".kt_pc").hasClass("main")){
				$(".kt_pc").find("a").eq(0).focus();
			}else{
				$(".kt_mb").find("a").eq(0).focus();
			}
		}
	});
	
	//본문바로가기 - id 값 추가
	//$(".kt_pc").attr("id", "kteContents");

	/* gnb, 검색, 전체메뉴 s */
	if($(".kt_pc.kt_both.main").length>0){	//메인일때

		var fn_windowFiex = function(){		//gnb 공통메뉴 클릭시
			$(".dim").show();
		}
		var fn_windowUnset = function(){	//gnb 공통메뉴 클릭시
			$(".dim").hide();
		}

		var fn_kthead_set = function(){
			if ($(document).scrollTop() > 1) {
				$('.kt-head').removeClass('act');
				$(".depth1 > li > a.item").removeClass('act');
				$(".depth1 > li > .depth2").removeClass('on');
				$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_p.png");
			}else{
				$('.kt-head').removeClass('act');
				$(".depth1 > li > a.item").removeClass('act');
				$(".depth1 > li > .depth2").removeClass('on');
				if($('#search_btn').hasClass("on")||$('#btnAllMenu').hasClass("on")){
					$('.kt-head').addClass("on");
					$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_p.png");
				}else{
					$('.kt-head').removeClass("on");
					$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_wt_p.png");
				}				
			}
		}

		$('.depth1 > li > a').not(".depth1 > li.dx_summit > a").on("focus mouseenter",function(){//210520 dx 추가
			if($('#search_btn').hasClass("on")) $('#search_btn').click();
			if($('#btnAllMenu').hasClass("on")) $('#btnAllMenu').click();
			$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_p.png");
			$('.kt-head').addClass('act').addClass("on");
			$(this).addClass('act').next('.depth2').addClass('on');
			$(this).parent('li').siblings().find('.depth2').removeClass('on');
			$(this).parent('li').siblings().children('a').removeClass('act');
			$('#btnAllMenu').removeClass('on');
			$('#ktAllMenu').removeClass('on');
			$(this).next(".depth2").find("ul > li").eq(0).find("a").mouseover();
			$(".dim").show();
		})
		
		$('.kt-head').mouseleave(function(){
			if( !$('#search_wrap').hasClass("on") && !$('#btnAllMenu').hasClass("on")){
				$('.depth2').removeClass('on');
				$('.depth1 > li > a').removeClass('act');
				$('#search_wrap').removeClass('on');
				$('#search_btn').removeClass('on');
				$('#btnAllMenu').removeClass('on');
				$('#ktAllMenu').removeClass('on');
				if(!$('#search_btn').hasClass("on") && !$('#btnAllMenu').hasClass("on")) $(".dim").hide();
				fn_kthead_set();
			}
		})

		$('.depth2 > ul > li > a').on("focus mouseenter", function(){
			$('.depth3').removeClass('on');
			$('.depth2 > ul > li > a').removeClass('on');
			$(this).addClass('on').next().addClass('on');
			$(this).closest("ul").next(".img-ban").find("a").eq($(this).closest("li").index()).show().siblings("a").hide();
		});

		$('#btnAllMenu').click(function(){
			$(".layer_pop .btn_layer_close").click();
			if($('#search_btn').hasClass("on")) $('#search_btn').click();
			if(!$(this).hasClass('on')){
				fn_windowFiex();
				$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_p.png");
				$(this).addClass('on');
				$('#ktAllMenu').addClass('on');
				$('.kt-head').addClass('on');
				$(this).attr('title', '전체 메뉴 레이어 닫기');
			}else{
				fn_windowUnset();
				$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_wt_p.png");
				$(this).removeClass('on');
				$('#ktAllMenu').removeClass('on');
				$(this).attr('title', '전체 메뉴 레이어 열기');
			}
			if(mode_chk=="mb"){
				$(".floating_btn").hide();
				$('.floating_btn').removeClass('on');
			}
			fn_kthead_set();
			return false;
		});

		$('#search_btn').click(function(){
			$(".layer_pop .btn_layer_close").click();
			if($('#btnAllMenu').hasClass("on")) $('#btnAllMenu').click();
			if( mode_chk=="mb" && $(".floating_btn").hasClass("on") ){
				$(".btn_float_more").click();
			}
			if(!$(this).hasClass('on')){
				fn_windowFiex();
				$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_p.png");
				$(this).addClass('on');
				$('#search_wrap').addClass('on');
				$('.kt-head').addClass('on');
				$("#in_search").focus();
				$(this).attr('title', '검색 레이어 닫기');
			}else{
				fn_windowUnset();
				$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_wt_p.png");
				$(this).removeClass('on');
				$('#search_wrap').removeClass('on');
				$(this).attr('title', '검색 레이어 열기');
			}
			fn_kthead_set();
			return false;
		});
		$(document).on('scroll', function() {
			if ( $( this ).scrollTop() > 1) {
				$('.kt-head').addClass("on");
				$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_p.png");
				if ( $( this ).scrollTop() > 100) {
					$('.btn_mouse').addClass('off');
				}
			}else{
				if( !$('#search_wrap').hasClass("on") && !$('#btnAllMenu').hasClass("on")){
					//메인 gnb 마우스 오버 상태에서 스크롤했다가 다시 돌아오면, 메뉴가 안보이는 버그 fix : 2021-04-30 이영주
					if($(".dim").css("display") != "block"){
						$('.kt-head').removeClass("on");
						$(".logo > a > img").attr("src","/resource/images/common/gnbLogo_wt_p.png");
					}
				}
			}
			if( $( this ).scrollTop() <= 100) {
				$('.btn_mouse').removeClass('off');
			}
			if(window.innerWidth > 760){
				main_head_news_check();
			}
		});

		$(window).resize(function(){
			if($(window).width()<761){
				$(".sub_tit_txt.j_txt_up").eq(0).addClass("on");
				//$(".kt_pc.main, .main_slider").css("width","100%");
			}else{
				$(".floating_btn").show();
				//$(".kt_pc.main, .main_slider").css("width","1920px");
			}
		}).resize();
	}else{	//메인아닐때
		var fn_windowFiex = function(){	//gnb 공통메뉴 클릭시
			jQuery("html,body").scrollTop(0);//.css("overflow","hidden");
			$('#kt-head').css("position","fixed");
			$(".dim").show();
		}
		var fn_windowUnset = function(){	//gnb 공통메뉴 클릭시
			jQuery("html,body").scrollTop(0);
			$('#kt-head').css("position","relative");
			$(".dim").hide();
		}

		$('.depth1 > li > a').not(".depth1 > li.dx_summit > a").on("focus mouseenter",function(){//210520 dx 추가
			if($('#search_btn').hasClass("on")) $('#search_btn').click();
			if($('#btnAllMenu').hasClass("on")) $('#btnAllMenu').click();
			$('.kt-head').addClass('act').addClass("on");
			$(this).addClass('act').next('.depth2').addClass('on');
			$(this).parent('li').siblings().find('.depth2').removeClass('on');
			$(this).parent('li').siblings().children('a').removeClass('act');
			$('#btnAllMenu').removeClass('on');
			$('#ktAllMenu').removeClass('on');
			$(this).next(".depth2").find("ul > li").eq(0).find("a").mouseover();
			$(".dim").show();
		})
		
		$('.kt-head').mouseleave(function(){
			if( !$('#search_wrap').hasClass("on") && !$('#btnAllMenu').hasClass("on")){
				$('.kt-head').removeClass('act').removeClass("on");
				$('.depth2').removeClass('on');
				$('.depth1 > li > a').removeClass('act');
				$('#search_wrap').removeClass('on');
				$('#search_btn').removeClass('on');
				$('#btnAllMenu').removeClass('on');
				$('#ktAllMenu').removeClass('on');
				if(!$('#search_btn').hasClass("on") && !$('#btnAllMenu').hasClass("on")) $(".dim").hide();
			}
		})

		$('.depth2 > ul > li > a').on("focus mouseenter", function(){
			$('.depth3').removeClass('on');
			$('.depth2 > ul > li > a').removeClass('on');
			$(this).addClass('on').next().addClass('on');
			$(this).closest("ul").next(".img-ban").find("a").eq($(this).closest("li").index()).show().siblings("a").hide();
		});

		$('#btnAllMenu').click(function(){
			$(".layer_pop .btn_layer_close").click();
			if($('#search_btn').hasClass("on")) $('#search_btn').click();
			if(!$(this).hasClass('on')){
				fn_windowFiex();
				$(this).addClass('on');
				$('#ktAllMenu').addClass('on');
				$('#ktHead').addClass('on');
				$('.kt-head').removeClass('act').removeClass("on");
				$('.depth2').removeClass('on');
				$('.depth1 > li > a').removeClass('act');
				$(this).attr('title', '전체 메뉴 레이어 닫기');
				if(mode_chk=="mb"){
					$(".floating_btn").hide();
					$('.floating_btn').removeClass('on');
				}
			}else{
				fn_windowUnset();
				$(this).removeClass('on');
				$('#ktAllMenu').removeClass('on');
				$(this).attr('title', '전체 메뉴 레이어 열기');
				if(!$('#ktHead').hasClass('fixed')){
					$('#ktHead').removeClass('on');
				}
			}
			return false;
		});

		$('#search_btn').click(function(){
			$(".layer_pop .btn_layer_close").click();
			if($('#btnAllMenu').hasClass("on")) $('#btnAllMenu').click();
			if( mode_chk=="mb" && $(".floating_btn").hasClass("on") ){
				$(".btn_float_more").click();
			}
			if(!$(this).hasClass('on')){
				fn_windowFiex();
				$(this).addClass('on');
				$(this).attr('title', '검색 레이어 닫기');
				$('#search_wrap').addClass('on');
				$('#ktHead').addClass('on');
				$('.kt-head').removeClass('act').removeClass("on");
				$('.depth2').removeClass('on');
				$('.depth1 > li > a').removeClass('act');
				$("#in_search").focus();
			}else{
				fn_windowUnset();
				$(this).removeClass('on');
				$(this).attr('title', '검색 레이어 열기');
				$('#search_wrap').removeClass('on');
				if(!$('#ktHead').hasClass('fixed')){
					$('#ktHead').removeClass('on');
				}
			}
			return false;
		});
	}
	/* gnb, 검색, 전체메뉴 e */




	/* 화면넓이에 따른 class설정 760이하 모바일 */
	$(window).resize(function(){
		fn_setWrapClass($(window).width());
	});
	$(window).on("orientationchange",function(event){
		fn_setWrapClass($(window).width());
	});
	var fn_setWrapClass = function(win_width){
		if(win_width<761){
			$(".kt_pc").hide().siblings(".kt_mb").show();
			$('.box_share_wrap').addClass('mb').removeClass('pc');
			mode_chk = "mb";
		} 
		else{
			$(".kt_mb").hide().siblings(".kt_pc").show();
			$('.box_share_wrap').addClass('pc').removeClass('mb');
			mode_chk = "pc";
		} 
	}
	fn_setWrapClass($(window).width());

	//bt 검색 조건
	$('.j_search_sort').on('click','.j_search_sort_open',function() {
		$(this).hide().siblings('.j_search_sort_close').show().siblings('.j_search_sort_cont').slideDown(function() {
			$(this).css('overflow','');
		});
	});
	$('.j_search_sort').on('click','.j_search_sort_close',function() {
		$(this).hide().siblings('.j_search_sort_open').show().siblings('.j_search_sort_cont').slideUp();
	});

	//bt select
	$('.j_select').on('click','.j_select_toggle',function() {
		if($('.j_select_list').is(':animated')) {
			return false;
		}
		$('.j_select_list').slideUp(function() {
			$(this).parents('.j_select').removeClass('on');
		});
		var _this = $(this);
		if (_this.parents('.j_select').hasClass('on')) {
			_this.siblings('.j_select_list').slideUp(function() {
				_this.parents('.j_select').removeClass('on');
				$('.j_select_toggle').attr('title', '목록 열기');
			});
		}else {
			_this.siblings('.j_select_list').slideDown().parents('.j_select').addClass('on');
			$('.j_select_toggle').attr('title', '목록 닫기');
		}
	});
	$('.j_select').on('click','.j_select_list a',function(e) {
		if(!$(this).attr("data-ui-preventdefault")){//2021-01-22 기본 액션을 방지하면 안되는 경우, data-ui-preventdefault="true" 사용 (개인정보처리방침에서 파일 다운로드)
			e.preventDefault();
			$($(this).attr('href')).text($(this).text());
		}
		$(this).parents('li').addClass('on').siblings().removeClass('on');
		$('.j_select_toggle').attr('title', '목록 열기');
		$(this).parents('.j_select_list').slideUp(function() {
			$(this).parents('.j_select').toggleClass('on');
		});
	});
	$(document).on('click',function(e) {
		if($(e.target).parents('.j_select').length == 0) {
			$('.j_select_list').stop().slideUp(function() {
				$(this).parents('.j_select').removeClass('on');
			});
		}
	});

	//bt sort
	$('.j_pc_sort').slick({
		slidesToShow: 8,
		infinite: false
	});
	$('.j_pc_sort').on('click','.j_pc_sort_btn',function() {
		$(this).parents('.j_pc_sort').find('.j_pc_sort_btn').removeClass('on');
		$(this).addClass('on');
	});
	$('.j_mb_sort').on('click','.j_mb_sort_toggle',function() {
		$(this).toggleClass('on').siblings('.inner').slideToggle();
	});
	$('.j_mb_sort').on('click','label',function() {
		$(this).closest('.inner').slideToggle();
		$(this).parents('.j_mb_sort').find('.j_mb_sort_toggle').toggleClass('on').text($(this).text());
	});

	//bt scroll tab
	function scrollTab() {
		if($('.j_pc_scroll_fix').length>0){
			if ($(document).scrollTop() > $('.j_pc_scroll_fix').offset().top) {//21-02-22 모바일에서 로딩후, 화면 사이즈 키웠을때 서브탭 사라지는 현상 수정
				$('.j_pc_scroll_fix_cont').addClass('fixed');
			}else {
				$('.j_pc_scroll_fix_cont').removeClass('fixed');
			}
		}
	}
	scrollTab();

	//bt btn more
	$('.j_bnr_list').on('click','.j_btn_more',function(e) {
		e.preventDefault();
		var normalItemLen = $(this).parents('.j_bnr_list').find('>ul>li').not('.j_bnr_item').length,
		onItemLen = $(this).parents('.j_bnr_list').find('.j_bnr_item').length;
		$(this).hide();
		$(this).parents('.j_bnr_list').find('.j_bnr_item').each(function() {
			var _this = $(this);
			setTimeout(function() {
				_this.parents('.j_bnr_list').find('.j_bnr_item').eq(_this.index() - normalItemLen).addClass('on');
				if(_this.index() - normalItemLen == onItemLen - 1) {
					_this.parents('.j_bnr_list').find('.j_bnr_item').removeClass('j_bnr_item');
				}
			},(_this.index() - normalItemLen)*300);
		});
	});

	//bt txt up
	function txtUp() {
		$('.j_txt_up').each(function() {
			if(window.innerHeight + $(document).scrollTop() >= $(this).offset().top + $(this).height()) {
				$(this).addClass('on');
			}
		});
	}
	txtUp();
		

	//bt banner slide
	$('.j_banner_slide').slick({
		infinite: false
	});

	$('.j_banner_slide02').slick({
		slidesToShow: 3,
		infinite: false,
		responsive: [
			{
			  breakpoint: 760,
			  settings: {
				slidesToShow: 1
			  }
			}
		]
	});

	//bt toggle slide
	$('.j_toggle_slide').on('click','.j_toggle_btn',function() {
		$(this).toggleClass('on').siblings('.j_toggle_cont').slideToggle();
	});

	//scroll
	$(document).scroll(function() {
		scrollTab();
		txtUp();
	});


	/* 추가 20-11-05 - 전체메뉴 s */
	//모바일 : 전체 메뉴 열렸을 때 닫기 버튼 누르면 메뉴 감추기
	$('#btnAllMenu_m').click(function(){
		$('#btnAllMenu').click();
		$(".floating_btn").show();
	});
//모바일 : 1차 메뉴 눌렀을때 오르쪽에 해당 메뉴 보이기 
	$('.gnb_dth_1 > strong > a').click(function(){
		$(this).parents('.gnb_dth_1').addClass('on').siblings().removeClass('on');
	});
//4뎁스 있을때 
	$('.gnb_dth_3 > li.more > a.more_plusbtn').on('click', function(){
		if($(this).hasClass('active')){
			$('.gnb_dth_4').stop().slideUp();
			$('.gnb_dth_3 > li.more > a').removeClass('active');
			//22-02-08 타이틀 추가
			$(this).find('span').attr('title', '하위메뉴더보기');
		}else{
			$('.gnb_dth_4').stop().slideUp();
			$('.gnb_dth_3 > li.more > a').removeClass('active');
			$(this).closest('.more').find('.gnb_dth_4').stop().slideDown();
			$(this).addClass('active');
			//22-02-08 타이틀 추가
			$(this).find('span').attr('title', '하위메뉴접기');
		}
	});	
/* 추가 20-11-05 - 전체메뉴 e 20-11-05*/	

	// [S] floating_bar 
	$('.floating_btn .btn_float_more').on('click', function(){
		if($("#search_btn").hasClass("on")) $("#search_btn").click();
		if($("#btnAllMenu").hasClass("on")) $("#btnAllMenu").click();
		if($(this).closest('.floating_btn').hasClass('on')){
			$('.dim').hide();
			$(this).closest('.floating_btn').removeClass('on');
		}else{
			$('.dim').show();
			$(this).closest('.floating_btn').addClass('on');
		}
	})

	$('.floating_btn .top').click(function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 500);
	})

	$(window).scroll(function() {
		var position = $(window).scrollTop();
		if(position > 100){
			$('.floating_btn .top').addClass('on');
		}else{
			$('.floating_btn .top').removeClass('on');
		}
	})
	// [E] floating_bar 


	/* sns공유 s*/
	$('.btn_share.type2').on('click mouseenter', function(e){
		e.preventDefault();
		var $this = $(this),
			$ptop = "";
		if($this.parents('div').hasClass('kt_pc')){
			var $ptop = $('.kt_pc .btn_share').offset().top + 22+'px',
					$shareBox = $('.box_share_wrap');
			$shareBox.css({'position':'absolute','top':$ptop,'z-index':'11'});			
			$(window).scroll(function(){
				var $ptop = $('.kt_pc .btn_share').offset().top + 22+'px';
				
				if($('.sub_tab_fix').hasClass('fixed')){
					$shareBox.css({'position':'fixed','top':22 + 'px'});
				}else{
					$shareBox.css({'position':'absolute','top':$ptop,'z-index':'11'});
				}
			});
			$shareBox.show().find('li:first-child > a').focus();
		}
		e.preventDefault();        
	});
	$(".kt_pc .top_visual").mouseenter(function(){
		$('.box_share_wrap').hide();
	});
    $('.box_share').mouseleave(function(e){
		$('.box_share_wrap').hide();        
	});

    $('.btn_share').on('click mouseenter',function(e){
		e.preventDefault();
		var $this = $(this),
			$ptop = "";
		if(!$this.hasClass('type2')){
			if($this.parents('div').hasClass('kt_pc')){
				var $ptop = $('.kt_pc .btn_share').offset().top + 0 + 'px',
					$shareBox = $('.box_share_wrap');
				$shareBox.show().css({'position':'absolute','top':$ptop, 'z-index':'9'});
			}else{
				var $shareBox = $('.box_share_wrap');
				$shareBox.show().find('li:first-child > a').focus();
			}
		}
		e.preventDefault();        
	});


	$('.kt_mb .btn_share').click(function(){
		$('.dim').show()
	});
    $('.sns_pop_close').click(function(){
        $('.btn_share').removeClass('on').focus();
		$('.box_share_wrap').hide();
		$('.dim').hide();

	});	
    /* sns공유 e*/
    
	// [S]검색 완료부분
	$('.faq_list li a').unbind("click").on('click', function(){
		$(this).closest('li').toggleClass('on').siblings('li').removeClass('on');
	});
	
	$('.kt_pc .tab.type01 a').not(".kt_pc .tab.commonIgnore a").on('click', function(){
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
	});

	$('.kt_pc .popular_word, .search_cont .roll_wrap').mouseover(function(){
		if(mode_chk == "pc"){
			$(this).addClass('on');
		}
	}).mouseout(function(){
		$(this).removeClass('on');
	});

	$('.kt_mb .tab.type01 a').on('click', function(){
		$(this).toggleClass('on');
		$(this).siblings('ul').find('li').on('click', function(){
			$(this).addClass('on').siblings('li').removeClass('on');
		})
	});

	// $('.more_list > ul').each(function(){
	// 	var total_li = $(this).children('li').length;
	// 	$(this).children('li').hide().slice(0, 3).show();
	// 	if(total_li < 4){
	// 		$(this).siblings('.btn').hide();
	// 	}
	// });

	// $('.btn .btn_more').on('click', function(e){
	// 	e.preventDefault();
	// 	$(this).closest('.more_list').children('ul').children('li:hidden').slice(0, 3).show();
	// 	if($(this).closest('.more_list').children('ul').children('li:hidden').length == 0){
	// 		$(this).closest('.btn').hide();
	// 	}
	// });
	
	// [E]검색 완료부분


	//[S] 탭 
    var tabMenu = $(".tab_menu");

    tabMenu.find("ul > li > div").hide();
    tabMenu.find("li.active > div").show();
    
    //22-02-11 선택된 상태값 추가
    tabMenu.find("li.active").children("a").attr("title", '현재 선택됨');

    function tabList(e){
        e.preventDefault(); 
        var target = $(this);
        target.next().show().parent("li").addClass("active").siblings("li").removeClass("active").find(" > div").hide();
        target.next().show().parent("li.active").find("a").attr("title", "현재 선택됨");
        target.next().show().parent("li.active").siblings("li").find("a").attr("title", "");

    }

    tabMenu.find("ul > li > a").click(tabList);
    //tabMenu.find("ul > li > a").click(tabList).focus(tabList);
    
	//[E] 탭 

	//팝업닫기
    $(".pop_wrap_all .pop_close").on("click",function(e){
		e.preventDefault();
		$(".pop_wrap_all").hide();
		$(".dim").hide();
		$("html").css("overflow","auto") ;
		$('.box_share_wrap').hide();
		$(".pop_wrap_all .btn_share").removeClass('on');
    }) 

	$(document).on('click', '.layer_wrap .list_depth1 li button', function(){
		$(this).closest('li').toggleClass('on').siblings().removeClass('on');
	});
	
	//2022-02-04 하위메뉴 상태값 수정
	$('.list_depth2 li').click(function(){
		if(!$(this).hasClass('on')){
			$(this).find('button').attr('title', '하위 메뉴 접기')
		}else{
			$(this).find('button').attr('title', '하위 메뉴 더보기')
		}
	});

	$('.list_sub li a').on('click', function(){
		var tab_id = $(this).attr('id');
		$(this).parent('').addClass('on').siblings().removeClass('on');	
		$("div"+'#'+tab_id+'_2').addClass('on').siblings().removeClass('on');
	});

//	$(".layer_pop .btn_layer_close, .layer_pop .btn_medium a").on("click",function(e){
//		e.preventDefault();
//		$(".layer_pop").hide();
//		$(".dim").hide();
//		$("html,body").css("overflow","auto");
//	});
	
	$(".layer_pop .btn_layer_close").on("click",function(e){
        e.preventDefault();
        $(".layer_pop").hide();
        $(".dim").hide();
        $(".layer_pop.video").find("iframe").attr("src", "");
        $(".layer_pop.video_share").find("iframe").attr("src", "");
        //$("html").css("overflow","auto");
    });

	// footer 팝업 체크박스 모두 동의체크 
	$('.pop_chk_wrap .agree_list li').on('click', '.agree_chk button', function(){
		$(this).closest('li').toggleClass('on').siblings().removeClass('on');
		if($(this).closest('li').hasClass('on')){
			$(this).text('하위내용 열림');
			$(this).closest('li').find('.agree_info').slideDown();
			$(this).closest('li').siblings().find('.agree_chk button').text('하위내용 닫힘');
			$(this).closest('li').siblings().find('.agree_info').slideUp();
		}else{
			$(this).text('하위내용 닫힘');
			$(this).closest('li').find('.agree_info').slideUp();
		}
	})

	$('.pop_chk_wrap .agree_chk.all input').on('change', function(){
		if($(this).prop('checked') == true) {
			$(this).closest('.pop_chk_wrap').find('.agree_list').find('.agree_chk input').prop('checked', true);
		}else{
			$(this).closest('.pop_chk_wrap').find('.agree_list').find('.agree_chk input').prop('checked', false); 
		}
	}); 
	
	$('.pop_chk_wrap .agree_list .agree_chk input').on('change', function(){
		var all_length = $(this).closest('.pop_chk_wrap').find('.agree_list .agree_chk input').length;
		var chk_num = $(this).closest('.pop_chk_wrap').find('.agree_list .agree_chk input:checked').length;
		if(chk_num == all_length){
			$(this).closest('.pop_chk_wrap').find('.agree_chk.all input').prop('checked', true); 
		}else{
			$(this).closest('.pop_chk_wrap').find('.agree_chk.all input').prop('checked', false);  
		}
	}); 


	//상품  페이지

	//컨설팅 버튼 클릭 하면 팝업뜸 
	// $(".kt_pc.pd .sub_tab aside.aside li.consulting a").on("click",function(e){
	// 	pop_open3(e);
	// });   

	//pc_라이브러리
	$('.pc_library').slick({
		infinite: false
	});

	//mobile_고객성공사례
	$('.mb_success').slick({
		infinite: false
	}); 
	//mobile_인사이트
	$('.mb_insight').slick({
		infinite: false
	});  
	//mobile_추천상품
	$('.mb_recomm').slick({
		infinite: false
	}); 
	
	//mobile_그림확대버튼 클릭하면 팝업뜸
	// $('.kt_mb.pd figure').wrapAll('<div class="figure_wrap"></div>') ;
	// $('.kt_mb.pd figure').css('position','relative');
	// $('.kt_mb.pd figure + a').css('position','absolute');
	
	$('.kt_mb.pd figure + a, .kt_mb.pd figure + div + a').each(function(i){
    /* 20-12-14 수정  e */
		$(this).wrap('<div class="open_big_wrap" id="open_big'+i+'"></div>')
	});
	$('.kt_mb.pd figure').each(function(i){
    /* 20-12-14 수정  e */
		$(this).addClass('open_big'+i)
	});
	$('.kt_mb.pd .open_big').on('click', function(e){
		e.preventDefault();
		var tid = $(this).closest(".open_big_wrap").attr("id");
		$(this).closest('.diagram').find('figure.'+tid).addClass('view_pic');
		$(this).closest('.diagram').find('figure.'+tid).find('.close_big').css('display','block');
	});	
	$('.kt_mb.pd .close_big').on('click', function(e){
		e.preventDefault();
		$(this).parent().removeClass('view_pic');
		$(this).siblings().closest('figure').find('.close_big').css('display','none');
		// $('html,body').css('overflow','auto');
	})

	//탭클릭시 해당메뉴 이동(PC)
	$(".kt_pc .sub_tab").find(".inner > ul > li > a").click(function(){
		$(this).closest("li").addClass("on").siblings("li").removeClass("on");
		var tar_menu_name = $(this).attr("data-txt");
		$(this).closest(".kt_pc").find("section").find("h3, h2").each(function(){
			if(tar_menu_name==$(this).attr("data-txt")){
				try{ $("html, body").animate({scrollTop: $(this).offset().top - 100 }, 500, function(){ $(this).click(); })	}catch(e){
					console.log(e);
				}
			}
		});
	});
	//탭클릭시 해당메뉴 이동(mobile)
	$(".kt_mb .sub_tab").find(".j_toggle_cont > li > a").click(function(){
		var tar_menu_name = $(this).attr("data-txt");
		$(this).closest(".kt_mb").find("section").find("h3, h2").each(function(){
			if(tar_menu_name==$(this).attr("data-txt")){
				try{ 
					if($(".sub_tab_toggle").hasClass("on")) $(".sub_tab_toggle").click();
					$(".sub_tab_toggle").text(tar_menu_name);
					var top_position = $(this).offset().top - 90;
					$("html, body").animate(
						{ scrollTop: top_position }
					, 500, function(){ $(this).click(); });
				}catch(e){
					console.log(e);
				}

			}
		});
	});

	//스크롤시 해당 탭 메뉴 활성(PC)
	var tab_menu_y = new Array(); //각페이지 메뉴와 y위치 PC
	var tab_menu_ym = new Array(); //각페이지 메뉴와 y위치 mobile
	setTimeout(function(){
		$(".kt_pc .sub_tab").find(".inner > ul > li > a").each(function(){
			if($(this).attr("data-txt")!=undefined){
				var sec_name = $(this).attr("data-txt");
				$(".kt_pc").find("section").find("h3, h2").each(function(i){
					if($(this).attr("data-txt")!=undefined){
						if(sec_name==$(this).attr("data-txt")){
							tab_menu_y.push( $(this).attr("data-txt") +"||"+ ($(this).offset().top - 110) );
						}
					}		
				});
			}
		});
		//스크롤시 해당 탭 메뉴 활성(mobile)
		$(".kt_mb .sub_tab").find(".j_toggle_cont > li > a").each(function(){
			if($(this).attr("data-txt")!=undefined){
				var sec_name = $(this).attr("data-txt");
				$(".kt_mb").find("section").find("h3, h2").each(function(i){
					if($(this).attr("data-txt")!=undefined){
						if(sec_name==$(this).attr("data-txt")){
							tab_menu_ym.push( $(this).attr("data-txt") +"||"+ ($(this).offset().top - 100) );
						}
					}		
				});
			}
		});
	}, 2000);
	var fn_tab_slide = function(y){
		if(mode_chk=="pc"){
			for(var i=0;tab_menu_y.length>i;i++){
				var tab_data = tab_menu_y[i];
				var tab_y = parseInt(tab_data.split("||")[1])-20;
				var tab_name = tab_data.split("||")[0];
				if(y>tab_y){
					$(".kt_pc .sub_tab").find(".inner > ul > li > a").each(function(){
						if($(this).attr("data-txt")!=undefined){
							if($(this).attr("data-txt")==tab_name){
								$(this).closest("li").addClass("on").siblings("li").removeClass("on");
							}
						}
					});
				}
			}
		}else{
			for(var i=0;tab_menu_ym.length>i;i++){
				var tab_data = tab_menu_ym[i];
				var tab_y = parseInt(tab_data.split("||")[1])-20;
				var tab_name = tab_data.split("||")[0];
				if(y>tab_y){
					$(".sub_tab_toggle").text(tab_name);
				}
			}
		}
	}
	$(window).scroll(function() {
		var position = $(window).scrollTop();
		fn_tab_slide(position);
	});


	//why kt, 가치, 기대효과 배경 랜덤이미지
	if($(".kt_pc .tbl_value_box").length>0){
		var ran_num = getSecureRandom(19) + 1;
		if(ran_num<10) ran_num = "0"+ran_num;
		$(".kt_pc .tbl_value_box").css("background-image", "url('/resource/images/pd/bg_1080x500_pc_"+ran_num+".png')");
	}
	if($(".kt_pc .ex_effect_top.bg_pagecode").length>0){
		var ran_num = getSecureRandom(19) + 1;
		if(ran_num<10) ran_num = "0"+ran_num;
		$(".kt_pc .ex_effect_top.bg_pagecode").css("background-image", "url('/resource/images/pd/bg_1920x400_pc_"+ran_num+".png')");
	}
	if($(".kt_mb .ex_effect_top.bg_pagecode").length>0){
		var ran_num = getSecureRandom(19) + 1;
		if(ran_num<10) ran_num = "0"+ran_num;
		$(".kt_mb .ex_effect_top.bg_pagecode").css("background-image", "url('/resource/images/pd/bg_1080X1400_mb_"+ran_num+".png')");
	}
	if($(".kt_mb .value_box_list").length>0){
		var ran_num = getSecureRandom(19) + 1;
		if(ran_num<10) ran_num = "0"+ran_num;
		$(".kt_mb .value_box_list").css("background-image", "url('/resource/images/pd/bg_1080X1400_mb_"+ran_num+".png')");
	}

	// 하단 플롯유틸 뉴스레터 이메일 직접입력
	$('.email_con .selectset').on('change','select', function() {
		var _this = $(this);
		if(_this.children('option:selected').val() == '직접입력') {
			_this.addClass('hide');
			setTimeout(function(){
				_this.siblings('.sel_direct').addClass('show').select();
			}, 100);
			setTimeout(function(){
				_this.siblings('.sel_direct').trigger('focus');
			}, 200);
			//$(this).siblings('.sel_direct').addClass('show').trigger('focus');
		}
	});
	
	$('.email_con .selectset').on('blur','.sel_direct', function(){
		if($(this).val() == ''){
			$(this).siblings('.selectset select').removeClass('hide').val('메일선택');
			$(this).removeClass('show');
		} 
	});

	$('.layer_wrap .btn_layer_share').on('click mouseenter',function(e){
		e.preventDefault();
		$('.share_wrap').addClass('active');
	});
	$('.share_conts').mouseleave(function(e){
		e.preventDefault();
		$('.share_wrap').removeClass('active');
	});
    $('.layer_wrap .share_wrap .sns_pop_close').click(function(){
		$('.share_wrap').removeClass('active').focus();
		$('.dim').show();
	});	
    
	//컨설팅신청 아이콘 title="컨설팅신청 추가" - 2020-12-29 접근성곤련 삭제
	//$("li.consulting").find("a").attr("title","컨설팅신청").find("img").attr("alt","컨설팅신청");
	
	//검색 입력영역 우측 x버튼(검색어지움) 기능
	$(".search_cont .search_input .btn_del").click(function(){
		$("#in_search").val("");
	});
});

//[S] 팝업공통
//팝업열기 - form
function pop_open(e, tar) {
	e.preventDefault();
	$(".pop_wrap_all").show();
	$(".dim").show();
	$("html,body").css("overflow","hidden")

};

//메인 팝업열기 - form
function main_pop_open(e, tar) {
	e.preventDefault();
	$(tar).show();
	$(".dim").show();
	$("html,body").css("overflow","hidden");
};
//[E] 팝업공통

// window opne pop
function openPopUp(url, name){
	var options = 'width=500, height=600, top=30, left=30, resizable=no, scrollbars=no, location=no';
	window.open(url, name, options);
}	

//플로팅버튼 관련 팝업 기능
function floating_pop_open(class_n,murl,tit,_thisthis, txt){
	if(class_n=="product" || class_n=="news" || class_n=="consulting"){
		if($("#search_btn").hasClass("on")) $("#search_btn").click();
		if($("#btnAllMenu").hasClass("on")) $("#btnAllMenu").click();	// 2020-12-17 추가
	}
	if(class_n=="video"){
		//팝업 백그라운드 스크롤 비활성화
		//$("html").css("overflow", "hidden").on("scroll touchmove mousewheel", function(e){
			//e.preventDefault();
		//});
	}
	if($(".banner_list04").length>0){
		$(".layer_pop .btn_layer_close").on("click", function(){
			//팝업 백그라운드 스크롤 활성화
			//$("html, body").css("overflow", "").off("scroll touchmove mousewheel");
		});
		if( $(_thisthis).closest(".slick-slide").hasClass("slick-center") && class_n=="video" ){
			//팝업 백그라운드 스크롤 비활성화
			//$("html").css("overflow", "hidden").on("scroll touchmove mousewheel", function(e){
				//e.preventDefault();
			//});
			$(".layer_pop." + class_n).attr("tabindex", 0).show().focus();
			$(".dim").show();
			setTimeout(function(){ $(".layer_pop.video").find("iframe").attr("src", murl); }, 200);	// 2020-12-17 수정
			$("#popupVideoNo .layer_wrap .layer_tit > p").html(tit);
			//공유하기 없는 동영상 팝업 영역(메인페이지 하단) 자막 영역 노출 pc
			if (videoTxt != null && videoTxt.length > 0) {
				for (var t=0; t<videoTxt.length; t++){
					if (videoTxt[t].name.split(".")[0] == txt) {
						$("#popupVideoNo .layer_wrap .layer_conts .video_txt").show();
						$("#popupVideoNo .layer_wrap .layer_conts .video_txt").html(videoTxt[t].txt);
						break;
					} else {
						$("#popupVideoNo .layer_wrap .layer_conts .video_txt").hide();
					}
				}
			} else {
				$("#popupVideoNo .layer_wrap .layer_conts .video_txt").hide();
			}
		}else if( mode_chk=="mb" && class_n=="video"){	// 2020-12-17 추가
			//팝업 백그라운드 스크롤 비활성화
			//$("html").css("overflow", "hidden").on("scroll touchmove mousewheel", function(e){
				//e.preventDefault();
			//});
			$(".layer_pop." + class_n).attr("tabindex", 0).show().focus();
			$(".dim").show();
			setTimeout(function(){ $(".layer_pop.video").find("iframe").attr("src", murl); }, 200);	// 2020-12-17 수정
			$("#popupVideoNo .layer_wrap .layer_tit > p").html(tit);
			//공유하기 없는 동영상 팝업 영역(메인페이지 하단) 자막 영역 노출 m
			if (videoTxt != null && videoTxt.length > 0) {
				for (var t=0; t<videoTxt.length; t++){
					if (videoTxt[t].name.split(".")[0] == txt) {
						$("#popupVideoNo .layer_wrap .layer_conts .video_txt").show();
						$("#popupVideoNo .layer_wrap .layer_conts .video_txt").html(videoTxt[t].txt);
						break;
					} else {
						$("#popupVideoNo .layer_wrap .layer_conts .video_txt").hide();
					}
				}
			} else {
				$("#popupVideoNo .layer_wrap .layer_conts .video_txt").hide();
			}
		}else if(class_n!="video"){
			$(".layer_pop." + class_n).attr("tabindex", 0).show().focus();
			$(".dim").show();
		}
	}else{
		$(".layer_pop .btn_layer_close").on("click", function(){
			//팝업 백그라운드 스크롤 활성화
			//$("html, body").css("overflow", "").off("scroll touchmove mousewheel");
		});
		$(".layer_pop." + class_n).attr("tabindex", 0).show().focus();
		$(".dim").show();
		$('.floating_btn').removeClass('on');
		if(class_n=="video"){
			setTimeout(function(){ $(".layer_pop.video").find("iframe").attr("src", murl); }, 200);		// 2020-12-17 수정
			$("#popupVideoNo .layer_wrap .layer_tit > p").html(tit);
			//공유하기 없는 동영상 팝업 영역(상품 페이지) 자막 영역 미노출
			$("#popupVideoNo .layer_wrap .layer_conts .video_txt").hide();
			/*if (videoTxt != null && videoTxt.length > 0) {
				for (var t=0; t<videoTxt.length; t++){
					if (videoTxt[t].name.split(".")[0] == tit) {
						$("#popupVideo .layer_wrap .layer_conts .video_txt").show();
						$("#popupVideo .layer_wrap .layer_conts .video_txt").text(videoTxt[t].txt);
						break;
					} else {
						$("#popupVideo .layer_wrap .layer_conts .video_txt").hide();
					}
				}
			} else {
				$("#popupVideoNo .layer_wrap .layer_conts .video_txt").hide();
			}*/
		}
	}
};

//플로팅버튼 관련 팝업 기능
// function floating_pop_close(class_n){
// 	$(".layer_pop." + class_n).hide();
// 	$(".dim").hide();
// 	$("html,body").css("overflow","auto")
// };

//플로팅버튼 만족도조사 팝업
function fn_standAlone(){
	var widget_id = "B2B_WEB_SITE_SDEG";	//위젯아이디
	var widget_key_dev = "33bc4eac-14ff-4877-b145-4de5139251ed"	//위젯키  dev
	var widget_key_prd = "c6fd8d87-da25-424e-b6df-3f9333c96e95"	//위젯키  prd
    window.open('https://dt.kt.co.kr/web/widget/sdeg.html?k='+widget_key_prd+'&w='+widget_id ,'popup','width=460, height=675, toolbar=no, location=no, status=no, menubar=no');
}   

//비즈테크  리스트 스티커 클릭
function fn_listLabel_click(id){
	var tar_radio = $(".kt_mb .search_sort_list").find("input:radio[value="+id+"]");
	tar_radio.prop("checked",true);
	tar_radio.closest('.j_mb_sort').find('.j_mb_sort_toggle').text(tar_radio.next("label").text());
}

//2021 publisher modify
//tabmenu prototype : none redirect
function Tabs(obj){
	var element = obj, i = 0;
	function Tab(){}
	Tab.prototype.init = function(obj){
		this.wrap = $(obj);
		this.ul = $("ul", this.wrap);
		this.li = $("li", this.ul);
		this.hash = $("li.active", this.ul).find("a").attr("href").split("#")[1];
		this.on = $("#" + this.hash);

		var that = this;

		this.li.click(function(){
			that.hash = $(this).find("a").attr("href").split("#")[1];
			that.li.removeClass("active");
			that.li.find("> a").attr("title", "");
			$(this).addClass("active");
			$(this).find("a").attr("title", "선택된 탭");
			that.on.hide();
			that.on = $("#" + that.hash);
			that.on.show().focus();
			return false;
		});
	}
	for(; i < element.size(); i++){
		instance = new Tab();
		instance.init(element[i]);
	}
}

//responsive function
var responsiveCallbackFn = (function(objs){
	var obj = objs,
		initResize,
		initModule,
		props = [],
		i;

	for(i in obj){
		props.push([i.split("-")[0], i.split("-")[1], obj[i].name, obj[i].callback]);
	}

	var responsive = {
		oldsize : 0,
		newsize : 0,
		init : function(){
			var resolution = "",
				w = window.innerWidth,
				i = 0,
				callback;

			for(; i < props.length; i++){
				if(w >= props[i][0] && w < props[i][1]){
					resolution = props[i][2];
					callback = props[i][3];
				}
			}
			this.newsize = resolution;
			if(this.oldsizeChk === undefined){
				this.oldsize = resolution;
				this.oldsizeChk = "complete";
			}
			if(this.oldsize != this.newsize){
				this.oldsize = resolution;
				callback();
			}
		}
	}

	initModule = function(){
		responsive.oldsize = null;
		responsive.oldsizeChk = "complete";
		responsive.init();
		return this;
	}

	initResize = function(){
		responsive.oldsize = 0;
		responsive.oldsizeChk = undefined;
		$(window).resize(function(){
			responsive.init();
		});
		return this;
	}

	return {
		ready : initModule,
		resize : initResize
	};

});

/*
	responsive js call : window resize 시 매번 호출하면 성능 이슈가 생기므로, 특정 구간으로 변경되었을때 한번만 콜백을 호출한다.
	ex : 메인의 slick.js event destroy 또는 location 영역의 iscroll destroy 처럼 event unbind 후 다시 bind 가 필요할때 사용
	화면 리사이징 할때, 실행될 콜백을 아래의 함수 안에 작성해도 되고 아래 샘플을 복사해서 사용해도 된다.
*/
/*
responsiveCallbackFn({
	"760-3840" : {
		"name" : "pc",
		"callback" : function(){
			//console.log("pc");
		}
	},
	"320-760" : {
		"name" : "tablet",
		"callback" : function(){
			//console.log("tablet");
			//$(".main_visual_top").slick("unslick");
		}
	},
	"0-320" : {
		"name" : "mobile",
		"callback" : function(){
			//console.log("mobile");
		}
	}
}).ready().resize();//ready가 붙으면, 로딩시에 호출 / resize가 붙으면 리사이즈 이벤트도 바인딩
*/

function getSecureRandom(value){
	var rng = window.crypto || window.msCrypto;
	if(rng === undefined) throw 'No suitable RNG found';

	Math.secureRandom = function(){
		return Math.floor(rng.getRandomValues(new Uint32Array(1))[0] / 4294967296 * (value + 1));
	};
	return Math.secureRandom();
}

//main.jsp 에서는 머리띠 있을때 헤더의 위치 유동적으로 변경
function main_head_news_check(){
	var ktHead = $("#kt-head"),
		ktAllMenu = $("#ktAllMenu"),
		obj = $("#main_head_news_wrap"),
		searchSection = $("#search_wrap"),
		t = $(document).scrollTop();

	if(obj.size() === 1){
		if(t < 72){
			ktHead.css("margin-top", -Math.min(t, 72) + "px");
			ktAllMenu.css("margin-top", -Math.min(t, 72) + "px");
			searchSection.css("margin-top", -Math.min(t, 72) + "px");
			ktHead.addClass("hasRollingBanner");
		}else{
			ktHead.css("margin-top", -72 + "px");
			ktAllMenu.css("margin-top", 0 + "px");
			searchSection.css("margin-top", 0 + "px");
			ktHead.removeClass("hasRollingBanner");
		}
	}else{
		ktHead.css("margin-top", 0);
		searchSection.css("margin-top", 0);
	}
}
if(location.href.search("main.jsp") > 0){
	responsiveCallbackFn({
		"760-3840" : {
			"name" : "pc",
			"callback" : function(){
				main_head_news_check();
			}
		},
		"0-760" : {
			"name" : "mobile",
			"callback" : function(){
			}
		}
	}).ready().resize();
}

//newsletter 구독신청 레이어 띄우기(DX Insight 에서만 뜨게)
var newsLetterLayer = {
	datas : [
		"bt/P_BT_SM",
		"bt/P_BT_TI_LT_001",
		"bt/P_BT_TI_PU_001",
		"bt/P_BT_TI_VW_001",
		"bt/P_BT_VG_LT_001",
		"bt/P_BT_VG_VW_001",
		"bt/P_BT_CF_LT_001",
		"bt/P_BT_CF_VW_001",
		"bt/P_BT_MR_LT_001",
		"bt/P_BT_MR_VW_001",
		"bt/P_BT_SR_001"
	],
	init : function(){
		var i = 0,
			valid = false,
			html = "",
			submit,
			closer;
		for(; i < this.datas.length; i++){
			if(location.href.search(this.datas[i]) > 0){
				valid = true;
				break;
			}else{
				valid = false;
			}
		}
		if(!valid) return false;
		html = $("<div class=\"pop_newsletter_register\" id=\"pop_newsletter_register\"><div class=\"pop_inner\"><p class=\"txt\">다양한 DX 정보를<br>정기적으로 받아 보실 수 있습니다.</p><a href=\"#\" class=\"btn_regist\"><span>뉴스레터 구독신청</span></a><button type=\"button\" class=\"btn_closer\"><span>닫기</span></button></div></div>");
		html.prependTo("body");

		submit = $("#pop_newsletter_register .btn_regist");
		submit.click(this.submit);
		closer = $("#pop_newsletter_register .btn_closer");
		closer.click(this.layer_close);
	},
	layer_close : function(){
		$("#pop_newsletter_register").remove();
		return false;
	},
	submit : function(){
		$("#btnFloatinbNewsLetter").click();
		$("#pop_newsletter_register").remove();
		return false;
	}
};

//크롬 최적화 공지띄우기
var chromeOptimized = {
	init : function(){
		var that = this,
			url = document.referrer.search("enterprise.kt.com"),
			isIE = false,
			delay,
			delayTime = 100,
			html = "<div class='chrome_optimized' id='chrome_optimized'>";
			html +=		"<div class='inner_wrap'>";
			html +=			"<span class='txt'>이 사이트는 <span class='ico'></span>크롬에 최적화되어 있습니다.</span>";
			html +=			"<a href='https://www.google.co.kr/intl/ko/chrome/' target='_blank' title='새창이동'>크롬 다운로드</a>";
			html +=			"<button type='button' class='layer_close'><span>닫기</span></button>";
			html +=		"</div>";
			html += "</div>";

			if(navigator.appName === "Microsoft Internet Explorer"){//windows 7 : IE 7,8,9,10
				isIE = true;
			}else if(navigator.appName === "Netscape" && navigator.userAgent.toLowerCase().search("trident") > 0){//windows10 : IE 11
				isIE = true;
			}else{}

		if(isIE && url === -1){//ie이고, referrer 가 엔터프라이즈가 아닐때...
			$(html).prependTo("body");
			delay = setTimeout(function(){
				move();
			}, delayTime);
		}

		this.obj = $("#chrome_optimized");
		this.layer_close = this.obj.find(".layer_close");
		this.layer_close.click(remove);

		function move(){
			that.obj.animate({
				"height" : 98 + "px"
			}, 500);
		}

		function remove(){
			that.obj.animate({
				"opacity" : 0
			}, {
				duration : 500,
				complete : function(){
					that.obj.remove();
				}
			});
		}
	}
};


/* 2021-07-19 : AI 서빙로봇 컨설팅신청 팝업을 띄울것인지 여부 - 이영주 */
function isOnConsulting(pass){
	var url = location.href.search(/fromEmail=RegistConsulting/);
	var pageCode = location.href.search(/pageCode=AI_RB_004/);
	var showConsulting = {
		pop_title : $("#popupConsulting .layer_wrap .layer_tit h3"),
		floatingBtn : $(".floating_btn .consulting a"),
		select1 : $("#pro1"),
		select2 : $("#pro2"),
		select3 : $("#pro3"),
        regist_num : $("#pop_c_regist_number").closest("tr"),
        regist_call : $("#pop_c_regist_call").closest("tr"),
		isOnConsulting : function(){
			this.pop_title.html("상담신청");
			this.floatingBtn.click();
			this.select1.find("option[value='AI']").attr("selected", "selected");
			this.select1.change();
			this.select2.show().find("option[value='AI Robot']").attr("selected", "selected");
			this.select2.change();
			this.select3.show().find("option[value='AI 서빙로봇']").attr("selected", "selected");
			this.select3.change();
            this.regist_num.remove();
            this.regist_call.remove();
		}
	};

	if (url > 0 && pageCode > 0) {
		showConsulting.isOnConsulting();
	}
	if(pass == true){
		showConsulting.isOnConsulting();
	}
}

function openChatBot(){
	KT_trackClicks('KT-개인_공통', '^KT-개인_공통^메인페이지^버블메시지');
	if(mode_chk == 'pc'){
		window.open('https://ibot.kt.com/client/chat.html?channelToken=b6841d2830b64f328fdc61c387b7021c', 'windowPop', 'width=420, height=670, left=200, top=200, resizable = yes');
	}else{
		window.open('https://ibot.kt.com/client/chat.html?channelToken=560c8bb7a2b84cce9eb31d287fda0b4a', 'windowPop', 'width=420, height=670, left=200, top=200, resizable = yes');
	}
	
}

function fn_newsLetterPopup(){
	
	if(mode_chk == 'pc'){
		var _width = '820';
		var _height = '650';
		
		var _left = (document.body.offsetWidth - _width)/2;
		_left += window.screenLeft;
		var _top = Math.ceil((window.screen.height - _height)/2);
		_top += window.screenTop;
		
		window.open('/Newsletter.do', 'popup', 'width='+_width+', height='+_height+', left='+_left+', top='+_top+'');
	}else{
	
		var _width = (document.body.offsetWidth);
		var _height = (document.body.offsetHeight);
		window.open('/Newsletter.do', 'popup', 'resizable=no, width='+_width+' height='+_height+', left=0, top=0');
	}
}; 

//비즈메카EZ 상품 페이지에서만 하단 문의 번호 변경
function changeFootSearchTel(){
	var urlChk = location.href;
	if (urlChk.split('kt.com/')[1] == 'pd/P_PD_BS_BM_001.do') {
		$('.search_total_txt02').html("080-2580-002");
	}
}

$(document).ready(function(){
	var urlChk = location.href;
	if (urlChk.split('kt.com/')[1] == 'pd/P_PD.do') {
		location.href = "https://enterprise.kt.com/pd/P_PD_AI_SM.do";
	}
	
	//DX Summit 2021 페이지 redirection
	if (urlChk.split('kt.com')[1] == '/DX_Summit_2021.do') {
		location.href = "https://enterprise.kt.com/bt/P_BT_CR_VW_002.do";
	}
	
	Tabs($("[data-ui-name='tabmenu']"));
	newsLetterLayer.init();
	chromeOptimized.init();
});

/* 2022-05-19 : 챗봇을 통해 들어온 경우 컨설팅 신청 오픈 */
function isFromChatbot(){
	var url = location.href;
	if (url.indexOf("sessionKey") > -1) {
		var param = location.search;
		chatbotSessionKey = param.split('=')[1];
		if (url.indexOf("P_CS_CQ_001") < 0) {
			$(".floating_btn .consulting a").click();
		}
	}
}

$(window).load(function(){
	isOnConsulting();//2021-07-19 : AI 서빙로봇 컨설팅 팝업을 띄울것인지 여부 - 이영주
	changeFootSearchTel();//비즈메카이지 하단 문의 번호 변경
	isFromChatbot();//2022-05-19 : 챗봇을 통해 들어온 경우 컨설팅 신청 오픈
});

//팝업 백그라운드 스크롤 활성화
//$(document).ready(function(){
	//$(".layer_pop .btn_layer_close").on("click", function(){
		//$("html, body").css("overflow", "").off("scroll touchmove mousewheel");
	//});
//});