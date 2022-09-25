/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

/** Number **/

Number.prototype.read = function() {
    if (this == 0) {
        return "영";
    }
    var phonemic = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
    var unit = ["", "", "십", "백", "천", "만", "십만", "백만", "천만", "억", "십억", "백억", "천억", "조", "십조", "백조"];

    var ret = "";
    var part = [];
    for (var x = 0; x < String(this).length; x++) part[x] = String(this).substring(x, x + 1);
    for (var i = 0, cnt = String(this).length; cnt > 0; --cnt, ++i) {
        p = phonemic[part[i]];
        p += (p) ? (cnt > 4 && phonemic[part[i + 1]]) ? unit[cnt].substring(0, 1) : unit[cnt] : "";
        ret += p;
    }
    return ret;
};
Number.prototype.ceil = function(digit) {
    if (typeof(digit) == 'undefined') {
        digit = 0;
    }
    return Math.ceil(this * Math.pow(10, digit)) / Math.pow(10, digit);
};
Number.prototype.round = function(digit) {
    if (typeof(digit) == 'undefined') {
        digit = 0;
    }
    return Math.round(this * Math.pow(10, digit)) / Math.pow(10, digit);
};
Number.prototype.floor = function(digit) {
    if (typeof(digit) == 'undefined') {
        digit = 0;
    }
    return Math.floor(this * Math.pow(10, digit)) / Math.pow(10, digit);
};

/** String **/
String.prototype.hashValue = function(aLen) {
    var hv = (this.split('').reduce(function(a,b){a=((a<<3)-a)+b.charCodeAt(0);return a&a;}, 0)).toString().replace( '-', '9') + (this.split('').reduce(function(a,b){a=((a<<7)-a)+b.charCodeAt(0);return a&a;}, 0)).toString().replace( '-', '9');
    if(hv.length > 20) hv = hv.left(20);
    var plLen = 20 - hv.length;
    var pl = '2850779987435052079';
    if(plLen > 0) {
        pl = pl.left(plLen)
    } else {
        pl = '';    
    }
    return hv + pl;
};
String.prototype.nvl = function(initVal) {
    if (this.length == 0) {
        return initVal;
    } else {
        return this;
    }
};

String.prototype.left = function(size) {
    if (this.length < size) {
        return this;
    } else {
        return this.substring(0, size);
    }
};
String.prototype.right = function(size) {
    if (this.length < size) {
        return this;
    } else {
        return this.substring(this.length - size);
    }
};
String.prototype.ltrim = function(str) {
    var rtnStr = this.replace(/^\s+/g, "");
    if (str) {
        while (rtnStr.left(str.length) == str) {
            if (rtnStr.length < str.length || rtnStr.left(str.length) != str) {
                break;
            }
            rtnStr = rtnStr.substring(str.length);
        }
    }
    return rtnStr.replace(/^\s+/g, "");
};
String.prototype.rtrim = function(str) {
    var rtnStr = this.replace(/\s+$/g, "");
    if (str) {
        while (rtnStr.right(str.length) == str) {
            if (rtnStr.length < str.length || rtnStr.right(str.length) != str) {
                break;
            }
            rtnStr = rtnStr.substring(0, rtnStr.length - str.length);
        }
    }
    return rtnStr.replace(/\s+$/g, "");
};
String.prototype.trim = function(str) {
    return this.ltrim(str).rtrim(str);
};
String.prototype.lpad = function(size, fillStr) {
    if (typeof(size) == "string") {
        return this.lpad(fillStr, size);
    }
    if (!fillStr) {
        fillStr = " ";
    }
    var rtnStr = this.trim();
    while (rtnStr.length < size) {
        rtnStr = fillStr + rtnStr;
    }
    return rtnStr;
};
String.prototype.rpad = function(size, fillStr) {
    if (typeof(size) == "string") {
        return this.lpad(fillStr, size);
    }
    if (!fillStr) {
        fillStr = " ";
    }
    var rtnStr = this.trim();
    while (rtnStr.length < size) {
        rtnStr = rtnStr + fillStr;
    }
    return rtnStr;
};
String.prototype.replaceAll = function(str, rStr) {
    return this.split(str).join(rStr);
};
String.prototype.forceNumber = function() {
    return this.replace(/[^0-9]/g, "");
};
String.prototype.forceDecimal = function() {
    return this.replace(/[^0-9\.]/g, "");
};
String.prototype.forceInt = function() {
    var str = this;
    if (str.indexOf(".") > -1) {
        str = str.substring(0, str.indexOf("."));
    }
    str = str.forceNumber();
    str = (str == "" || str == "0") ? "0" : str.ltrim("0");
    return str;
};
String.prototype.toNumber = function() {
    var sRt = this;
    sRtn = this.forceInt();
    return (sRtn == '') ? 0 : Number(sRtn);
};
String.prototype.toDecimal = function(digit) {
    if (!digit) {
        digit = 2;
    }
    return Number(Number(this.forceDecimal()).toFixed(digit));
};
String.prototype.formatTelNo = function(separator) {
    if (!separator) {
        separator = "-";
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length > 12) {
        rtnStr = rtnStr.left(12);
    }
    if (rtnStr.length >= 9) {
        rtnStr = rtnStr.replace(/(^02.{0}|^0.{2}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1" + separator + "$2" + separator + "$3");
    } else if (rtnStr.length > 5) {
        rtnStr = rtnStr.replace(/(^02.{0}|^0.{2}|[0-9]{3})([0-9]{3,4})([0-9]*)/, "$1" + separator + "$2" + separator + "$3");
    } else if (rtnStr.length > 3) {
        rtnStr = rtnStr.replace(/(^02.{0}|^0.{2}|[0-9]{3})([0-9]*)/, "$1" + separator + "$2");
    }
    return rtnStr.rtrim(separator);
};
String.prototype.formatBizNo = function(separator) {
    if (!separator) {
        separator = "-";
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length > 10) {
        rtnStr = rtnStr.left(10);
    }
    if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 3) + separator + rtnStr.substring(3, 5) + separator + rtnStr.substring(5, 10);
    } else if (rtnStr.length >= 6) {
        rtnStr = rtnStr.substring(0, 3) + separator + rtnStr.substring(3, 5) + separator + rtnStr.substring(5);
    } else if (rtnStr.length > 3) {
        rtnStr = rtnStr.substring(0, 3) + separator + rtnStr.substring(3);
    }
    return rtnStr.rtrim(separator);
};
String.prototype.formatCardNo = function(separator) {
    if (!separator) {
        separator = "-";
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length > 20) {
        rtnStr = rtnStr.left(20);
    }
    if (rtnStr.length >= 17) {
        rtnStr = rtnStr.substring(0, 4) + separator + rtnStr.substring(4, 8) + separator + rtnStr.substring(8, 12) + separator + rtnStr.substring(12, 16) + separator + rtnStr.substring(16);
    } else if (rtnStr.length >= 13) {
        rtnStr = rtnStr.substring(0, 4) + separator + rtnStr.substring(4, 8) + separator + rtnStr.substring(8, 12) + separator + rtnStr.substring(12);
    } else if (rtnStr.length >= 9) {
        rtnStr = rtnStr.substring(0, 4) + separator + rtnStr.substring(4, 8) + separator + rtnStr.substring(8);
    } else if (rtnStr.length >= 5) {
        rtnStr = rtnStr.substring(0, 4) + separator + rtnStr.substring(4);
    }
    return rtnStr.rtrim(separator);
};
String.prototype.formatZipNo = function(separator) {
    if (!separator) {
        separator = "-";
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length > 6) {
        rtnStr = rtnStr.left(6);
    }
    if (rtnStr.length >= 6) {
        rtnStr = rtnStr.substring(0, 3) + separator + rtnStr.substring(3, 6);
    } else if (rtnStr.length > 3) {
        rtnStr = rtnStr.substring(0, 3) + separator + rtnStr.substring(3);
    }
    return rtnStr.rtrim(separator);
};
String.prototype.formatYm = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = "";
    switch ($.Const.language) {
        case "vi":
            rtnStr = this.formatYmUs(separatorDate);
            break;
        case "etc":
            break;
        default:
            rtnStr = this.formatYmKo(separatorDate);
            break;
    }
    return rtnStr;
};
String.prototype.formatYmKo = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 6) {
        rtnStr = rtnStr.left(6);
    }
    if (rtnStr.length >= 6) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6);
    } else if (rtnStr.length > 3) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4);
    }
    return rtnStr.rtrim(separatorDate);
};
String.prototype.formatYmUs = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 6) {
        rtnStr = rtnStr.left(6);
    }
    if (rtnStr.length >= 6) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 6);
    } else if (rtnStr.length > 3) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2);
    }
    return rtnStr.rtrim(separatorDate);
};
String.prototype.formatDate = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = "";
    switch ($.Const.language) {
        case "vi":
            rtnStr = this.formatDateUs(separatorDate);
            break;
        case "etc":
            break;
        default:
            rtnStr = this.formatDateKo(separatorDate);
            break;
    }
    return rtnStr;
};
String.prototype.formatDateKo = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 8) {
        rtnStr = rtnStr.left(8);
    }
    if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8);
    } else if (rtnStr.length >= 6) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6);
    } else if (rtnStr.length > 4) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4);
    }
    return rtnStr.rtrim(separatorDate);
};
String.prototype.formatDateUs = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 8) {
        rtnStr = rtnStr.left(8);
    }
    if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8);
    } else if (rtnStr.length >= 4) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4);
    } else if (rtnStr.length > 2) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2);
    }
    return rtnStr.rtrim(separatorDate);
};
String.prototype.formatTime = function(separatorTime) {
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 6) {
        rtnStr = rtnStr.left(6);
    }
    if (rtnStr.length >= 6) {
        rtnStr = rtnStr.substring(0, 2) + separatorTime + rtnStr.substring(2, 4) + separatorTime + rtnStr.substring(4, 6);
    } else if (rtnStr.length >= 4) {
        rtnStr = rtnStr.substring(0, 2) + separatorTime + rtnStr.substring(2, 4) + separatorTime + rtnStr.substring(4);
    } else if (rtnStr.length > 2) {
        rtnStr = rtnStr.substring(0, 2) + separatorTime + rtnStr.substring(2);
    }
    return rtnStr.rtrim(separatorTime);
};
String.prototype.formatDttm10 = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = "";
    switch ($.Const.language) {
        case "vi":
            rtnStr = this.formatDttm10Us(separatorDate);
            break;
        case "etc":
            break;
        default:
            rtnStr = this.formatDttm10Ko(separatorDate);
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm10Ko = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 10) {
        rtnStr = rtnStr.left(10);
    }
    if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length > 6) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6);
    } else if (rtnStr.length > 4) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4);
    }
    return rtnStr.rtrim(separatorDate);
};
String.prototype.formatDttm10Us = function(separatorDate) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 10) {
        rtnStr = rtnStr.left(10);
    }
    if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length >= 4) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4);
    } else if (rtnStr.length > 2) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2);
    }
    return rtnStr.rtrim(separatorDate);
};
String.prototype.formatDttm12 = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = "";
    switch ($.Const.language) {
        case "vi":
            rtnStr = this.formatDttm12Us(separatorDate, separatorTime);
            break;
        case "etc":
            break;
        default:
            rtnStr = this.formatDttm12Ko(separatorDate, separatorTime);
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm12Ko = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 12) {
        rtnStr = rtnStr.left(12);
    }
    if (rtnStr.length >= 12) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12);
    } else if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length > 6) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6);
    } else if (rtnStr.length > 4) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4);
    }
    return rtnStr.rtrim(separatorDate).rtrim(separatorTime);
};
String.prototype.formatDttm12Us = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 12) {
        rtnStr = rtnStr.left(12);
    }
    if (rtnStr.length >= 12) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12);
    } else if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length >= 4) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4);
    } else if (rtnStr.length > 2) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2);
    }
    return rtnStr.rtrim(separatorDate).rtrim(separatorTime);
};
String.prototype.formatDttm = function(separatorDate, separatorTime) {
    return this.formatDttm14(separatorDate, separatorTime);
};
String.prototype.formatDttm14 = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = "";
    switch ($.Const.language) {
        case "vi":
            rtnStr = this.formatDttm14Us(separatorDate, separatorTime);
            break;
        case "etc":
            break;
        default:
            rtnStr = this.formatDttm14Ko(separatorDate, separatorTime);
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm14Ko = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 14) {
        rtnStr = rtnStr.left(14);
    }
    if (rtnStr.length >= 14) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12, 14);
    } else if (rtnStr.length >= 12) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12);
    } else if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length > 6) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6);
    } else if (rtnStr.length > 4) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4);
    }
    return rtnStr.rtrim(separatorDate).rtrim(separatorTime);
};
String.prototype.formatDttm14Us = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 14) {
        rtnStr = rtnStr.left(14);
    }
    if (rtnStr.length >= 14) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12, 14);
    } else if (rtnStr.length >= 12) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12);
    } else if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length > 4) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4);
    } else if (rtnStr.length > 2) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2);
    }
    return rtnStr.rtrim(separatorDate).rtrim(separatorTime);
};
String.prototype.formatDttm17 = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = "";
    switch ($.Const.language) {
        case "vi":
            rtnStr = this.formatDttm17Us(separatorDate, separatorTime);
            break;
        default:
            rtnStr = this.formatDttm17Ko(separatorDate, separatorTime);
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm17Ko = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 17) {
        rtnStr = rtnStr.left(17);
    }
    if (rtnStr.length >= 17) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12, 14) + " " + +separatorTime + rtnStr.substring(14, 17);
    } else if (rtnStr.length >= 14) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12, 14);
    } else if (rtnStr.length >= 12) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12);
    } else if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length > 6) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4, 6) + separatorDate + rtnStr.substring(6);
    } else if (rtnStr.length > 4) {
        rtnStr = rtnStr.substring(0, 4) + separatorDate + rtnStr.substring(4);
    }
    return rtnStr.rtrim(separatorDate).rtrim(separatorTime);
};
String.prototype.formatDttm17Us = function(separatorDate, separatorTime) {
    if (!separatorDate) {
        separatorDate = $.Const.dateDiv;
    }
    if (!separatorTime) {
        separatorTime = $.Const.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if (rtnStr.length < 17) {
        rtnStr = rtnStr.left(17);
    }
    if (rtnStr.length >= 17) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12, 14) + " " + +separatorTime + rtnStr.substring(14, 17);
    } else if (rtnStr.length >= 14) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12, 14);
    } else if (rtnStr.length >= 12) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10, 12) + separatorTime + rtnStr.substring(12);
    } else if (rtnStr.length >= 10) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8, 10) + separatorTime + rtnStr.substring(10);
    } else if (rtnStr.length >= 8) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4, 8) + " " + rtnStr.substring(8);
    } else if (rtnStr.length > 4) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2, 4) + separatorDate + rtnStr.substring(4);
    } else if (rtnStr.length > 2) {
        rtnStr = rtnStr.substring(0, 2) + separatorDate + rtnStr.substring(2);
    }
    return rtnStr.rtrim(separatorDate).rtrim(separatorTime);
};
String.prototype.formatDateLocale = function(separator) {
    var rtnStr;
    if (this.length < 8) {
        return this;
    }
    if (!separator) {
        separator = "-";
    }
    var sFormat = "yyyy/mm/dd";
    switch (country) {
        case "KR":
            sFormat = "yyyy/mm/dd";
            break;
        case "US":
            sFormat = "mm/dd/yyyy";
            break;
        default:
            sFormat = "mm/dd/yyyy";
    }
    sFormat = sFormat.replaceAll("/", separator);
    try {
        rtnStr = new $.Utils.datetime(this).getDate(sFormat);
    } catch (e) {
        rtnStr = this;
    }
    return rtnStr;
};
String.prototype.formatDttmLocale = function(separatorDate, seperatorTime) {
    var rtnStr;
    if (this.length < 14) {
        return this;
    }
    if (!separatorDate) {
        separatorDate = "-";
    }
    if (!seperatorTime) {
        seperatorTime = ":";
    }
    var sFormat = "yyyy/mm/dd hh:mi:ss";
    switch (country) {
        case "KR":
            sFormat = "yyyy/mm/dd hh:mi:ss";
            break;
        case "US":
            sFormat = "mm/dd/yyyy hh:mi:ss";
            break;
        default:
            sFormat = "mm/dd/yyyy hh:mi:ss";
    }
    sFormat = sFormat.replaceAll("/", separatorDate).replaceAll(":", seperatorTime);
    try {
        rtnStr = new $.Utils.datetime(this).getDate(sFormat);
    } catch (e) {
        rtnStr = this;
    }
    return rtnStr;
};
String.prototype.formatNumber = function() {
    try {
        return this.forceInt().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
        return 0;
    }
};
String.prototype.formatDecimal = function(digit) {
    if (!digit) {
        digit = 2;
    }
    try {
        var rtnStr = this.toDecimal(digit).toString();
        if (rtnStr.indexOf(".") > -1) {
            var arrStr = rtnStr.split(".");
            return arrStr[0].formatNumber() + "." + ((arrStr[1].length >= digit) ? arrStr[1].right(digit) : arrStr[1].rpad(digit, "0"));
        } else {
            return rtnStr.formatNumber() + "." + "0".rpad(digit, "0");
        }
    } catch (e) {
        return "0." + "0".rpad(digit, "0");
    }
};
String.prototype.removeScript = function() {
    return this.replace(/<script[^>]*>((\n|\r|.)*?)<\/script>/img, '');
};
String.prototype.htmlEnc = function() {
    return this.removeScript().replaceAll("<", "＜").replaceAll(">", "＞").replaceAll("'", "′").replaceAll("\"", "″");
};
String.prototype.htmlDec = function() {
    return this.replaceAll("＜", "<").replaceAll("＞", ">").replaceAll("′", "'").replaceAll("″", "\"");
};
String.prototype.formatBitUnit = function() {
    var returnStr = "";

    var size = this.toNumber();

    if (size < 1024) {
        returnStr = size + " Bytes";
    } else {
        size /= 1024;
        if (size < 1024) {
            returnStr = size.toFixed(2) + " KB";
        } else {
            size /= 1024;
            if (size < 1024) {
                returnStr = size.toFixed(2) + " MB";
            } else {
                size /= 1024;
                returnStr = size.toFixed(2) + " GB";
            }
        }
    }

    return returnStr;
};


/** Date **/

Date.prototype.after = function(years, months, dates, hours, minutes, seconds, mss) {
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
    if (minutes == undefined) {
        minutes = 0;
    }
    if (seconds == undefined) {
        seconds = 0;
    }
    if (mss == undefined) {
        mss = 0;
    }
    return new Date(this.getFullYear() + years, this.getMonth() + months, this.getDate() + dates, this.getHours() + hours, this.getMinutes() + minutes, this.getSeconds() + seconds, this.getMilliseconds() + mss);
};
Date.prototype.before = function(years, months, dates, hours, minutes, seconds, mss) {
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
    if (minutes == undefined) {
        minutes = 0;
    }
    if (seconds == undefined) {
        seconds = 0;
    }
    if (mss == undefined) {
        mss = 0;
    }
    return new Date(this.getFullYear() - years, this.getMonth() - months, this.getDate() - dates, this.getHours() - hours, this.getMinutes() - minutes, this.getSeconds() - seconds, this.getMilliseconds() - mss);
};




/** Array **/
Array.prototype.keySort = function(keys) {

    keys = keys || {};

    var obLen = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key))
                size++;
        }
        return size;
    };

    var obIx = function(obj, ix) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (size == ix)
                    return key;
                size++;
            }
        }
        return false;
    };

    var keySort = function(a, b, d) {
        if ($.isNumeric(a) && $.isNumeric(b)) {
            d = d !== null ? d : 1;
            if (a == b)
                return 0;
            return a > b ? 1 * d : -1 * d;
        } else {
            var s1 = a.toLowerCase();
            var s2 = b.toLowerCase();
            if (s1 < s2) {
                return -1;
            } else if (s1 > s2) {
                return 1;
            } else {
                return 0;
            }
        }
    };

    var KL = obLen(keys);

    if (!KL)
        return this.sort(keySort);

    for (var k in keys) {
        // asc unless desc or skip
        keys[k] =
            keys[k] == 'desc' || keys[k] == -1 ? -1 :
            (keys[k] == 'skip' || keys[k] === 0 ? 0 :
                1);
    }

    this.sort(function(a, b) {
        var sorted = 0,
            ix = 0;

        while (sorted === 0 && ix < KL) {
            var k = obIx(keys, ix);
            if (k) {
                var dir = keys[k];
                sorted = keySort(a[k], b[k], dir);
                ix++;
            }
        }
        return sorted;
    });
    return this;
};