/** 상품서비스>모바일>기업특화 서비스>순Biz data 2종 **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_pc',
    eventInit:function() {

	}, 
	onCreate:function() {
	}
	
});

var mController = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_mb',
    eventInit:function() {

	}, 
	onCreate:function() {

	}
	
});


$(document).ready(function(){
	controller.init();
	mController.init();
});