/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreView = function(args) {

    this.id = null; // view element id (필수)
    this.name = ''; // view 이름 (선택)
    this.elem = null;

    this.model = null; // view model data

    $.extend(true, this, args);

    if (this.id == null) {
        $.Utils.alert('view class 에는 id 값이 반드시 필요합니다.');
        return false;
    }

    try {
        this.elem = $('#' + this.id);
    } catch (e) {
        $.Utils.alert('[오류발생] Core View : ' + e);
        return false;
    }

    // model setting
    this.model = new $.Model(); // view > model data

    return this;
};
CoreView.prototype.init = function(initData) {
    if(typeof(initData) != 'undefined') {
        $.extend(true, this.model.data.init, initData);
    }
    this.elem.bindPanel(this.model.data.init).applyModeStyle();
    return this;
};
CoreView.prototype.flush = function() {
    this.model.data.flush = this.elem.flushPanel();
    return this.model.data.flush;
};
CoreView.prototype.bind = function(data) {
    this.model.data.bind = data;
    this.elem.bindPanel(this.model.data.bind).applyModeStyle();
    return this;
};
CoreView.prototype.applyModeStyle = function() {
    this.elem.applyModeStyle();
    return this;
}

$.extend({ View: CoreView });