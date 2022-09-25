/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreUtils = function() {
    this.blockUICss = $.Const.blockUICss;
};
CoreUtils.prototype.clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};
CoreUtils.prototype.isBlank = function(obj) {
    return (!obj || $.trim(obj) === "");
};
CoreUtils.prototype.isEmpty = function(obj) {
    return (!obj || undefined === obj || null === obj);
};
CoreUtils.prototype.isNotBlank = function(obj) {
    return (!obj || $.trim(obj) === "") ? false : true;
};
CoreUtils.prototype.isNotEmpty = function(obj) {
    return (!obj || undefined === obj || null === obj) ? false : true;
};
CoreUtils.prototype.isMobile = function() {
    var check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
CoreUtils.prototype.checkParams = function(params) {
    var bOk = true;
    for (var key in params) {
        if (typeof(params[key]) == "undefined") {
            $.Utils.alert('checkParams > ' + key + " is undefined");
            bOk = false;
            break;
        }
    }
    return bOk;
};
CoreUtils.prototype.alert = function(msg, callbackFunc) {
    this.alertDefault(msg, callbackFunc);
//    this.alertJQ(msg, callbackFunc);
};
CoreUtils.prototype.alertDefault = function(msg, callbackFunc) {
    alert(msg.replaceAll('<br>', '\n').replaceAll('<br />', '\n').replaceAll('<br/>', '\n').replace(/(<([^>]+)>)/ig, ''));
    if (typeof(callbackFunc) == "function") {
        callbackFunc();
    }
};
CoreUtils.prototype.alertJQ = function(msg, callbackFunc) {
    $.alert({
        theme: "light",
        type: "dark",
        draggable: true,
        keyboardEnabled: true,
        backgroundDismiss: false,
        title: "확인",
        content: msg.replaceAll('\n', '<br>'),
        boxWidth: "400px",
        useBootstrap: false,
        buttons: {
            specialKey: {
                text: "확인",
                keys: ["enter"],
                action: function() {
                    if (typeof(callbackFunc) == "function") {
                        callbackFunc();
                    }
                }
            }
        }
    });
};
CoreUtils.prototype.confirm = function(msg, callbackFunc, cancelFunc) {
    // this.confirmDefault(msg, callbackFunc, cancelFunc);
    this.confirmJQ(msg, callbackFunc, cancelFunc);
};
CoreUtils.prototype.confirmDefault = function(msg, callbackFunc, cancelFunc) {
    if (confirm(msg)) {
        if (typeof(callbackFunc) == "function") {
            callbackFunc();
        }
    } else {
        if (typeof(cancelFunc) == "function") {
            cancelFunc();
        }
    }
};
CoreUtils.prototype.confirmJQ = function(msg, callbackFunc, cancelFunc) {
    return $.confirm({
        title: "확인",
        type: "dark",
        draggable: true,
        keyboardEnabled: true,
        backgroundDismiss: false,
        content: msg,
        boxWidth: "400px",
        useBootstrap: false,
        escapeKey: "cancel",
        buttons: {
            specialKey: {
                text: "확인",
                keys: ["enter"],
                action: function() {
                    if (typeof(callbackFunc) == "function") {
                        callbackFunc();
                    }
                }
            },
            cancel: {
                text: "취소",
                action: function() {
                    if (typeof(cancelFunc) == "function") {
                        cancelFunc();
                    }
                }
            }
        }
    });
};
CoreUtils.prototype.checkEmail = function(emailAddr) {
    return /^[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+)*@[0-9a-zA-Z-]+(\.)+([0-9a-zA-Z-]+)([\.0-9a-zA-Z-])*$/.test(emailAddr);
};
CoreUtils.prototype.checkTelNo = function(telNo) {
    telNo = telNo.replaceAll('-', '');
    telNo = telNo.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,'$1-$2-$3');
    return /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(telNo);
};
CoreUtils.prototype.blockUI = function(msg) {
    var _this = this;
    // 사용자 메뉴정보를 가져오는 중입니다. block 메시지 표시
    $.blockUI({
        message: msg,
        css: _this.blockUICss
    });
};
CoreUtils.prototype.unblockUI = function() {
    $.unblockUI();
};
CoreUtils.prototype.imgError = function(elemImg, w, h) {
    elemImg.src = '/resource/images/cont/sc/bnr_thum01.jpg';
};
CoreUtils.prototype.imgErrorBanner = function(elemImg) {
    elemImg.src = '/resource/images/cont/bt/img_bt_banner01_pc.jpg';
};
CoreUtils.prototype.imgBnnerError = function(elemImg, w, h) {
//    elemImg.src = '/pc/images/common/no-image.jpg';
    elemImg.src = '/resource/images/cont/sc/bnr_thum01.jpg';
    if(typeof w != 'undefined')elemImg.width = 320;
    if(typeof h != 'undefined')elemImg.height = 240;
};
CoreUtils.window = function(url, name, argOpts) {

    this.url = (url) ? url : "about:blank";
    this.name = (name) ? name : "";
    this.options = {};
    this.options.location = 0;
    this.options.toolbar = 0;
    this.options.directories = 0;
    this.options.status = 0;
    this.options.menubar = 0;
    this.options.scrollbars = 0;
    this.options.resizable = 1;
    this.options.width = 800;
    this.options.height = 600;

    if (argOpts) {
        $.extend(true, this.options, argOpts);
    }

    // top 이 지정되지 않았으면 센터
    if (!this.options.top) {
        this.options.top = $(window).height() / 2 - this.options.height / 2;
    }

    //left 이 지정되지 않았으면 센터
    if (!this.options.left) {
        this.options.left = $(window).width() / 2 - this.options.width / 2;
    }

    return this;

};
CoreUtils.window.prototype.open = function(params) {
    //최종옵션문자열 생성
    var strOptions = "";
    for (var key in this.options) {
        if (this.options[key] != null) {
            strOptions += key + "=" + this.options[key] + ",";
        }
    }
    strOptions = strOptions.substring(0, strOptions.length - 1);

    if (params) {
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", this.url);
        form.setAttribute("target", this.name);
        for (var key in params) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        }
        document.body.appendChild(form);
        var rtnWin = new window("about:blank", this.name, strOptions).open();
        form.submit();
        document.body.removeChild(form);
        return rtnWin;
    } else {
        return window.open(this.url, this.name, strOptions);
    }

};
CoreUtils.datetime = function(oDate) {

    this.date = null;
    this.year = null;
    this.month = null;
    this.day = null;
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.isPm = false; // 오루인지여부
    this.dayKor = "";
    this.dayEng = "";
    this.dayCnt = 0;
    this.arrDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.arrDayKor = ["일", "월", "화", "수", "목", "금", "토"];
    this.arrDayEng = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (oDate) {
        if (typeof(oDate) == "date") {
            this.date = oDate;
        } else if (typeof(oDate) == "string") {
            this.setDate(oDate);
        }
    } else {
        this.date = new Date();
    }

    this.setProperty();

    return this;

};
CoreUtils.datetime.prototype.setDate = function(sDate) {

    var strDate = sDate.toUpperCase();

    var eraseChar = "-./: 년월일시분초월화수목금토일()TZD";
    for (var i = 0; i < eraseChar.length; i++) {
        strDate = strDate.replaceAll(eraseChar[i], "");
    }

    if (strDate.indexOf("오후") > -1) {
        this.isPm = true;
    }
    strDate = strDate.replaceAll("오전", "").replaceAll("오후", "");

    if (strDate.indexOf("PM") > -1) {
        this.isPm = true;
    }
    strDate = strDate.replaceAll("AM", "").replaceAll("PM", "").forceNumber();

    if (strDate.length < 8) {
        return null;
    } else {
        this.year = strDate.substring(0, 4).toNumber();
        this.month = strDate.substring(4, 6).toNumber();
        this.day = strDate.substring(6, 8).toNumber();
        this.hour = (strDate.length >= 10) ? strDate.substring(8, 10).toNumber() : 0;
        if (this.isPm) {
            this.hour += 12;
        }
        this.minute = (strDate.length >= 12) ? strDate.substring(10, 12).toNumber() : 0;
        this.second = (strDate.length >= 14) ? strDate.substring(12, 14).toNumber() : 0;
        this.date = new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
        this.setProperty();
        return this;
    }


};
CoreUtils.datetime.prototype.setProperty = function() {

    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.hour = this.date.getHours();
    this.minute = this.date.getMinutes();
    this.second = this.date.getSeconds();

    if ((this.year % 4 == 0 || this.year % 100 == 0) && (this.year % 400 == 0)) {
        this.arrDayCnt[1] = 29;
    } else {
        this.arrDayCnt[1] = 28;
    }

    this.dayCnt = this.arrDayCnt[this.mm - 1];

    this.dayKor = this.arrDayKor[this.date.getDay()];
    this.dayEng = this.arrDayEng[this.date.getDay()];

};
CoreUtils.datetime.prototype.getApm = function() {
    return (this.hour < 12) ? "오전" : "오후";
};
CoreUtils.datetime.prototype.getApmEng = function() {
    return (this.hour < 12) ? "AM" : "PM";
};
CoreUtils.datetime.prototype.after = function(years, months, dates, hours, miniutes, seconds, mss) {
    if (years == undefined) {
        years = 0;
    }
    if (months == undefined) {
        months = 0;
    }
    if (dates == undefined) {
        dates = 0;
    }
    if (hours == undefined) {
        hours = 0;
    }
    if (miniutes == undefined) {
        miniutes = 0;
    }
    if (seconds == undefined) {
        seconds = 0;
    }
    if (mss == undefined) {
        mss = 0;
    }
    this.date = this.date.after(years, months, dates, hours, miniutes, seconds, mss);
    this.setProperty();
    return this;
};
CoreUtils.datetime.prototype.before = function(years, months, dates, hours, miniutes, seconds, mss) {
    if (years == undefined) {
        years = 0;
    }
    if (months == undefined) {
        months = 0;
    }
    if (dates == undefined) {
        dates = 0;
    }
    if (hours == undefined) {
        hours = 0;
    }
    if (miniutes == undefined) {
        miniutes = 0;
    }
    if (seconds == undefined) {
        seconds = 0;
    }
    if (mss == undefined) {
        mss = 0;
    }
    this.date = this.date.before(years, months, dates, hours, miniutes, seconds, mss);
    this.setProperty();
    return this;
};
CoreUtils.datetime.prototype.getDate = function(dateFormat) {
    var rtnDate = dateFormat;

    if (rtnDate.indexOf("yyyy") > -1) {
        rtnDate = rtnDate.replaceAll("yyyy", this.year);
    }

    if (rtnDate.indexOf("yy") > -1) {
        rtnDate = rtnDate.replaceAll("yy", this.year.toString().right(2));
    }

    if (rtnDate.indexOf("mmN") > -1) {
        rtnDate = rtnDate.replaceAll("mmN", this.month);
    }

    if (rtnDate.indexOf("mm") > -1) {
        rtnDate = rtnDate.replaceAll("mm", this.month.toString().lpad("0", 2));
    }

    if (rtnDate.indexOf("ddN") > -1) {
        rtnDate = rtnDate.replaceAll("ddN", this.day);
    }

    if (rtnDate.indexOf("dd") > -1) {
        rtnDate = rtnDate.replaceAll("dd", this.day.toString().lpad("0", 2));
    }

    if (rtnDate.indexOf("hhN") > -1) {
        rtnDate = rtnDate.replaceAll("hhN", this.hour);
    }

    if (rtnDate.indexOf("hh") > -1) {
        rtnDate = rtnDate.replaceAll("hh", this.hour.toString().lpad("0", 2));
    }

    if (rtnDate.indexOf("miN") > -1) {
        rtnDate = rtnDate.replaceAll("miN", this.minute);
    }

    if (rtnDate.indexOf("mi") > -1) {
        rtnDate = rtnDate.replaceAll("mi", this.minute.toString().lpad("0", 2));
    }

    if (rtnDate.indexOf("ssN") > -1) {
        rtnDate = rtnDate.replaceAll("ssN", this.second);
    }

    if (rtnDate.indexOf("ss") > -1) {
        rtnDate = rtnDate.replaceAll("ss", this.second.toString().lpad("0", 2));
    }

    if (rtnDate.indexOf("eday") > -1) {
        rtnDate = rtnDate.replaceAll("eday", this.arrDayCnt[this.month - 1]);
    }

    if (rtnDate.indexOf("kday") > -1) {
        rtnDate = rtnDate.replaceAll("kday", this.dayKor);
    }

    if (rtnDate.indexOf("day") > -1) {
        rtnDate = rtnDate.replaceAll("day", this.dayEng);
    }

    if (rtnDate.indexOf("kampm") > -1) {
        rtnDate = rtnDate.replaceAll("kampm", this.getApm());
    }

    if (rtnDate.indexOf("ampm") > -1) {
        rtnDate = rtnDate.replaceAll("ampm", this.getApmEng());
    }

    return rtnDate;
};

$.extend({ Utils: new CoreUtils() });
$.Utils.datetime = CoreUtils.datetime;
$.Utils.window = CoreUtils.window;