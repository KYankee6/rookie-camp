var CorePage = function() {
	this.contextPath = "";
	this.sessionId = null;
	this.params = {};
};
CorePage.prototype.addParams = function(pageId, params) {
    this.params[pageId] = params;
};
CorePage.prototype.delParams = function(pageId) {
    delete this.params[pageId];
};
CorePage.prototype.getParams = function(pageId) {
    var rtnParams = {};
    if (this.params.hasOwnProperty(pageId)) {
        rtnParams = this.params[pageId];
    }
    return rtnParams;
};

$.extend({Page: new CorePage()});


if( !console ) console = {
    log: function() {
    }
};