/** AboutUs>KT Enterprise 소개 **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_pc',
    eventInit:function() {

	}, 
	onCreate:function() {
		this.makeSubTab("");
	},
	makeSubTab: function() {
		var arrSubTab = [
			{sel: "ID", title: 'KT Enterprise 소개', url:"/au/P_AU_ID_SM.do"},
			{sel: "MI", title: 'MISSION', url:"/au/P_AU_MI_SM.do"},
			{sel: "GR", title: '인사말', url:"/au/P_AU_GR_SM.do"}
		];
		var html = [];
		arrSubTab.forEach(function(item, i) {
			html.push('<li' + ((item.sel == "ID") ? ' class="on"' : '') + '><a href="' + item.url + '">' + item.title + '</a></li>');
		});
		$(this.wrapCls + ' .sub_tab ul').empty().append(html.join(''));
	}
	
});

var mController = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_mb',
    eventInit:function() {
	}, 
	onCreate:function() {
		this.makeSubTab("");
		this.vod_resize();
	},
	makeSubTab: function() {
		var arrSubTab = [
			{sel: "ID", title: 'KT Enterprise 소개', url:"/au/P_AU_ID_SM.do"},
			{sel: "MI", title: 'MISSION', url:"/au/P_AU_MI_SM.do"},
			{sel: "GR", title: '인사말', url:"/au/P_AU_GR_SM.do"}
		];
		var html = [];
		arrSubTab.forEach(function(item, i) {
			html.push('<li' + ((item.sel == "ID") ? ' class="on"' : '') + '><a href="' + item.url + '">' + item.title + '</a></li>');
		});
		$(this.wrapCls + ' .sub_tab ul:eq(0)').empty().append(html.join(''));
	},
	vod_resize : function(){
		var vod_resize = (function(){
			var	initModule,
				resizeModule,
				w = 816,
				h = 500,
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
