/** DX Insight - pc **/
var page_chk=1;
var controller = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_pc',
    pageSize: 9,        // 한페이지당 게시물 갯수
    nowPage: 1,         // 현재페이지
    rowCnt: 0,
    cntBbs: 0,
    searchParams: {},
    eventInit:function() {
        var _this = this;
        $(document).on('click', this.wrapCls + ' *[data-panel-id="search-panel2"] button[data-l-ctgry-cd]', function() {
            _this.nowPage = 1;
            _this.rowCnt = 0;
            _this.getSearchPanel();
            _this.search();
        });
        $(document).on('click', this.wrapCls + ' *[data-event-id="more"]', function() {
        	_this.nowPage++;
            var prevData = getCookie();
            if (prevData != null && prevData.length > 0) {
            	if (prevData[0] == null || prevData[0] == '' || prevData[1] == null || prevData[1] == '') {
            		document.cookie = 'cntPage=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            		document.cookie = "cntPage=" + _this.nowPage;
            	}
            }
            _this.getSearchPanel();
            _this.search({more:true});
        });
        $(document).on('click', this.wrapCls + ' *[data-event-id="find"]', function() {
            var paramsSearchPanel = $('#search-panel').flushPanelData();
            _this.goPage('/bt/P_BT_SR_001.do', paramsSearchPanel);
        });
        this.searchSelectDefault();
        var hstag = $("#pc-hstag");
        hstag.find("a").on("click", function(e){
        	e.preventDefault();
        	hstag.find("a").removeClass("active");
        	$(this).addClass("active");
        });
        
    }, 
    onCreate:function() {
    	$("#no_result").hide();
        this.makeSubTab("");
        $('#search-panel').applyFieldOption();
        var prevChk = getCookie();
        if(prevChk != null && prevChk.length > 0) {
        	if (prevChk[0] != null && prevChk[1] != null) {
        		this.searchParams.lCtgryCd = prevChk[3];
        		if (prevChk[3] != null) {
        			pageReqParams.lCtgryCd = prevChk[3];
        		}
        	}
        }
        
        if(pageReqParams.lCtgryCd != '') {
        	$(this.wrapCls + ' *[data-panel-id="search-panel2"] button[data-l-ctgry-cd="' + pageReqParams.lCtgryCd.left(5) + '"]').trigger('click');
        } else if(pageReqParams.searchText != '') {
            this.searchParams.searchText = pageReqParams.searchText;
            this.searchParams.nowPage = this.nowPage;
            this.searchParams.pageSize = this.pageSize;
            this.search();
        } else {
            this.getSearchPanel();
            this.search();
        }
        this.hashTagTab();
    },
    hashTagTab: function() {
		var _this = this;
    	var elemList = $('.kt_pc .hstag_wrap').empty();
        var html = [];
    	this.ajaxSendCall('/bbs/listBbsTp.json', {bbsTp:'I', title:'DX Story 해시태그'}, function(result) {
            if(result.RES.returnCode == '01') {
            	var hashTag = result.hashTag[0].hashTag.split(",");
            	if (hashTag != null && hashTag != "") {
            		html.push('<div class="hstag_inner">');
	            	html.push('    <div class="hstag" id="pc-hstag">');
	            	html.push('        <a href="#" title="전체" data-link-hashtag="">전체</a>');
	            	for (var i=0; i<hashTag.length; i++) {
	            		html.push('    <a href="#" title="' + hashTag[i] + '" data-link-hashtag="' + hashTag[i] + '">' + hashTag[i] + '</a>');
	            	}
	            	html.push('    </div>');
	            	html.push('</div>');
            	}
            	elemList.append(html.join(''));
            	
            	selHashTag();
            }
    	});
	},
    makeSubTab: function(bbsTp) {
        var arrSubTab = [
            {bbsTp: "", title:'전체', url:"/bt/P_BT_SM.do"},
            {bbsTp: "A", title:'DX Story', url:"/bt/P_BT_TI_LT_001.do"},
            {bbsTp: "B", title:'영상 갤러리', url:"/bt/P_BT_VG_LT_001.do"},
            {bbsTp: "H", title:'언론보도', url:"/bt/P_BT_MR_LT_001.do"},
            {bbsTp: "NC", title:'컨퍼런스', url:"/bt/P_BT_CR_LT.do"},
        ];
        var html = [];
        arrSubTab.forEach(function(item, i) {
            html.push('<li' + ((item.bbsTp == bbsTp) ? ' class="on"' : '') + '><h2><a href="' + item.url + '">' + item.title + '</a></h2></li>');
        });
        $(this.wrapCls + ' .sub_tab ul').empty().append(html.join(''));
    },
    getSearchPanel: function() {
        this.searchParams = $(this.wrapCls + ' *[data-panel-id="search-panel2"]').flushPanelData();
        this.searchParams.nowPage = this.nowPage;
        this.searchParams.pageSize = this.pageSize;
        var selCd = $(".search_sort_list.j_pc_sort button.on").attr("data-l-ctgry-cd");
	    document.cookie = "ctgryCd=" + selCd;
    },
    search: function(opt) {
        var _this = this;
        var option = {
            more: false
        };
        $.extend(true, option, opt);       
        var elemList = $('#listSearch');
        if(option.more == false) {
            elemList.empty();
        }
        var html = [];
        
        var prevChk = getCookie();
        if(prevChk != null && prevChk.length > 0) {
        	if (prevChk[0] != null && prevChk[1] != null) {
        		this.searchParams.lCtgryCd = prevChk[3];
        		$(".search_sort_list.j_pc_sort button").each(function(){
					if($(this).attr("data-l-ctgry-cd") === prevChk[3]){
						$(this).addClass("on").closest(".slick-slide").siblings().find("button").removeClass("on");
					}
				});
        	}
        }
        if(pageReqParams.searchText != null && pageReqParams.searchText != '') {
        	this.searchParams.searchText = pageReqParams.searchText;
        }
        this.ajaxSendCall('/bbs/listBbs.json', this.searchParams, function(result) {
            if(result.RES.returnCode == '01') {
                $('#cntListSearch').text(result.cntBbs);
                _this.cntBbs = result.cntBbs;
                var list = result.list;
                
                if (list != null && list.length > 0) {
	                list.forEach(function(item, i){
	                	item = _this.removeScript(item);
	                    item.thumbNailImg = null;
	                    if(item.arrFileFg.indexOf('T') > -1) {
	                        item.thumbNailImg = item.arrTotFileLoc[item.arrFileFg.indexOf('T')];
	                    }
	                    var bbsTpNm = _this.getBbsTpNm(item.bbsTp);
	                    var bedgeProdInfo = _this.getBedgeProdInfo(item);
	
	                    /*#### li start ####*/
	                    if(option.more == true) {
	                        html.push('<li class="j_bnr_item" style="display: none;">');
	                    } else {
	                        html.push('<li>');
	                    }
	                    
	                    // DX Story 상세보기
	                    var dataLinkPage = JSON.stringify({url:'/bt/P_BT_TI_VW_001.do', bbsId:item.bbsId});
	                    if( item.bbsTp == 'B' ) {           // B:영상갤러리
	                        dataLinkPage = JSON.stringify({wrap:'kt_pc', bbsId:item.bbsId, bbsTp:'B'});
	                    }
	
	                    /***** div.bnr_thum start *****/
	                    html.push('    <div class="bnr_thum">');
	                    if( item.bbsTp == 'A' ) {           // A:DX Story
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
						if( item.bbsTp == 'A' ) {           // A:DX Story
	                    	html.push('        <h3 class="info_tit"><a href="/bt/P_BT_TI_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
	                    }
	                    if( item.bbsTp == 'B' ) {    // B:영상갤러리
	                        html.push('        <h3 class="info_tit"><a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
	                    }
	                    html.push('        <p class="hash_tag">');
	                    html.push('            ' + _this.getHashtagHtml(item.arrHashTag));
	                    html.push('        </p>');
	                    html.push('    </div>');
	                    /***** div.bnr_info end *****/
	
	                    html.push('</li>');
	                    /*#### li end ####*/
	
	                });
	                elemList.append(html.join(''));
	
	                if(option.more == true) {
	                    _this.animateList2(elemList);
	                }
	
	                _this.rowCnt += list.length;
	                $(".more_list").css('display', '');
	                $("#no_result").hide();
                } else {
                	$(".more_list").css('display', 'none');
                	$("#no_result").show();
                }
                
                var prevData = getCookie();
                
                initCookie(prevData, _this.nowPage);
		        
                if (prevData != null && prevData.length > 0) {
                	if (prevData[0] != null && prevData[1] != null) {
                		if (page_chk < parseInt(prevData[2])) {
                			$(_this.getWrap() + ' *[data-event-id="more"]').click();
                			page_chk++;
                		} else {
                			if(mode_chk == 'pc'){
								deleteCookie();
							}
                		}
                	}
                }

                if(_this.rowCnt >= _this.cntBbs) {
                	scrollMove(prevData);
                    setTimeout(function(){
                        $(_this.getWrap() + ' *[data-event-id="more"]').hide();
                    }, 200);
                } else {
                    $(_this.getWrap() + ' *[data-event-id="more"]').show();
                    if (prevData != null && prevData.length > 0) {
                    	if(mode_chk == 'pc'){
                    		scrollMove(prevData);
                    	}
                    }
                }
                
                function scrollMove(item){
                    if (item.length > 0 && item[0] != null && item[1] != null) {
                        setTimeout(function() {
                        	var h = $('a[title="'+item[1]+'"]').closest("li").height();
                            var posY = $('a[title="'+item[1]+'"]').offset().top - h;
                            $("html").animate({
                                "scrollTop" : posY + "px"
                            }, 1);
                        }, 500);
                    }
                }

            }
        });
    },
    searchSelectDefault : function(){
        var that = this;
        var select01 = $(this.wrapCls + " #search-panel .select_type01").eq(0);
        var select02 = $(this.wrapCls + " #search-panel .select_type01").eq(1);
        var select03 = $(this.wrapCls + " #search-panel .select_type01").eq(2);
        var reportMedia = select01.find("li").eq(3);

        reportMedia.click(setSelectBox_RM);//언론보도 선택시
        select01.find("li").not(reportMedia).click(setDefaultOption);//나머지 선택시

        function setDefaultOption(){
            var depth2_html = "";
            depth2_html += '<button type="button" class="j_select_toggle" id="sel02">콘텐츠 유형 전체</button>';
            depth2_html += '<ul class="j_select_list j_select">';
            depth2_html += '    <li class="on"><a href="#sel02" data-sticker-tp="">콘텐츠 유형 전체</a></li>';
            depth2_html += '    <li><a href="#sel02" data-sticker-tp="T">Tech</a></li>';
            depth2_html += '    <li><a href="#sel02" data-sticker-tp="I">Issue</a></li>';
            depth2_html += '    <li><a href="#sel02" data-sticker-tp="R">Report</a></li>';
            depth2_html += '    <li><a href="#sel02" data-sticker-tp="S">성공스토리</a></li>';
            depth2_html += '</ul>';
            select02.html(depth2_html);
            var depth3_html = "";
            depth3_html += '<button type="button" class="j_select_toggle" id="sel03">상품 전체</button>';
            depth3_html += '<ul class="j_select_list j_select">';
            depth3_html += '    <li class="on"><a href="#sel03" data-g-ctgry-cd="">상품 전체</a></li>';
            depth3_html += '    <li><a href="#sel03" data-g-ctgry-cd="PD">상품/서비스</a></li>';
            depth3_html += '    <li><a href="#sel03" data-g-ctgry-cd="SL_SM">산업</a></li>';
            depth3_html += '</ul>';
            select03.html(depth3_html);
        }

        function setSelectBox_RM(){
            var depth2_html = "";
            depth2_html += '<button type="button" class="j_select_toggle" id="sel02">연도 전체</button>';
            depth2_html += '<ul class="j_select_list j_select">';
            depth2_html +=     '<li class="on"><a href="#sel02" data-year="">연도 전체</a></li>';
            depth2_html +=     '<li><a href="#sel02" data-year="2021">2021년</a></li>';
            depth2_html +=     '<li><a href="#sel02" data-year="2020">2020년</a></li>';
            depth2_html += '</ul>';
            select02.html(depth2_html);
            var depth3_html = "";
            depth3_html += '<button type="button" class="j_select_toggle" id="sel03">월 전체</button>';
            depth3_html += '<ul class="j_select_list j_select">';
            depth3_html += '    <li class="on"><a href="#sel03" data-month="">월 전체</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="01">1월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="02">2월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="03">3월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="04">4월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="05">5월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="06">6월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="07">7월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="08">8월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="09">9월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="10">10월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="11">11월</a></li>';
            depth3_html += '    <li><a href="#sel03" data-month="12">12월</a></li>';
            depth3_html += '</ul>';
            select03.html(depth3_html);
        }
        
        //2022-02-07 하위메뉴 상태값 수정
        $('.select_type01').find('button').attr('title', '목록 열기');
        $('.select_type01').find('button').on('click', function(){
        	if(!$(this).parent('.select_type01').hasClass('on')){
        		$(this).attr('title', '목록 닫기')
        	}else{
        		$(this).attr('title', '목록 열기')
        	}
        });
        
    }
});

$(document).ready(function(){
    controller.init();
});

function initCookie(prevData, page) {
	if (prevData.length == 0) {
    	document.cookie = 'cntPage=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    	document.cookie = "cntPage=" + page;
    }
    if (prevData != null && prevData.length > 0) {
    	if(prevData[0] == null && prevData[1] == null) {
        	document.cookie = 'cntPage=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        	document.cookie = "cntPage=" + page;
        }
    }
}

function getCookie() {
	var result = [];
	var cookie = document.cookie.split(';');
	for (var i=0; i<cookie.length; i++) {
		var dic = cookie[i].split('=');
		if ('bbsId' === dic[0].replace(" ","")) {
			result[0] = dic[1];
		} else if ('title' === dic[0].replace(" ","")) {
			result[1] = dic[1];
		} else if ('cntPage' === dic[0].replace(" ","")) {
			result[2] = dic[1];
		} else if ('ctgryCd' === dic[0].replace(" ","")) {
			result[3] = dic[1];
		}
	}
	return result;
}

function deleteCookie() {
	document.cookie = 'bbsId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'title=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'ctgryCd=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	page_chk=1;
}

function selHashTag() {
	if(location.href.indexOf('searchText') > -1) {
		var param = location.href.split("searchText=")[1];
		var selectedItem = '';
		if (param != null && param != "") {
			selectedItem = decodeURI(param).replace("%23", "\#").replaceAll("+", " ");
			if (selectedItem.indexOf("%2F") > -1) {
				selectedItem = selectedItem.replace("%2F", "/");
			}
			$('.kt_pc a[title="' + selectedItem + '"]').addClass("active");
		} else {
			$('.kt_pc a[title="전체"]').addClass("active");
		}
	} else {
		$('.kt_pc a[title="전체"]').addClass("active");
	}
}
