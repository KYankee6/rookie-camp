/** DX Insight - mb **/
var page_chkM = 1;
var mController = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_mb',
    pageSize: 9,        // 한페이지당 게시물 갯수
    nowPage: 1,         // 현재페이지
    rowCnt: 0,
    cntBbs: 0,
    searchParams: {},
    eventInit:function() {
        var _this = this;
        $(document).on('click', this.wrapCls + ' *[data-panel-id="search-panel2"] label', function() {
            setTimeout(function() {
                _this.nowPage = 1;
                _this.rowCnt = 0;
                _this.getSearchPanel();
                _this.search();
            }, 300);
        });
        $(document).on('click', this.wrapCls + ' *[data-event-id="more"]', function() {
            _this.nowPage++;
            var prevDataM = getCookieM();
            if (prevDataM != null && prevDataM.length > 0) {
            	if (prevDataM[0] == null || prevDataM[0] == '' || prevDataM[1] == null || prevDataM[1] == '') {
	            	document.cookie = 'cntPageM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	            	document.cookie = "cntPageM=" + _this.nowPage;
            	}
            }
            _this.getSearchPanel();
            _this.search({more:true});
        });
        $(document).on('click', this.wrapCls + ' *[data-event-id="find"]', function() {
            var paramsSearchPanel = $('#m-search-panel').flushPanelData();
            _this.goPage('/bt/P_BT_SR_001.do', paramsSearchPanel);
        });
        this.searchSelectDefault();
		var hstagM = $("#m-hstag");
        hstagM.find("a").on("click", function(e){
        	e.preventDefault();
        	hstagM.find("a").removeClass("active");
        	$(this).addClass("active");
        });
        
    },
    onCreate:function() {
    	$("#no_result_m").hide();
        this.makeSubTab("");
        var prevChkM = getCookieM();
        
        if(prevChkM != null && prevChkM.length > 0) {
        	if (prevChkM[0] != null && prevChkM[1] != null) {
        		this.searchParams.lCtgryCd = prevChkM[3];
        		if(prevChkM[3] != null){
        			pageReqParams.lCtgryCd = prevChkM[3];
        		}
        	}
        }
        if(pageReqParams.lCtgryCd != '') {
            fn_listLabel_click(pageReqParams.lCtgryCd.left(5));
            this.getSearchPanel();
            this.search();
//            $(this.wrapCls + ' div[data-panel-id="search-panel2"]  input[value="' + pageReqParams.lCtgryCd.left(5) + '"]+label').trigger('click');
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
    	var elemList = $('.kt_mb .hstag_wrap').empty();
        var html = [];
    	this.ajaxSendCall('/bbs/listBbsTp.json', {bbsTp:'I', title:'DX Story 해시태그'}, function(result) {
            if(result.RES.returnCode == '01') {
            	var hashTag = result.hashTag[0].hashTag.split(",");
            	if (hashTag != null && hashTag != "") {
	            	html.push('<div class="hstag_inner">');
	            	html.push('    <div class="hstag" id="m-hstag">');
	            	html.push('        <a href="#" title="전체" data-link-hashtag="">전체</a>');
	            	for (var i=0; i<hashTag.length; i++) {
	            		html.push('    <a href="#" title="' + hashTag[i] + '" data-link-hashtag="' + hashTag[i] + '">' + hashTag[i] + '</a>');
	            	}
	            	html.push('    </div>');
	            	html.push('</div>');
	            }
            	elemList.append(html.join(''));
            	
            	selHashTagM();
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
        this.searchParams = $(this.wrapCls + ' *[data-panel-id="search-panel2"]').flushPanel();
        this.searchParams.nowPage = this.nowPage;
        this.searchParams.pageSize = this.pageSize;
        //쿠키저장
        $(".search_sort_list.j_mb_sort label").each(function(){
		    if($(this).text() === $(".search_sort_list.j_mb_sort button").text()){
		    	var selCdM = $(this).closest('div').find("input").attr("data-l-ctgry-cd");
		    	if (selCdM != null) {
		    		document.cookie = "ctgryCdM=" + selCdM;
		    	} else {
		    		document.cookie = "ctgryCdM=" + '';
		    	}
		    }
		})
    },
    search: function(opt) {
        var _this = this;
        var option = {
            more: false
        };
        $.extend(true, option, opt);       
        var elemList = $('#listSearchM');
        if(option.more == false) {
            elemList.empty();
        }
        var html = [];
        
        //쿠키값 체크 후 카테고리 선택
        var prevChkM = getCookieM();
        if(prevChkM != null && prevChkM.length > 0) {
        	if (prevChkM[0] != null && prevChkM[1] != null) {
        		this.searchParams.lCtgryCd = prevChkM[3];
        		$(".search_sort_list.j_mb_sort label").each(function(){
        			if($(this).text() === prevChkM[3]){
        				$(this).closest('div').find("input")[0].checked = true;
        				//$(this).closest('div').find("input").attr(checked,"checked");
        			}
        		});
        	}
        }
        
        if(pageReqParams.searchText != null && pageReqParams.searchText != '') {
        	this.searchParams.searchText = pageReqParams.searchText;
        }
        this.ajaxSendCall('/bbs/listBbs.json', this.searchParams, function(result) {
            if(result.RES.returnCode == '01') {
                $('#cntListSearchM').text(result.cntBbs);
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
	                    
	                    // Tech Insight 상세보기(2022.06.02 미사용)
	                    /*var dataLinkPage = JSON.stringify({url:'/bt/P_BT_TI_VW_001.do', bbsId:item.bbsId});
	                    if( item.bbsTp == 'B' ) {           // B:영상갤러리
	                        dataLinkPage = JSON.stringify({wrap:'kt_mb', bbsId:item.bbsId, bbsTp:'B'});
	                    }*/
	
	                    /***** div.bnr_thum start *****/
	                    html.push('    <div class="bnr_thum">');
	                    if( item.bbsTp == 'A' ) {           // A:Tech&Issue
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
	                    if( item.bbsTp == 'B' ) {    // B:영상갤러리
	                        html.push('        <h3 class="info_tit"><a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
	                    } else {
	                        html.push('        <h3 class="info_tit"><a href="/bt/P_BT_TI_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
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
	                $("#no_result_m").hide();
                } else {
                	$(".more_list").css('display', 'none');
                	$("#no_result_m").show();
                }
                
                var prevDataM = getCookieM();
                
                initCookieM(prevDataM, _this.nowPage);
                
                if (prevDataM != null && prevDataM.length > 0) {
                	if (prevDataM[0] != null && prevDataM[1] != null) {
                		if (page_chkM < parseInt(prevDataM[2])) {
                			$(_this.getWrap() + ' *[data-event-id="more"]').click();
                			page_chkM++;
                		} else {
	                        if(mode_chk != 'pc'){
								deleteCookieM();
							}
                		}
                	}
                }

                if(_this.rowCnt >= _this.cntBbs) {
                    scrollMoveM(prevDataM);
                    setTimeout(function(){
                        $(_this.getWrap() + ' *[data-event-id="more"]').hide();
                    }, 200);
                } else {
                    $(_this.getWrap() + ' *[data-event-id="more"]').show();
                    if (prevDataM != null && prevDataM.length > 0) {
                    	if (prevDataM[0] != null && prevDataM[1] != null) {
                    		if(mode_chk != 'pc'){
                				scrollMoveM(prevDataM);
                			}
                    	}
                	}
                }
                
                function scrollMoveM(item){
                    if (item.length > 0 && item[0] != null && item[1] != null) {

                        //210804 인터벌로 변경
                        var intervalCheck = setInterval(function(){
                            var element = $('.kt_mb a[title="'+item[1]+'"]');
                            var posY;
                            var h;
                            if(element.size() > 0){
                                h = element.closest("li").height();
                                posY = element.offset().top - h;
                                $("html").animate({
                                    "scrollTop" : posY + "px"
                                }, 1);
                                clearInterval(intervalCheck);
                            }
                        });
                    }
                }
            }
        });
    },
    searchSelectDefault : function(){
        var that = this;
        var select01 = $(this.wrapCls + " #m-search-panel .select_type01").eq(0);
        var select02 = $(this.wrapCls + " #m-search-panel .select_type01").eq(1);
        var select03 = $(this.wrapCls + " #m-search-panel .select_type01").eq(2);
        var reportMedia = select01.find("li").eq(3);

        reportMedia.click(setSelectBox_RM);//언론보도 선택시
        select01.find("li").not(reportMedia).click(setDefaultOption);//나머지 선택시

        function setDefaultOption(){
            var depth2_html = "";
            depth2_html += '<button type="button" class="j_select_toggle" id="mbSel02">콘텐츠 유형 전체</button>';
            depth2_html += '<ul class="j_select_list">';
            depth2_html += '    <li class="on"><a href="#sel02" data-sticker-tp="">콘텐츠 유형 전체</a></li>';
            depth2_html += '    <li><a href="#mbSel02" data-sticker-tp="T">Tech</a></li>';
            depth2_html += '    <li><a href="#mbSel02" data-sticker-tp="I">Issue</a></li>';
            depth2_html += '    <li><a href="#mbSel02" data-sticker-tp="R">Report</a></li>';
            depth2_html += '    <li><a href="#mbSel02" data-sticker-tp="S">성공스토리</a></li>';
            depth2_html += '</ul>';
            select02.html(depth2_html);
            var depth3_html = "";
            depth3_html += '<button type="button" class="j_select_toggle" id="mbSel03">상품 전체</button>';
            depth3_html += '<ul class="j_select_list">';
            depth3_html += '    <li class="on"><a href="#mbSel03" data-g-ctgry-cd="">상품 전체</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="PD">상품/서비스</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="SL_SM">산업</a></li>';
            depth3_html += '</ul>';
            select03.html(depth3_html);
        }

        function setSelectBox_RM(){
            var depth2_html = "";
            depth2_html += '<button type="button" class="j_select_toggle" id="mbSel02">연도 선택</button>';
            depth2_html += '<ul class="j_select_list">';
            depth2_html +=     '<li class="on"><a href="#sel02" data-sticker-tp="">연도 선택</a></li>';
            depth2_html +=     '<li><a href="#mbSel02" data-sticker-tp="T">2021년</a></li>';
            depth2_html +=     '<li><a href="#mbSel02" data-sticker-tp="I">2020년</a></li>';
            depth2_html += '</ul>';
            select02.html(depth2_html);
            var depth3_html = "";
            depth3_html += '<button type="button" class="j_select_toggle" id="mbSel03">월 선택</button>';
            depth3_html += '<ul class="j_select_list">';
            depth3_html += '    <li class="on"><a href="#mbSel03" data-g-ctgry-cd="">월 선택</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="PD">1월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="SL_SM">2월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">3월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">4월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">5월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">6월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">7월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">8월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">9월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">10월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">11월</a></li>';
            depth3_html += '    <li><a href="#mbSel03" data-g-ctgry-cd="">12월</a></li>';
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
    mController.init();
});

function initCookieM(prevDataM, pageM) {
	if (prevDataM.length == 0) {
    	document.cookie = 'cntPageM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    	document.cookie = "cntPageM=" + pageM;
    }
    if (prevDataM != null && prevDataM.length > 0) {
    	if (prevDataM[0] == null && prevDataM[1] == null) {
        	document.cookie = 'cntPageM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        	document.cookie = "cntPageM=" + pageM;
        }
    }
}

function getCookieM() {
	var result = [];
	var cookie = document.cookie.split(';');
	for (var i=0; i<cookie.length; i++) {
		var dic = cookie[i].split('=');
		if ('bbsIdM' === dic[0].replace(" ","")) {
			result[0] = dic[1];
		} else if ('titleM' === dic[0].replace(" ","")) {
			result[1] = dic[1];
		} else if ('cntPageM' === dic[0].replace(" ","")) {
			result[2] = dic[1];
		} else if ('ctgryCdM' === dic[0].replace(" ","")) {
			result[3] = dic[1];
		}
	}
	return result;
}

function deleteCookieM() {
	document.cookie = 'bbsIdM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'titleM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'ctgryCdM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	page_chkM=1;
}

function selHashTagM() {
	if(location.href.indexOf('searchText') > -1) {
		var param = location.href.split("searchText=")[1];
		var selectedItem = '';
		if (param != null && param != "") {
			selectedItem = decodeURI(param).replace("%23", "\#").replaceAll("+", " ");
			if (selectedItem.indexOf("%2F") > -1) {
				selectedItem = selectedItem.replace("%2F", "/");
			}
			$('.kt_mb a[title="' + selectedItem + '"]').addClass("active");
		} else {
			$('.kt_mb a[title="전체"]').addClass("active");
		}
	}  else {
		$('.kt_mb a[title="전체"]').addClass("active");
	}
}
