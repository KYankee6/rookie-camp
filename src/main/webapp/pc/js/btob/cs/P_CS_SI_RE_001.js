/** 고객지원>서비스 이용 안내 >브로셔/신청서 자료실>서류양식 다운로드 **/

var li_arr = new Array();
var t_li = 0; //초기화
var li_idx = 0; //초기화

var scroll_menu = function(scroll){ // 스크롤이벤트
	$('.kt_pc .tab_list_menu').animate({'scrollLeft': scroll}, 300);
}

var return_width = function(idx){ 
	var r_width = 0;
	$('.kt_pc .tab_list_menu > ul > li').each(function(i){
		if(idx - 4 >= i){
			r_width += li_arr[i];
		};
	});
	return r_width;
}

var controller = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_pc',
    listData: [],
	eventInit:function() {	

        var _this = this;

        $(document).on('click', '.kt_pc .tab_menu li.sch_cate a', function(e) { 
             location.href = "/cs/P_CS_SI_RE_002.do";
        });

		$(document).on('click', '.kt_pc .tab_list_menu a', function(e) { 
			e.preventDefault();
            var slideIndex = jq(this).closest("li").index();
            li_idx = slideIndex; //index 값 받아오기
            //jq(this).closest('li').addClass('on').siblings('li').removeClass('on');
            if(jq(this).closest('li').hasClass('on')){
            	jq(this).closest('li').removeClass('on')
            	$('.tab_list_menu a').attr('title', '');
            	jq(this).closest('li').siblings('li').removeClass('on');
            	jq(this).closest('li').siblings('li').find('a').attr('title', '');
            } else {
            	jq(this).closest('li').addClass('on')
            	$('.tab_list_menu a').attr('title', '선택됨');
            	jq(this).closest('li').siblings('li').removeClass('on');
            	jq(this).closest('li').siblings('li').find('a').attr('title', '');
            }
            if(slideIndex >= 4){
                scroll_menu( return_width(slideIndex) );
            }else{
                scroll_menu(0);
            }
            var glCtgryCd = $(this).attr('data-gl-ctgry-cd');
            _this.dispCtgry(glCtgryCd);
            //22-02-17, 선택된 표 타이틀 값 추가
            $(".qa_tit_list").find("li").eq($(this).closest("li").index()).show().siblings("li").hide();
		});
		
		$(document).on('click', '.kt_pc .tab_list_menu .btn_tab_left', function(e){
			e.preventDefault();
			if(li_idx != 0){
				$('.kt_pc .tab_list_menu > ul > li').eq(li_idx-1).find('a').click();
			}
		});

		$(document).on('click', '.kt_pc .tab_list_menu .btn_tab_right', function(e){
			e.preventDefault();
            $('.kt_pc .tab_list_menu > ul > li.on').next().find('a').trigger('click');
//			if(li_idx != li_arr){// 최상단에 0으로 선언해 실행됨.
//				$('.kt_pc .tab_list_menu > ul > li').eq(li_idx+1).find('a').click();
//			}
		});	
	}, 
	onCreate:function() {
		$('.kt_pc .tab_list_menu > ul > li').each(function(i){
			li_arr[i] = $(this).width()+70;
			t_li += $(this).width()+70;
		});
        this.loadData();
		$('.kt_pc .tab_list_menu > ul > li:first-child a').trigger('click');
		// $('.kt_pc .tab_list_menu > ul').css('width', t_li);//ul width값 픽스
//		$('.kt_pc .tab_list_area .tab_list_cont').hide().eq(0).show();
	},
    loadData: function() {
        var _this = this;
        this.ajaxSendCall('/bbs/listData.json', {}, function(result) {
            if(result.RES.returnCode == '01') {
                _this.listData = _this.clone(result.listData);
            }
         }, {async:false});
    },
    dispCtgry: function(glCtgryCd) {
        var _this = this;
        arrCtgryCd = glCtgryCd.split('_');
        var listCtgry = this.data.prodCtgry.filter(function(item){
            return ( item.lvl > 2 && ( item.gCtgryCd == arrCtgryCd[0] && item.lCtgryCd == arrCtgryCd[1] ) );
        });
        $('#list-panel').empty();
        var html = [];
        var prevItem, nextItem;
        var psCtgry = null;
        for (var i = 0; i < listCtgry.length; i++) {
            var item = listCtgry[i];
            var listCtgryChild = listCtgry.filter(function(itemChild) { return ( itemChild.psCtgryCd == item.ctgryCd ); });
            if(item.lvl == 3) {
                if (listCtgryChild.length == 0) {
                    html.push('<tr>');
                    html.push('    <td class="ac">' + item.ctgryNm + '</td>');
                    html.push('    <td></td>');
                    html.push('    <td data-file-ctgry-cd="' + item.ctgryCd + '"></td>');
                    html.push('</tr>');
                } else {
                	if (item.ctgryCd == 'PD_CC_IT_SM') {
                		nextItem = listCtgry[i+2];
	                    html.push('<tr>');
	                    html.push('    <td class="ac" rowspan="' + (listCtgryChild.length-1) + '">' + item.ctgryNm + '</td>');
	                    html.push('    <td>' + nextItem.ctgryNm + '</td>');
                    	html.push('    <td data-file-ctgry-cd="' + nextItem.ctgryCd + '"></td>');
	                    html.push('</tr>');
	                    i += 2;
                	} else {
                		nextItem = listCtgry[i+1];
	                    html.push('<tr>');
	                    html.push('    <td class="ac" rowspan="' + listCtgryChild.length + '">' + item.ctgryNm + '</td>');
	                    html.push('    <td>' + nextItem.ctgryNm + '</td>');
                    	html.push('    <td data-file-ctgry-cd="' + nextItem.ctgryCd + '"></td>');
	                    html.push('</tr>');
	                    i++;
                	}
                }
            } else {
                html.push('<tr>');
                html.push('    <td>' + item.ctgryNm + '</td>');
                html.push('    <td data-file-ctgry-cd="' + item.ctgryCd + '"></td>');
                html.push('</tr>');
            }
        }
        $('#list-panel').append(html.join(''));
        var listDataGlCtgryCd = this.listData.filter(function(item) {
            return ( item.glCtgryCd == glCtgryCd );
        });
        var prevTdCtgryCd = null;
        var html;
        listDataGlCtgryCd.forEach(function(item) {
            if(prevTdCtgryCd == null || prevTdCtgryCd != item.ctgryCd) {
                $('#list-panel td[data-file-ctgry-cd="' + item.ctgryCd + '"]').html('<div class="list_cont_more"></div>');
            }
            if(item.imgFgNm.indexOf("|") > -1) {
            	var fileDispNm = item.imgFgNm.split("|")[0];
            	html = '<a href="#" title="' + item.imgFgNm + ' 다운로드" role="button" class="btn_download" data-file-download-no="' + item.fileNm + '" id="' + item.fileExt.toLowerCase() + '"><span>' + fileDispNm + '</span></a>';
            } else {
            	html = '<a href="#" title="' + item.imgFgNm + ' 다운로드" role="button" class="btn_download" data-file-download-no="' + item.fileNm + '" id="' + item.fileExt.toLowerCase() + '"><span>' + item.imgFgNm + '</span></a>';
            }
            $('#list-panel td[data-file-ctgry-cd="' + item.ctgryCd + '"] div.list_cont_more').append(html);

            prevTdCtgryCd = item.ctgryCd;
        });
    }
	
});

$(document).ready(function(){
	controller.init();
});
