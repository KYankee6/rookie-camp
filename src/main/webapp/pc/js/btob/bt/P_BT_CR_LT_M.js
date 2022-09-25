/** DX Insight>컨퍼런스>목록 **/
var mController = $.extend(new $.CommonObj(),{
    
    wrapCls: '.kt_mb',
    pageSize: 9,        // 한페이지당 게시물 갯수
    nowPage: 1,         // 현재페이지
    rowCnt: 0,
    cntBbs: 0,
	eventInit:function() {
        var _this = this;
        $(document).on('click', '#btnMoreListM', function() {
            _this.nowPage++;
            _this.search({more:true});
        });
        $(document).on('click', '#btnSearchPanelM', function() {
            _this.notPage = 1;
            _this.search();
        });
	}, 
	onCreate:function() {
	    $('#m-search-panel').applyFieldOption();
		this.makeSubTab("NC");
		setTimeout(function(){
            $('#m-search-panel #mbSel01').closest('.select_type01').removeClass('on');  // j-select 버그 제거
        }, 500);
        $(this.wrapCls + ' .select_search li a[data-bbs-tp="NC"]').trigger('click');
        $('#mbSel01').prop('disabled', true);
        this.banner();
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
    }
});

$(document).ready(function(){
	mController.init();
});
