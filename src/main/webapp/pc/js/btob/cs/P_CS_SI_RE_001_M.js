/** 고객지원>서비스 이용 안내 >브로셔/신청서 자료실>서류양식 다운로드 **/

var mController = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_mb',
    listLCtgryCd: [],
    listData: [],
    selectLCtgryCd: '',
	eventInit:function() {
        var _this = this;
        $(document).on('click', '.kt_mb .tab_menu li.sch_cate a', function(e) { 
             location.href = "/cs/P_CS_SI_RE_002.do";
        });
		$(document).on('click', '.kt_mb .tab_list_area .tab_list_cont > a', function(e){
			e.preventDefault();
			if($(this).closest('li').hasClass('on')){
				$(this).closest('li').removeClass('on')
			}else{
				$(this).closest('li').addClass('on').siblings('li').removeClass('on')
			}
		});
		$(document).on('click', '.kt_mb .tab_list_area .depth2 > li > a', function(e){
			e.preventDefault();
			if($(this).closest('li').hasClass('on')){
				$(this).closest('li').removeClass('on')
			}else{
				$(this).closest('li').addClass('on').siblings('li').removeClass('on')
			}
		});
        $(document).on('click', '#m-search-panel ul[data-list-gctgry] li a', function() {
            _this.setSearchLCtgry();
            _this.selectLCtgryCd = '';
            _this.disp();
        });
        $(document).on('click', '#m-search-panel ul[data-list-lctgry] li a', function() {
            var lCtgryCd = this.selectLCtgryCd = $(this).attr('data-lctgry-cd');
            _this.disp(lCtgryCd);
        });
	}, 
	onCreate:function() {
        this.listData = controller.listData;
        this.setSearchLCtgry();
        this.disp();
	},
    setSearchLCtgry: function() {
        var gCtgryCd = $('#m-search-panel ul[data-list-gctgry] li.on a').attr('data-gctgry-cd');
        this.listLCtgryCd = this.data.prodCtgry.filter(function(item) {
            return ( item.lvl == 2 && ( item.gCtgryCd == 'PD' || item.gCtgryCd == 'SL' ) );            
        });
        if(gCtgryCd != "") {
            this.listLCtgryCd = this.listLCtgryCd.filter(function(item) {
                return ( item.lvl == 2 && item.gCtgryCd == gCtgryCd);            
            }); 
        }
        var elemList = $('#m-search-panel ul[data-list-lctgry]');
        elemList.empty();
        var html = [];
        html.push('<li class="on"><a href="#sel02" data-lctgry-cd="">전체</a></li>');
        this.listLCtgryCd.forEach(function(item){
        	if(item.ctgryCd != 'PD_FG_SM' && item.ctgryCd != 'SL_AI_001' && item.ctgryCd != 'SL_UB_001' && item.ctgryCd != 'SL_DI_001') {
        		html.push('<li><a href="#mbsel02" data-lctgry-cd="' + item.ctgryCd + '">' + item.ctgryNm + '</a></li>');
        	}
        });
        elemList.append(html.join(''));
        $('#mbsel02').text('전체');
    },
    disp: function(lCtgryCd) {
        var _this = this;
        var elemList = $(this.wrapCls + ' ul[data-list]');
        elemList.empty();
        var html = [];
        var listLCtgryCd = this.clone(this.listLCtgryCd);
        if(typeof(lCtgryCd) != 'undefined' && lCtgryCd != "") {
            listLCtgryCd = listLCtgryCd.filter(function(item){
                return ( item.ctgryCd == lCtgryCd );
            });

        }
        listLCtgryCd.forEach(function(item) {
        	if (item.ctgryCd != 'PD_FG_SM' && item.ctgryCd != 'SL_AI_001' && item.ctgryCd != 'SL_UB_001' && item.ctgryCd != 'SL_DI_001') {
	        	html.push('<li class="tab_list_cont">');
	            html.push('    <a href="#" title="' + item.ctgryNm + '">' + item.ctgryNm + '</a>');
	            var listMCtgryCd = _this.data.prodCtgry.filter(function(item2){
	                return ( item2.lvl == 3 && item2.psCtgryCd == item.ctgryCd );
	            });
	            if(listMCtgryCd.length > 0) {
	                html.push('    <ul class="depth2">');
	                
	                listMCtgryCd.forEach(function(item2) {
	                    html.push('        <li>');
	                    html.push('            <a href="#" title="' + item2.ctgryNm + '">' + item2.ctgryNm + '</a>');
	                    html.push('            <div class="list_cont_more" data-file-ctgry-cd="' + item2.ctgryCd + '">');
	                    if(item2.childExstYn == 'Y') {
	                        var listSCtgryCd = _this.data.prodCtgry.filter(function(item3){
	                            return ( item3.lvl == 4 && item3.psCtgryCd == item2.ctgryCd );
	                        });
	                        if(listSCtgryCd.length > 0) {
	                            listSCtgryCd.forEach(function(item3){
	                            	if(item3.ctgryCd != 'PD_CC_IT_001') {
	                            		html.push('                <strong>' + item3.ctgryNm + '</strong>');  
	                                	html.push('                <div data-file-ctgry-cd="' + item3.ctgryCd + '"></div>');
	                            	}
	                            });
	                        }
	                    }
	                    html.push('            </div>');
	                    html.push('        </li>');
	                });
	                html.push('    </ul>');
	            }
	            html.push('</li>');
        	}
        });
        elemList.append(html.join(''));
        this.listData.forEach(function(item){
            if($('div[data-file-ctgry-cd="' + item.ctgryCd + '"]').length > 0) {
                 if(item.imgFgNm.includes("|")) {
            		var fileDispNm = item.imgFgNm.split("|")[0];
            		$('div[data-file-ctgry-cd="' + item.ctgryCd + '"]').append('<a href="#" title="' + item.imgFgNm + ' 다운로드" role="button" class="btn_download" data-file-download-no="' + item.fileNm + '" id="' + item.fileExt.toLowerCase() + '"><span>' + fileDispNm + '</span></a>');
            	} else {
            		$('div[data-file-ctgry-cd="' + item.ctgryCd + '"]').append('<a href="#" title="' + item.imgFgNm + ' 다운로드" role="button" class="btn_download" data-file-download-no="' + item.fileNm + '" id="' + item.fileExt.toLowerCase() + '"><span>' + item.imgFgNm + '</span></a>');
            	}
            }
        });
    }
	
});


$(document).ready(function(){
	mController.init();
});
