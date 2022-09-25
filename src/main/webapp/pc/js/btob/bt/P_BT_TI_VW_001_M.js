/** DX Insight>DX Story>상세보기 **/
var mController = $.extend(new $.CommonObj(),{

    wrapCls: '.kt_mb',
    detail: null,
	eventInit:function() {
		$(document).on('click', '.kt_mb .bnr_banner_qna', function() {
            $("select[name=QUESTIONTYPE]").val('DX Story').prop("selected", true); 
        });
	}, 
	onCreate:function() {
		if(mode_chk != 'pc'){	// pc/m 중복으로 실행되는 것을 막기 위해 접속 환경이 m 일 경우에만 함수 실행.
			this.makeSubTab("A");
			this.getDetail();
		}
	},
    getDetail:function() {
        var _this = this;
        var params = {bbsId:this.pageReqParams.bbsId, bbsTp:'A'};
        this.ajaxSendCall('/bbs/selBbs.json', params, function(result) {
            _this.detail = _this.removeScript(_this.clone(result.bbsDto));
            _this.dispDetail();
        });
    },
    makeSubTab: function(bbsTp) {
        var arrSubTab = [
            {bbsTp: "", title:'전체', url:"/bt/P_BT_SM.do"},
            {bbsTp: "A", title:'DX Story', url:"/bt/P_BT_TI_LT_001.do"},
            {bbsTp: "B", title:'영상 갤러리', url:"/bt/P_BT_VG_LT_001.do"},
            {bbsTp: "H", title:'언론보도', url:"/bt/P_BT_MR_LT_001.do"},
            {bbsTp: "N", title:'컨퍼런스', url:"/bt/P_BT_CR_LT.do"},
        ];
        var html = [];
        arrSubTab.forEach(function(item, i) {
            html.push('<li' + ((item.bbsTp == bbsTp) ? ' class="on"' : '') + '><a href="' + item.url + '">' + item.title + '</a></li>');
        });
        $('.kt_mb .sub_tab ul').empty().append(html.join(''));
    },
    dispDetail: function() {
        var _this = this;
        document.cookie = "bbsIdM=" + this.detail.bbsId + ";"
		document.cookie = "titleM=" + this.detail.title + ";"
		
        // 리포트, 첨부파일
        var listReport = this.detail.listBbsFileDto.filter(function(item) {
            return ( item.fileFg == 'R' );
        });
        var listAttFile = this.detail.listBbsFileDto.filter(function(item) {
            return ( item.fileFg == 'F' );
        });
        
        snsInfo(this.detail);
        
        // bedge
        if(this.nvl(this.detail.bbsTp, "") == "") {
            $('.kt_mb .bnr_view .bnr_view_title .bedge').remove();
        } else { 
            $('.kt_mb .bnr_view .bnr_view_title .bedge span').text(this.getBbsTpNm(this.detail.bbsTp));
        }
        // title
        //$('.kt_mb .bnr_view .bnr_view_title .title').text(this.detail.title);
         // 등록일
        var regDt = new $.Utils.datetime(this.detail.regDttm).getDate('yyyy.mm.dd');
        var regDtHtml = [];
        $('.kt_mb .bnr_view .bnr_view_title dl').empty();
        regDtHtml.push('<dt>등록일자</dt>');
        regDtHtml.push('<dd>' + regDt + '</dd>');
        $('.kt_mb .bnr_view .bnr_view_title dl').append(regDtHtml.join(''));
        // content
        //$('.kt_mb .bnr_view .bnr_view_cont').empty().html(this.detail.content);
        // 리포트,첨부파일 다운로드
        $('.kt_mb .bnr_view .bnr_view_download').empty();
        if(listReport.length == 0 && listAttFile.length == 0) {
            $('.kt_mb .bnr_view .bnr_view_download').remove();
        } else {
            var fileHtml = [];
            if(this.detail.rptDownYn == 'Y') {
                listReport.forEach(function(item) {
                    fileHtml.push('<a href="#" data-file-download="' + item.fileNm + '">리포트 다운로드</a>');
                });
            }
            listAttFile.forEach(function(item) {
                fileHtml.push('<a href="#" data-file-download="' + item.fileNm + '">' + item.fileOrgNm + '</a>');
            });
            $('.kt_mb .bnr_view .bnr_view_download').append(fileHtml);
        }
        // 관련상품군 시작
        $('.j_banner_slide02').slick('unslick');
        $('.kt_mb .banner_list02').empty();
        var html = [];
        this.detail.arrCtgryCd.forEach(function(item, i) {
            html.push('<div class="item">');
			html.push('	<a href="' + _this.getUrlFromCtgryCd(item) + '">');
			html.push('		<img src="/resource/images/pd/p_' + item.toLowerCase() + '.png" alt="' + _this.detail.arrCtgryNm[i] + '">');
			html.push('		<p>' + _this.detail.arrCtgryNm[i] + '</p>');
			html.push('	</a>');
			html.push('</div>');
        });
        $('.kt_mb .banner_list02').append(html.join(''));
        $('.j_banner_slide02').slick({
            slidesToShow: 3,
            infinite: false,
            responsive: [
                {
                  breakpoint: 760,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]
        });
        // 검색태그
        $('.kt_mb .area_tags').empty();
        $('.kt_mb .area_tags').append(this.getHashtagHtml(this.detail.arrHashTag, this.detail.bbsTp, '<li><a href="#" title="#hashTag#" data-link-hashtag="#hashTag#">#hashTag#</a></li>'));
        // 이전글다음글
        $('.kt_mb .bnr_prev_next .inner').empty();
        html = []
        if(this.detail.prevBbsId > 0) {
            var prevLinkPage = JSON.stringify({url:'/bt/P_BT_TI_VW_001.do', bbsId:this.detail.prevBbsId, bbsTp:'A'});
            html.push('<a href="#" class="link_prev" data-link-page=' + prevLinkPage + '>');
            html.push('<span>이전글</span>');
            html.push('<strong>' + this.detail.prevBbsTitle + '</strong>');
            html.push('</a>');
        }
        if(this.detail.nextBbsId > 0) {
            var nextLinkPage = JSON.stringify({url:'/bt/P_BT_TI_VW_001.do', bbsId:this.detail.nextBbsId, bbsTp:'A'});
            html.push('<a href="#" class="link_next" data-link-page=' + nextLinkPage + '>');
            html.push('<span>다음글</span>');
            html.push('<strong>' + this.detail.nextBbsTitle + '</strong>');
            html.push('</a>');
        }
        var listLinkPage = JSON.stringify({url:'/bt/P_BT_TI_LT_001.do'});
        html.push('<a href="#" class="link_list" data-link-page=' + listLinkPage + '>목록</a>');
        $('.kt_mb .bnr_prev_next .inner').append(html.join(''));
        
        //content의 img title값 삭제
        /*$(".bnr_view_cont").find('img').each(function(){
			$(this).attr('title', '');
		});*/
    }
	
});


function snsInfo(detail) {
	//게시물 타이틀, 썸네일 정보 저장(카카오톡 공유하기에 사용)
    $('#sns_title').val(detail.title);
    var thumbnailNm = detail.arrFileNm;
    detail.arrFileFg.forEach(function(item, i) {
		if (item == 'T') {
			$('#sns_thumbNail').val(thumbnailNm[i]);
		}
	});
}

$(document).ready(function(){
	mController.init();
});

responsiveCallbackFn({
	"700-3840" : {
		"name" : "pc",
		"callback" : function(){
			window.location.reload();
		}
	},
	"380-699" : {
		"name" : "tablet",
		"callback" : function(){
			window.location.reload();
		}
	},
	"0-379" : {
		"name" : "mobile",
		"callback" : function(){
			window.location.reload();
		}
	}
}).resize(); // resize가 붙으면 리사이즈 이벤트도 바인딩

