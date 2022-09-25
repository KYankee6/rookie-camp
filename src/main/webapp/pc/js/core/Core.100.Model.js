/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreModel = function(args) {

    this.data = {};
    this.data.init = {}; // initialize data
    this.data.bind = {}; // binded data
    this.data.flush = {}; // flushed data

};
CoreModel.prototype.init = function(initData) {
	$.extend(true, this.data.init, initData);
};

$.extend({ Model: CoreModel });