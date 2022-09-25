var CorePaging = function(option) {
    this.controller = null;
    this.id = null;
    if(typeof(option) == 'undefined') {
        return;
    }
    if(!option.hasOwnProperty('id')) {
        return;
    }
    $.extend(true, this, $.Const.pagingProp);
    $.extend(true, this, option);
    return this;
};
CorePaging.prototype.reset = function() {
    
    // 현재block번호
    this.blocknow = parseInt(this.pagenow / this.blockcnt) + ((parseInt(this.pagenow % this.blockcnt) == 0) ? 0 : 1);
    
    // 현재페이지시작번호
    this.pagestart = (this.pagenow - 1) * this.pagecnt + 1;
    
    // 현재페이지끝번호
    this.pageend = this.pagenow * this.pagecnt;
    if(this.pageend > this.totrorcnt) this.pageend = this.totrowcnt;
    
    // 전체페이지수
    if(mode_chk == 'pc'){
	    if(this.totrowcnt % 10 == 0) {
	    	this.totpagecnt = parseInt(this.totrowcnt / this.pagecnt) + ((parseInt(this.pagenow % this.blockcnt) == 0) ? 0 : 1) -1;
	    } else {
	    	this.totpagecnt = parseInt(this.totrowcnt / this.pagecnt) + ((parseInt(this.pagenow % this.blockcnt) == 0) ? 0 : 1);
	    }
	}else{
		if(this.totrowcnt % 5 == 0) {
	    	this.totpagecnt = parseInt(this.totrowcnt / this.pagecnt) + ((parseInt(this.pagenow % this.blockcnt) == 0) ? 0 : 1) -1;
	    } else {
	    	this.totpagecnt = parseInt(this.totrowcnt / this.pagecnt) + ((parseInt(this.pagenow % this.blockcnt) == 0) ? 0 : 1);
	    }
	}

    // block시작페이지
    this.blockstart = (this.blocknow - 1) * this.blockcnt + 1;

    // block마지막페이지
    this.blockend = this.blockstart + this.blockcnt -1;
    if(this.blockend > this.totpagecnt) this.blockend = this.totpagecnt;

    // 전체블럭수
    this.totblockcnt = parseInt(this.totpagecnt / this.blockcnt) + ((parseInt(this.totpagecnt % this.blockcnt) == 0) ? 0 : 1);

    // pageprev
    this.pageprev = ( this.pagenow > 1 ) ? this.pagenow - 1 : 1;

    // pagenext
    this.pagenext = ( this.pagenow < this.totpagecnt ) ? this.pagenow + 1 : this.totpagecnt;

    // 이전block
    this.blockprev = ( this.blocknow - 2 ) * this.blockcnt + 1;
    if(this.blockprev < 1) this.blockprev = 1;

    // 다음block
    this.blocknext = this.blocknow * this.blockcnt + 1;
    if(this.blocknext > this.totpagecnt) this.blocknext -= this.blockcnt;
     
    return this;
};
CorePaging.prototype.disp = function() {
    $('#'+this.id).empty();
    var html = [];
    if(this.blocknow > 1) {
        html.push('<span class="btn_quick prev_first"><a href="#" data-paging-move="1"><sapn class="hidden">처음으로</span></a></span>');
		html.push('<span class="btn_quick prev_one"><a href="#" data-paging-move="' + this.blockprev + '"><sapn class="hidden">이전으로</span></a></span>');
    } else {
        html.push('<span class="btn_quick prev_first disabled"><a href="#"><sapn class="hidden">처음으로</span></a></span>');
		html.push('<span class="btn_quick prev_one disabled"><a href="#"><sapn class="hidden">이전으로</span></a></span>');
    }

    for(var i = this.blockstart; i <= this.blockend; i++) {
        //현재페이지
        if(this.pagenow == i) {
            html.push('<span class="active"><a href="#" data-paging-move="' + i + '">' + i + '</a></span>');
        } else {
            html.push('<span><a href="#" data-paging-move="' + i + '">' + i + '</a></span>');
        }
        
    }
    
    if(this.totpagecnt > ( this.blockcnt * this.blocknow ) ) {
        html.push('<span class="btn_quick next_one"><a href="#" data-paging-move="' + this.blocknext + '"><sapn class="hidden">다음으로</span></a></span>');
		html.push('<span class="btn_quick next_last"><a href="#" data-paging-move="' + this.totpagecnt + '"><sapn class="hidden">마지막으로</span></a></span>');
    } else {
        html.push('<span class="btn_quick next_one disabled"><a href="#"><sapn class="hidden">다음으로</span></a></span>');
		html.push('<span class="btn_quick next_last disabled"><a href="#"><sapn class="hidden">마지막으로</span></a></span>');         
    }
    $('#'+this.id).append(html.join(''));

    return this;
};

$.extend({Paging: CorePaging});