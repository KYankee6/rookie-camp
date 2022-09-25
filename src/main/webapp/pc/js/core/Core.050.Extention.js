/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

(function($) {

    $.fn.svcDialog = function(prop) {
        if (!prop) prop = $.Const.dialogProp;
		var rtnDialog = $(this).dialog(prop);
        $(this).parent(".ui-dialog").css({
            "border": "2px solid #444",
            "box-shadow": "6px 6px 10px rgba(0,0,0,0.8)"
        });
		return rtnDialog;
    };

    $.fn.timeFocus = function(ms) {
        if (!ms) ms = 200;
        var _ref = this;
        setTimeout(function() {
            $(_ref).focus();
        }, ms);
    };

	$.fn.hasAttr = function(name) {
		return this.attr(name) !== undefined;
	};

    $.fn.showLoading = function() {
        $(this).css({'min-height':'100px','position':'relative'});
        var imgLoading = $('<div data-area="loading"><img src="/pc/images/common/img_loading.gif"/><br><p>데이터 로딩 중 입니다...</p></div>');
        imgLoading.css({
            'position': 'absolute',
            'height' : '40px',
            'margin-top' : '20px',
            'margin-left' : 'auto',
            'margin-right' : 'auto',
            'left' : '0',
            'right' : '0',
            'text-align' : 'center',
            'font-size' : '12px',
            'line-height' : '17px'
        });
        $(this).append(imgLoading);
        imgLoading.show();
    };
    $.fn.hideLoading = function() {
        $(this).find('[data-area="loading"]').remove();
    };

	$.fn.flushPanelData = function() {
		var params = $(this).flushPanel();
		$(this).find('ul li.on').each(function() {
			$(this).children('a').filter('[data-bbs-tp]').each(function() {
				params.bbsTp = $(this).attr('data-bbs-tp');
			});
			$(this).children('a').filter('[data-sticker-tp]').each(function() {
				params.stickerTp = $(this).attr('data-sticker-tp');
			});
			$(this).children('a').filter('[data-g-ctgry-cd]').each(function() {
				params.gCtgryCd = $(this).attr('data-g-ctgry-cd');
			});
			$(this).children('a').filter('[data-year]').each(function() {
				params.year = $(this).attr('data-year');
			});
			$(this).children('a').filter('[data-month]').each(function() {
				params.month = $(this).attr('data-month');
			});
		});
		$(this).find('button.on').filter('[data-l-ctgry-cd]').each(function() {
			params.lCtgryCd = $(this).attr('data-l-ctgry-cd');
		});
		return params;
	};
	$.fn.bindPanelData = function(params) {
		$(this).bindPanel(params);
		$(this).find('ul li').removeClass('on').each(function() {
			$(this).children('a').filter('[data-bbs-tp]').each(function() {
				if($(this).attr('data-bbs-tp') == params.bbsTp) {
					$(this).closest('li').addClass('on');
				}
			});
			$(this).children('a').filter('[data-sticker-tp]').each(function() {
				if($(this).attr('data-sticker-tp') == params.stickerTp) {
					$(this).closest('li').addClass('on');
				}
			});
			$(this).children('a').filter('[data-g-ctgry-cd]').each(function() {
				if($(this).attr('data-g-ctgry-cd') == params.gCtgryCd) {
					$(this).closest('li').addClass('on');
				}
			});
			$(this).children('a').filter('[data-year]').each(function() {
				if($(this).attr('data-year') == params.year) {
					$(this).closest('li').addClass('on');
				}
			});
			$(this).children('a').filter('[data-month]').each(function() {
				if($(this).attr('data-month') == params.month) {
					$(this).closest('li').addClass('on');
				}
			});
		});
	};

    // -- panel data flush --
    $.fn.flushPanel = function() {

        // var panelId = $(this).attr('id');
        var rtnJson = {};

        $(this).find("input, select, textarea, span, th, td").each(function() {

            if ($(this).attr("name")) {

                var elemName = $(this).attr('name');
                var tagName = $(this).prop("tagName").toLowerCase();
                var value = "";
                if (tagName == 'td' || tagName == 'th' || tagName == 'span') {
                    value = $(this).text();
                } else {
                    value = $(this).val();
                }

                switch (tagName) {
                    case "input":
                        switch ($(this).attr("type").toLowerCase()) {
                            case "button":
                                break;
                            case "radio":
                                if ($(this).is(":checked")) {
                                    rtnJson[elemName] = value;
                                } else {
                                    if (!rtnJson[elemName]) {
                                        rtnJson[elemName] = "";
                                    }
                                }
                                break;
                            case "checkbox":
                                if ($(this).is(":checked")) {
                                    if (rtnJson.hasOwnProperty(elemName)) {
                                        if (rtnJson[elemName] != "") {
                                            rtnJson[elemName] += ",";
                                        }
                                        rtnJson[elemName] += value;
                                    } else {
                                        rtnJson[elemName] = value;
                                    }
                                } else {
                                    // 단일 혹은 그룹체크에서 모두 체크가 안되었을경우 jsonData 에 항목이 누락되는걸 방지하기 위
                                    if (!rtnJson[elemName]) {
                                        rtnJson[elemName] = "";
                                    }
                                }
                                break;
                            default: // TEXT , HIDDEN , PASSWORD
                                switch ($(this).attr("data-format")) {
                                    case "rate":
                                        rtnJson[elemName] = value.toDecimal(2);
                                        break;
                                    case "money":
                                    case "number":
                                        rtnJson[elemName] = value.toNumber();
                                        break;
                                    case "no":
                                    case "tel_no":
                                    case "biz_no":
                                    case "zip_no":
                                    case "card_no":
                                        rtnJson[elemName] = value.forceNumber();
                                        break;
                                    case "ym":
                                        rtnJson[elemName] = $.Form.flushYm(value);
                                        break;
                                    case "date":
                                        rtnJson[elemName] = $.Form.flushDate(value);
                                        break;
                                    case "time":
                                        rtnJson[elemName] = value.forceNumber();
                                        break;
                                    case "dttm":
                                        rtnJson[elemName] = $.Form.flushDttm(value);
                                        break;
                                    case "dttmms":
                                        rtnJson[elemName] = $.Form.flushDttmms(value);
                                        break;
                                    default:
                                        rtnJson[elemName] = value.htmlEnc();
                                        break;
                                }
                                break;
                        }
                        break;
                    case "select":
                        rtnJson[elemName] = value;
                        break;
                    case "textarea":
                        rtnJson[elemName] = value.htmlEnc();
                        break;
                    case "span":
                    case "th":
                    case "td":
                        switch ($(this).attr("data-format")) {
                            case "rate":
                                rtnJson[elemName] = value.toDecimal(2);
                                break;
                            case "money":
                            case "number":
                                rtnJson[elemName] = value.toNumber();
                                break;
                            case "no":
                            case "tel_no":
                            case "biz_no":
                            case "zip_no":
                            case "card_no":
                            case "time":
                                rtnJson[elemName] = value.forceNumber();
                                break;
                            case "ym":
                                rtnJson[elemName] = $.Form.flushYm(value);
                                break;
                            case "date":
                                rtnJson[elemName] = $.Form.flushDate(value);
                                break;
                            case "dttm":
                                rtnJson[elemName] = $.Form.flushDttm(value);
                                break;
                            case "dttmms":
                                rtnJson[elemName] = $.Form.flushDttmms(value);
                                break;
                            default:
                                rtnJson[elemName] = value.htmlEnc();
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }

        });

        return rtnJson;

    };


    // -- panel data binding --
    $.fn.bindPanel = function(jsonData) {

        var panelId = $(this).attr("id");

        $(this).find("div, input, select, textarea, span, th, td").each(function() {

            if (typeof($(this).attr("name")) != "undefined") {

                var tagName = $(this).prop("tagName").toLowerCase();
                var elemName = $(this).attr("name");

                // data 가 존재할때만 bind 한다.
                if (typeof(jsonData[elemName]) != "undefined") {

                    var value = String(jsonData[elemName]);

                    switch (tagName) {
                        case "button":
                            break;
                        case "input":
                            switch ($(this).attr("type").toLowerCase()) {
                                case "button":
                                    break;
                                case "radio":
                                    if (value != "") {
                                        if ($(this).val() == value) {
                                            $(this).prop("checked", true);
                                        }
                                    }
                                    break;
                                case "checkbox":
                                    $("#" + panelId + " input[name=" + elemName + "]").each(function() {
                                        $(this).prop("checked", false);
                                    });
                                    if (value != "") {
                                        var arrValue = value.split(",");
                                        for (var i = 0; i < arrValue.length; i++) {
                                            $("#" + panelId + " input[name=" + elemName + "]").each(function() {
                                                if (arrValue[i] == $(this).val()) {
                                                    $(this).prop("checked", true);
                                                }
                                            });
                                        }
                                    }
                                    break;
                                case "text":
                                    switch ($(this).attr("data-format")) {
                                        case "rate":
                                            $(this).val(value.formatDecimal(2));
                                            break;
                                        case "money":
                                        case "number":
                                            $(this).val(value.formatNumber());
                                            break;
                                        case "no":
                                            $(this).val(value.forceNumber());
                                            break;
                                        case "tel_no":
                                            $(this).val(value.formatTelNo());
                                            break;
                                        case "biz_no":
                                            $(this).val(value.formatBizNo());
                                            break;
                                        case "zip_no":
                                            $(this).val(value.formatZipNo());
                                            break;
                                        case "card_no":
                                            $(this).val(value.formatCardNo());
                                            break;
                                        case "date":
                                            $(this).val($.Form.bindDttm(value).formatDate());
                                            break;
                                        case "time":
                                            $(this).val(value.formatTime());
                                            break;
                                        case "ym":
                                            $(this).val($.Form.bindYm(value).formatYm());
                                            break;
                                        case "dttm10":
                                            $(this).val($.Form.bindDttm(value).formatDttm10());
                                            break;
                                        case "dttm12":
                                            $(this).val($.Form.bindDttm(value).formatDttm12());
                                            break;
                                        case "dttm":
                                        case "dttm14":
                                            $(this).val($.Form.bindDttm(value).formatDttm14());
                                            break;
                                        case "dttmms":
                                            $(this).val($.Form.bindDttm(value).formatDttm17());
                                            break;
                                        default:
                                            $(this).val(value);
                                            break;
                                    } // close switch ($(this).attr("data-format")) {
                                    break;
                                default:
                                    $(this).val(value);
                                    break;
                            } // close switch ($(this).attr("type").toLowerCase()) {
                            break;
                        case "select":
                            switch ($(this).attr("data-format")) {
                                case "ym":
                                    $(this).val(value.toString().toNumber()).trigger("change");
                                    break;
                                case "etc":
                                    break;
                                default:
                                    $(this).val(value).trigger("change");
                                    break;
                            }
                            break;
                        case "textarea":
                            $(this).val(value);
                            break;
                        case "span":
                        case "th":
                        case "td":
                            switch ($(this).attr("data-format")) {
                                case "rate":
                                    $(this).text(value.formatDecimal(2));
                                    break;
                                case "money":
                                case "number":
                                    $(this).text(value.formatNumber());
                                    break;
                                case "no":
                                    $(this).text(value.forceNumber());
                                    break;
                                case "tel_no":
                                    $(this).text(value.formatTelNo());
                                    break;
                                case "biz_no":
                                    $(this).text(value.formatBizNo());
                                    break;
                                case "zip_no":
                                    $(this).text(value.formatZipNo());
                                    break;
                                case "card_no":
                                    $(this).text(value.formatCardNo());
                                    break;
                                case "date":
                                    $(this).text($.Form.bindDttm(value).formatDate());
                                    break;
                                case "time":
                                    $(this).text(value.formatTime());
                                    break;
                                case "ym":
                                    $(this).text($.Form.bindYm(value).formatYm());
                                    break;
                                case "dttm10":
                                    $(this).text($.Form.bindDttm(value).formatDttm10());
                                    break;
                                case "dttm12":
                                    $(this).text($.Form.bindDttm(value).formatDttm12());
                                    break;
                                case "dttm":
                                case "dttm14":
                                    $(this).text($.Form.bindDttm(value).formatDttm14());
                                    break;
                                case "dttmms":
                                    $(this).text($.Form.bindDttm(value).formatDttm17());
                                    break;
                                default:
                                    $(this).text(value);
                                    if ($(this).parent().prop("tagName").toUpperCase() == "TD") {
                                        $(this).parent().attr("title", value);
                                    }
                                    break;
                            }
                            break;
                        default:
                            break;

                    } // close switch(tagName) {

                } // if(typeof(jsonData[elemName]) != 'undefined') {

            } // if(typeof($(this).attr("name")) != 'undefined') {

        }); // $(this).find('div, input, select, textarea, span, th, td').each(function() {

        return this;

    };

    // -- mode 값[I:insert, U:update] 에 따라 바뀌는 display 세팅  --
    $.fn.applyModeStyle = function(mode) {

        if (!mode) mode = $(this).find("input[name=mode]").val();

        $(this).find("input, select, textarea, button").each(function() {

            if ($(this).attr("data-mode-style")) {
                var value = $(this).attr("data-mode-style");
                if (mode == "U") {
                    if (value == "enable") {
                        $(this).attr("disabled", true);
                    } else if (value == "disable") {
                        $(this).attr("disabled", false);
                    } else if (value == "show") {
                        $(this).hide();
                    } else if (value == "hide") {
                        $(this).show();
                    }
                } else {
                    if (value == "enable") {
                        $(this).attr("disabled", false);
                    } else if (value == "disable") {
                        $(this).attr("disabled", true);
                    } else if (value == "show") {
                        $(this).show();
                    } else if (value == "hide") {
                        $(this).hide();
                    }
                }
            }

        });

        return this;

    };

    // -- form element focus, format, next, command setting --
    $.fn.applyFieldOption = function(bindAfterCallbackFunc) {

          var panelId = $(this).attr("id");

//        $("#" + panelId + " input,select,textarea").each(function() {
//            if (typeof($(this).attr("id")) != "undefined" && typeof($(this).parent("dd").prev().html()) != "undefined") {
//                if ($(this).parent("dd").prev().children("label").length < 1) {
//                    $(this).parent("dd").prev().html("<label for=\"" + $(this).attr("id") + "\">" + $(this).parent("dd").prev().html() + "</label>");
//                }
//                // if( $(this).prop('tagName').toLowerCase() == 'input' && $(this).attr('type').toLowerCase() == 'text' ) {
//                //     if(!$(this).hasClass('form-input-text')) {
//                //         $(this).addClass('form-input-text');
//                //     }
//                // }
//            }
//        });
//
//        $("#" + panelId + " dt").each(function() {
//            if ($(this).children("label").length < 1) {
//                $(this).html("<label>" + $(this).html() + "</label>");
//            }
//        });
//
//        $("#" + panelId + " *[data-required]").each(function() {
//            // $( this ).parent( 'td' ).prev().addClass( "title_on" );
//            $(this).parent("dd").prev().addClass("title_on");
//        });

        $("#" + panelId + " input[type=text]").focusin(function() {
            if (!($(this).attr("readonly") == "readonly" || $(this).attr("readonly") == true)) {
                $(this).select();
            }
        });

        /** input text format setting **/
        $("#" + panelId + " input[type=text]").each(function() {
            if ($(this).attr("data-format")) {
                $.Form.applyElementFormat(panelId, $(this), $(this).attr("data-format"));
            }
        });


        var comboAjaxCnt = 0;
        var totComboAjaxCnt = 0;

        /** input keydown setting **/
        $("#" + panelId + " input[type=text], #" + panelId + " input[type=password]").keydown(function(e) {
            if (e.keyCode == 13) {
                if (typeof($(this).attr("data-command")) != "undefined") {
                    e.preventDefault();
                    eval($(this).attr("data-command"));
                } else if (typeof($(this).attr("data-next")) != "undefined") {
                    e.preventDefault();
                    $.Form.nextElement(panelId, this);
                } else {
                    if ($(this).parent().prev("input").attr("data-next")) {
                        var nextElemNm = $(this).parent().prev("input").attr("data-next");
                        var nextElem = $("#" + panelId + " input[name=" + nextElemNm + "]");
                        nextElem.prev("input").focus();
                    }
                }
            }
        });

        $("#" + panelId + " .ui-datepicker-trigger").each(function() {
            $(this).css({ "margin-left": "3px;" });
            if ($(this).prev().attr("title") != undefined) {
                $(this).attr("alt", $(this).prev().attr("title"));
                $(this).attr("title", $(this).prev().attr("title"));
            }
        });

        return this;

    };

    $.fn.panelNumAnimate = function(data, duration) {
        $(this).find("span[data-format=number]").each(function() {
            if (data.hasOwnProperty($(this).attr("name"))) {
                //                $(this).numAnimate($(this).text(), data[$(this).attr('name')], duration);
                var refThis = $(this);
                if (refThis.text().toNumber() != data[refThis.attr("name")].toString().toNumber()) {
                    refThis.numAnimate("0", data[$(this).attr("name")], duration);
                    refThis.addClass("textBold");
                } else {
                    refThis.removeClass("textBold");
                }
                //                $(this).numAnimate('0', data[$(this).attr('name')], duration);
            }
        });

        return this;
    };

    $.fn.outerHTML = function() {
        return jQuery("<div />").append(this.eq(0).clone()).html();
    };

    $.fn.validateForm = function() {

        var bValidate = true;
        var titleList = "";
        var title = "";

        $(this).find("input, select, textarea").each(function() {

            if (typeof($(this).attr("name")) != "undefined") {
                if (typeof($(this).attr("data-required")) != "undefined") {
                    if ($(this).val() + "" == "") {
                        bValidate = false;
                        title = (typeof $(this).attr("data-title") == "undefined") ? "Item" : $(this).attr("data-title");
                        titleList += (titleList == "") ? title : ", " + title;
                    }
                }

            }

        });

        if (bValidate == false) {
            //$.ksid.ui.alert("<strong>[ " + titleList + " ]</strong><br />" + "위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.");
            $.Utils.alert("<strong>[ " + titleList + " ]</strong><br />" + "위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.");
        }

        return bValidate;

    };

    $.fn.numAnimate = function(sVal, eVal, duration) {
        $(this).easy_number_animate({
            start_value: sVal.toNumber(),
            end_value: eVal,
            duration: (typeof(duraltion) == "undefined") ? 2000 : duration
        });
    };

})(jQuery);