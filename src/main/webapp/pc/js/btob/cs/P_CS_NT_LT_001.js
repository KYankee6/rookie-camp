/** 고객지원>공지사항 >목록 **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_pc',
    bbsTp: 'E',
	paging: null,
    list:null,
    resultList:null,	// 상단고정 제외한 검색 결과
	eventInit:function() {
		
		$("#sch_txt").keyup(function(){
			var e = event;
			if(e == null) {
				e = window.event;
			}
			if(e.keyCode == 13) {
				if($("#sch_txt").val() != "") {
					if($("#sch_txt").val().trim().length > 0) {
						$("#sch_txt_submit").click();
					}
				}
			} 
		});
        
	}, 
	onCreate:function() {
        this.pagingInit();
        this.search();
        $("#no_result").hide();
	},
    pagingInit: function() {
        this.paging = new $.Paging({
            id:'paging-panel', 
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
        var params = $('#search-panel').flushPanel();
        params.bbsTp = this.bbsTp;
        params.nowPage = this.paging.pagenow;
        params.pageSize = this.paging.pagecnt;
        this.ajaxSendCall('/bbs/listBbsTp.json', params, function(result) {
            if(result.RES.returnCode == '01') {
                _this.paging.totrowcnt = result.totrowcnt;
                _this.list = result.listPrior.concat(result.list);
                _this.resultList = result.list;
                _this.disp();
            }
        });
    },
    disp: function() {
        var _this = this;
        $('#list-panel ul').empty();
        var html = [];
        if (this.resultList.length != 0 && this.resultList != null) {
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
	        $('#list-panel ul').append(html.join(''));
	        this.paging.reset().disp();
	        $(".list_wrap, .paging_wrap").css('display', '');
        	$("#no_result").hide();
        } else {
        	$(".list_wrap, .paging_wrap").css('display', 'none');
        	$("#no_result").show();
        }
    }
	
});

$(document).ready(function(){
	controller.init();
});
