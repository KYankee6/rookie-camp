
var controller = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_pc',
	eventInit:function() {
		$('.layer-close-btn').on('click', function() {
			$("#layer-popup").hide();
		});
		
		$('.layer-stop-btn').on('click', function() {
			$("#layer-popup").hide();
			/*하루 보지 않기 쿠키 설정*/
			setCookieAt00("closePopup_20211118", "done", 1);
		});
		
		$('.news_close').on('click', function() {
			/*하루 보지 않기 쿠키 설정*/
			setCookieAt00("b2bMainNews", "done", 1);
		});
		
		/* 하루 보지 않기 쿠키 설정 */
		function setCookieAt00(name, value, expireDays) {
			var todayDate00 = new Date();
			todayDate00 = new Date(parseInt(todayDate00.getTime() / 86400000) * 86400000 + 54000000);
			if (todayDate00 > new Date()) {
				expireDays = expireDays - 1;
			}
			todayDate00.setDate(todayDate00.getDate() + expireDays);
			document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate00.toGMTString() + ";"
		}
	},
	
	onCreate:function() {
	},
	
	disp: function(list) {
	   var elemList = $('#listSearch');
	   var _this = this;
	   var html = [];
	   elemList.empty();
	   list.forEach(function(item, i){
            item = _this.removeScript(item);
            item.thumbNailImg = null;
            if(item.arrFileFg.indexOf('T') > -1) {
                item.thumbNailImg = item.arrTotFileLoc[item.arrFileFg.indexOf('T')];
            }
            var bbsTpNm = _this.getBbsTpNm(item.bbsTp);
            var bedgeProdInfo = _this.getBedgeProdInfo(item);

            /*#### li start ####*/
            html.push('<li>');
            
            // DX Story 상세보기
            var dataLinkPage = JSON.stringify({url:'/bt/P_BT_TI_VW_001.do', bbsId:item.bbsId});
            if( item.bbsTp == 'B' ) {           // B:영상갤러리
                dataLinkPage = JSON.stringify({wrap:'kt_pc', bbsId:item.bbsId, bbsTp:'B'});
            }

            /***** div.bnr_thum start *****/
            
            if( item.bbsTp == 'A' ) {           // A:DX Story
            	html.push('    <div class="bnr_thum">');
                html.push('    <a href="/bt/P_BT_TI_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title + '"><img src="' + item.thumbNailImg + '" alt="' + item.title + '" data-image="thumbnail" onError="$.Utils.imgError(this, 340, 230)"></a>');
                html.push('    <p class="badge">');
                if(item.stickerTp != '') {
                    html.push('    <a href="#" title="" class="bg_red" data-link-sticker="' + _this.getStickerTpNm(item.stickerTp) + '">' + _this.getStickerTpNm(item.stickerTp) + '</a>');
                }
                if(bedgeProdInfo != null) {
                    html.push('    <a href="#" title="" data-link-prod="' + bedgeProdInfo.ctgryCd + '">' + bedgeProdInfo.ctgryNm + '</a>');
                }
                html.push('    </p>')
            } else if( item.bbsTp == 'B' ) {    // B:영상갤러리
            	html.push('    <div class="bnr_thum">');
                html.push('    <a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title + '">');
                html.push('        <img src="' + item.thumbNailImg + '" alt="' + item.title + '" data-image="thumbnail" onError="$.Utils.imgError(this, 340, 230)">');
                html.push('        <span class="btn_play"></span>');
                html.push('    </a>');
                html.push('    <p class="badge">');
                if(item.stickerTp != '') {
                    html.push('    <a href="#" title="" class="bg_red" data-link-sticker="' + _this.getStickerTpNm(item.stickerTp) + '">' + _this.getStickerTpNm(item.stickerTp) + '</a>');
                }
                if(bedgeProdInfo != null) {
                    html.push('        <a href="#" title="" data-link-prod="' + bedgeProdInfo.ctgryCd + '">' + bedgeProdInfo.ctgryNm + '</a>');
                }
                html.push('    </p>');
            }
            html.push('    </div>');
            /***** div.bnr_thum end *****/

            /***** div.bnr_info start *****/
            html.push('    <div class="bnr_info">');
			html.push('        <span>' + _this.getBbsTpNm(item.bbsTp));
			var regDt = new $.Utils.datetime(item.regDttm).getDate('yyyy.mm.dd');
            html.push('            <span class="s_date">등록일자 : ' + regDt + '</span>');
            html.push('        </span>');
            if( item.bbsTp == 'A' ) {    // A:DX Story
                html.push('        <h3 class="info_tit"><a href="/bt/P_BT_TI_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
            } else if( item.bbsTp == 'B' ) {    // B:영상갤러리
                html.push('        <h3 class="info_tit"><a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
            }
            html.push('        <p class="hash_tag">');
            html.push('            ' + _this.getHashtagHtml(item.arrHashTag, item.bbsTp));
            html.push('        </p>');
            html.push('    </div>');
            /***** div.bnr_info end *****/

            html.push('</li>');
            /*#### li end ####*/

        });

        elemList.append(html.join(''));
	},
});

$(document).ready(function(){
	controller.init();
	var popupCookieChk = getCookieAt00("closePopup_20211118");
	if (!popupCookieChk) {
		popupDisp();
	} else {
		$("#layer-popup").hide();
	}
	
	var mainNewsCookieChk = getCookieAt00("b2bMainNews");
	if (mainNewsCookieChk) {
		$("#main_head_news_wrap").removeClass("hover");
		$("#main_head_news_wrap").remove();
		$("#kt-head").removeClass("hasRollingBanner");
		$("#m_main_news").remove();
	} else {
		loadMainDisp();
	}
	
});

var mController = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_mb',
    eventInit:function() {
    
    }
    , onCreate:function() {
        this.getListBT();
    },
    getListBT: function() {
       var _this = this;
       var elemList = $('#listSearchM');
       this.ajaxSendCall('/bbs/listBbs.json', {pageSize:6, nowPage:1}, function(result) {
            if(result.RES.returnCode == '01') {
                var list = result.list;
                controller.disp(list);
                _this.disp(list);
                _this.eventDateChk(result.eventDate);
            }
       });
    },
    eventDateChk: function(eventDate) {
    	if (eventDate == "N") {
			$("#event_btn1").css("display", "none");
			$("#event_btn2").css("display", "");
		} else {
			$("#event_btn1").css("display", "");
			$("#event_btn2").css("display", "none");
		}
    },
    disp: function(list) {
       var elemList = $('#listSearchM');
       var _this = this;
       var html = [];
       elemList.empty();
       list.forEach(function(item, i){
            item = _this.removeScript(item);        
            item.thumbNailImg = null;
            if(item.arrFileFg.indexOf('T') > -1) {
                item.thumbNailImg = item.arrTotFileLoc[item.arrFileFg.indexOf('T')];
            }
            var bbsTpNm = _this.getBbsTpNm(item.bbsTp);
            var bedgeProdInfo = _this.getBedgeProdInfo(item);

            /*#### li start ####*/
            html.push('<li>');
            
            // Tech Insight 상세보기
            var dataLinkPage = JSON.stringify({url:'/bt/P_BT_TI_VW_001.do', bbsId:item.bbsId});
            if( item.bbsTp == 'B' ) {           // B:영상갤러리
                dataLinkPage = JSON.stringify({wrap:'kt_mb', bbsId:item.bbsId, bbsTp:'B'});
            }

            /***** div.bnr_thum start *****/
            if( item.bbsTp == 'A' ) {           // A:DX Story
            	html.push('    <div class="bnr_thum">');
                html.push('    <a href="/bt/P_BT_TI_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title + '"><img src="' + item.thumbNailImg + '" alt="' + item.title + '" data-image="thumbnail" onError="$.Utils.imgError(this, 340, 230)"></a>');
                html.push('    <p class="badge">');
                if(item.stickerTp != '') {
                    html.push('    <a href="#" title="" class="bg_red" data-link-sticker="' + _this.getStickerTpNm(item.stickerTp) + '">' + _this.getStickerTpNm(item.stickerTp) + '</a>');
                }
                if(bedgeProdInfo != null) {
                    html.push('    <a href="#" title="" data-link-prod="' + bedgeProdInfo.ctgryCd + '">' + bedgeProdInfo.ctgryNm + '</a>');
                }
                html.push('    </p>')
            } else if( item.bbsTp == 'B' ) {    // B:영상갤러리
            	html.push('    <div class="bnr_thum">');
                html.push('    <a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title + '">');
                html.push('        <img src="' + item.thumbNailImg + '" alt="' + item.title + '" data-image="thumbnail" onError="$.Utils.imgError(this, 340, 230)">');
                html.push('        <span class="btn_play"></span>');
                html.push('    </a>');
                html.push('    <p class="badge">');
                if(item.stickerTp != '') {
                    html.push('    <a href="#" title="" class="bg_red" data-link-sticker="' + _this.getStickerTpNm(item.stickerTp) + '">' + _this.getStickerTpNm(item.stickerTp) + '</a>');
                }
                if(bedgeProdInfo != null) {
                    html.push('        <a href="#" title="" data-link-prod="' + bedgeProdInfo.ctgryCd + '">' + bedgeProdInfo.ctgryNm + '</a>');
                }
                html.push('    </p>');
            }
            html.push('    </div>');
            /***** div.bnr_thum end *****/

            /***** div.bnr_info start *****/
            html.push('    <div class="bnr_info">');
			html.push('        <span>' + _this.getBbsTpNm(item.bbsTp));
			var regDt = new $.Utils.datetime(item.regDttm).getDate('yyyy.mm.dd');
            html.push('            <span class="s_date">등록일자 : ' + regDt + '</span>');
            html.push('        </span>');
            if( item.bbsTp == 'A' ) {    // A:DX Story
                html.push('        <a href="/bt/P_BT_TI_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a>');
            } else if( item.bbsTp == 'B' ) {    // B:영상갤러리
                html.push('        <a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a>');
            }
            html.push('        <p class="hash_tag">');
            html.push('            ' + _this.getHashtagHtml(item.arrHashTag, item.bbsTp));
            html.push('        </p>');
            html.push('    </div>');
            /***** div.bnr_info end *****/

            html.push('</li>');
            /*#### li end ####*/

        });

        elemList.append(html.join(''));
        
    }
    
});

$(document).ready(function(){
    mController.init();
});

function mainNewsRollingFn(val){
    var main_news_rolling = (function(){
        var initModule,
            domModule,
            stopper = false;
    
        domModule = function(){
            return {
                kt_head : $("#kt-head"),
                wrap : $("#main_head_news_wrap"),
                box_wrap : $("#main_head_news_wrap .inner_cont"),
                objs : $("[data-ui-name='main_news_rolling']"),
                closer : $("#main_head_news_wrap .news_close"),
                m_wrap : $("#m_main_news"),
                m_closer : $("#m_main_news .news_close"),
                m_objs : $("[data-ui-name='m_main_news_rolling']")
            };
        }
    
        initModule = function(){
            var dom = domModule(), i = 0, instance;

            dom.kt_head.addClass("hasRollingBanner");
            dom.wrap.mouseenter(wrapOver);
            dom.wrap.mouseleave(wrapOut);
            dom.closer.click(wrapClose);
            dom.m_closer.click(m_wrapClose);

            if(!val){
                dom.closer.click();
                dom.m_closer.click();
                return false;
            }

            if(dom.wrap.size() == 0){
                dom.kt_head.removeClass("hasRollingBanner");
            }

            function wrapOver(){
                dom.wrap.addClass("hover");
                dom.box_wrap.css("height", dom.box_wrap.height() + "px");
                stopper = true;
            }
            function wrapOut(){
                dom.wrap.removeClass("hover");
                dom.box_wrap.css("height", "100%");
                stopper = false;
            }
            function wrapClose(){
                dom.wrap.removeClass("hover");
                dom.wrap.remove();
                dom.kt_head.removeClass("hasRollingBanner");
                dom.m_closer.click();
                stopper = true;
            }
            function m_wrapClose(){
                dom.closer.click();
                dom.m_wrap.remove();
            }

            //rolling prototype
            function Rolling(){}
            Rolling.prototype.init = function(obj){
                var me = obj,
                    ul = $(me).find("ul"),
                    move = $(me).height() , //- 18
                    cycletime = 4000,
                    interval;

                    if(ul.find("li").size() <= 1) return false;//최소값이면 롤링 취소

                    interval = setInterval(function(){
                        if(stopper !== true){
                            ul.animate({
                                "margin-top" : -move + "px"
                            }, {
                                duration : 400,
                                complete : function(){
                                    $(this).find("li:eq(0)").appendTo($(this));
                                    $(this).css("margin-top", 0);
                                }
                            });
                        }
                    }, cycletime);
            }
            Rolling.prototype.m_init = function(obj){
                var me = obj,
                    ul = $(me).find("ul"),
                    move = dom.m_wrap.height() - 50,
                    cycletime = 4000,
                    interval;

                    if(ul.find("li").size() <= 2) return false;//최소값이면 롤링 취소

                    interval = setInterval(function(){
                        ul.animate({
                            "margin-top" : -move + "px"
                        }, {
                            duration : 400,
                            complete : function(){
                                $(this).find("li:eq(0)").appendTo($(this));
                                $(this).find("li:eq(0)").appendTo($(this));
                                $(this).css("margin-top", 0);
                            }
                        });
                    }, cycletime);
            }
            for(; i < dom.objs.size(); i++){
                instance = new Rolling().init(dom.objs[i]);
            }
            instance = new Rolling().m_init(dom.m_objs[0]);
        }
    
        return {
            init : initModule
        };
    })();
    
    main_news_rolling.init();
}

/* 긴급 팝업 노출 */
function popupDisp() {
	$.ajax({
		url : '/bbs/selMainNotice.json',	
		async : true,
		dataType: "json",
		type: "post",
		timeout : 2000,
		success : function(result){
			if(result.RES.returnCode == '01') {
				if (result.popup.length > 0) {
			        $('#layer-popup').show();
						
		    		var elemList = $('.layer-contents');
				    var html = [];
				    elemList.empty();
					result.popup.forEach(function(item){
						html.push('<div class="layout-inner">');
					    html.push('    <p class="tit">'+ item.title +'</p>');
					    html.push('    <div class="desc">' + item.content + '</div>');
					    html.push('</div>');
					});
					elemList.append(html.join(''));
			    }
			}
		}
	});
}

/* 최신정보 메인 노출 */
function loadMainDisp() {
	$.ajax({
		url : '/bbs/selMainNotice.json',	
		async : true,
		dataType: "json",
		type: "post",
		timeout : 2000,
		success : function(result){
			if(result.RES.returnCode == '01') {
				if(result.mainList !=null && result.mainList.length > 0) {
					var mainList = result.mainList;
	    			$('#pcTotal').empty();
	    			var html = [];
	    			mainList.forEach(function(item) {
	    				html.push('<li>');
	    				if (item.bbsTp == 'A') {			// DX Story
	    					html.push('  <div><span class="icon_dx">DX STORY</span></div>');
	    					var dataLinkPageDetail = JSON.stringify({url:'/bt/P_BT_TI_VW_001.do', bbsId:item.bbsId});
			    			html.push('  <a href="#" data-link-page='+dataLinkPageDetail+'>');
	    				} else if (item.bbsTp == 'B') {			// 영상갤러리
	    					html.push('  <div><span class="icon_play">영상갤러리</span></div>');
	    					var dataLinkPageDetail = JSON.stringify({url:'/bt/P_BT_VG_LT_001.do', bbsId:item.bbsId});
			    			html.push('  <a href="#" data-link-page='+dataLinkPageDetail+'>');
	    				} else if (item.bbsTp == 'H') {		// 언론보도
	    					html.push('  <div><span class="icon_news">언론보도</span></div>');
	    					var dataLinkPageDetail = JSON.stringify({url:'/bt/P_BT_MR_VW_001.do', bbsId:item.bbsId});
	    					html.push('  <a href="#" data-link-page='+dataLinkPageDetail+'>');
	    				} else {							// 공지사항
	    					html.push('  <div><span class="icon_ntc">NOTICE</span></div>');
			    			var dataLinkPageDetail = JSON.stringify({url:'/cs/P_CS_NT_VW_001.do', bbsId:item.bbsId});
			    			html.push('  <a href="#" data-link-page='+dataLinkPageDetail+'>');
	    				}
		    			html.push('    <span class="sbj">'+item.title+'</span>');
		    			var regDt = new $.Utils.datetime(item.regDttm).getDate('yyyy.mm.dd');
		    			html.push('	   <span class="date">'+regDt+'</span>');
		    			html.push('  </a>');
		    			html.push('</li>');
	    			});
	    			$('#pcTotal').append(html.join(''));
	    			
	    			var mList = result.mainList;
	    			$('#mTotal').empty();
	    			var html = [];
	    			mList.forEach(function(item) {
	    				var detailUrl='';
	    				var bbsTp='';
	    				if (item.bbsTp == 'A') {	//A : DX Story
	    					detailUrl = '/bt/P_BT_TI_VW_001.do';
	    					bbsTp = 'DX STORY';
	    				}
	    				if (item.bbsTp == 'B') {	//B : 영상갤러리
	    					detailUrl = '/bt/P_BT_VG_LT_001.do';
	    					bbsTp = '영상갤러리';
	    				}
	    				if (item.bbsTp == 'H') {	//H : 언론보도
	    					detailUrl = '/bt/P_BT_MR_VW_001.do';
	    					bbsTp = '언론보도';
	    				}
	    				if (item.bbsTp == 'E') {	//E : 공지사항
	    					detailUrl = '/cs/P_CS_NT_VW_001.do';
	    					bbsTp = '공지사항';
	    				}
	    				html.push('<li>');
		    			var dataLinkPageDetail = JSON.stringify({url:detailUrl, bbsId:item.bbsId});
		    			html.push('	<a href="#" data-link-page='+dataLinkPageDetail+'>');
		    			html.push('		<span class="sbj">'+bbsTp+'</span>');
		    			html.push('		<span class="txt">'+item.title+'</span>');
		    			html.push('	</a>');
		    			html.push('</li>');
	    			});
	    			$('#mTotal').append(html.join(''));
	                mainNewsRollingFn(true);
				} else {
	                mainNewsRollingFn(false);
				}
			}
		}
	});
}

/* 하루 보지 않기 쿠키 체크 */
function getCookieAt00(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while(x <= document.cookie.length) {
		var y = (x+nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}