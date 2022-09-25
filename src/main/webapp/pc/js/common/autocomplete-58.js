/* 자동완성 s */
jQuery.fn.extend({
	autocomplete: function(options) {
		options = $.extend({}, $.Autocompleter.defaults, {}, options);

		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	}
});

$.Autocompleter = function(input, options) {
	var $input = $(input).attr("autocomplete", "off");

	$input.bind("keyup.autocomplete", function(event) {
		if($input.val() == ""){
			$.Autocompleter.UI.beforeshow();
		}
		
		if($input.val().trim().length > 0) {
			$.Autocompleter.Request.call($input); //검색호출
		}
		
		//Enter시 이동
		var e = event;
		if(e==null) { 
			e = window.event;
		}
		if(e.keyCode == 13 ) {  
			if($input.val() != ""){
				if($input.val().trim().length > 0) {
					location.href = "/sr/searchResult.do?k="+$input.val();
				} else {
					alert("검색어를 입력해주세요.");
				}
			}
		}

	}).click(function() {
		if($input.val() == ""){
			$.Autocompleter.UI.beforeshow();
		}else{
			if($input.val().replace(" ","").length > 0) {
				$.Autocompleter.Request.call($input);
			} else {
				alert("검색어를 입력해주세요.");
			}
		}
		
	});
	
	$.Autocompleter.UI.init();	//자동완성 초기 세팅	
};

$.Autocompleter.defaults = {
	nowkeyword: "",
	arkLayerNameBefore: "#searchWrapBefore", //자동완성어 레이어
	arkLayerNameAfter: "#searchWrapAfter", //자동완성어 레이어
	arkRelatedWord: "#autoList", //자동완성어 데이터 영역
	arkRelatedWordMenu: "#menuList", //자동완성어 메뉴 영역
	btnSearchWordClear: "#btn-clear", //검색어지우기
	akcDataExist: "N",
	keywordList: [],
	menuKeywordList: [],
	ajaxpopurl: "/api/autocomplete.json",
	ajaxmenuurl: "/api/searchMenu.json",
	tergetUrl: "https://search.kt.com/?r=20&c=BIZ000000&p=1&f=&o=&t=&ch=&rk=&in=&q=",
	tergetMbUrl: "https://m.search.kt.com/?r=20&c=BIZ000000&p=1&f=&o=&ch=&k=",  
	rows : "5"
};

$.Autocompleter.Util = {
	isSpecialChar: function(str){
		var spChr = ['.','*','+','?','\\','^','$','[',']','(',')','{','}','|'];
		var rtnVal = false;

		$(spChr).each(function(k,v){
			if (str === v) rtnVal = true;
		});
		return rtnVal;
	},
	setAutoCompleteHighLight: function(keyword){ // 사용
		var reg = '';
		
		keyword = keyword.replace(/\s/g,''); // 공백 제거

		if (keyword !== '' ) {			
			for (var i = 0 ; i < keyword.length ; i ++ ) {
				var charStr = keyword.substr(i,1);

				// 정규식 시작 (
				if (i === 0)  reg = '(';

				if ($.Autocompleter.Util.isSpecialChar(charStr)) {
					// 정규식의 기본 특수문자일경우 일반문자로 치환하기 위해 \ 붙여줌
					reg += '\\' + charStr + '\\s*';
				} else {
					reg += charStr + '\\s*';
				}

				// 정규식 끝 )
				if ( i === keyword.length-1 ) reg += ')';
			}

			var regex = new RegExp(reg,'gi');

			$($.Autocompleter.defaults.arkLayerNameAfter).find("ul li a").each(function(){
				var thisText = $(this).text();
				if (thisText !== '' ){
					if (keyword.length == 1) {
						if(thisText.indexOf(keyword.toUpperCase()) >= 0){//대문자
							thisText = thisText.replace(keyword.toUpperCase(),'<strong>'+keyword.toUpperCase()+'</strong>');
						}else{
							thisText = thisText.replace(keyword,'<strong>'+keyword+'</strong>');
						}
						
						$(this).html(thisText);
					} else {
						thisText = thisText.replace(regex,'<strong>$1</strong>');
						$(this).html(thisText);
					}
				}
			});
		}
	}
}

$.Autocompleter.UI = {
	init : function(){	
		
	},
	aftershow : function(){
		if ($.Autocompleter.defaults.akcDataExist == "Y"){
			$($.Autocompleter.defaults.arkLayerNameAfter).show();	
			$($.Autocompleter.defaults.arkLayerNameBefore).hide();	
		}else{
			$.Autocompleter.UI.afterhide();
		}
	},
	afterhide : function(){
		$($.Autocompleter.defaults.arkLayerNameAfter).hide();		
	},
	beforeshow : function(){
		$($.Autocompleter.defaults.arkLayerNameBefore).show();
	},
	beforehide : function(){
		$($.Autocompleter.defaults.arkLayerNameBefore).hide();	
	}
};

$.Autocompleter.Cache = {
	insert : function(sKeyword, sData){
		for (var i in $.Autocompleter.defaults.keywordList) {		
			if ($.Autocompleter.defaults.keywordList[i].keyword == sKeyword)	{			
				return false;
			}		
		};
		$.Autocompleter.defaults.keywordList.push({keyword: sKeyword, data: sData});
	},
	select : function(findKeyword){
		for (var i in $.Autocompleter.defaults.keywordList) {		
			if ($.Autocompleter.defaults.keywordList[i].keyword == findKeyword)	{			
				return $.Autocompleter.defaults.keywordList[i].data;
			}
		};
		return false;
	}
};

$.Autocompleter.MenuCache = {
	insert : function(sKeyword, sData){
		for (var i in $.Autocompleter.defaults.menuKeywordList) {		
			if ($.Autocompleter.defaults.menuKeywordList[i].keyword == sKeyword)	{			
				return false;
			}		
		};
		$.Autocompleter.defaults.menuKeywordList.push({keyword: sKeyword, data: sData});
	},
	select : function(findKeyword){
		for (var i in $.Autocompleter.defaults.menuKeywordList) {		
			if ($.Autocompleter.defaults.menuKeywordList[i].keyword == findKeyword)	{			
				return $.Autocompleter.defaults.menuKeywordList[i].data;
			}
		};
		return false;
	}
};

$.Autocompleter.Request = {
	call : function($input){ // 사용
		$.Autocompleter.Request.searchajax($input); //자동완성
	},
	searchajax : function($input){
		var keyword = $input.val();
		$.Autocompleter.defaults.nowkeyword = keyword;
		$('.auto_content').css("display","");
		$('.auto_contentM').css("display","");
		if(keyword.length>0){
			$('.search_cont .search_result').show();
			$('.search_result .result_bot').show();
		}

		//자동완성 비노출 - 자동완성,메뉴인 경우만
		if (keyword == ""){		
			$.Autocompleter.UI.afterhide();
			$('.search_result .result_bot').hide();
			return false;
		}
		
		var ch = ''
		if(mode_chk == 'pc'){
			ch='pc';
		}else{
			ch='m';
		}
		
		var page ='';
		if(window.location.href.indexOf("searchResult.do") > -1){
			page = "result";
		}else{
			page = "preResult";
		}
		
		var apiparam = {
			"k" : keyword,
			"rows" : $.Autocompleter.defaults.rows,
			"ch" : ch,
			"pageCheck" : page
		}
		
		//자동완성 목록 cache
		var isCache = false;
		if ($.Autocompleter.Cache.select(keyword) != false){
			var cache_data = $.Autocompleter.Cache.select(keyword);
			if (cache_data != "") {
				$.Autocompleter.Request.ui(keyword, cache_data);
				isCache = true;
			}
		}
		
		//메뉴 목록 cache
		var isMenuCache = false;
		if ($.Autocompleter.MenuCache.select(keyword) != false){
			var cache_data = $.Autocompleter.MenuCache.select(keyword);
			if (cache_data != "") {
				$.Autocompleter.Request.menuui(keyword, cache_data);
				isMenuCache = true;
			}
		}
		
		if(!isCache){
			$.ajax({
				url : $.Autocompleter.defaults.ajaxpopurl,
				data : apiparam,	
				async : true,
				dataType: "json",
				type: "post",
				timeout : 2000,
				success : function(res){
					var data = res.data;
					if(data != null && data != undefined && data != "") {
						data = JSON.parse(res.data);
						$.Autocompleter.Request.ui(keyword, data);
						$.Autocompleter.Cache.insert(keyword, data);
					}
				},
				error : function(res){
					$($.Autocompleter.defaults.arkRelatedWord).html(""); 
					$.Autocompleter.defaults.akcDataExist = "Y";
					$.Autocompleter.UI.aftershow();
				}
			});
		}
		
		if(!isMenuCache){
			//메뉴 검색
			$.ajax({
				url : $.Autocompleter.defaults.ajaxmenuurl,
				data : apiparam,	
				async : true,
				dataType: "json",
				type: "post",
				timeout : 2000,
				success : function(res){
					var data = res.data;
					if(data != null && data != undefined && data != "") {
						data = JSON.parse(res.data);
						$.Autocompleter.Request.menuui(keyword, data);
						$.Autocompleter.MenuCache.insert(keyword, data);
					}
				},
				error : function(res){
					/* TO-DO 에러처리 */
				}
			});
		}

	},
	ui : function(keyword, data){
		var searchJson = null;
		var searchKeyword = null;
		var dataList = "";
		
		try{
			searchJson = data.response.docs;
			searchKeyword = data.highlighting;
		}catch (e){
			searchJson = null;
			searchKeyword = null;
		}
		if($.Autocompleter.defaults.nowkeyword != "") {
			if(searchJson != null) {
				if(searchJson.length > 0){
					
					for(var i=0;i<searchJson.length;i++){
						var resultValue = searchJson[i].KEYWORD;
						var words = $.Autocompleter.defaults.nowkeyword;
						var highlight = '';		
						if(resultValue.indexOf(words.toUpperCase()) !== -1) {
							highlight = '<span class="color_red">' + words.toUpperCase() + '</span>';
							highlight = resultValue.replace(new RegExp(words, 'gi'), highlight);
						} else {
							//highlight = '<span class="color_red">' + words + '</span>';
							highlight = replaceKeyword(words, resultValue);
						}		
						
						dataList	+=	'<li>';
						if(mode_chk == 'pc'){
							dataList	+=	'<a href="javascript:relatedKeywordLink(\'' + searchJson[i].KEYWORD + '\');" title="검색어로 입력">' + highlight + '</a>';
							if(null != searchJson[i].IMG_URL && "" != searchJson[i].IMG_URL){
								dataList	+=	'<div class="thum_img">';
								dataList	+=	'<a href="javascript:relatedKeywordLink(\'' + searchJson[i].KEYWORD + '\');" title="검색어로 입력"><img src="' + searchJson[i].IMG_URL + '" alt="img"></a>';
								dataList	+=	'</div>';
							}
						}else {
							dataList	+=	'<a href="javascript:relatedKeywordLinkM(\'' + searchJson[i].KEYWORD + '\');" title="검색어로 입력">' + highlight + '</a>';
							if(null != searchJson[i].IMG_URL && "" != searchJson[i].IMG_URL){
								dataList	+=	'<div class="thum_img">';
								dataList	+=	'<a href="javascript:relatedKeywordLinkM(\'' + searchJson[i].KEYWORD + '\');" title="검색어로 입력"><img src="' + searchJson[i].IMG_URL + '" alt="img"></a>';
								dataList	+=	'</div>';
							}
						}
						
						dataList	+=	'</li>';
					}
					
					
					$($.Autocompleter.defaults.arkRelatedWord).html(dataList);
					$("#autoListResult").html(dataList);
					$("#autoListResultM").html(dataList);
					$.Autocompleter.Util.setAutoCompleteHighLight(keyword);
					$.Autocompleter.defaults.akcDataExist = "Y";
					$.Autocompleter.UI.aftershow();
				} else {
					dataList	= "";
					
					$($.Autocompleter.defaults.arkRelatedWord).html(dataList);
					$("#autoListResult").html(dataList); 
					$("#autoListResultM").html(dataList);
					$.Autocompleter.defaults.akcDataExist = "Y";
					$.Autocompleter.UI.aftershow();
				}
			} else {
				dataList	= "";
				
				$($.Autocompleter.defaults.arkRelatedWord).html(dataList);
				$("#autoListResult").html(dataList);
				$("#autoListResultM").html(dataList);
				$.Autocompleter.defaults.akcDataExist = "Y";
				$.Autocompleter.UI.aftershow();
			}
			
		}
	},
	menuui : function(keyword, data){
		var searchJson = null;
		var searchKeyword = null;
		var dataList = "";
		
		try{
			searchJson = data.response.docs;
			searchKeyword = data.highlighting;
		}catch (e){
			searchJson = null;
			searchKeyword = null;
		}
		if($.Autocompleter.defaults.nowkeyword != "") {
			if(searchJson != null) {
				if(searchJson.length > 0){
                    
					for(var i=0;i<searchJson.length;i++){
						var resultValue = searchJson[i].MENUNAME;
						var words = $.Autocompleter.defaults.nowkeyword;
						var highlight = '';		
						if(resultValue.indexOf(words.toUpperCase()) !== -1) {
							highlight = '<span class="color_red">' + words.toUpperCase() + '</span>';
							highlight = resultValue.replace(new RegExp(words, 'gi'), highlight);
						} else {
							//highlight = '<span class="color_red">' + words + '</span>';
							highlight = replaceKeyword(words, resultValue);
						}	
//                        <li><a href="#none" title="해당페이지로 이동">상품서비스 > <span class="color_red">5G</span>/모바일 > <span class="color_red">5G</span>소개</a></li>
						
						dataList	+=	'<li>';
						dataList	+=	'<a href="javascript:fnMenuLink(\'' + searchJson[i].URL + '\');" title="해당페이지로 이동">' + highlight + '</a>';
						dataList	+=	'</li>';
					}
					
					$($.Autocompleter.defaults.arkRelatedWordMenu).html(dataList);
					$("#menuListResult").html(dataList);
					$("#menuListResultM").html(dataList);
//					$.Autocompleter.Util.setAutoCompleteHighLight(keyword);
//					$.Autocompleter.defaults.akcDataExist = "Y";
//					$.Autocompleter.UI.aftershow();
				} else {
					dataList	= "";
					
					$($.Autocompleter.defaults.arkRelatedWordMenu).html(dataList);
					$("#menuListResult").html(dataList);
					$("#menuListResultM").html(dataList);
//					$.Autocompleter.defaults.akcDataExist = "Y";
//					$.Autocompleter.UI.aftershow();
				}
			} else {
				dataList	= "";
				
				$($.Autocompleter.defaults.arkRelatedWordMenu).html(dataList);
				$("#menuListResult").html(dataList);
				$("#menuListResultM").html(dataList);
//				$.Autocompleter.defaults.akcDataExist = "Y";
//				$.Autocompleter.UI.aftershow();
			}
			
		}
	}
};


//검색어 삭제
function fnSearchClear(){
	$("#in_search").val('');
	$.Autocompleter.defaults.nowkeyword = "";
	$.Autocompleter.UI.afterhide();
	$.Autocompleter.UI.beforeshow();
}

function fnSearchClickClear() {
	$($.Autocompleter.defaults.btnSearchWordClear).click(function(e) {
		e.preventDefault();
		fnSearchClear();	
	});
}

function fnKeywordLink(keyword) {
	var param = encodeURIComponent(keyword);
	
	if(mode_chk == 'pc'){
		location.href = $.Autocompleter.defaults.tergetUrl + param;
	}else{
		location.href = $.Autocompleter.defaults.tergetMbUrl + param;
	}
}

function fnMenuLink(url) {
	location.href = url;
}

function replaceKeyword(keyword, resultValue){
	var replaceWord = ''; 
	cfmKeyword = keyword.replace(/\s/g,''); // 공백 제거
		for (var i = 0 ; i < cfmKeyword.length ; i ++ ) {
			var charStr = cfmKeyword.substr(i,1);
			// 정규식 시작 (
			if (i === 0) replaceWord = '(';
			if ($.Autocompleter.Util.isSpecialChar(charStr)) {
			// 정규식의 기본 특수문자일경우 일반문자로 치환하기 위해 \ 붙여줌
			replaceWord += '\\' + charStr + '\\s*';
			} else {
			replaceWord += charStr + '\\s*';
			}
			// 정규식 끝 )
			if ( i === cfmKeyword.length-1 ) replaceWord += ')';
		}
	var regex = new RegExp(replaceWord,'gi');
	var repText = resultValue.replace(regex, '<span class="color_red">$1</span>');
	return repText;
}

/* 자동완성 e */

function fnPopKeyword(){
	var page ='';
	if(window.location.href.indexOf("searchResult.do") > -1){
		page = "result";
	}else{
		page = "preResult";
	}
	
	var apiparam = {
		"pageCheck" : page
	}

	$.ajax({
		url : '/api/popKeyword.json',
		async : true,
		data : apiparam,
		dataType: "json",
		type: "post",
		timeout : 5000,
		success : function(res){
			var data = res.data;
			if(data != null && data != undefined && data != "") {
				data = JSON.parse(res.data);
				
				var searchJson = null;
				var dataList = "";
				
				try{
					searchJson = data.response.docs;
				}catch (e){
					searchJson = null;
				}
				if(searchJson != null) {
					if(searchJson.length > 0){
	                    
						for(var i=0;i<searchJson.length;i++){
							
							dataList	+=	'<li>';
							dataList	+=	'<a href="javascript:relatedKeywordLink(\'' + searchJson[i].keyword + '\');"><span class="rank">' + searchJson[i].ranking + '</span>' + searchJson[i].keyword + '</a>';
							if("U" == searchJson[i].rankarrow){ // 순위상승
								dataList	+= '<i class="plus">' + searchJson[i].changevlu + '</i>';
							} else if("D" == searchJson[i].rankarrow){ // 순위하락
								dataList	+= '<i class="minus">' + searchJson[i].changevlu + '</i>';
							} else if("E" == searchJson[i].rankarrow){ // 순위변동없음
								dataList	+= '<i class="zero">0</i>';
							} else if("N" == searchJson[i].rankarrow){ // 신규진입
								dataList	+= '<i class="new">NEW</i>';
							}
							dataList	+=	'</li>';
						}
					}
				} else {
					dataList	= "";
				}
				
				$("#popKeywordList").html(dataList);
				$("#popKeywordListResult").html(dataList);
			}
		}
	});
}


$(document).ready(function(){
	/*if(appEnv == "dev" || appEnv == "test" || appEnv == "local"){
		$.Autocompleter.defaults.tergetUrl = "https://tb.search.kt.com/?r=20&c=BIZ000000&p=1&f=&o=&t=&ch=&rk=&in=&q=";
		$.Autocompleter.defaults.tergetMbUrl = "https://tb.m.search.kt.com/?r=20&c=BIZ000000&p=1&f=&o=&ch=&k=";
	}*/
	$("#in_search").autocomplete();	
	fnSearchClickClear();
	/*if($("#popKeywordList")){
		fnPopKeyword();
	}*/
	
	$("#btnSearchKeyword").click(function() {
		var keyword = $("#in_search").val();
		if(keyword == ""){
			return;
		} else {
			if(keyword.trim().length > 0) {
				location.href = "/sr/searchResult.do?k="+keyword;
			} else {
				alert("검색어를 입력해주세요.");
			}
			/*fnKeywordLink(keyword)*/
		}
	});

	$("#closeBtn").click(function(){
		$(".result_bot").hide();
	});
	
});

function relatedKeywordLink(value) {
	var keyword = value;
	if(keyword == ""){
		return;
	} else {
		$('#in_search').val(keyword);
	}
}

function relatedKeywordLinkM(value) {
	var keyword = value;
	if(keyword == ""){
		return;
	} else {
		$('#in_search').val(keyword);
	}
}
