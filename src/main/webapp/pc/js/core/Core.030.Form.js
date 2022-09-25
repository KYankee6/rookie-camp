/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreForm = function() {
    this.language = $.Const.language;
    this.monthFormat = $.Const.monthFormat;
    this.dateFormat = $.Const.dateFormat;
    this.pickerMonthFormat = $.Const.pickerMonthFormat;
    this.pickerDateFormat = $.Const.pickerDateFormat;
    this.datetimeFormat = $.Const.datetimeFormat;
};
/** bind **/
CoreForm.prototype.bindCombo = function(combo, listOptions, bTextOnly) {

    //옵션추가전 기존설정된 옵션삭제
    $(combo).find("option").remove();

    // data-empty-text attr 이 존재한다면 빈값으로 추가한다.
    var emptyText = $(combo).attr("data-empty-text");
    if (emptyText) {
        $(combo).append("<option value=''>" + emptyText + "</option>");
    }

    var selectedValue = $(combo).attr("data-selected-value");
    //option 추가
    for (var i = 0; i < listOptions.length; i++) {
        var option = listOptions[i];
        var selected = (selectedValue == option.cd) ? "selected" : "";
        var selectText = (bTextOnly == true) ? option.cdNm : (option.cdNm == null) ? option.cd : option.cdNm;
        $(combo).append("<option value='" + option.cd + "' " + selected + "> " + selectText + "</option>");
    }

    //선택된 옵션이 없고 emptyText 가 존재하면 emptyText 선택
    if (!selectedValue && emptyText) {
        $(combo).val("");
    }

    //data-hide-options attr 이 존재하면 해당 option remove
    var hideOptions = $(combo).attr("data-hide-options");
    if (hideOptions) {
        var hideValues = hideOptions.split(",");
        for (var i = 0; i < hideValues.length; i++) {
            $(combo).find("option[value='" + hideValues[i] + "']").remove();
        }
    }

};
CoreForm.prototype.bindYm = function(strDt) {
    var rtnStr = "";
    if (strDt.length >= 6) {
        strDt = strDt.left(6);
        rtnStr = new $.Utils.datetime(strDt + "01").getDate(this.monthFormat);
    }
    return rtnStr;
};
CoreForm.prototype.bindDate = function(strDt) {
    var rtnStr = "";
    if (strDt.length >= 8) {
        strDt = strDt.left(8);
        rtnStr = new $.Utils.datetime(strDt).getDate(this.dateFormat);
    }
    return rtnStr;
};
CoreForm.prototype.bindDttm = function(strDt) {
    var rtnStr = "";
    if (strDt.length >= 14) {
        strDt = strDt.left(14);
        rtnStr = new $.Utils.datetime(strDt).getDate(this.datetimeFormat);
    }
    return rtnStr;
};
CoreForm.prototype.bindDttmms = function(strDt) {
    var rtnStr = "";
    if (strDt.length >= 17) {
        strDt = strDt.left(17);
        rtnStr = new $.Utils.datetime(strDt.substring(0, 14)).getDate(this.datetimeFormat + ' ' + strDt.substring(14, 17));
    }
    return rtnStr;
};
/** flush **/
CoreForm.prototype.getflushDatetime = function(strDt) {
    var rtnStr = "";
    var strDt = strDt.forceNumber();
    var lenDt = strDt.length;
    try {
        switch (this.language) {
            case 'en':
            case 'vi':
                var yyyymmdd = strDt.substring(4, 8) + strDt.substring(2, 4) + strDt.substring(0, 2);
                switch (lenDt) {
                    case 6:
                        rtnStr = new $.Utils.datetime(strDt.substring(2, 6) + strDt.substring(0, 2) + "00").getDate("yyyymm");
                        break;
                    case 8:
                        rtnStr = new $.Utils.datetime(yyyymmdd).getDate("yyyymmdd");
                        break;
                    case 14:
                        rtnStr = new $.Utils.datetime(yyyymmdd + strDt.substring(8)).getDate("yyyymmddhhmiss");
                        break;
                    case 17:
                        rtnStr = new $.Utils.datetime(yyyymmdd + strDt.substring(8, 14)).getDate("yyyymmddhhmiss") + strDt.substring(14);
                        break;
                    default:
                        break;
                }
                break;
            default:
                var yyyymmdd = strDt;
                switch (lenDt) {
                    case 6:
                        rtnStr = new $.Utils.datetime(strDt.substring(2, 6) + strDt.substring(0, 2) + "00").getDate("yyyymm");
                        break;
                    case 8:
                        rtnStr = new $.Utils.datetime(yyyymmdd).getDate("yyyymmdd");
                        break;
                    case 14:
                        rtnStr = new $.Utils.datetime(yyyymmdd + strDt.substring(8)).getDate("yyyymmddhhmiss");
                        break;
                    case 17:
                        rtnStr = new $.Utils.datetime(yyyymmdd + strDt.substring(8, 14)).getDate("yyyymmddhhmiss") + strDt.substring(14);
                        break;
                    default:
                        break;
                }
                break;
        }
    } catch (e) {
        $.Utils.alert('[' + strDt + '] : 날짜형식에 맞지 않습니다.');
    }
    return rtnStr;
};
CoreForm.prototype.flushYm = function(sDt) {
    return this.getflushDatetime(sDt);
};
CoreForm.prototype.flushDate = function(sDt) {
    return this.getflushDatetime(sDt);
};
CoreForm.prototype.flushDttm = function(sDt) {
    return this.getflushDatetime(sDt);
};
CoreForm.prototype.flushDttmms = function(sDt) {
    return this.getflushDatetime(sDt);
};
CoreForm.prototype.nextElement = function( panelId, elem ) {
    if( $( elem ).attr( "data-next" ) ) {
        var nextElem = $( "#" + panelId + " *[name=" + $( elem ).attr( "data-next" ) + "]" );
        var i        = 0;
        while( ( typeof ( nextElem.attr( "disabled" ) ) != "undefined" || typeof ( nextElem.attr( "readonly" ) ) != "undefined" || nextElem.attr( "" ) == true ) && i < 10 ) {
            nextElem = $( "#" + panelId + " *[name=" + nextElem.attr( "data-next" ) + "]" );
            i++;
        }
        nextElem.focus();
    }
};
CoreForm.prototype.applyElementFormat = function(panelId, refElem, sFormat) {
    var _this = this;
    switch (sFormat) {
        case "rate":
            refElem.css({ "text-align": "right" });
            refElem.on('blur', function() {
                refElem.val(refElem.val().formatDecimal(2));
            });
            break;
        case "money":
        case "number":
            refElem.css({ "text-align": "right" });
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatNumber());
            });
            break;
        case "no":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().forceNumber());
            }).blur(function() {
                refElem.val(refElem.val().forceNumber());
            });
            break;
        case "tel_no":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatTelNo());
            }).blur(function() {
                refElem.val(refElem.val().formatTelNo());
            });
            break;
        case "biz_no":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatBizNo());
            }).blur(function() {
                refElem.val(refElem.val().formatBizNo());
            });
            break;
        case "zip_no":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatZipNo());
            }).blur(function() {
                refElem.val(refElem.val().formatZipNo());
            });
            break;
        case "card_no":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatCardNo());
            }).blur(function() {
                refElem.val(refElem.val().formatCardNo());
            });
            break;
        case "ym": // 월선택
            refElem.css({ "text-align": "center" });
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatYm());
            }).blur(function() {
                refElem.val(refElem.val().formatYm());
            });
            var options = {
                Button: "<img class=\"icon\" src=\"icon/ico_cal.png\" style=\"margin-left:3px;cursor:pointer\" title=\"" + refElem.attr("title") + "\" alt=\"\" />",
                MinMonth: -10000,
                MaxMonth: 10000
            };
            if (this.language == "en") {
                options.i18n = {
                    year: "Year",
                    prevYear: "Previous Year",
                    nextYear: "Next Year",
                    next12Years: "Jump Forward 12 Years",
                    prev12Years: "Jump Back 12 Years",
                    nextLabel: "Next",
                    prevLabel: "Prev",
                    buttonText: "Open Month Chooser",
                    jumpYears: "Jump Years",
                    backTo: "Back to",
                    months: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
                };
            } else if (this.language == "ko") {
                options.i18n = {
                    year: "년도-",
                    prevYear: "이전 년도",
                    nextYear: "다음 년도",
                    next12Years: "다음 12 년으로 이동",
                    prev12Years: "이전 12 년으로 이동",
                    nextLabel: "이전",
                    prevLabel: "다음",
                    buttonText: "월 선택창 열기",
                    jumpYears: "년도 이동",
                    backTo: "뒤로 가기",
                    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
                };
            } else if (this.language == "vi") {
                options.i18n = {
                    year: "Year",
                    prevYear: "Previous Year",
                    nextYear: "Next Year",
                    next12Years: "Jump Forward 12 Years",
                    prev12Years: "Jump Back 12 Years",
                    nextLabel: "Next",
                    prevLabel: "Prev",
                    buttonText: "Open Month Chooser",
                    jumpYears: "Jump Years",
                    backTo: "Back to",
                    months: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
                };
            }
            options.MonthFormat = this.pickerMonthFormat;
            refElem.MonthPicker(options);
            break;
        case "date":
            var applyFieldOptionClickDate;
            refElem.on('click', function() {
                applyFieldOptionClickDate = $(this).val();
            });
            var datepickerProp = {
                showOn: "both",
                buttonImage: "/pc/images/icon/ico_cal.png",
                buttonImageOnly: true,
                changeYear: true,
                changeMonth: true,
                yearRange: "c-100:c+10",
                minDate: "-100y",
                showAnim: "fadeIn",
                dateFormat: this.pickerDateFormat, //"yy-mm-dd",
                onSelect: function() {
                    refElem.change();
                },
                buttonText: refElem.attr("title")
            };
            datepickerProp.dateFormat = this.pickerDateFormat;
            if (typeof($(this).attr("data-date-format")) != "undefined") {
                datepickerProp.dateFormat = $(this).attr("data-date-format");
            }
            if (refElem.attr("disabled") == "disabled") {
                datepickerProp.disabled = true;
            }
            //                $.datepicker.setDefaults($.datepicker.regional[ksid.language]);
            $.datepicker.setDefaults($.Const.datepickerRegional.ko);
            refElem.css({
                "text-align": "center",
                "width": "80px"
            }).attr("readonly", false).datepicker(datepickerProp).blur(function() {
                var lsDate = refElem.val().toString().formatDate();
                //                    if(isNaN(Date.parse(lsDate)) == true || lsDate.length != 10) {
                if (lsDate.length != 10) {
                    if (lsDate == "") {} else {
                        if (applyFieldOptionClickDate.length != 10) {
                            refElem.val("");
                        } else {
                            refElem.val(applyFieldOptionClickDate).focus().select();
                        }

                    }
                } else {
                    refElem.val(lsDate).change();
                }
            });
            $(this).attr("title", $(this).datepicker("option", "buttonText"));
            refElem.change(function() {
                $(this).attr("title", $(this).datepicker("option", "buttonText"));
                _this.nextElement(panelId, this);
            });
            break;
        case "time":
            // var timepickerProp = {
            //     dateFormat: "yy-mm-dd",
            //     timeFormat: "HH:mm:ss",
            //     showTimePicker: true,
            //     showSecond: true,
            //     showMillisec: false,
            //     showMicrosec: false,
            //     showTimezone: false
            // };
            // refElem.css({ "text-align": "center" });
            // refElem.timepicker(timepickerProp);
            break;
        case "ym":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatYm());
            }).blur(function() {
                refElem.val(refElem.val().formatYm());
            });
            break;
        case "dttm10":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatDttm10());
            }).blur(function() {
                refElem.val(refElem.val().formatDttm10());
            });
            break;
        case "dttm12":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatDttm12());
            }).blur(function() {
                refElem.val(refElem.val().formatDttm12());
            });
            break;
        case "dttm14":
            refElem.on('keyup', function() {
                refElem.val(refElem.val().formatDttm14());
            }).blur(function() {
                refElem.val(refElem.val().formatDttm14());
            });
            break;
        default:
            break;
    }
};

$.extend({ Form: new CoreForm() });