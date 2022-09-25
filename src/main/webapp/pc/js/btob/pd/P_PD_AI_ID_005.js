/** 상품서비스>AI/BigData>AI Solution>AI 코딩 **/
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
