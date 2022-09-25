/** 고객지원>공지사항 >목록 **/
var mController = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_mb',
    bbsTp: 'E',
	paging: null,
    list:null,
    resultListM:null,	// 상단고정 제외한 검색 결과
	eventInit:function() {
		
		$("#sch_txt_m").keyup(function(){
			var e = event;
			if(e == null) {
				e = window.event;
			}
			if(e.keyCode == 13) {
				if($("#sch_txt_m").val() != "") {
					if($("#sch_txt_m").val().trim().length > 0) {
						$("#sch_txt_submit_m").click();
					}
				}
			} 
		});
        
	}, 
	onCreate:function() {
        this.pagingInit();
        this.searchM();
        $(".kt_mb #no_result").hide();
	},
    pagingInit: function() {
        this.paging = new $.Paging({
            id:'m-paging-panel', 
            pagenow:1, 
            pagecnt:5, 
            blockcnt:10
        });
    },
    searchM: function() {
        this.paging.pagenow = 1;
        this.searchPaging();
    },
    searchPaging: function() {
        var _this = this;
        var params = $('#m-search-panel').flushPanel();
        params.bbsTp = this.bbsTp;
        params.nowPage = this.paging.pagenow;
        params.pageSize = this.paging.pagecnt;
        this.ajaxSendCall('/bbs/listBbsTp.json', params, function(result) {
            if(result.RES.returnCode == '01') {
                _this.paging.totrowcnt = result.totrowcnt;
                _this.list = result.listPrior.concat(result.list);
                _this.resultListM = result.list;
                _this.disp();
            }
        });
    },
    disp: function() {
        var _this = this;
        $('#m-list-panel ul').empty();
        var html = [];
        if (this.resultListM.length != 0 && this.resultListM != null) {
        	this.list.forEach(function(item) {
        		item = _this.removeScript(item);
        		var dataLinkPage = JSON.stringify({url:'/cs/P_CS_NT_VW_001.do', bbsId:item.bbsId, bbsTp:'E'});
        		var regDttm = new $.Utils.datetime(item.regDttm).getDate('yyyy.mm.dd');
        		html.push('<li' + ( (item.priorYn == 'Y') ? ' class="fixed_notice"' : '' ) + '>');
        		html.push('    <a href="#" data-link-page=' + dataLinkPage + '>');
        		html.push('        <strong>' + item.title + '</strong>');
        		html.push('        <p>' + regDttm + '</p>');
        		html.push('    </a>');
        		html.push('</li>');
        	});
        	$('#m-list-panel ul').append(html.join(''));
        	this.paging.reset().disp();
        	$(".kt_mb .list_wrap, .kt_mb .paging_wrap").css('display', '');
        	$(".kt_mb #no_result").hide();
        } else {
        	$(".list_wrap, .paging_wrap").css('display', 'none');
        	$(".kt_mb #no_result").show();
        }
    }
	
});

$(document).ready(function(){
	mController.init();
});
