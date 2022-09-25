var popupProdSelect = null;

/** 고객지원>온라인문의>1:1문의  **/
var controller = $.extend(new $.CommonObj(),{
    wrapCls: '.kt_pc',
    elemPanel: null,
    sltrPanel: null,
    initData: {},
    params: {
        SESSIONID           : sessionId,                                // 세션ID
        LINKTYPECODE        : '13',                                     // 연결유형코드[13:1대1문의, 14:맞춤컨설팅]
        INFLOWROUTECODE     : ( $.Utils.isMobile() ? '2' : '1' ),       // 유입경로[1:웹, 2:모바일]
        CUSTOMERNAME       : '',                                        // 이름/회사명
        CUSTOMERTYPECODE    : '4',                                      // 기업구분[4:기업]
        CUSTOMERTEL         : '',                                       // 연락처
        CUSTOMEREMAIL        : 'cswebmaster@kt.com',                     // 이메일
        PRODUCT             : '',                                       // 상품
        SMSYN               : 'N',                                      // SMS 수신여부
        QUESTIONTYPE        : '',                                       // 문의유형
        TITLE               : '제목없음',                               // 제목
        CONTENTS            : '',                                       // 내용
        ADDINFO1            : '',                                       // 추가정보1[고객식별번호(법인번호/사업자등록번호)]
        ADDINFO2            : '',                                       // 추가정보2[정의되지 않은 추가정보 입력 필드]
        ADDINFO3            : ''                                        // 추가정보3[정의되지 않은 추가정보 입력 필드]
    },
    eventInit:function() {
        var _this = this;
        
        this.elemPanel = $( this.wrapCls + ' *[data-panel-id="otoqna-panel"]' );
        this.sltrPanel = this.wrapCls + ' *[data-panel-id="otoqna-panel"]';

        $(this.sltrPanel + ' a.btn_sbtn_sch').on('click', function() {
            popupProdSelect.setSelectedList(_this.getProductCtgry());
            popupProdSelect.open(function() {
                var elem = $(_this.wrapCls + ' ul.area_tags');
                if(popupProdSelect.selectedList.length > 0) {
                    elem.empty();
                    var html = [];
                    popupProdSelect.selectedList.forEach(function(item, i) {
                        html.push('<li>');
                        html.push('    <a href="#" data-ctgry-cd="' + item.ctgryCd + '" data-ctgry-nm="' + item.ctgryNm + '">#' + item.ctgryNm + '</a>');
                        html.push('    <a href="#" class="del" data-ctgry-cd="' + item.ctgryCd + '"><span class="hidden">삭제</span></a>');
                        html.push('</li>');
                    });
                    elem.append(html.join(''));
                }
                popupProdSelect.close();
            });
        });
        $(document).on('click', _this.wrapCls + ' ul.area_tags li a.del', function() {
            var ctgryCd = $(this).attr('data-ctgry-cd');
            popupProdSelect.removeSelectedList(ctgryCd);
            $(this).closest('li').remove();
        });
        $(document).on('click', _this.wrapCls + ' a.confirm', function() {
            var params = _this.elemPanel.flushPanel();
            if(_this.elemPanel.validateForm()) {
            	
                params.PRODUCT = _this.getProduct();
                if(params.AGREE_MUST != 'Y') {
                    $.Utils.alert('개인정보 수집 및 이용에 동의는 필수 항목 입니다.');
                    return;
                }
                var sendParams = _this.setParams(params);
                if(!$.Utils.checkEmail(sendParams.CUSTOMEREMAIL)) {
                    $.Utils.alert('이메일 형식이 올바르지 않습니다..');
                    return;
                }

                if(!$.Utils.checkTelNo(sendParams.CUSTOMERTEL)) {
                    $.Utils.alert('연락처가 올바르지 않습니다..');
                    return;
                }
                if(confirm('1:1 문의 신청을 접수하시겠습니까?')) {
                    _this.setInitData();
                    var url = '/erms/sendErms.json';
                    sendParams = _this.removeScript(sendParams);
                    _this.ajaxSendCall(url, sendParams, function(result) {
                        if(result.error == 'N') {
                            try{
                                var xmlResult = _this.xmlToJson(result.rtnMsg);
                                if(xmlResult.RETURNCODE == 'Y') {
                                    dataLayer.push ({
                                    	'event' : 'ga_enquiry_complete', 		// 신청 완료 시 이벤트 전송
                                    	'enquiryType' : '1:1 온라인 문의'               // [신청 유형]
                                    	// ex) 1:1 온라인 문의 신청, 컨설팅 신청, 뉴스레터 신청
                                    	// 080콜체크인 문의, 모바일용 1:1 문의, AI Robot 컨설팅 신청, 1:1 온라인 문의(newsletter), 온라인 문의_네이버블로그, 온라인 문의_유튜브
                                    });
                                    
                                    setTimeout(function() {
                                    	$.Utils.alert('1:1 문의가 접수 되었습니다.');
                                    	location.href="/cs/P_CS_CQ_001.do";
                                    }, 1000);
                                    
                                } else {
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
        
        $('#regist_number').change(function(){
        	$('#ADDINFO1_CS').val('');
        });
    }, 
    onCreate:function() {
        if( popupProdSelect == null ) {
            popupProdSelect = new PopupProdSelect({list:this.data.prodCtgry});
        }
        this.setInitData();
        this.setPanelInit();
        this.elemPanel.applyFieldOption();
    },
    setInitData: function() {
        this.initData = this.elemPanel.flushPanel();
    },
    setPanelInit: function() {
        this.elemPanel.bindPanel(this.initData);
        $(this.wrapCls + ' ul.area_tags').empty();
        popupProdSelect.clear();
    },
    getProduct: function() {
        var listProduct = [];
        $(this.wrapCls + ' ul.area_tags li > a[data-ctgry-nm]').each(function() {
            listProduct.push($(this).attr('data-ctgry-nm'));
        });
        return listProduct.join('||');
    },
    getProductCtgry: function() {
        var listProduct = [];
        $(this.wrapCls + ' ul.area_tags li > a[data-ctgry-nm]').each(function() {
            listProduct.push($(this).attr('data-ctgry-cd'));
        });
        return listProduct;
    },
    getDefParam: function() {
        return $.extend(true, {}, this.params);
    },
    jsonToFormData: function(json) {
        var data = [];
        for(var key in json) {
            data.push(key + '=' +json[key]);
            //data.push(key + '=' + encodeURI(json[key]));
        }
        return data.join('&');
    },
    setParams: function(params) {
        var rtnParams = {};
        rtnParams.PRODUCT = params.PRODUCT;
        rtnParams.CUSTOMERNAME = (params.CUSTOMERENAME_NAME + '/' + params.CUSTOMERENAME_CORP).left(25).toString();
        rtnParams.QUESTIONTYPE = params.QUESTIONTYPE;
        rtnParams.CONTENTS = params.CONTENTS;
        rtnParams.CUSTOMERTEL = params.CUSTOMERTEL_1 + params.CUSTOMERTEL_2 + params.CUSTOMERTEL_3;
//        rtnParams.AGREE_YN = ( params.AGREE_YN == 'Y' ) ? 'Y' : 'N';
		var customermail_ID = params.CUSTOMERMAIL_ID.replaceAll(" ", "");
        if(customermail_ID == null || customermail_ID == '') {
        	rtnParams.CUSTOMEREMAIL = 'b2bonline@kt.com';
        } else {
	        if( params.CUSTOMERMAIL_DOMAIN_SELECT == '직접입력' ) {
	            rtnParams.CUSTOMEREMAIL = params.CUSTOMERMAIL_ID + '@' + params.CUSTOMERMAIL_DOMAIN;
	        } else {
	            if(params.CUSTOMERMAIL_ID.indexOf('@') > -1) {
	                params.CUSTOMERMAIL_ID = params.CUSTOMERMAIL_ID.left(params.CUSTOMERMAIL_ID.indexOf('@'));
	            }
	            rtnParams.CUSTOMEREMAIL = params.CUSTOMERMAIL_ID + '@' + params.CUSTOMERMAIL_DOMAIN_SELECT;
	        }
        }
        
        rtnParams.ADDINFO1 = params.ADDINFO1;
        rtnParams.ADDINFO2 = params.ADDINFO2;
        rtnParams.ADDINFO3 = chatbotSessionKey;
        rtnParams.TITLE = params.TITLE;
        rtnParams = $.extend(true, this.getDefParam(), rtnParams);
        return rtnParams;
//        return this.jsonToFormData(rtnParams);
    }
    
});

$(document).ready(function(){
    controller.init();
});