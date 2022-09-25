/** 상품서비스>모바일>법인폰 **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_pc',
    eventInit:function() {

	}, 
	onCreate:function() {
		//this.event_01();	//2021-08-26 이벤트 종료로 삭제
	},
	/*event_01 : function(){
		var triggers = $("[data-ui-button='galaxyZ_fold3']");
		var element = "";
		var layer_str = '';
		layer_str += '<div class="pop_mb_bp_001_event_01">';
		layer_str += '	<div class="popup_wrapper">';
		layer_str += '		<button type="button" class="close"><span>닫기</span></button>';
		layer_str += '		<div class="img_scroll">';
		layer_str += '			<div class="img_wrap">';
		layer_str += '				<img src="/resource/images/pd/mb_bp_001_event_01.png" alt="">';
		layer_str += '				<a style="width:50%; height:1%; top:8.2%; left:0%;" href="https://shopmns.com/sbw/phonelink.asp?encShopID=20ee83f540168c6a5e26c9a18bf4cfcc0458f37163be80dccf7dab750f68edab&encGoodsCode=20ee83f540168c6a2f62d8b00c2d532bde199ef01f4b5cc22d7b6e11bf28eec9&encPlanCharge=20ee83f540168c6ac635442b676e1710a7a5da20b6dec9f9d8dad78ce6776a7c" target="_blank"><span>페이지이동</span></a>';
		layer_str += '				<a style="width:50%; height:1%; top:8.2%; left:50%;" href="https://shopmns.com/sbw/phonelink.asp?encShopID=20ee83f540168c6a5e26c9a18bf4cfcc0458f37163be80dccf7dab750f68edab&encGoodsCode=826679ddf79765d99a240a8ba9eeba007675f7a47117532d2d7b6e11bf28eec9&encPlanCharge=826679ddf79765d9a8dc45ef90779828a7a5da20b6dec9f9d8dad78ce6776a7c" target="_blank"><span>페이지이동</span></a>';
		layer_str += '				<a style="width:100%; height:1%; top:82.2%; left:0%;" href="https://shop.kt.com/display/olhsPlan.do?plnDispNo=1424" target="_blank"><span>페이지이동</span></a>';
		layer_str += '				<a style="width:35%; height:1%; bottom:0%; left:30%;" href="https://shopmns.com/sbw/phonelink.asp?encShopID=20ee83f540168c6a5e26c9a18bf4cfcc0458f37163be80dccf7dab750f68edab&encGoodsCode=20ee83f540168c6a2f62d8b00c2d532bde199ef01f4b5cc22d7b6e11bf28eec9&encPlanCharge=20ee83f540168c6ac635442b676e1710a7a5da20b6dec9f9d8dad78ce6776a7c" target="_blank"><span>페이지이동</span></a>';
		layer_str += '				<a style="width:35%; height:1%; bottom:0%; left:65%;" href="https://shopmns.com/sbw/phonelink.asp?encShopID=20ee83f540168c6a5e26c9a18bf4cfcc0458f37163be80dccf7dab750f68edab&encGoodsCode=826679ddf79765d99a240a8ba9eeba007675f7a47117532d2d7b6e11bf28eec9&encPlanCharge=826679ddf79765d9a8dc45ef90779828a7a5da20b6dec9f9d8dad78ce6776a7c" target="_blank"><span>페이지이동</span></a>';
		layer_str += '			</div>';
		layer_str += '		</div>';
		layer_str += '	</div>';
		layer_str += '	<span class="overlay"></span>';
		layer_str += '</div>';

		triggers.click(createLayer);

		function createLayer(){
			element = $(layer_str);
			element.appendTo("body");
			sizeFiltering();
			element.find(".close").click(popRemove);
		}

		function sizeFiltering(){
			var h = document.documentElement.clientHeight;
			if(h < element.height()){
				element.find(".img_scroll").css("height", h - 100 + "px");
				element.css("margin-top", -element.height() / 2 + "px");
			}
		}

		function popRemove(){
			element.remove();
		}
	}*/
	
});

var mController = $.extend(new $.CommonObj(),{
    wrapCls:'.kt_mb',
    eventInit:function() {

	}, 
	onCreate:function() {
		//this.event_01();
	},
	event_01 : function(){
	}
	
});


$(document).ready(function(){
	controller.init();
	mController.init();
});
