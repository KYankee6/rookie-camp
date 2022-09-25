var Consulting = function(option) {
    this.controller = null;
    this.id='popupConsulting';
    $.extend(true, this, option);
    this.params = {
        SESSIONID           : sessionId,                    // 세션ID
        LINKTYPECODE        : '14',                                     // 연결유형코드[13:1대1문의, 14:맞춤컨설팅]
        INFLOWROUTECODE     : ( $.Utils.isMobile() ? '2' : '1' ),       // 유입경로[1:웹, 2:모바일]
        CUSTOMERNAME       : '',                                       // 이름/회사명
        CUSTOMERTYPECODE    : '4',                                      // 기업구분[4:기업]
        CUSTOMERTEL         : '',                                       // 연락처
        CUSTOMEREMAIL        : 'cswebmaster@kt.com',                     // 이메일
        PRODUCT             : '',                                       // 상품
        SMSYN               : 'N',                                      // SMS 수신여부
        QUESTIONTYPE        : '',                                       // 문의유형
        TITLE               : '컨설팅신청',                               // 제목
        CONTENTS            : '',                                       // 내용
        ADDINFO1            : '',                                       // 추가정보1[고객식별번호(법인번호/사업자등록번호)]
        ADDINFO2            : '',                                       // 추가정보2[선호하시는 상담연락 방법]
        ADDINFO3            : ''                                        // 추가정보3[정의되지 않은 추가정보 입력 필드]
    };
    this.view = null;
    this.model = new $.Model();
    this.url = '/erms/sendErms.json';
    this.listProdCtgry = [];
    this.listLProdCtgry = [];
    this.pageLCtgryCd = null;
    this.pageMCtgryCd = null;
    this.pageSCtgryCd = null;
    this.init();
    return this;
};
Consulting.prototype.getDefParam = function() {
    return $.extend(true, {}, this.params);
};
Consulting.prototype.init = function(initData) {
 
    if(typeof(this.controller.data.prodCtgry) != 'undefined') {
        this.listProdCtgry = this.controller.data.prodCtgry.filter(function(item) {
            return ( item.gCtgryCd == 'PD' || item.gCtgryCd == 'SL' );
        });
    }
    this.listLProdCtgry = this.listProdCtgry.filter(function(item){
        return ( item.lvl == 2 );
    });
    this.view = $('#'+this.id);
    this.view.applyFieldOption();
    this.initDisp();
    this.initEvent();
};
Consulting.prototype.setPageCtgryCd = function() {
    var pageCtgryCd = location.pathname.substring(6).replace('.do', '');
    var listPageCtgryCd = this.listProdCtgry.filter(function(item){
        return ( item.ctgryCd == pageCtgryCd );
    });
    if(listPageCtgryCd.length > 0) {
        var oPageCtgryCd = listPageCtgryCd[0];
        if(oPageCtgryCd.lvl == 4) {
            this.pageSCtgryCd = oPageCtgryCd.ctgryCd;
            var oPageMCtgryCd = this.listProdCtgry.filter(function(item){
                return ( item.ctgryCd == oPageCtgryCd.psCtgryCd );
            })[0];
            this.pageMCtgryCd = oPageMCtgryCd.ctgryCd;
            this.pageLCtgryCd = oPageMCtgryCd.psCtgryCd;
        } else if(oPageCtgryCd.lvl == 3) {
            this.pageMCtgryCd = oPageCtgryCd.ctgryCd;
            this.pageLCtgryCd = oPageCtgryCd.psCtgryCd;
        } else if(oPageCtgryCd.lvl == 2) {
            this.pageLCtgryCd = oPageCtgryCd.ctgryCd;
        }
        var lval = $('#' + this.id + ' select[name=PRODUCT_L] option[data-value="' + this.pageLCtgryCd + '"]').val();
        $('#' + this.id + ' select[name=PRODUCT_L]').val(lval).trigger('change');
        if(this.pageMCtgryCd != null) {
            var mval = $('#' + this.id + ' select[name=PRODUCT_M] option[data-value="' + this.pageMCtgryCd + '"]').val();
            $('#' + this.id + ' select[name=PRODUCT_M]').val(mval).trigger('change');
        }
        if(this.pageSCtgryCd != null) {
            var mval = $('#' + this.id + ' select[name=PRODUCT_S] option[data-value="' + this.pageSCtgryCd + '"]').val();
            $('#' + this.id + ' select[name=PRODUCT_S]').val(mval).trigger('change');
        }
    }
};
Consulting.prototype.initDisp = function() {
    $('#' + this.id + ' select[name=PRODUCT_L]').empty();
    var html = [];
    var fstOption = '<option value="" data-value="">선택</option>';
    html.push(fstOption);
    this.listLProdCtgry.forEach(function(item){
    	if(item.ctgryCd != 'PD_FG_SM' && item.ctgryCd != 'SL_AI_001' && item.ctgryCd != 'SL_UB_001' && item.ctgryCd != 'SL_DI_001') {
    		html.push('<option value="' + item.ctgryNm + '" data-value="' + item.ctgryCd + '">' + item.ctgryNm + '</option>');
    	}
    });
    $('#' + this.id + ' select[name=PRODUCT_L]').append(html.join(''));
    $('#' + this.id + ' select[name=PRODUCT_M], #' + this.id + ' select[name=PRODUCT_S]').empty().append(fstOption).hide();
    this.model.data.init = this.view.flushPanel();
};
Consulting.prototype.initEvent = function() {
    var _this = this;
    
    // 모바일 , PC 컨트롤러가 두개라 이벤트가 두번 걸려 하나는 off 처리 한다.
    $(document).off('click', '#' + this.id + ' a.confirm');
    $(document).off('click', '#' + this.id + ' input.agree_chk_all');
    $(document).off('change', '#' + this.id + ' select[name=CUSTOMERMAIL_DOMAIN_SELECT]');
    $(document).off('change', '#' + this.id + ' select[name=PRODUCT_L]');
    $(document).off('change', '#' + this.id + ' select[name=PRODUCT_M]');
    $(document).off('change', '#' + this.id + ' textarea[name=CONTENTS]');
    $(document).off('change', '#' + this.id + ' select[name=ADDINFO1_INFO]');

    $(document).on('click', '#' + this.id + ' a.confirm', function() {
        if(_this.view.validateForm()) {
            _this.model.data.flush = _this.view.flushPanel();
            if(_this.model.data.flush.AGREE_MUST != 'Y') {
                $.Utils.alert('개인정보 수집 및 이용에 동의는 필수 항목 입니다.');
                return;
            }
            var params = _this.setParams();
            
            if(!$.Utils.checkEmail(params.CUSTOMEREMAIL)) {
                $.Utils.alert('이메일 형식이 올바르지 않습니다..');
                return;
            }
            if(!$.Utils.checkTelNo(params.CUSTOMERTEL)) {
                $.Utils.alert('연락처가 올바르지 않습니다..');
                return;
            }
            if(confirm('컨설팅 신청을 접수하시겠습니까?')) {
                params = _this.controller.removeScript(params);
                _this.controller.ajaxSendCall(_this.url, params, function(result) {
                    if(result.error == 'N') {
                            try{
                                var xmlResult = _this.controller.xmlToJson(result.rtnMsg);
                                if(xmlResult.RETURNCODE == 'Y') {
		    						dataLayer.push ({
                                    	'event' : 'ga_enquiry_complete', 		// 신청 완료 시 이벤트 전송
                                    	'enquiryType' : '컨설팅 신청'               // [신청 유형]
                                    	// ex) 1:1 온라인 문의 신청, 컨설팅 신청, 뉴스레터 신청
                                    	// 080콜체크인 문의, 모바일용 1:1 문의, AI Robot 컨설팅 신청, 1:1 온라인 문의(newsletter), 온라인 문의_네이버블로그, 온라인 문의_유튜브
                                    });
                                    
                                    setTimeout(function() {
                                    	$.Utils.alert('컨설팅 신청이 완료되었습니다.');
			                            $(".layer_pop").hide();
			    						$(".dim").hide();
                                    }, 1000);
                                }else{
                                	$.Utils.alert("죄송합니다. 저장하는 도중 해당 시스템 \n또는 네트웍의 일시적인 문제로 인해 저장에 실패하였습니다.\n잠시 후 다시 시도하여 주시기 바랍니다.");
                                }
                            } catch(e) {
                                $.Utils.alert("죄송합니다. 저장하는 도중 해당 시스템 \n또는 네트웍의 일시적인 문제로 인해 저장에 실패하였습니다.\n잠시 후 다시 시도하여 주시기 바랍니다.");
                            }
                        } else {
                        	$.Utils.alert("죄송합니다. 저장하는 도중 해당 시스템 \n또는 네트웍의 일시적인 문제로 인해 저장에 실패하였습니다.\n잠시 후 다시 시도하여 주시기 바랍니다.");
                        }
                });
            }
        }
    });
    
    $(document).on('change', '#' + this.id + ' select[name=ADDINFO1_INFO]', function() {
    	$('#' + _this.id + ' input[name=ADDINFO1]').val('');
    });
    
    $(document).on('click', '#' + this.id + ' input.agree_chk_all', function() {
        var chkAll = $(this).is(':checked');
        if(chkAll) {
            $('#' + _this.id + ' input.agree_chk').prop('checked', true);
        }        
    });
    $(document).on('change', '#' + this.id + ' select[name=PRODUCT_L]', function() {
        $('#' + _this.id + ' select[name=PRODUCT_M]').empty().hide();
        $('#' + _this.id + ' select[name=PRODUCT_S]').empty().hide();
        var lCtgryCd = $(this).find('option:selected').attr('data-value');
        if(lCtgryCd != '') {
            var listMProdCtgry = _this.listProdCtgry.filter(function(item){
                return ( item.lvl == 3 && item.psCtgryCd == lCtgryCd );
            });
            var html = [];
            var fstOption = '<option value="" data-value="">선택</option>';
            html.push(fstOption);
            listMProdCtgry.forEach(function(item){
                html.push('<option value="' + item.ctgryNm + '" data-value="' + item.ctgryCd + '">' + item.ctgryNm + '</option>');
            });
            $('#' + _this.id + ' select[name=PRODUCT_M]').append(html.join(''));
            if(listMProdCtgry.length > 0) {
                $('#' + _this.id + ' select[name=PRODUCT_M]').show();
            } else {
                $('#' + _this.id + ' select[name=PRODUCT_M]').hide();
            }
        }        
    });
    $(document).on('change', '#' + this.id + ' select[name=PRODUCT_M]', function() {
        $('#' + _this.id + ' select[name=PRODUCT_S]').empty().hide();
        var mCtgryCd = $(this).find('option:selected').attr('data-value');
        if(mCtgryCd != '') {
            var listSProdCtgry = _this.listProdCtgry.filter(function(item){
                return ( item.lvl == 4 && item.psCtgryCd == mCtgryCd );
            });
            var html = [];
            var fstOption = '<option value="" data-value="">선택</option>';
            html.push(fstOption);
            listSProdCtgry.forEach(function(item){
            	if(item.ctgryCd != 'PD_CC_IT_001') {
            		html.push('<option value="' + item.ctgryNm + '" data-value="' + item.ctgryCd + '">' + item.ctgryNm + '</option>');
            	}
            });
            $('#' + _this.id + ' select[name=PRODUCT_S]').append(html.join(''));
            if(listSProdCtgry.length > 0) {
                $('#' + _this.id + ' select[name=PRODUCT_S]').show();
            } else {
                $('#' + _this.id + ' select[name=PRODUCT_S]').hide();
            }
        } 
    });
    $(document).on('keyup', '#' + this.id + ' textarea[name=CONTENTS]', function() {
        var maxLen = parseInt($(this).attr('maxlength'));
        var len = $(this).val().length;
        if(len > maxLen) len = maxLen;
        $('#' + _this.id + ' .txt_count i').text(len);
    });
};
Consulting.prototype.setParams = function() {
    var rtnParams = {};
    var model = this.model.data.flush;
    if(model.PRODUCT_S != "" && model.PRODUCT_S != null) {
        rtnParams.PRODUCT = $("#pro3 option:selected").attr('data-value');
    } else if(model.PRODUCT_M != "" && model.PRODUCT_M != null) {
        rtnParams.PRODUCT = $("#pro2 option:selected").attr('data-value');
    } else if(model.PRODUCT_L != "" && model.PRODUCT_L != null) {
        rtnParams.PRODUCT = $("#pro1 option:selected").attr('data-value');
    }
    rtnParams.CUSTOMERNAME = (model.CUSTOMERENAME_NAME + '/' + model.CUSTOMERENAME_CORP).left(25).toString();
    rtnParams.QUESTIONTYPE = model.QUESTIONTYPE;
    rtnParams.CONTENTS = model.CONTENTS;
    rtnParams.CUSTOMERTEL = model.CUSTOMERTEL_1 + model.CUSTOMERTEL_2 + model.CUSTOMERTEL_3;
    rtnParams.ADDINFO1 = model.ADDINFO1;
    rtnParams.ADDINFO2 = model.ADDINFO2;
    //rtnParams.ADDINFO1 = ( model.AGREE_YN == 'Y' ) ? 'KT 서비스 및 이벤트 정보수신에 동의' : 'KT 서비스 및 이벤트 정보수신에 미동의';
    var customermail_ID = model.CUSTOMERMAIL_ID.replaceAll(" ", "");
    if(customermail_ID == null || customermail_ID == '') {
    	rtnParams.CUSTOMEREMAIL = 'b2bonline@kt.com';
    } else {
	    if( model.CUSTOMERMAIL_DOMAIN_SELECT == '직접입력' ) {
	        rtnParams.CUSTOMEREMAIL = model.CUSTOMERMAIL_ID  + '@' + model.CUSTOMERMAIL_DOMAIN;
	    } else {
	        if(model.CUSTOMERMAIL_ID.indexOf('@') > -1) {
	            model.CUSTOMERMAIL_ID = model.CUSTOMERMAIL_ID.left(model.CUSTOMERMAIL_ID.indexOf('@'));
	        }
	        rtnParams.CUSTOMEREMAIL = model.CUSTOMERMAIL_ID + '@' + model.CUSTOMERMAIL_DOMAIN_SELECT;
	    }
    }
    rtnParams.ADDINFO3 = chatbotSessionKey;
    rtnParams = $.extend(true, this.getDefParam(), rtnParams);
    return rtnParams;
    //return this.jsonToFormData(rtnParams);
};
Consulting.prototype.jsonToFormData = function(json) {
    var data = [];
    for(var key in json) {
        data.push(key + '=' + encodeURI(json[key]));
    }
    return data.join('&');
};
Consulting.prototype.open = function() {
    this.close();
    this.view.bindPanel(this.model.data.init);
    $('#' + this.id + ' .txt_count i').text(0);
    this.view.show();
    this.setPageCtgryCd();
	$(".dim").show();
	$('.floating_btn').removeClass('on');
};
Consulting.prototype.close = function() {
    $(".layer_pop").hide();
    $(".dim").hide();
};

function CallCheckin(){//2021-06-21 콜체크인 배너에서 온라인 상담신청 버튼 누를때, 팝업 띄우기
	var showConsulting = {
		pop_title : $("#popupConsulting .layer_wrap .layer_tit h3"),
		floatingBtn : $(".floating_btn .consulting a"),
		select1 : $("#pro1"),
		select2 : $("#pro2"),
		select3 : $("#pro3"),
        regist_num : $("#pop_c_regist_number").closest("tr"),
        regist_call : $("#pop_c_regist_call").closest("tr"),
		callCheckIn : function(){
			this.pop_title.html("상담신청");
			this.floatingBtn.click();
			this.select1.find("option[value='커뮤니케이션']").attr("selected", "selected");
			this.select1.change();
			this.select2.show().find("option[value='전화부가서비스']").attr("selected", "selected");
			this.select2.change();
			this.select3.show().find("option[value='080콜체크인']").attr("selected", "selected");
			this.select3.change();
            this.regist_num.remove();
            this.regist_call.remove();
		}
	};

	showConsulting.callCheckIn();
}