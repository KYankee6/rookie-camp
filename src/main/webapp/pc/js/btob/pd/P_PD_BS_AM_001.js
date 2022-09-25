/** 상품서비스>비즈 솔루션>환경>Air Map **/
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
