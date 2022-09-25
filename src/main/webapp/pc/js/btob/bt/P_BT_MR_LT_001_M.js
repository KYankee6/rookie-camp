/** DX Insight>언론보도>목록 **/
var page_chkM = 1;
var mController = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_mb',
    pageSize: 5,        // 한페이지당 게시물 갯수
    nowPage: 1,         // 현재페이지
    rowCnt: 0,
    cntBbs: 0,
	eventInit:function() {
        var _this = this;
        $(document).on('click', '#btnMoreListM', function() {
            _this.nowPage++;
            var prevDataM = getCookieM();
            if (prevDataM != null && prevDataM.length > 0) {
            	if (prevDataM[0] == null || prevDataM[0] == '' || prevDataM[1] == null || prevDataM[1] == '') {
	            	document.cookie = 'cntPageM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	            	document.cookie = "cntPageM=" + _this.nowPage;
            	}
            }
            _this.search({more:true});
        });
        $(document).on('click', '#btnSearchPanelM', function() {
            _this.nowPage = 1;
            _this.rowCnt = 0;
            _this.search();
        });
        var hstagM = $("#m-hstag");
        hstagM.find("a").on("click", function(e){
        	e.preventDefault();
        	hstagM.find("a").removeClass("active");
        	$(this).addClass("active");
        });
	}, 
	onCreate:function() {
		$("#no_result_m").hide();
	    $('#m-search-panel').applyFieldOption();
		this.makeSubTab("H");
		setTimeout(function(){
            $('#m-search-panel #mbSel01').closest('.select_type01').removeClass('on');  // j-select 버그 제거
        }, 500);
        $(this.wrapCls + ' .select_search li a[data-bbs-tp="H"]').trigger('click');
        $('#mbSel01').prop('disabled', true);
        this.search();
        this.banner();
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
    banner: function() {
        var _this = this;
        this.ajaxSendCall('/bbs/listBanner.json', {extnTp:'B'}, function(result) {
            if(result.RES.returnCode == '01') {
                var list = result.listBanner;
                var elemBanner = $(_this.wrapCls + ' .banner_list');
                if(list.length > 0) {
                    elemBanner.slick('unslick');
                    elemBanner.empty();
                    var html = [];
                    list.forEach(function(item) {
                        html.push('<div><a href="#" data-popup-link="' + item.movLink + '"><img src="' + item.totFileLoc + '" alt="' + item.title + '" onError="$.Utils.imgErrorBanner(this)"></a></div>');
                    });
                    elemBanner.append(html.join(''));
                    elemBanner.slick({
                        infinite: false
                    });
                } else {
                    elemBanner.remove();
                }
            }
        });
    },
    search: function(opt) {
        var _this = this;
        var option = {
            more: false
        };
        $.extend(true, option, opt);
        var params = $('#m-search-panel').flushPanelData();
        params.bbsTp = 'H';
        params.nowPage = this.nowPage;
        params.pageSize = this.pageSize;
        
        if(pageReqParams.searchText != null && pageReqParams.searchText != '') {
        	params.searchText = pageReqParams.searchText;
        }
        
        var elemList = $(this.wrapCls + ' ul[data-list]');
        if(option.more == false) {
            elemList.empty();
        }
        var html = [];
        this.ajaxSendCall('/bbs/listMediaReport.json', params, function(result) {
            if(result.RES.returnCode == '01') {
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
	                        //html.push('<li class="j_bnr_item" style="display: none;">');
	                        if(item.thumbNailImg != null){
	                            html.push('<li class=\"hasThumbs\">');
	                        }else{
	                            html.push('<li>');
	                        }
	                    } else {
	                        if(item.thumbNailImg != null){
	                            html.push('<li class=\"hasThumbs\">');
	                        }else{
	                            html.push('<li>');
	                        }
	                    }
	                    
	                    // 언론보도 상세보기
	                    var dataLinkPage = JSON.stringify({url:'/bt/P_BT_MR_VW_001.do', bbsId:item.bbsId, bbsTp:'H'});
	
	                    /***** div.bnr_thum start *****/
	                    html.push('    <div class="bnr_thum">');
	                    if (item.thumbNailImg != null) {
	                    	html.push('    <a href="#" title="'+ item.title +'" data-link-page=' + dataLinkPage + '><img src="' + item.thumbNailImg + '" alt="'+ item.title +'" data-image="thumbnail" onError="$.Utils.imgError(this, 340, 230)"></a>');
	                    }
	                    html.push('    <p class="badge">');
	                    html.push('    </p>');
	                    html.push('    </div>');
	                    /***** div.bnr_thum end *****/
	
						item.content = item.content.replace(/<\/?[^>]+>/ig, "");
	
	                    /***** div.bnr_info start *****/
	                    html.push('    <div class="bnr_info">');
	                    html.push('        <span>' + _this.getBbsTpNm(item.bbsTp) + '</span>');
	                    html.push('        <h3 class="info_tit"><a href="/bt/P_BT_MR_VW_001.do?bbsId='+ item.bbsId +'&bbsTp='+ item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
	                    html.push('    <ul class="dot_list">');
	                    var newsDt = new $.Utils.datetime(item.newsDt).getDate('yyyy.mm.dd');
	                    html.push('        <li>보도일자 : ' + newsDt + '</li>');
	                    html.push('    </ul>');
	                    html.push('    </div>');
	                    html.push('        <div class="mr_content">');
	                    html.push('            <a href="/bt/P_BT_MR_VW_001.do?bbsId='+ item.bbsId +'&bbsTp='+ item.bbsTp +'">' + item.content.substring(0,150) + '...</a>');
	                    html.push('        </div>');
	                    /***** div.bnr_info end *****/
	                    
	                    //22-01-13.해시태그 영역 추가
	                    /***** div.bnr_hashtag start *****/
	                    html.push('    <div class="bnr_hashtag">');
	                    item.arrHashTag.forEach(function(hashTagItem, i){
	                    	html.push('        <a href="#" title="'+ hashTagItem +'" data-link-hashtag="'+ hashTagItem +'">'+ hashTagItem +'</a>');
	                    });
	                    html.push('    </div>');
	
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
                			$('#btnMoreListM').click();
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
                        $('#btnMoreListM').hide();
                    }, 200);
                } else {
                    $('#btnMoreListM').show();
                    if (prevDataM != null && prevDataM.length > 0) {
                    	if(prevDataM[0] != null && prevDataM[1] != null) {
			            	if(mode_chk != 'pc'){
			            		scrollMoveM(prevDataM);
			            	}
                    	}
                	}
                }
                
                var intervalCheck;
                
                function scrollMoveM(item){
                    if (item.length > 0 && item[0] != null && item[1] != null) {
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
    }
	
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
		}
	}
	return result;
}

function deleteCookieM() {
	document.cookie = 'bbsIdM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'titleM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	page_chkM=1;
}

$(document).ready(function(){
	mController.init();
});

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