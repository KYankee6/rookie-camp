/** 상품서비스>AI>ROBOT **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_pc',
    eventInit:function() {
    	$(document).on('click', '#goConsulting', function() {
    		$('.floating_btn .consulting a').click();
    	});
	}, 
	onCreate:function() {
	}
	
});

var mController = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_mb',
    eventInit:function() {
    	$(document).on('click', '#goConsultingM', function() {
    		$('.floating_btn .consulting a').click();
    	});
	}, 
	onCreate:function() {

	}
	
});


$(document).ready(function(){
	controller.init();
	mController.init();
});
