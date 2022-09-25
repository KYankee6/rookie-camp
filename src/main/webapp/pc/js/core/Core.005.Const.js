/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreConst = function() {

    /** lang **/
    this.language = 'ko';
    this.country = 'KR';
    this.locale = this.language + '_' + this.country;

    /** 구분자 **/
    this.dateDiv = '-'; // 날짜
    this.timeDiv = ':'; // 시간
    this.telNoDiv = '-'; // 전화번호
    this.bizNoDiv = '-'; // 사업자번호
    this.cardNoDiv = '-'; // 카드번호
    this.zipNoDiv = '-'; // 우편번호

    /** 기본포멧 **/
    this.monthFormat = this.getMonthFormat();
    this.dateFormat = this.getDateFormat();
    this.timeFormat = this.getTimeFormat();
    this.datetimeFormat = this.getDateTimeFormat();
    this.pickerDateFormat = this.getPickerDateFormat();
    this.pickerMonthFormat = this.getPickerMonthFormat();

    this.dialogProp = {
        modal: true,
        resizable: false,
        show: "fadeIn",
        hide: "fadeOut",
        close: false
    };

    this.blockUICss = {
        "font-weight": "700",
        "height": "80px",
        "color": "#000",
        "opacity": "1",
        "font-size": "10pt",
        "line-height": "1.8",
        "padding-top": "8px"
    };

    this.resultCd = {
        'OK': '00',
        'ERROR': '99'
    };

    this.datepickerRegional = {
        ko: { // Default regional settings
                closeText: "Done", // Display text for close link
                prevText: "이전달", // Display text for previous month link
                nextText: "다음달", // Display text for next month link
                currentText: "Today", // Display text for current month link
                monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], // Names of months for drop-down and formatting
                monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], // For formatting
                dayNames: ['일','월','화','수','목','금','토'], // For formatting
                dayNamesShort: ['일','월','화','수','목','금','토'], // For formatting
                dayNamesMin: ['일','월','화','수','목','금','토'], // Column headings for days starting at Sunday
                weekHeader: "Wk", // Column header for week of the year
                dateFormat: "mm/dd/yy", // See format options on parseDate
                firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
                isRTL: false, // True if right-to-left language, false if left-to-right
                showMonthAfterYear: false, // True if the year select precedes month, false for month then year
                yearSuffix: "" // Additional text to append to the year in the month headers
            }
    }

    this.pagingProp = {
        totrowcnt: 0,   // 전체 row 수
        pagecnt: 10,    // 페이지당 row 수
        pagenow: 1,     // 현재 페이지 번호
        blockcnt: 10,   // 블록당 페이지 수
        blocknow: 1,    // 현재 block 번호
        pagestart: 0,   // 현재페이지 시작벉호
        pageend: 0,     // 현재페이지 끝번호
        totpagecnt: 0,  // 전체페이지수
        blockstart: 1,  // block 시작 페이지
        blockend: 1,    // block 마지막 페이지
        totblockcnt: 0, // 전체 block 수
        pageprev: 0,    // 이전페이지
        pagenext: 0,    // 다음페이지
        blockprev: 0,   // 이전 blockcnt 마지막 페이지
        blocknext: 0    // 다음 blockcnt 첫페이지
    };

};
CoreConst.prototype.getDialogProp = function() {
    return $.extend(true, {}, this.dialogProp);
};
CoreConst.prototype.getMonthFormat = function() {
    return 'yyyy' + this.dateDiv + 'mm';
};
CoreConst.prototype.getDateFormat = function() {
    return 'yyyy' + this.dateDiv + 'mm' + this.dateDiv + 'dd';
};
CoreConst.prototype.getTimeFormat = function() {
    return 'hh' + this.timeDiv + 'mi' + this.timeDiv + 'ss';
};
CoreConst.prototype.getDateTimeFormat = function() {
    return this.getDateFormat() + ' ' + this.getTimeFormat();
};
CoreConst.prototype.getPickerMonthFormat = function() {
    return 'yy' + this.dateDiv + 'mm';
};
CoreConst.prototype.getPickerDateFormat = function() {
    return 'yy' + this.dateDiv + 'mm' + this.dateDiv + 'dd';
};

$.extend({ Const: new CoreConst() });