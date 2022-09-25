/** 고객지원>온라인문의>자주하는 질문(FAQ)>검색으로 찾기 **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_pc',
    arrFaqCtgry: [],
    nTimeout: 50,
	eventInit:function() {
        var _this = this;

        $(document).on('click', this.wrapCls + ' div[data-ctgry="G"]  a', function() {
            _this.hideComboCtgry();
            if($(this).attr('data-ctgry-cd') != '') {
                _this.hideComboCtgry();
                _this.setComboLCtgry();
            }
        });
        $(document).on('click', this.wrapCls + ' div[data-ctgry="L"]  a', function() {
            _this.hideComboCtgry(2);
            _this.setComboMCtgry();
        });
        $(document).on('click', this.wrapCls + ' div[data-ctgry="M"]  a', function() {
            _this.hideComboCtgry(3);
            _this.setComboSCtgry();
        });
        $(document).on('click', '#sch_txt_submit, #search-panel > li a', function() {
            _this.search();
        });

        $(document).on('click', '#list-panel li a', function() {
            $(this).closest('li').toggleClass('on').siblings('li').removeClass('on');
            //22-02-08 상태값 추가
            if(!$(this).parent('li').hasClass('on')){
            	$(this).attr('title', '열림')
            }else{
            	$(this).attr('title', '닫힘')
            };
        });
	}, 
	onCreate:function() {
        this.setSearchPanelCombo();
        this.pagingInit();
        if(pageReqParams.ctgryCd != '') {
            $('#search-panel li.sch_cate a').trigger('click');
            var ctgryInfo = this.setCtgryInfo(pageReqParams.ctgryCd);
            if(ctgryInfo.lCtgryCd != null) {
                setTimeout(function() {
                    $('#search-panel div[data-ctgry="L"] li a[data-ctgry-cd="' + ctgryInfo.lCtgryCd + '"]').trigger('click');
                }, 100);
            }
            if(ctgryInfo.mCtgryCd != null) {
                setTimeout(function() {
                    $('#search-panel div[data-ctgry="M"] li a[data-ctgry-cd="' + ctgryInfo.mCtgryCd + '"]').trigger('click');
                }, 200);
            }
            if(ctgryInfo.sCtgryCd != null) {
                setTimeout(function() {
                    $('#search-panel div[data-ctgry="S"] li a[data-ctgry-cd="' + ctgryInfo.sCtgryCd + '"]').trigger('click');
                }, 300);
            }
        } else {
            this.search();
        }
	},
    hideComboCtgry: function(ctgryLvl) {
//        if(!ctgryLvl || ctgryLvl <= 1)$(this.wrapCls + ' div[data-ctgry="L"]').hide().find('ul').empty().prev().text('Lv.1 선택');
//        if(!ctgryLvl || ctgryLvl <= 2)$(this.wrapCls + ' div[data-ctgry="M"]').hide().find('ul').empty().prev().text('Lv.2 선택');
//        if(!ctgryLvl || ctgryLvl <= 3)$(this.wrapCls + ' div[data-ctgry="S"]').hide().find('ul').empty().prev().text('Lv.3 선택');
        if(!ctgryLvl || ctgryLvl <= 1)$(this.wrapCls + ' div[data-ctgry="L"]').find('ul').empty().prev().text('전체');
        if(!ctgryLvl || ctgryLvl <= 2)$(this.wrapCls + ' div[data-ctgry="M"]').find('ul').empty().prev().text('선택');
        if(!ctgryLvl || ctgryLvl <= 3)$(this.wrapCls + ' div[data-ctgry="S"]').find('ul').empty().prev().text('선택');
    },
    setSearchPanelCombo : function() {
        this.hideComboCtgry();
        this.setComboLCtgry();
    },
    setComboLCtgry: function() {
        var onCtgryCd = $(this.wrapCls + ' div[data-ctgry="G"] li.on a').attr('data-ctgry-cd');
        var listLCtgry = this.data.prodCtgry.filter(function(item){
            return ( item.lvl == 2 && item.gCtgryCd == onCtgryCd )
        });
        var elemList = $(this.wrapCls + ' div[data-ctgry="L"] ul');
        elemList.empty();
        var html = [];
        html.push('<li class="on"><a href="#sel02" data-ctgry-cd="">전체</a></li>');
        listLCtgry.forEach(function(item) {
	        if(item.ctgryNm != '5G') {
		        html.push('<li><a href="#sel02" data-ctgry-cd="' + item.gCtgryCd + '_' + item.lCtgryCd + '">' + item.ctgryNm + '</a></li>');
	        }
        });
        elemList.append(html.join(''));
        $(this.wrapCls + ' div[data-ctgry="L"]').show();
    },
    setComboMCtgry: function() {
        var onCtgryCd = $(this.wrapCls + ' div[data-ctgry="L"] li.on a').attr('data-ctgry-cd');
        var listMCtgry = this.data.prodCtgry.filter(function(item){
            return ( item.lvl == 3 && ( item.gCtgryCd + '_' + item.lCtgryCd == onCtgryCd ) )
        });
        if(listMCtgry.length > 0) {
            var elemList = $(this.wrapCls + ' div[data-ctgry="M"] ul');
            elemList.empty();
            var html = [];
            html.push('<li class="on"><a href="#sel03" data-ctgry-cd="">선택</a></li>');
            listMCtgry.forEach(function(item) {
                html.push('<li><a href="#sel03" data-ctgry-cd="' + item.gCtgryCd + '_' + item.lCtgryCd + '_' + item.mCtgryCd + '">' + item.ctgryNm + '</a></li>');
            });
            elemList.append(html.join(''));
            $(this.wrapCls + ' div[data-ctgry="M"]').show();
        }        
    },
    setComboSCtgry: function() {
        var onCtgryCd = $(this.wrapCls + ' div[data-ctgry="M"] li.on a').attr('data-ctgry-cd');
        var listSCtgry = this.data.prodCtgry.filter(function(item){
            return ( item.lvl == 4 && ( item.gCtgryCd + '_' + item.lCtgryCd + '_' + item.mCtgryCd == onCtgryCd ) )
        });
        if(listSCtgry.length > 0) {
            var elemList = $(this.wrapCls + ' div[data-ctgry="S"] ul');
            elemList.empty();
            var html = [];
            html.push('<li class="on"><a href="#sel04" data-ctgry-cd="">선택</a></li>');
            listSCtgry.forEach(function(item) {
            	if(item.ctgryCd != 'PD_CC_IT_001') {
            		html.push('<li><a href="#sel04" data-ctgry-cd="' + item.ctgryCd + '">' + item.ctgryNm + '</a></li>');
            	}
            });
            elemList.append(html.join(''));
            $(this.wrapCls + ' div[data-ctgry="S"]').show();
        }        
    },
    setDataCtgry: function(bfVal, nxVal) {
        var rtnVal = nxVal;
        if(typeof(nxVal) == 'undefined' || nxVal == null || nxVal.trim() == '') {
            rtnVal = bfVal;
        }
        return rtnVal;
    },
    getSearchParams: function() {
        var rtnParams = {};
        if($('#search-panel li.sch_txt').hasClass('active')) {  // 검색으로 찾기
            rtnParams.searchText = $('#sch_txt').val().trim();
        } else {    // 카테고리로 찾기
            var ctgryCd = $(this.wrapCls + ' div[data-ctgry="G"] li.on a').attr('data-ctgry-cd');
            ctgryCd = this.setDataCtgry(ctgryCd, $(this.wrapCls + ' div[data-ctgry="L"] li.on a').attr('data-ctgry-cd'));
            ctgryCd = this.setDataCtgry(ctgryCd, $(this.wrapCls + ' div[data-ctgry="M"] li.on a').attr('data-ctgry-cd'));
            ctgryCd = this.setDataCtgry(ctgryCd, $(this.wrapCls + ' div[data-ctgry="S"] li.on a').attr('data-ctgry-cd'));
            rtnParams.ctgryCd = ctgryCd;
        }
        return rtnParams;
    },
    pagingInit: function() {
        this.paging = new $.Paging({
            id:'paging-panel-pc', 
            pagenow:1, 
            pagecnt:10, 
            blockcnt:10
        });
    },
    search: function() {
        this.paging.pagenow = 1;
        this.searchPaging();
    },
    searchPaging: function() {
        var _this = this;
        var params = this.getSearchParams();
        params.nowPage = this.paging.pagenow;
        params.pageSize = this.paging.pagecnt;
        this.ajaxSendCall('/bbs/listFaq.json', params, function(result) {
            if(result.RES.returnCode == '01') {
                _this.paging.totrowcnt = result.cntFaq;
                $('#list-panel .faq_count').html('총 <b>' + result.cntFaq + '</b>건');
                _this.list = result.listFaq;
                _this.disp();
            }
        });
    },
    disp: function() {
        var _this = this;
        $('#list-panel ul').empty();
        var html = [];
        this.list.forEach(function(item) {
            item = _this.removeScript(item);
            html.push('<li>');  // 활성화 시 on 추가
            html.push('    <a href="javascript:void(0)" title="열림">');
            html.push('        <span class="q_tit">Q</span>');
            html.push('        <div class="q_cont">');
            html.push('            <span class="nav">' + item.menuLoc + '</span>');
            html.push('            <div>' + item.title + '</div>');
            html.push('        </div>');
            html.push('    </a>');
            html.push('    <div class="faq_view">');
            html.push('         <span class="q_tit">A</span>');
            html.push('         ' + item.content);
            html.push('     </div>');
            html.push('</li>');
        });
        $('#list-panel ul').append(html.join(''));
        this.paging.reset().disp();
    }
    
});




$(document).ready(function(){
	controller.init();
});

responsiveCallbackFn({
	"700-3840" : {
		"name" : "pc",
		"callback" : function(){
			window.location.reload();
		}
	},
	"340-699" : {
		"name" : "tablet",
		"callback" : function(){
			window.location.reload();
		}
	},
	"0-339" : {
		"name" : "mobile",
		"callback" : function(){
			window.location.reload();
		}
	}
}).resize(); // resize가 붙으면 리사이즈 이벤트도 바인딩
