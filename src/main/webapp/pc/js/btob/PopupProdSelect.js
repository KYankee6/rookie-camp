/**
 * 상품 카테고리 선택용 js
 */

var PopupProdSelect = function(opt) {
	this.selectedList = [];
	this.nMaxSelected = 5;
	this.callbackFunc = null;
    this.popupId = '#popProdSelect2';
    this.popupCls = 'productSelect';
    if(typeof(controller) != 'undefined') {
        this.controller = controller;
    }
    this.list = [];
    $.extend(true, this, opt)
    this.init();
};
PopupProdSelect.prototype.init = function() {
    this.list = this.list.filter(function(item) {
        return ( ( item.gCtgryCd == 'PD' || item.gCtgryCd == 'SL' ) && item.useYn == 'Y' );
    });
    this.dispProd();
    this.setEvent();
};
PopupProdSelect.prototype.open = function(callbackFunc) {
    $(".layer_pop." + this.popupCls).attr("tabindex", 0).show().focus();
	$(".dim").show();
	$('.floating_btn').removeClass('on');
    if(typeof(callbackFunc) == 'function') {
        this.callbackFunc = callbackFunc;
    }
};
PopupProdSelect.prototype.clear = function() {
    this.selectedList = [];
    this.syncDataCheckbox();
};
PopupProdSelect.prototype.setSelectedList = function(list) {
    var _this = this;
    this.selectedList = [];
    list.forEach(function(item) {
        _this.selectedList.push(_this.list.filter(function(item2){return (item2.ctgryCd == item)})[0]);
    });
    
    this.syncDataCheckbox();
};
PopupProdSelect.prototype.removeSelectedList = function(ctgryCd) {
    var idx = -1;
    for(var i = 0; i < this.selectedList.length; i++ ) {
        if(this.selectedList[i].ctgryCd == ctgryCd) {
            idx = i;
            break;
        }
    } 
	if(idx > -1) {
		this.selectedList.splice(idx, 1);
	}
	this.syncDataCheckbox();
};
PopupProdSelect.prototype.dispProd = function() {
    var _this = this;
    var elemList = $(this.popupId + ' #sub_type1 ul.list_depth1');
    elemList.empty();
    var html = [];
    var listPdLv1 = this.list.filter(function(item){
        return ( item.lvl == 2 && item.gCtgryCd == 'PD' );
    }).keySort({'sortSn':'asc'});
    listPdLv1.forEach(function(item) {
        html.push(_this.makeProdLv2Li(item));
    });
    elemList.append(html.join(''));

    elemList = $(this.popupId + ' #sub_type2 ul.list_depth1');
    elemList.empty();
    html = [];
    var listSlLv2 = this.list.filter(function(item){
        return ( item.lvl == 2 && item.gCtgryCd == 'SL' );
    }).keySort({'sortSn':'asc'});
    listSlLv2.forEach(function(item) {
        html.push(_this.makeSolutionLv2Li(item));
    });
    elemList.append(html.join(''));
    
};
PopupProdSelect.prototype.makeProdLv2Li = function(lv2) {
    var _this = this;
    var html = [];
    html.push('<li>');
    html.push('    <input type="checkbox" id="chkSelect' + lv2.ctgryCd + '" data-ctgry-cd="' + lv2.ctgryCd + '" class="input_chk"><label for="chkSelect' + lv2.ctgryCd + '"><strong>' + lv2.ctgryNm + '</strong></label>');
    if(lv2.childExstYn == 'Y') {
        html.push('<button type="button"><span class="hidden">하위메뉴 열기</span></button>');
        var lv2 = this.list.filter(function(item){
            return ( item.lvl == 3 && item.psCtgryCd == lv2.ctgryCd );
        }).keySort({'sortSn':'asc'});
        html.push('<ul class="list_depth2">');
        lv2.forEach(function(item3) {
            if(item3.childExstYn == 'Y') {
                html.push('<li>');
                html.push('    <input type="checkbox" id="chkSelect' + item3.ctgryCd + '" data-ctgry-cd="' + item3.ctgryCd + '" class="input_chk"><label for="chkSelect' + item3.ctgryCd + '"><strong>' + item3.ctgryNm + '</strong></label>');
                html.push('    <button type="button"><span class="hidden">하위메뉴 열기</span></button>');
                html.push('    <ul class="list_depth3">');
                var lv3 = _this.list.filter(function(item){
                    return ( item.lvl == 4 && item.psCtgryCd == item3.ctgryCd );
                }).keySort({'sortSn':'asc'});
                lv3.forEach(function(item4) {
                    html.push('    <li><input type="checkbox" id="chkSelect' + item4.ctgryCd + '" data-ctgry-cd="' + item4.ctgryCd + '" class="input_chk"><label for="chkSelect' + item4.ctgryCd + '"><strong>' + item4.ctgryNm + '</strong></label></li>');    
                });
                html.push('    </ul>');
                html.push('</li>');
            } else {
                html.push('    <li><input type="checkbox" id="chkSelect' + item3.ctgryCd + '" data-ctgry-cd="' + item3.ctgryCd + '" class="input_chk"><label for="chkSelect' + item3.ctgryCd + '"><strong>' + item3.ctgryNm + '</strong></label></li>');
            }
        });
        html.push('</ul>');
    }
    html.push('</li>');
    return html.join('');
};
PopupProdSelect.prototype.makeSolutionLv2Li = function(lv2) {
    var html = [];
    html.push('    <li><input type="checkbox" id="chkSelect' + lv2.ctgryCd + '" data-ctgry-cd="' + lv2.ctgryCd + '" class="input_chk"><label for="chkSelect' + lv2.ctgryCd + '"><strong>' + lv2.ctgryNm + '</strong></label></li>');
    return html.join('');
};

PopupProdSelect.prototype.setEvent = function() {
	var _this = this;
	$(document).on('click', this.popupId + ' input[data-ctgry-cd]', function() {
		if(_this.selectedList.length == _this.nMaxSelected && $(this).is(':checked') == true) {
			alert('상품은 최대 ' + _this.nMaxSelected + '개 까지 선택 가능 합니다.');
			return false;
		} else {
			var arrSelectedPopupProd = [];
			$(_this.popupId + ' input[data-ctgry-cd]:checked').each(function() {
				var ctgryCd = $(this).attr('data-ctgry-cd');
				arrSelectedPopupProd.push(_this.list.filter(function(item) {
					return item.ctgryCd == ctgryCd;
				})[0]);
			});
			_this.selectedList = arrSelectedPopupProd.filter(function(item, index) {
				return arrSelectedPopupProd.indexOf(item) === index;
			});
			_this.showSelectedPopupProdList();
		}
	});
	$(document).on('click', this.popupId + ' a.confirm', function() {
		if(typeof(_this.callbackFunc) == 'function') {
			_this.callbackFunc();
		}
	});		
};
PopupProdSelect.prototype.showSelectedPopupProdList = function() {
	var _this = this;
    var elem = $(this.popupId + ' .tag_select_box .input_basic_common');
	var html = [];
	this.selectedList.forEach(function(item) {
		html.push('#' + item.ctgryNm);
	});
	elem.val(html.join(', '));
};
PopupProdSelect.prototype.syncDataCheckbox = function() {
	$('input[type=checkbox]').prop('checked', false);
	this.selectedList.forEach(function(item) {
		$('input[data-ctgry-cd="' + item.ctgryCd + '"]+label').trigger('click');
	});
    this.showSelectedPopupProdList();
};
PopupProdSelect.prototype.addSelectedList = function(ctgryCd) {
	var itemCtgryCd = this.data.filter(function(item) {
		return item.ctgryCd == ctgryCd;
	})[0];
	this.selectedList.push(itemCtgryCd);
	this.syncDataCheckbox();	
};
PopupProdSelect.prototype.close = function() {
    $(".layer_pop").hide();
    $(".dim").hide();
};