/** DX Insight>컨퍼런스>상세보기 **/
var controller = $.extend(new $.CommonObj(),{

    wrapCls: '.kt_pc',
	eventInit:function() {

	}, 
	onCreate:function() {
		this.makeSubTab("NC");
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
            html.push('<li' + ((item.bbsTp == bbsTp) ? ' class="on"' : '') + '><a href="' + item.url + '">' + item.title + '</a></li>');
        });
        $('.kt_pc .sub_tab ul').empty().append(html.join(''));
    },
});

$(document).ready(function(){
	controller.init();
});
