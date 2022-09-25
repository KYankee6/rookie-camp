/** DX Insight>영상 갤러리>목록 **/
var page_chk = 1;
var controller = $.extend(new $.CommonObj(),{
    
    wrapCls: '.kt_pc',
    pageSize: 9,        // 한페이지당 게시물 갯수
    nowPage: 1,         // 현재페이지
    rowCnt: 0,
    cntBbs: 0,
	eventInit:function() {
        var _this = this;
        $(document).on('click', '#btnMoreList', function() {
            _this.nowPage++;
            var prevData = getCookie();
            if (prevData != null && prevData.length > 0) {
            	if (prevData[0] == null || prevData[0] == '' || prevData[1] == null || prevData[1] == '') {
            		document.cookie = 'cntPage=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            		document.cookie = "cntPage=" + _this.nowPage;
            	}
            }
            _this.search({more:true});
        });
        $(document).on('click', '#btnSearchPanel', function() {
            _this.notPage = 1;
            _this.search();
        });
        var hstag = $("#pc-hstag");
        hstag.find("a").on("click", function(e){
        	e.preventDefault();
        	hstag.find("a").removeClass("active");
        	$(this).addClass("active");
        });
	}, 
	onCreate:function() {
		$("#no_result").hide();
        $('#search-panel').applyFieldOption();
        this.makeSubTab("B");
        $(this.wrapCls + ' .select_search li a[data-bbs-tp="B"]').trigger('click');
        $('#sel01').prop('disabled', true);
        this.search();
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
    search: function(opt) {
        var _this = this;
        var option = {
            more: false
        };
        $.extend(true, option, opt);
        var params = $('#search-panel').flushPanelData();
        params.bbsTp = 'B';
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
        this.ajaxSendCall('/bbs/listBbs.json', params, function(result) {
            if(result.RES.returnCode == '01') {
                _this.cntBbs = result.cntBbs;
                var list = result.list;
                if(list != null && list.length > 0) {
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
	                    
	                    // Tech&Issue 상세보기
	                    var dataLinkPage = JSON.stringify({wrap:'kt_pc', bbsId:item.bbsId, bbsTp:'B'});
	                    /***** div.bnr_thum start *****/
	                    html.push('    <div class="bnr_thum">');
	                    html.push('    <a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="'+ item.title +'">');
	                    html.push('        <img src="' + item.thumbNailImg + '" alt="' + item.title + '" data-image="thumbnail" onError="$.Utils.imgError(this)">');
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
	                    html.push('    </div>');
	                    /***** div.bnr_thum end *****/
	
	                    /***** div.bnr_info start *****/
	                    html.push('    <div class="bnr_info">');
						html.push('        <span>' + _this.getBbsTpNm(item.bbsTp));
						var regDt = new $.Utils.datetime(item.regDttm).getDate('yyyy.mm.dd');
	                    html.push('            <span class="s_date">등록일자 : ' + regDt + '</span>');
	                    html.push('        </span>');
	                    html.push('        <h3 class="info_tit"><a href="/bt/P_BT_VG_VW_001.do?bbsId='+ item.bbsId + '&bbsTP=' + item.bbsTp +'" title="' + item.title.replaceAll('"', '') + '" class="bnr_title">' + item.title + '</a></h3>');
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
	                $("#no_result").hide();
                } else {
                	$(".more_list").css('display', 'none');
                	$("#no_result").show();
                }
                
                var prevData = getCookie();
                
                initCookie(prevData, _this.nowPage);
                
                if (prevData != null && prevData.length > 0) {
                	if(prevData[0] != null && prevData[1] != null) {
                		if (page_chk < parseInt(prevData[2])) {
                			$('#btnMoreList').click();
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
                        $('#btnMoreList').hide();
                    }, 200);
                } else {
                    $('#btnMoreList').show();
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
    }
	
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
		}
	}
	return result;
}

function deleteCookie() {
	document.cookie = 'bbsId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = 'title=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	page_chk=1;
}

$(document).ready(function(){
	controller.init();
});

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
