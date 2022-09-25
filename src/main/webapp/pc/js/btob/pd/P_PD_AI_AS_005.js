/** 상품서비스>AI/BigData?AI Space>AI 케어 서비스 **/
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
		this.vod_resize();
	},
	vod_resize : function(){
		var vod_resize = (function(){
			var	initModule,
				resizeModule,
				w = 964,
				h = 542,
				per = Math.ceil(parseFloat(h / w) * 100) / 100,
				new_h,
				dom = {
					"m_vod" : $("#mobile_vod")
				};
				initModule = function(){
					if(window.innerWidth > 760){
						new_h = h;
					}else{
						w = window.innerWidth;
						new_h = Math.ceil(w * per);
					}
					dom.m_vod.css("height", new_h + "px");
					return this;
				}
				resizeModule = function(){
					$(window).resize(function(){
						initModule();
					});
				}
			
			return {
				ready : initModule,
				resize : resizeModule
			};
		}());
		vod_resize.ready();
		vod_resize.resize();
	}
	
});


$(document).ready(function(){
	controller.init();
	mController.init();
});
