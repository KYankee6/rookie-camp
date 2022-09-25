/** 고객지원>서비스 이용 안내 >브로셔/신청서 자료실>영업점 방문 구비서류 **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_pc',
	eventInit:function() {

	}, 
	onCreate:function() {
	}
	
});

var mController = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_mb',
	eventInit:function() {

	}, 
	onCreate:function() {

	}
	
});


$(document).ready(function(){
	controller.init();
	mController.init();
});
