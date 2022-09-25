$(function(){
	
	var sl_mode_chk = "";
	if($(window).width()>761) sl_mode_chk = "pc"; 
	else sl_mode_chk = "mb"; 
	
    var currentScrollObserverSetObj = null;
    var currentScrollObserverSetDelay = 500;

    function pageTabMenu() {
        var btnObj = $('.page_tab_btn');
        var parentObj = btnObj.closest('.page_tab');
        var parentLiAnchor = parentObj.find('ul li a');
        
        btnObj.attr('title', '콘텐츠 목록 열기');
        
        if( parentObj.length ) {
            var targetObj = parentObj.find('>ul');

            if( targetObj.length ) {
                btnObj.on('click', function(e) {
                    e.preventDefault();

                    $(this).toggleClass('open');
                    targetObj.toggleClass('active');
                    
                    //2022-02-04 목록 상태 값 추가
                    if(btnObj.hasClass('open')){
                    	$(this).attr('title', '콘텐츠 목록 닫기')
                    }else{
                    	$(this).attr('title', '콘텐츠 목록 열기')
                    };
                });

                parentLiAnchor.on('click', function (e) {
                    e.preventDefault();

                    var obj = $(this);
                    var parentLiText = $(this).text();
                    var topClass = obj.closest('.page_tab').find('.page_tab_btn').attr('data-top-class');

                    targetObj.removeClass('active');
                    btnObj.text(parentLiText);
                    btnObj.addClass('active');
                    
                    //2022-02-04 목록 상태 값 추가
                    btnObj.removeClass('open');
                    btnObj.attr('title', '콘텐츠 목록 열기');

                    var parentLi = obj.closest('li');
                    targetObj.find('li').removeClass('active');
                    parentLi.addClass('active');

                    var target = obj.attr('data-target');
                    var tabContent = $('.' + topClass).find('.sub_tab_content[data-target="' + target + '"]');
                    var tabContentOffset = tabContent.offset();
                    var top = tabContentOffset.top;

                    var pageTab = $('.page_tab_wrap');
                    var pageTabHeight = parseInt( pageTab.outerHeight(true), 10 );

                    top = top - pageTabHeight > 0 ? top - pageTabHeight : 0;

                    $('html, body').animate({
                        'scrollTop' : top
                    }, 'slow');
                });

                $(window).on('click', function(e) {
                    var obj = $(e.target);

                    if( obj.hasClass('page_tab_btn') === false && obj.hasClass('page_tab_item_btn') === false ) {
                        btnObj.removeClass('open');
                        targetObj.removeClass('active');
                    }
                });

                $(window).on('scroll', function() {
                    currentScrollObserver();
                });

                //currentScrollObserverSetObj = setTimeout(function() { currentScrollObserver(); }, currentScrollObserverSetDelay);
            }
        }
    }

    function currentScrollObserver() {
        //clearTimeout( currentScrollObserverSetObj );

        var is_mobile = 'N';
        var topObj = $('.kt_pc');
        var windowWidth = parseInt( window.innerWidth, 10 );
        var windowScrollTop = $(window).scrollTop();

        if( windowWidth < 761 ) {
            is_mobile = 'Y';
        }

        if( is_mobile === 'Y' ) {
            topObj = $('.kt_mb');
        }

        var subTabContents = topObj.find('.sub_tab_content');

        if( subTabContents ) {
            subTabContents.each(function() {
                var subTabContent = $(this);
                var subTabContentOffset = subTabContent.offset();
                var subTabContentHeight = parseInt( subTabContent.outerHeight(true), 10 );

                var subTacContentTop = parseInt( subTabContentOffset.top, 10 );
                var subTacContentBottom = (subTacContentTop + subTabContentHeight) - 80;

                if( windowScrollTop < subTacContentBottom ) {
                    var target = subTabContent.attr('data-target');
                    var targetPageTabBtn = topObj.find('.page_tab_item_btn[data-target="' + target + '"]');

                    if( targetPageTabBtn.length ) {
                        topObj.find('.page_tab_item_btn').removeClass('active');
                        targetPageTabBtn.addClass('active');

                        var targetText = targetPageTabBtn.text();
                        if( targetText ) {
                            targetPageTabBtn.closest('.page_tab').find('.page_tab_btn').text( targetText );
                        }

                        return false;
                    }
                }
            });
        }

        //currentScrollObserverSetObj = setTimeout(function() { currentScrollObserver(); }, currentScrollObserverSetDelay);
    }

    if( $('.page_tab_btn').length ) {
        pageTabMenu();
    }
    
    
    //공유하기
    if(sl_mode_chk=="pc"){
        $('.page_tab_link.page_share').mouseenter(function(e){
        	e.preventDefault();
        	$('.box_share_wrap.pc .box_share').css("top","30px");
        	var $this = $(this),
        	$ptop = "";
    		var $ptop = $('.kt_pc .page_share').offset().top -20 +'px',
    		$shareBox = $('.box_share_wrap');
    		if($this.hasClass('page_share')){
    			$shareBox.css({'position':'absolute','top':$ptop,'z-index':'11'});
    			$(window).scroll(function(){
    				var $ptop = $('.kt_pc .page_share').offset().top + '-px';
    				if($('.sub_tab_fix').hasClass('fixed')){
    					$shareBox.css({'position':'fixed','top':'-20px'});
    				}else{
    					$shareBox.css({'position':'absolute','top':$ptop,'z-index':'11'});
    				}
    			});
    			$shareBox.show().find('li:first-child > a').focus();
    		}else{
    			$shareBox.show().css({'position':'absolute','top':$ptop});
    		}
        	e.preventDefault();
        });
    }
    if(sl_mode_chk=="mb"){
	    $('.page_tab_link.page_share').click(function(e){
	    	e.preventDefault();
	    	$('.box_share_wrap.pc .box_share').css("top","30px");
	    	var $this = $(this),
	    	$ptop = "";
	    	if($this.parents('div').hasClass('kt_pc')){
	    		if (!$this.hasClass('on')){
	    			$this.addClass('on');
	    			var $ptop = $('.kt_pc .page_share').offset().top + 16+'px',
	    			$shareBox = $('.box_share_wrap');
	    			if($this.hasClass('page_share')){
	    				$shareBox.css({'position':'absolute','top':$ptop,'z-index':'11'});
	    				$(window).scroll(function(){
	    					var $ptop = $('.kt_pc .page_share').offset().top + 20+'px';
	    					if($('.sub_tab_fix').hasClass('fixed')){
	    						$shareBox.css({'position':'fixed','top':'20px'});
	    					}else{
	    						$shareBox.css({'position':'absolute','top':$ptop,'z-index':'11'});
	    					}
	    				});
	    				$shareBox.show().find('li:first-child > a').focus();
	    			}else{
	    				$shareBox.show().css({'position':'absolute','top':$ptop});
	    			}
	    		}else{
	    			$(this).removeClass('on');
	    			$('.box_share_wrap').hide();
	    		}
	    	}else{
	    		var $shareBox = $('.box_share_wrap');
	    		$shareBox.show().find('li:first-child > a').focus();
	    	}
	    	e.preventDefault();
	    });
    }
    //2020-12-29 접근성관련 수정 
    //$(".page_tab_link.call_center").attr("title","컨설팅신청").find("img").attr("alt","컨설팅신청");
});