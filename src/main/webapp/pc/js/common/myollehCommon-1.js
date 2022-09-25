;

// ajax cross domain
$.support.cors = true;

var AJAX_RESULT_CODE = {
	SUCCESS: '00000'
};

var PROD_CD = {
	MOBILE: "901",
	INTERNET: "902",
	TV: "903",
	HOME_TEL: "906",
	WIBRO: "905",
	WIFI: "911",
	INTERNET_TEL: "904"
};

//로딩
var isLoadBlock = false,
	isSystemBlock = false,
	curevent;

$.loadBlock = function(event, name) {
	if (event == null) {

		if ($("#Loading").length > 0) {
			return;
		}

		var loadWrap;
		loadWrap = '<div id="Loading" style="position:fixed;"></div>',
			loadWrap += '<div id="LoadWrap">',
			loadWrap += '<img src="/pc/images/common/img_loading.gif" alt="" class="loading-Img"/>',
			loadWrap += '<p>정보를 불러오는 중입니다.</p>',
			loadWrap += '</div>';
		if (isLoadBlock == false) {
			$("body").append(loadWrap);
			isLoadBlock = true;
		}
	} else {
		var contH = $(event).height();
		var loadWrap;
		loadWrap = '<div id="LoadingDetail" class="loading">',
			loadWrap += '<img src="/pc/images/common/img_loading.gif" alt="" class="loading-Img"/>';
		if (name == null) {
			loadWrap += '<p>정보를 불러오는 중입니다.</p>';
		} else {
			loadWrap += '<p>' + name + '</p>';
		}
		//			 loadWrap += '<p>잠시만 기다려 주세요.</p>',
		loadWrap += '</div>';
		if (curevent != event) {
			isLoadBlock = false;
			curevent = event;
		}

		if (isLoadBlock == false) {
			$(event).css({ "position": "relative" });
			$(event).append(loadWrap);

			isLoadBlock = true;
		}

		if (event == '.item-in-cont') {
			$(event).css({
				'padding-top': '20px'
			})
		} else {
			if (contH <= 120) {
				//$(event).find('#LoadingDetail').addClass("lowtype");
			}
		}
	}
};

$.loadUnBlock = function(event) {
	if (event == null) {
		$("#Loading").remove();
		$("#LoadWrap").remove();
	} else {
		$(event).removeAttr("style");
		$(event).find("#LoadingDetail").remove();
	}
	isLoadBlock = false;
};

jQuery.loadInitBlock = function(event) {
	$("#Loading").remove();
	$("#LoadWrap").remove();
	$(event).removeAttr("style");
	$(event).find("#LoadingDetail").remove();
};

jQuery.layerAlertClose = function(event) {
	if (event == null) {
		$(".popErrorWrap").remove();
		$(".popErrorWrap-middle").remove();
	} else {
		$(event).removeAttr("style");
		$(event).find(".popErrorWrap").remove();
		$(event).find(".popErrorWrap-middle").remove();
	}
	isLoadBlock = false;
};

$.systemBlock = function(event, name) {
	if (event == null) {
		var loadWrap = "";
		loadWrap = '<div id="Loading" style="position:fixed;"></div>',
			loadWrap += '<div id="LoadWrap" class="systemBlock">',
			loadWrap += '<p>시스템 점검중입니다.</p>',
			loadWrap += '</div>';
		if (isLoadBlock == false) {
			$("body").append(loadWrap);
			isSystemBlock = true;
			isLoadBlock = true;
		}
	} else {
		var contH = $(event).height();
		var loadWrap = "";
		loadWrap = '<div id="LoadingDetail" class="loading systemBlock">';
		if (name == null) {
			loadWrap += '<p>시스템 점검중입니다.</p>';
		} else {
			loadWrap += '<p>' + name + '</p>';
		}
		//			 loadWrap += '<p>잠시만 기다려 주세요.</p>',
		loadWrap += '</div>';
		if (curevent != event) {
			isSystemBlock = false;
			curevent = event;
		}

		if (isLoadBlock == false) {
			$(event).css({ "position": "relative" });
			$(event).append(loadWrap);

			isSystemBlock = true;
			isLoadBlock = true;
		}

		if (event == '.item-in-cont') {
			$(event).css({
				'padding-top': '20px'
			})
		} else {
			if (contH <= 120) {
				//$(event).find('#LoadingDetail').addClass("lowtype");
			}
		}
	}
};

$.systemUnBlock = function(event) {
	if (event == null) {
		$("#Loading").remove();
		$("#LoadWrap.systemBlock").remove();
	} else {
		$(event).removeAttr("style");
		$(event).find(".systemBlock").remove();
	}
	isSystemBlock = false;
};

jQuery.layerError = function(msg) {
	var html;
	html = '<div class="popErrorWrap" style="position:fixed;"></div>';
	html += '<div class="popErrorWrap-middle">';
	html += '<div class="popErrorCont">';
	//		html +=	'<span class="title">시스템 점검 중입니다.</span>';
	//			html +=	'<p>점검시간 동안 일부 서비스 이용이 제한되는 점 양해 부탁드립니다.</p>';
	if (msg == null) {
		/*
		$.layerError();
		*/
	} else if (typeof msg == "object") {
		/*
		var msg = {'time':'6월 2일(목) 오전 1시 ~ 6시','desc':'서비스 개선을 위한 점검입니다.','target':'마이비즈 전체'};
		$.layerError(msg);
		*/
		html += '<ul>';
		if (msg.time) {
			html += '<li>';
			html += '<strong class="name">점검 시간 :</strong>';
			html += '<span class="desc">' + msg.time + '</span>';
			html += '</li>';
		}
		if (msg.desc) {
			html += '<li>';
			html += '<strong class="name">점검 내용 :</strong>';
			html += '<span class="desc">' + msg.desc + '</span>';
			html += '</li>';
		}
		if (msg.target) {
			html += '<li>';
			html += '<strong class="name">대상서비스 :</strong>';
			html += '<span class="desc">' + msg.target + '</span>';
			html += '</li>';
		}
		html += '</ul>';
	} else if (typeof msg == "string") {
		/*
		var msg = '서비스 개선을 위한 점검입니다.';
		$.layerError(msg);
		*/
		html += msg;
		/*html += '<ul>';
			html += '<li>';
				html += '<strong class="name">점검 내용 :</strong>';
				html += '<span class="desc">'+ msg +'</span>';
			html += '</li>';
		html += '</ul>';*/
	}
	html += '</div>';
	html += '<div class="pbtnWrap">';
	html += " <p><a href=\"javascript:$.layerAlertClose();\" ><span>닫기</span></a></p>";
	html += '</div>';
	html += '</div>';
	if (!isLoadBlock) {
		$('body').prepend(html);
		isLoadBlock = true;
	}
	var bodyW = $('body').width();
	var elW = $('.popErrorWrap-middle').width();
	if (bodyW <= elW) {
		$('.popErrorWrap-middle').css({
			'width': bodyW - 40 + 'px',
			'margin-left': '-' + (bodyW - 40) / 2 + 'px'
		})
	}
};

jQuery.layerAlert = function(event, msg) {
	if (msg == null) {
		msg = "조회가 불가능합니다.";
	}
	if (event == null) {
		var loadMsg = '';
		loadMsg += '<div class="popErrorWrap" style="position:fixed;"></div>',
			loadMsg += '<div class="popErrorWrap-middle">',
			loadMsg += '<div class="popErrorCont">' + msg + '</div>',
			loadMsg += '<div class="pbtnWrap">',
			loadMsg += " <p><a href=\"javascript:$.layerAlertClose();\" ><span>닫기</span></a></p>",
			loadMsg += '</div>',
			loadMsg += '</div>';
		$("body").prepend(loadMsg);
	} else {
		var loadMsg = '';
		loadMsg += '<div class="popErrorWrap" style="position:fixed;"></div>',
			loadMsg += '<div class="popErrorWrap-middle">',
			loadMsg += '<p>' + msg + '</p>',
			loadMsg += '<div class="pbtnWrap">',
			loadMsg += " <p><a href=\"javascript:$.layerAlertClose();\" ><span>닫기</span></a></p>",
			loadMsg += '</div>',
			loadMsg += '</div>';
		if (curevent != event) {
			isLoadBlock = false;
			curevent = event;
		}
		if (isLoadBlock == false) {
			$(event).attr("style", "position:relative")
			$(event).append(loadMsg);

			isLoadBlock = true;
		}
	}
	var bodyW = $('body').width();
	var elW = $('.popErrorWrap-middle').width();
	if (bodyW <= elW) {
		$('.popErrorWrap-middle').css({
			'width': bodyW - 40 + 'px',
			'margin-left': '-' + (bodyW - 40) / 2 + 'px'
		})
	}
};

var isCommonEvent = false;
var isOnlyOneLoaded = false;
var bFaqLoaded = false;
var bLibraryLoaded = false;
var cntUserGuide = 0;
var videoTxt = null;

jQuery.extend({

	CommonObj: function() {

		var that = this;
		var $form = null;
		var $body = null;
		// var $body= $('body');

		this.isOverLapClick = false;
		this.ajaxCount = 0;

		this.bShowWatch = false;
		this.views = {};
		this.data = {};
		this.detail = null;
		this.pageReqParams = $.extend(true, {}, pageReqParams);
		this.reqPageDto = null;
		this.consulting = null;

		for (var key in this.pageReqParams) {
			if (this.pageReqParams[key] == null) {
				this.pageReqParams[key] = "";
			}
		}

		this.mapBbsTp = {
			A: 'DX Story',
			B: '영상갤러리',
			C: '컨퍼런스',
			D: '배너관리',
			E: '공지사항',
			F: '신청서/자료실',
			G: 'FAQ',
			H: '언론보도'
		};
		this.mapStickerTp = {
			I: 'Issue',
			T: 'Tech',
			R: 'Report',
			S: 'Success'
		};

		this.fileDownload = function(fileNm) {
			var cfg = {
				action: '/file/download.do',
				id: 'fileDownloadPage',
				name: 'fileDownloadPage',
				method: 'post',
				target: 'frmFileDownload'
			};
			this.createForm(cfg);
			this.attachHiddenElement("fileNm", fileNm);
			this.formSubmit();
		};
		this.getBbsTpNm = function(bbsTp) {
			return this.mapBbsTp[bbsTp]
		};
		this.getStickerTpNm = function(stickerTp) {
			return this.mapStickerTp[stickerTp]
		};
		this.getHashtagHtml = function(arrHashTag, bbsTp, sHtml) {
			var tplHtml = (typeof (sHtml) == 'undefined') ? '<a href="#" title="#hashTag#" bbsTp="'+ bbsTp +'" data-link-hashtag="#hashTag#">#hashTag#</a>' : sHtml;
			tplHtml += '';
			var rtnHtml = []
			arrHashTag.forEach(function(item) {
				rtnHtml.push(tplHtml.replaceAll('#hashTag#', item));
			});
			return rtnHtml.join('');
		};
		this.getProdInfo = function(item) {
			var rtnProdInfo = [];
			if (item.arrCtgryCd.length > 0 && item.arrCtgryCd[0] != "") {
				item.arrCtgryCd.forEach(function(data, i) {
					rtnProdInfo.push({ ctgryCd: data, ctgryNm: item.arrCtgryNm[i] });
				});
			}
			return rtnProdInfo;
		};
		this.getPsLv2ProdCtgryInfo = function(ctgryCd) {
			var _this = this;
			var prodCtgryInfo = this.data.prodCtgry.filter(function(item) {
				return (item.ctgryCd == ctgryCd);
			});
			return this.data.prodCtgry.filter(function(item) {
				return (item.ctgryCd == prodCtgryInfo[0].psCtgryCd);
			})[0];
		};
		this.getBedgeProdInfo = function(bbsDto) {
			var rtnInfo = { ctgryCd: '', ctgryNm: '' };
			if (bbsDto.shortTitle != '') {
				var prodCtgryInfo = this.data.prodCtgry.filter(function(item) {
					return (item.ctgryCd == bbsDto.shortTitle);
				});
				if (prodCtgryInfo.length > 0) {
					rtnInfo = { ctgryCd: prodCtgryInfo[0].ctgryCd, ctgryNm: prodCtgryInfo[0].ctgryNm };
				}
			} else if (bbsDto.listBbsProdCtgryDto.length > 0) {
				var prodCtgryInfo = this.data.prodCtgry.filter(function(item) {
					return (item.lvl == 2 && item.gCtgryCd + '_' + item.lCtgryCd == bbsDto.listBbsProdCtgryDto[0].ctgryCd.left(5));
				});
				if (prodCtgryInfo.length > 0) {
					rtnInfo = { ctgryCd: prodCtgryInfo[0].ctgryCd, ctgryNm: prodCtgryInfo[0].ctgryNm };
				}
			}
			return rtnInfo;
		};
		this.addView = function(aView) {
			var _this = this;
			var viewType = $.type(aView);
			if (viewType == 'object' && !$.isEmptyObject(aView)) {
				this.views[aView.id] = aView;
			} else if (viewType == 'array') {
				aView.forEach(function(view) {
					if (!$.isEmptyObject(view)) {
						_this.views[view.id] = view;
					}
				});
			} else {
				$.Utils.alert('addView view is undefined.\naddView argument must be object of array type');
			}
			return this;
		};

		this.initViews = function() {
			var _this = this;
			var bViewsLoaded = false;
			var cntViews = 0;
			var cntLoadedViews = 0;
			for (var key in this.views) {
				cntViews++;
			}
			var intervalStartAfterViewLoaded = setInterval(function() {
				if (cntViews == cntLoadedViews) {
					if (_this.bShowWatch) {
						for (var key in _this.views) {
							_this.watchPanel(_this.views[key]);
						}
					}
					that.eventInit();
					that.onCreate();
					clearInterval(intervalStartAfterViewLoaded);
				}
			}, 500);
			for (var key in this.views) {
				var view = this.views[key];
				if (view.elem.find('select[data-grpcd]').length > 0) {
					view.elem.applyFieldOption(function() {
						view.model.data.init = view.elem.flushPanel();
						cntLoadedViews++;
					});
				} else {
					view.elem.applyFieldOption();
					view.model.data.init = view.elem.flushPanel();
					cntLoadedViews++;
				}
			}
			return this;
		};

		this.watchPanel = function(view) {
			var _this = this;
			$('#' + view.id).find('input,select,textarea').on('change keyup paste', function() {
				view.model.data.flush = view.elem.flushPanel();
				var idDivWatch = view.id + 'Watch';
				if (view.elem.next().attr('id') != idDivWatch && $('#' + idDivWatch).length == 0) {
					view.elem.after('<div id="' + idDivWatch + '"></div>');
				}
				if (view.elem.next().attr('id') == idDivWatch) {
					$('#' + idDivWatch).text(JSON.stringify(view.model.data.flush));
				}
			});
			return this;
		};

		this.clone = function(obj) {
			if (!obj || obj == null) {
				return obj;
			}
			else {
				return JSON.parse(JSON.stringify(obj));
			}
		};

		this.getUrlFromCtgryCd = function(ctgryCd) {
			if (ctgryCd == 'PD_MB_CE_001' || ctgryCd == 'PD_MB_HC_001' || ctgryCd == 'PD_MB_LS_001' || ctgryCd == 'PD_MB_SF_SM' || ctgryCd == 'PD_MB_SF_001' || ctgryCd == 'PD_MB_SF_002'
				|| ctgryCd == 'PD_MB_AR_SM' || ctgryCd == 'PD_MB_AR_001' || ctgryCd == 'PD_MB_AR_002' || ctgryCd == 'PD_MB_AR_003' || ctgryCd == 'PD_MB_AR_004') {
				ctgryCd = 'PD_FG' + ctgryCd.substring(5);
			}
			return '/' + ctgryCd.substring(0, 2).toLowerCase() + '/P_' + ctgryCd + '.do';
		}

		this.goPage = function(url, params, aCfg) {
			var cfg = {
				action: url,
				id: 'formMovePage',
				name: 'formMovePage',
				method: 'get',
				target: '_self'
			};
			if (typeof (aCfg) != 'undefined') {
				$.extend(true, cfg, aCfg);
			}
			this.createForm(cfg);
			if (typeof (params) != 'undefined') {
				for (var key in params) {
					this.attachHiddenElement(key, params[key]);
				}
			}
			this.formSubmit();
		};

		this.animateList = function(jqElem) {
			var normalItemLen = jqElem.parents('.j_bnr_list').find('>ul>li').not('.j_bnr_item').length,
				onItemLen = jqElem.parents('.j_bnr_list').find('.j_bnr_item').length;
			jqElem.parents('.j_bnr_list').find('.j_bnr_item').each(function() {
				var _this = $(this);
				setTimeout(function() {
					_this.parents('.j_bnr_list').find('.j_bnr_item').eq(_this.index() - normalItemLen).addClass('on');
					if (_this.index() - normalItemLen == onItemLen - 1) {
						_this.parents('.j_bnr_list').find('.j_bnr_item').removeClass('j_bnr_item');
					}
				}, (_this.index() - normalItemLen) * 300);
			});
		};
		this.animateList2 = function(jqElem) {
			var normalItemLen = jqElem.parents('.j_bnr_list').find('>ul>li').not('.j_bnr_item').length,
				onItemLen = jqElem.parents('.j_bnr_list').find('.j_bnr_item').length;
			jqElem.parents('.j_bnr_list').find('.j_bnr_item').each(function() {
				var _this = $(this);
				_this.parents('.j_bnr_list').find('.j_bnr_item').eq(_this.index() - normalItemLen).css({
					"opacity" : 1,
					"animation" : "none"
				}).addClass('on');
				_this.removeClass("j_bnr_list");
			});
		};

		this.createForm = function(cfg) {
			if (!that.$form) {
				that.$form = $('<form></form>');
			}
			that.$form.empty();

			if (cfg.id != undefined) {
				that.$form.attr('id', cfg.id);
			}
			if (cfg.name != undefined) {
				that.$form.attr('name', cfg.name);
			}
			that.$form.attr('method', cfg.method || 'post');
			that.$form.attr('action', cfg.action || '');
			that.$form.attr('target', cfg.target || '_self');
			that.$body.append(that.$form);

			return that.$form;
		};

		this.attachHiddenElement = function(name, value) {
			if (!that.$form) {
				alert('createForm() must be called');
				return;
			}

			var $hdnEl = $('<input type="hidden"></input>');
			$hdnEl.attr('name', name);
			$hdnEl.attr('value', value);
			that.$form.append($hdnEl);
		};

		this.formSerialize = function() {
			if (that.$form) {
				return that.$form.serialize();
			}
		};

		this.formSubmit = function() {
			if (that.$form) {
				that.$form.submit();
			}
		};

		this.setSerializedFormData = function(param) {
			var resultStr = '';
			if (Object.prototype.toString.call(param) === '[object Object]') {
				var encodedParam = '';
				for (var p in param) {
					if (param.hasOwnProperty(p)) {
						encodedParam = param[p];
						if (typeof encodedParam == 'string') {
							//							encodedParam = encodedParam.replace(/\%/gm,'%25').replace(/\&/gm, '%26').replace(/\+/gm, '%2B');
							encodedParam = encodedParam.replace(/\&/gm, '%26').replace(/\+/gm, '%2B');
						}
						var $hdnEl = $('<input type="hidden"></input>');
						$hdnEl.attr('name', p);
						$hdnEl.attr('value', encodedParam);
						that.$form.append($hdnEl);
					}
				}
			}
			return resultStr;
		};

		this.getSerializedData = function(param) {
			var resultStr = '';
			if (Object.prototype.toString.call(param) === '[object Object]') {
				var arr = [];
				var encodedParam = '';
				for (var p in param) {
					if (param.hasOwnProperty(p)) {
						encodedParam = param[p];
						if (typeof encodedParam == 'string') {
							//							encodedParam = encodedParam.replace(/\%/gm,'%25').replace(/\&/gm, '%26').replace(/\+/gm, '%2B').replace(/\?/gm, '%3F');
							encodedParam = encodedParam.replace(/\&/gm, '%26').replace(/\+/gm, '%2B').replace(/\?/gm, '%3F');
						}
						arr.push(p + '=' + encodedParam);
					}
				}
				resultStr = arr.join('&');
			} else if ($.isArray(param)) {
				resultStr = param.join('&');
			}
			//return resultStr;
			//2020-01-03 encodeURI 수정 처리
			return encodeURI(resultStr);
		};

		this.getSerializedFormData = function($formObj) {
			var resultStr = '';
			var arr = [];
			if ($formObj != null && $formObj != "") {
				$($formObj).find("input").each(function() {
					if ($(this).attr("name") != null) {
						arr.push($(this).attr("name") + '=' + $(this).val());
					}
				});
			}
			resultStr = arr.join('&');
			//return resultStr;
			//2020-01-03 encodeURI 수정 처리
			return encodeURI(resultStr)
		};

		this.getUrlToSubmitPost = function(url, target) {
			if (url == null) {
				return;
			}

			var param = "";
			if (url.indexOf("?") > -1) {
				param = url.substring(url.indexOf("?") + 1, url.length);
				url = url.substring(0, url.indexOf("?"));

				if (target == null) {
					target = "_self";
				}

				$.loadBlock(null, "처리중입니다.");
				isLoadBlock = true;

				var fmOption = {
					"id": "postSbumit",
					"name": "postSbumit",
					"target": target,
					"action": url
				}
				that.createForm(fmOption);

				var paramList = param.split("&");

				for (var i = 0; i < paramList.length; i++) {
					var paramObj = paramList[i].split("=");
					var paramNm = paramObj[0];
					var paramValue = "";
					if (paramObj.length == 2) {
						paramValue = paramObj[1];
					}
					// 암호화된 get Url인코딩 되어있는거 푼다.
					if (typeof paramValue == 'string') {
						paramValue = paramValue.replace(/\&/gm, '%26').replace(/\+/gm, '%2B').replace(/\?/gm, '%3F');
					}
					that.attachHiddenElement(paramNm, decodeURIComponent(paramValue));

				}
				that.formSubmit();
			} else {
				location.href = url;
			}

		};

		this.ajaxSendCall = function(url, data, successFunc, cfg) {
			var config = {
				url: url,
				type: "post",
				dataType: "json",
				data: data,
				successCall: successFunc
			};
			if (typeof (cfg) != "undefined") {
				$.extend(true, config, cfg);
			}
			this.ajaxSend(config);
		};

		this.ajaxSend = function(cfg) {

			if (cfg.isOverLap == undefined) {
				cfg.isOverLap = true;
			}

			if (cfg.isBlock == undefined) {
				cfg.isBlock = false;
			}

			if (cfg.isBlock) {
				$.loadBlock(cfg.isBlockTarget);
			}

			if (that.isOverLapClick) {
				alert("잠시만 기다려주세요.");
				return;
			}

			if (cfg.isOverLap == false) {
				that.isOverLapClick = true;
			}
			that.ajaxCount++;

			$.ajax({
				url: cfg.url,
				data: cfg.data,
				type: (cfg.method == undefined) ? 'post' : cfg.method,
				contentType: (cfg.contentType == undefined) ? 'application/x-www-form-urlencoded;charset=UTF-8' : cfg.contentType,
				cache: false,
				dataType: cfg.dataType,
				async: (cfg.async == undefined) ? true : cfg.async,
				timeout: (cfg.timeout == undefined) ? 60000 : cfg.timeout,
				isBlock: (cfg.isBlock == undefined) ? true : cfg.isBlock,
				isBlockTarget: (cfg.isBlockTarget == undefined) ? null : cfg.isBlockTarget,
				errorCall: (cfg.errorCall == undefined) ? function() { } : cfg.errorCall,
				error: function(e, status, exception) {

					that.ajaxCount--;
					that.isOverLapClick = false;

					if (this.isBlockTarget != null) {
						$.loadUnBlock(this.isBlockTarget);
					}
					if (that.ajaxCount == 0) {
						$.loadUnBlock();
					}

					var data = null;
					try {
						data = $.parseJSON(e.responseText);
					} catch (e) {
						console.error(e.message, e.name);
					}

					if (data != null) {
						if (data.RES.returnCode == "02") {		//02 실패
							var msg = data.RES.returnMsg;
							var rUrl = data.RES.returnUrl;
							alert(msg.replace(/\\n/g, "\n").replace(/\\\n/g, "\n"));

							if (rUrl != "null" && $.trim(rUrl).length > 0) {

								if (rUrl == 'HISTORYBACK') {
									history.go(-1);
									return;
								} else if (rUrl == 'SELFCLOSE') {
									window.parent.lyPop.close();
									return;
								}
								//								alert("ajax URL이동 실행");
								top.location.href = rUrl;
							}
							if (cfg.errorCall != undefined) {
								cfg.errorCall(data);
							}
							return;
						} else if (data.RES.returnCode == "06") { // 06 에러공지
							var msg = data.RES.returnMsg;
							$.layerError(msg);
							return;
						} else if (data.RES.returnCode == "08") { // 08 접근권한
							var msg = data.RES.returnMsg;
							$.layerAlert(cfg.isBlockTarget, msg);
							return;

						}
					}

					if (cfg.errorCall != undefined) {
						cfg.errorCall(e);
						return;
					}

					// error code : 0 ==> timeout
					// error code : 500 ==> internal server
					// error
					var errorMsg = '';
					if (e.status == '0') {
						errorMsg = '네트워크 에러입니다. 통신연결 상태를 확인하세요';
					} else {
						errorMsg = '서버 에러입니다. 관리자에게 문의해 주시기 바랍니다.';
					}
					alert(errorMsg);

				}, success: function(data) {

					that.ajaxCount--;
					that.isOverLapClick = false;

					if (this.isBlockTarget != null) {
						$.loadUnBlock(this.isBlockTarget);
					}
					if (that.ajaxCount == 0) {
						$.loadUnBlock();
					}

					// adobe 통계적재 관련 함수 call 
					try {
						callAdobeStatistics(cfg.url, cfg.data);
					} catch (e) {
						console.error(e.message, e.name);
					}
					if (this.dataType == 'html') {
						cfg.successCall(data);
						return;
					}

					// so 통계적재 관련 함수 call 
					try {
						if (typeof data.ajaxSoProcStatistics != "undefined" && data.ajaxSoProcStatistics == "Y") {
							callSoStatistics(data);
						}
					} catch (e) {
						console.error(e.message, e.name);
					}

					if (typeof data.RES == "undefined") {
						alert("알수없는 오류가 발생 하였습니다.관리자 에게 문의 해주세요");
						return;
					}

					if (data != null) {
						if (data.RES.returnCode == "01") {
							that.reqPageDto = data.reqPageDto;
						} else if (data.RES.returnCode == "02") {		//02 실패
							var msg = data.RES.returnMsg;
							var rUrl = data.RES.returnUrl;

							alert(msg.replace(/\\n/g, "\n").replace(/\\\n/g, "\n"));

							if (rUrl != "null" && $.trim(rUrl).length > 0) {

								if (rUrl == 'HISTORYBACK') {
									history.go(-1);
									return;
								} else if (rUrl == 'SELFCLOSE') {
									window.parent.lyPop.close();
									return;
								}
								//								alert("ajax URL이동 실행");
								top.location.href = rUrl;
							}
							if (cfg.errorCall != undefined) {
								cfg.errorCall(data);
							}
							return;
						} else if (data.RES.returnCode == "06") {  //06 에러공지
							var msg = data.RES.returnMsg;
							$.layerError(msg);
							return;
						} else if (data.RES.returnCode == "08") {  // 08 접근권한
							var msg = data.RES.returnMsg;
							$.layerAlert(cfg.isBlockTarget, msg);
							return;
						}
					}

					cfg.successCall(data);

				}
			});
		};

		this.onCreate = function() {
		};

		this.eventInit = function() {
		};

		this.setCtgryInfo = function(ctgryCd) {
			var rtnCtgryInfo = {};
			rtnCtgryInfo.sCtgryCd = null;
			rtnCtgryInfo.mCtgryCd = null;
			rtnCtgryInfo.lCtgryCd = null;
			rtnCtgryInfo.gCtgryCd = null;
			var arrCtgry = this.data.prodCtgry.filter(function(item) {
				return item.ctgryCd == ctgryCd;
			})[0];
			if (arrCtgry.lvl == '4') {
				rtnCtgryInfo.sCtgryCd = arrCtgry.ctgryCd;
				rtnCtgryInfo.mCtgryCd = arrCtgry.psCtgryCd;
				var arrMCtgry = this.data.prodCtgry.filter(function(item) {
					return item.ctgryCd == rtnCtgryInfo.mCtgryCd;
				})[0];
				rtnCtgryInfo.lCtgryCd = arrMCtgry.psCtgryCd;
				var arrLCtgry = this.data.prodCtgry.filter(function(item) {
					return item.ctgryCd == rtnCtgryInfo.lCtgryCd;
				})[0];
				rtnCtgryInfo.gCtgryCd = arrLCtgry.psCtgryCd;
			} else if (arrCtgry.lvl == '3') {
				rtnCtgryInfo.sCtgryCd = null;
				var arrMCtgry = this.data.prodCtgry.filter(function(item) {
					return item.ctgryCd == ctgryCd;
				})[0];
				rtnCtgryInfo.mCtgryCd = arrMCtgry.ctgryCd;
				rtnCtgryInfo.lCtgryCd = arrMCtgry.psCtgryCd;
				var arrLCtgry = this.data.prodCtgry.filter(function(item) {
					return item.ctgryCd == rtnCtgryInfo.lCtgryCd;
				})[0];
				rtnCtgryInfo.gCtgryCd = arrLCtgry.psCtgryCd;
			} else if (arrCtgry.lvl == '2') {
				rtnCtgryInfo.sCtgryCd = null;
				rtnCtgryInfo.mCtgryCd = null;
				var arrLCtgry = this.data.prodCtgry.filter(function(item) {
					return item.ctgryCd == ctgryCd;
				})[0];
				rtnCtgryInfo.lCtgryCd = arrLCtgry.ctgryCd;
				rtnCtgryInfo.gCtgryCd = arrLCtgry.psCtgryCd;
			} else if (arrCtgry.lvl == '1') {
				rtnCtgryInfo.sCtgryCd = null;
				rtnCtgryInfo.mCtgryCd = null;
				rtnCtgryInfo.lCtgryCd = null;
				rtnCtgryInfo.gCtgryCd = ctgryCd;
			}
			if (rtnCtgryInfo.gCtgryCd != null) rtnCtgryInfo.gCtgryCd = rtnCtgryInfo.gCtgryCd.left(2);
			if (rtnCtgryInfo.lCtgryCd != null) rtnCtgryInfo.lCtgryCd = rtnCtgryInfo.lCtgryCd.left(5);
			if (rtnCtgryInfo.mCtgryCd != null) rtnCtgryInfo.mCtgryCd = rtnCtgryInfo.mCtgryCd.left(8);
			return rtnCtgryInfo;
		};

		this.enterToBr = function(str) {
			var strReturn = "";
			strReturn = str.replace(/\n/g, "<br>").replace(/\\n/g, "<br>");
			return strReturn;
		};

		// null check
		this.nvl = function(s, s2) {
			var retStr = "";
			s = $.trim(s);
			if (s != null && s !== "") {
				retStr = s;
			} else {
				retStr = s2;
			}

			return retStr;
		};

		this.dispDlFile = function() {
			var _this = this;
			var sName = location.pathname.substring(6);
			if (sName.substring(0, 5) == 'PD_FG') {
				sName = 'PD_MB' + sName.substring(5);	/* 5G 페이지의 경우 모바일로 변경 */
			}
			var i = sName.lastIndexOf('.');
			sName = sName.substring(0, i);

			if ($('*[data-wrap-library]').length > 0 && (sName != "" /*메인은 거른다 */)) {
				// 3. 리스트 확인
				var params = { ctgryCd: sName };
				this.ajaxSendCall('/bbs/listDlFile.json', params, function(result) {
					if (result.RES.returnCode == '01') {
						// 4. 페이지 샘플 보고 모바일, PC 따로 뿌리기
						var list = result.listInsight;
						cntUserGuide += list.length;
						bLibraryLoaded = true;
						if (list.length > 0) {
							_this.dispDlFilePc(list);
							_this.dispDlFileMb(list);
						} else {
							$('*[data-wrap-library]').remove();
						}
					}
				});
			} else {
				bLibraryLoaded = true;
			}
		};

		this.dispDlFilePc = function(list) {
			var _this = this;
			var iCnt = list.length > 3 ? 4 : list.length;
			// 라이브러리
			$('.kt_pc div[data-wrap-library]').empty();
			$('.kt_pc div[data-wrap-library]').append('<div class="pc_library"></div>');
			var elemList = $('.kt_pc div[data-wrap-library] .pc_library');
			var html = [];
			list.forEach(function(item) {
				item = _this.removeScript(item);
				html.push('<div>');
				html.push('    <div class="' + item.imgFg + '"><a href="#" title="다운받기" data-file-download-no="' + item.fileNm + '" id="' + item.fileExt.toLowerCase() + '"><span class="link_data">');
				var fileDispNm = '';
				if (item.imgFgNm.indexOf("|") > -1) {
					fileDispNm = item.imgFgNm.split("|");
					html.push('        <span>' + fileDispNm[0] + '</span>');
					html.push('        <span>' + fileDispNm[1] + '</span>');
				} else {
					html.push('        <span>' + item.imgFgNm + '</span>');
				}
				html.push('    </span></a></div>');
				html.push('</div>');
			});
			elemList.append(html.join(''));
			/*
			elemList.attr('data-slick', '{"slidesToShow": ' + iCnt + ', "slidesToScroll": 1}');
			elemList.slick({
				slidesToShow: iCnt,
				slidesToScroll: 1
			});
			*/
		};

		this.dispDlFileMb = function(list) {
			var _this = this;
			var elemList = $('.kt_mb div[data-wrap-library] .mo_library');
			elemList.empty();
			var html = [];
			list.forEach(function(item) {
				item = _this.removeScript(item);
				html.push('<div>');
				html.push('    <div class="' + item.imgFg + '"><a href="#" title="다운받기" data-file-download-no="' + item.fileNm + '" id="' + item.fileExt.toLowerCase() + '_m"><span class="link_data">');
				var fileDispNm = '';
				if (item.imgFgNm.indexOf("|") > -1) {
					fileDispNm = item.imgFgNm.split("|");
					html.push('        <span>' + fileDispNm[0] + '</span>');
					html.push('        <span>' + fileDispNm[1] + '</span>');
				} else {
					html.push('        <span>' + item.imgFgNm + '</span>');
				}
				html.push('    </span></a></div>');
				html.push('</div>');
			});

			elemList.append(html.join(''));
		};


		this.dispCtgryFaq = function() {
			var _this = this;
			var sName = location.pathname.substring(6);
			if (sName.substring(0, 5) == 'PD_FG') {
				sName = 'PD_MB' + sName.substring(5);	/* 5G 페이지의 경우 모바일로 변경 */
			}
			var i = sName.lastIndexOf('.');
			sName = sName.substring(0, i);
			if ($('div[data-wrap-faq]').length > 0 && (sName != "")) {
				// 3. 리스트 확인
				var params = { ctgryCd: sName };
				this.ajaxSendCall('/bbs/listCtgryFaq.json', params, function(result) {

					if (result.RES.returnCode == '01') {
						// 4. 페이지 샘플 보고 모바일, PC 따로 뿌리기
						var list = result.listCtgryFaq;
						cntUserGuide += list.length;
						bFaqLoaded = true;
						if (list.length > 0) {
							_this.dispCtgryFaqPc(list);
							_this.dispCtgryFaqMb(list);
							$('div[data-wrap-faq] a.btn_more').attr('data-faq-more', sName);
						} else {
							$('*[data-wrap-faq]').remove();
						}
					}
				});
			} else {
				bFaqLoaded = true;
			}
		};

		this.dispCtgryFaqPc = function(list) {
			var _this = this;
			var elemList = $('.kt_pc div[data-wrap-faq] ul');
			elemList.empty();
			var html = [];
			list.forEach(function(item, i) {
				item = _this.removeScript(item);
				if (i < 5) {
					html.push('<li>');
					html.push('    <a href="javascript:void(0)" title="열림"><span>Q</span>' + item.title + '</a>');
					html.push('    <div class="faq_view">');
					html.push('        <span>A</span>' + item.content);
					html.push('    </div>');
					html.push('</li>');
				}
			});

			elemList.append(html.join(''));
		};

		this.dispCtgryFaqMb = function(list) {
			var _this = this;
			var elemList = $('.kt_mb div[data-wrap-faq] ul');
			elemList.empty();
			var html = [];
			list.forEach(function(item, i) {
				item = _this.removeScript(item);
				if (i < 5) {
					html.push('<li>');
					html.push('    <a href="javascript:void(0)" title="열림"><span>Q</span>' + item.title + '</a>');
					html.push('    <div class="faq_view">');
					html.push('        <span>A</span>' + item.content + '</div>');
					html.push('</li>');
				}
			});


			elemList.append(html.join(''));
		};



		this.dispInsight = function() {
			var _this = this;
			var sName = location.pathname.substring(6);
			if (sName.substring(0, 5) == 'PD_FG') {
				sName = 'PD_MB' + sName.substring(5);	/* 5G 페이지의 경우 모바일로 변경(5G가 모바일 하위 메뉴로 들어가면서 변경 */
			}
			var i = sName.lastIndexOf('.');
			sName = sName.substring(0, i);

			if ($('.section_insight').length > 0 && (sName != "")) {
				// 3. 리스트 확인
				var params = { ctgryCd: sName };
				this.ajaxSendCall('/bbs/listInsight.json', params, function(result) {

					if (result.RES.returnCode == '01') {
						// 4. 페이지 샘플 보고 모바일, PC 따로 뿌리기
						var list = result.listInsight;
						if (list.length > 0) {
							_this.dispInsightPc(list);
							_this.dispInsightMb(list);
						} else {
							$('*[data-wrap-insight]').remove();
						}
					}
				});
			}
		};



		this.dispInsightPc = function(list) {
			var _this = this;
			var elemList = $('.kt_pc .section_insight ul');
			elemList.empty();
			var html = [];
			list.forEach(function(item, i) {
				item = _this.removeScript(item);
				var imgLoc = (item.arrTotFileLoc.length > 0) ? item.arrTotFileLoc[0] : '';
				var dataLinkPage = JSON.stringify({ url: '/bt/P_BT_TI_VW_001.do', bbsId: item.bbsId, bbsTp: 'A' });
				html.push('<li>');
				html.push('    <div class="bnr_thum">');
				html.push('        <a href="#" data-link-page=' + dataLinkPage + ' title="'+ item.title +'"><img src="' + imgLoc + '" alt="'+ item.title +'"></a>');
				html.push('        <p class="badge"><a href="#" class="bg_red" data-link-sticker="' + _this.getStickerTpNm(item.stickerTp) + '">' + _this.getStickerTpNm(item.stickerTp) + '</a><a href="#" data-link-prod="' + item.stickerCtgryCd + '">' + item.stickerCtgryNm + '</a></p>');
				html.push('    </div>');
				html.push('    <div class="bnr_info">');
				html.push('        <span>DX Story</span>');
				html.push('        <a href="#" class="bnr_title" data-link-page=' + dataLinkPage + '>' + item.title + '</a>');
				html.push('    </div>');
				html.push('</li>');
			});
			if (list.length%3 == 2) {
				html.push('        <li class="blank_bn_1col">');
				html.push('            <a href="/bt/P_BT_SM.do">');
				html.push('                <div>');
				html.push('                    <p>미래경영을 위한 필수 정보<br><i class="logo"><span class="hidden">kt enterprise</span></i><span class="bz">DX Insight</span></p>');
				html.push('                    <span class="more">자세히 보기<i>></i></span>');
				html.push('                </div>');
				html.push('            </a>');
				html.push('         </li>');

			} else if (list.length%3 == 1) {
				html.push('    	 <li class="blank_bn_2col">');
				html.push('            <a href="/bt/P_BT_SM.do">');
				html.push('                <div>');
				html.push('                    <p><i class="logo"><span class="hidden">kt enterprise</span></i>의새로운 소식과 미래경영을 위한<br>필수 정보를 이제 DX Insight에서 손쉽게 확인하세요.</p>');
				html.push('                    <span class="more">자세히 보기<i>></i></span>');
				html.push('                </div>');
				html.push('            </a>');
				html.push('        </li>');
			}

			elemList.append(html.join(''));
		};

		this.dispInsightMb = function(list) {
			var _this = this;
			var elemList = $('.kt_mb .section_insight .cont');
			elemList.empty();
			var html = [];
			html.push('<div class="banner_list height675 mb_insight">');
			list.forEach(function(item) {
				item = _this.removeScript(item);
				var imgLoc = (item.arrTotFileLoc.length > 0) ? item.arrTotFileLoc[0] : '';
				var dataLinkPage = JSON.stringify({ url: '/bt/P_BT_TI_VW_001.do', bbsId: item.bbsId, bbsTp: 'A' });
				html.push('<div>');
				html.push('    <div class="thum">');
				html.push('        <a href="#" data-link-page=' + dataLinkPage + ' title="'+ item.title +'">');
				html.push('        		<img src="' + imgLoc + '" alt="'+ item.title +'">');
				html.push('    	    </a>');
				html.push('    		<p class="badge"><a href="#" class="bg_red" data-link-sticker="' + _this.getStickerTpNm(item.stickerTp) + '">' + _this.getStickerTpNm(item.stickerTp) + '</a><a href="#" data-link-prod="' + item.stickerCtgryCd + '">' + item.stickerCtgryNm + '</a></p>');
				html.push('    </div>');
				html.push('    <div class="thum_txt">');
				html.push('    		<span class="group">DX Story</span>');
				html.push('    		<a class="title" data-link-page=' + dataLinkPage + '>' + item.title + '</a>');
				html.push('    </div>');
				html.push('</div>');
			});
			html.push('</div>');
			elemList.append(html.join(''));
			$('.mb_insight').slick({
				infinite: false
			});
		};


		this.init = function() {
			that.$body = $('body');
			if (this.wrapCls == '.kt_pc') {
				this.ajaxSendCall('/page/getCommonData.json', {}, function(result) {
					if (result.RES.returnCode == '01') {
						if (result.videoTxt != null && result.videoTxt.length > 0) {
							videoTxt = result.videoTxt;	//영상 대본 데이터 저장
						}
						that.data.prodCtgry = that.clone(result.listProdCtgry);
						that.data.comnCd = that.clone(result.comnCd);
						that.initAfter();
					}
				}, { async: false });
			}

			if (this.wrapCls == '.kt_mb') {
				var intervalMController = setInterval(function() {
					if (typeof (controller.data.prodCtgry) != 'undefined') {
						clearInterval(intervalMController);
						mController.data.prodCtgry = that.clone(controller.data.prodCtgry);
						mController.data.comnCd = that.clone(controller.data.comnCd);
						mController.initAfter();
					}
				}, 100);
			}
		};

		this.initAfter = function() {
			if (undefined != isCommonEvent && isCommonEvent == false) {
				this.commonEvent();
			}
			if (this.consulting == null) {
				var option = { controller: this, id: 'popupConsulting' }
				this.consulting = new Consulting(option);
			}
			if (!$.isEmptyObject(this.views)) {
				this.initViews();
			} else {
				if (isOnlyOneLoaded == false) {
					Kakao.init("876d9b1cd17bbe2b1a5d4255e91766a8");      // 사용할 앱의 JavaScript 키를 설정(2022.02.10 변경)
				}
				this.eventInit();
				this.onCreate();
				if (isOnlyOneLoaded == false) {
					$('.kt_mb div.search_total, .kt_pc div.search_total').remove();
					isOnlyOneLoaded = true;
					var intervalUserGuide = setInterval(function() {
						if (bFaqLoaded && bLibraryLoaded) {
							clearInterval(intervalUserGuide);
							if (cntUserGuide == 0) {
								$('*[data-wrap-userguide]').remove();
							}
						}
					}, 200);
					this.dispInsight();
					this.dispDlFile();
					this.dispCtgryFaq();
				}
			}

			return this;
		};

		this.popupVgOpen = function(wrapSelector) {
			this.popupOpen();
			$(wrapSelector).show();
		};

		this.popupVgDetail = function(option) {

			var _this = this;
			var wrapSelector = '#popupVideo';

			var params = { bbsId: option.bbsId, bbsTp: 'B' }
			this.ajaxSendCall('/bbs/selBbs.json', params, function(result) {
				if (result.RES.returnCode == '01') {

					_this.popupVgOpen(wrapSelector);

					var detail = _this.removeScript(result.bbsDto);

					var bbsTpNm = _this.getBbsTpNm(detail.bbsTp);
					var bedgeProdInfo = _this.getBedgeProdInfo(detail);
					
					$('#sns_title').val(detail.title);
					var thumbnailNm = detail.arrFileNm;
					detail.arrFileFg.forEach(function(item, i) {
						if (item == 'T') {
							$('#sns_thumbNail').val(thumbnailNm[i]);
						}
					});
					//게시물 정보로 og 태그 정보 변경 저장
					$("meta[property='og\\:title']").attr("content", detail.title);
			        $('#meta_keyword').attr('content', detail.hashTag.replaceAll('#',''));
			        if ($('#sns_thumbNail').val() != null && $('#sns_thumbNail').val() != '') {
			        	var image = "https://enterprise.kt.com/entpf/images/techissue/thumbnail/" + $('#sns_thumbNail').val();
			        	$("meta[property='og\\:image']").attr("content", image);
					}
			        
					// 제목
					$(wrapSelector + ' .layer_tit h3').text(detail.title);
					
					// 등록일자
					var regDt = new $.Utils.datetime(detail.regDttm).getDate('yyyy.mm.dd');
                    $(wrapSelector + ' .s_date').text("등록일자 : " + regDt);
					
					// 동영상
					$(wrapSelector + ' .bnr_thum').empty();
					var htmlMov = [];
					var movLink = detail.movLink;
					if (movLink.toLowerCase().indexOf('youtube.com') > -1) {			// 유투브 동영상
						var sUrl = movLink.replace('watch?v=', 'embed/');
						htmlMov.push('<div class="thum">');
						htmlMov.push('    <iframe width="100%" height="100%" src="' + sUrl + '?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="'+ detail.title +'"></iframe>');
						htmlMov.push('</div>');
						$(wrapSelector + ' .bnr_thum').append(htmlMov.join(''));
					} else {
						alert('동영상 링크가 유효하지 않습니다.');
					}
					// bedge
					var htmlBedge = [];
					htmlBedge.push('<p class="badge">');
					if (detail.stickerTp != '') {
						htmlBedge.push('    <a href="#" title="" class="bg_red" data-link-sticker="' + _this.getStickerTpNm(detail.stickerTp) + '">' + _this.getStickerTpNm(detail.stickerTp) + '</a>');
					}
					if (bedgeProdInfo != null) {
						htmlBedge.push('    <a href="#" title="" data-link-prod="' + bedgeProdInfo.ctgryCd + '">' + bedgeProdInfo.ctgryNm + '</a>');
					}
					htmlBedge.push('</p>');
					$(wrapSelector + ' .bnr_thum').append(htmlBedge.join(''));
					//hashtag
					if (detail.arrHashTag.length > 0) {
						htmlHashtag = [];
						htmlHashtag.push(_this.getHashtagHtml(detail.arrHashTag, detail.bbsTp));
						$(wrapSelector + ' .hash_tag').html(htmlHashtag.join(''));
						$(wrapSelector + ' .hash_tag').show();
					} else {
						$(wrapSelector + ' .hash_tag').hide();
					}
					
					//영상 갤러리 자막 영역 추가
					$("#popupVideo .layer_wrap .layer_conts .video_txt").hide();
					if (videoTxt != null) {
						for (var t=0; t<videoTxt.length; t++){
							if (videoTxt[t].name.split(".")[0] == detail.bbsId) {
								$("#popupVideo .layer_wrap .layer_conts .video_txt").show();
								$("#popupVideo .layer_wrap .layer_conts .video_txt").html(videoTxt[t].txt);
								break;
							} else {
								$("#popupVideo .layer_wrap .layer_conts .video_txt").hide();
							}
						}
					} else {
						$("#popupVideo .layer_wrap .layer_conts .video_txt").hide();
					}
				}
			});

		};

		this.popupOpen = function() {
			$('.layer_pop').hide();
			$(".dim").show();
		};
		this.popupClose = function() {
			$(".layer_pop").hide();
			$(".dim").hide();
		};
		this.initSfParams = {
			AGREE_YN: "N",
			AGREE_MUST: "N",
			CUSTOMERENAME_CORP: "",
			CUSTOMERENAME_NAME: "",
			CUSTOMERMAIL_DOMAIN: "",
			CUSTOMERMAIL_DOMAIN_SELECT: "",
			CUSTOMERMAIL_ID: "",
			CUSTOMERTEL_1: "010",
			CUSTOMERTEL_2: "",
			CUSTOMERTEL_3: "",
			CUSTOMER_INTEREST: ""
		};
		this.setSfParams = function(params) {
			var rtnParams = {};
			rtnParams = $.extend(true, {}, params);
			rtnParams.CUSTOMERTEL = params.CUSTOMERTEL_1 + '-' + params.CUSTOMERTEL_2 + '-' + params.CUSTOMERTEL_3;
			rtnParams.AGREE_YN = '';//( params.AGREE_MUST == 'Y' ) ? 'Y' : 'N';
			if (params.CUSTOMERMAIL_DOMAIN_SELECT == '직접입력') {
				rtnParams.CUSTOMERMAIL = params.CUSTOMERMAIL_ID + '@' + params.CUSTOMERMAIL_DOMAIN;
			} else {
				rtnParams.CUSTOMERMAIL = params.CUSTOMERMAIL_ID + '@' + params.CUSTOMERMAIL_DOMAIN_SELECT;
			}
			for (var key in rtnParams) {
				if (
					key == 'CUSTOMERTEL_1'
					|| key == 'CUSTOMERTEL_2'
					|| key == 'CUSTOMERTEL_3'
					|| key == 'CUSTOMERMAIL_ID'
					|| key == 'CUSTOMERMAIL_DOMAIN_SELECT'
				) {
					delete rtnParams[key];
				} else {
					//                    rtnParams[key] = encodeURI(rtnParams[key]);
					rtnParams[key] = rtnParams[key];
				}
			}
			return rtnParams;
		};
		this.salesForceSend = function(params, cmd) {
			var sfUrl = 'https://go.pardot.com/l/900091/2020-11-19/23wd';   // default 다운로드
			if (cmd == 'appl') { // 신청일때 분기
				sfUrl = 'https://go.pardot.com/l/900091/2020-11-23/25nz';
			}
			var cfg = {
				action: sfUrl,
				id: 'salesForceSendPage',
				name: 'salesForceSendPage',
				method: 'post',
				target: 'frmSalesForce'
			};
			this.createForm(cfg);
			for (var key in params) {
				this.attachHiddenElement(key, params[key]);
			}
			this.formSubmit();
		};

		this.removeScript = function(obj) {
			if (typeof (obj) == 'object') {
				for (var key in obj) {
					if (typeof (obj[key]) == 'string') {
						obj[key] = obj[key].removeScript();
					} else if (typeof (obj[key]) == 'object') {
						obj[key] = this.removeScript(obj[key]);
					}
				}
			}
			return obj;
		};

		this.getWrap = function() {
			return this.wrapCls;
		};
		this.getController = function() {
			return ($('.kt_pc').css('display') == 'block') ? controller : mController;
		};

		// 공통 이벤트 바인딩
		this.commonEvent = function() {

			var _this = this.getController();
			var title = $("meta[property='og\\:title']").attr("content");
			var meta_description = $('#meta_description').attr('content');
			var imgUrl = null;
			
			isCommonEvent = true;

			$(document).on('click', 'a[kakao-btn-share]', function() {
				// DX Insight의 페이지인지 체크
				if (location.href.indexOf('/bt/') > -1) {
					title = $('#sns_title').val();
					if ($('#sns_thumbNail').val() != null && $('#sns_thumbNail').val() != '') {
						imgUrl = "https://enterprise.kt.com/entpf/images/techissue/thumbnail/" + $('#sns_thumbNail').val();
					} else {
						imgUrl = "https://enterprise.kt.com/resource/images/common/sns_thum.png"   // 썸네일 이미지
					}
				} else {
					imgUrl = "https://enterprise.kt.com/resource/images/common/sns_thum.png"   // 썸네일 이미지
				}
				var linkUrl = window.location.href;
				Kakao.Link.sendDefault({
					objectType: "feed"
					, content: {
						title: title   // 콘텐츠의 타이틀
						, description: meta_description   // 콘텐츠 상세설명
						, imageUrl: imgUrl
						, link: {
							mobileWebUrl: linkUrl   // 모바일 카카오톡에서 사용하는 웹 링크 URL
							, webUrl: linkUrl // PC버전 카카오톡에서 사용하는 웹 링크 URL
						}
					}
					, social: {
						likeCount: 0       // LIKE 개수
						, commentCount: 0    // 댓글 개수
						, sharedCount: 0     // 공유 회수
					}
					, buttons: [
						{
							title: "게시글 확인"    // 버튼 제목
							, link: {
								mobileWebUrl: linkUrl   // 모바일 카카오톡에서 사용하는 웹 링크 URL
								, webUrl: linkUrl // PC버전 카카오톡에서 사용하는 웹 링크 URL
							}
						}
					]
				});
			});

			$(document).on('click', 'a[data-faq-more]', function() {
				params = {};
				params.ctgryCd = $(this).attr('data-faq-more');
				_this.goPage('/cs/P_CS_FQ_SC_001.do', params);
			});

			$(document).off('click', 'div[data-wrap-faq] li a').on('click', 'div[data-wrap-faq] li a', function() {
				$(this).closest('li').toggleClass('on').siblings('li').removeClass('on');
			});

			$(document).on('click', 'a[facebook-btn-share]', function() {
				var linkUrl = window.location.href;
				window.open('http://facebook.com/sharer.php?u=' + encodeURIComponent(linkUrl), '', 'width=400,height=600,left=600');
			});

			$(document).on('click', 'a[linkedin-btn-share]', function() {
				var linkUrl = window.location.href;
				window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(linkUrl));
			});

			$(document).on('click', 'a[urlCopy-btn-share]', function() {
				var t = document.createElement("textarea");
				document.body.appendChild(t);
				t.value = "KT Enterprise - " + window.location.href;
				t.select();
				document.execCommand("copy");
				document.body.removeChild(t);
				alert("URL이  클립보드에 복사되었습니다.");
			});

			$(document).on('click', 'a[data-file-download]', function() {
				var fileNm = $(this).attr('data-file-download');
				_this.ajaxSendCall('/file/fileExist.json', { fileNm: fileNm }, function(result) {
					if (result.RES.returnCode == '01' && result.fileExist == true) {
						$('#popupDownload').attr('data-file-name', fileNm);
						_this.popupOpen();
						$('#popupDownload').bindPanel(_this.initSfParams).applyFieldOption().show();
						$('#popupDownload input[name=AGREE_ALL]').prop('checked', false);
						$('#popupDownload input[name=CUSTOMERMAIL_DOMAIN]').focus();
						$('#popupDownload input[name=CUSTOMERENAME_NAME]').timeFocus(100);
					} else {
						alert('해당파일이 존재하지 않습니다.');
					}
				});
			});
			$(document).on('click', '#popupDownload a.confirm', function() {
				if ($('#popupDownload').validateForm()) {
					var params = $('#popupDownload').flushPanel();
					if (params.AGREE_MUST != 'Y') {
						$.Utils.alert('개인정보 수집 및 이용에 동의는 필수 항목 입니다.');
						return;
					}
					var params = _this.setSfParams(params);
					if (!$.Utils.checkEmail(params.CUSTOMERMAIL)) {
						$.Utils.alert('이메일 형식이 올바르지 않습니다..');
						return;
					}
					if (!$.Utils.checkTelNo(params.CUSTOMERTEL)) {
						$.Utils.alert('휴대전화가 올바르지 않습니다..');
						return;
					}
					_this.salesForceSend(params, 'down');
					$('#popupDownload').hide();
					$('#popupDownload').bindPanel(_this.initSfParams)
					_this.popupClose();
					if (typeof ($('#popupDownload').attr('data-file-name')) != 'undefined' && $('#popupNewsletter').attr('data-file-name') != '') {
						if (confirm('해당 파일을 다운로드 받으시겠습니까?')) {
							_this.popupClose();
							_this.fileDownload($('#popupDownload').attr('data-file-name'));
							$('#popupDownload').removeAttr('data-file-name');
						} else {
							_this.popupClose();
							$('#popupDownload').removeAttr('data-file-name');
						}
					} else {
						setTimeout(function() {
							_this.popupClose();
							$('#popupDownload').hide();
							$('#popupDownload').bindPanel(_this.initSfParams)
						}, 500);
					}
				}
			});
			$(document).on('click', '#report_down', function() {
				var bChecked = $(this).is(':checked');
				if (bChecked) {
					$('#popupDownload .agree_box input[type="checkbox"]').prop('checked', true);
				}
			});
			$(document).on('click', 'a[data-file-download-no]', function() {
				var fileNm = $(this).attr('data-file-download-no');
				_this.ajaxSendCall('/file/fileExist.json', { fileNm: fileNm }, function(result) {
					if (result.RES.returnCode == '01' && result.fileExist == true) {
						_this.fileDownload(fileNm);
					} else {
						alert('해당파일이 존재하지 않습니다.');
					}
				});
			});
			$(document).on('click', '#btnFloatinbNewsLetter', function() {
				if ($('#popupNewsletter[data-apply-field-option]').length == 0) {
					$('#popupNewsletter').attr('data-apply-field-option', 'true').applyFieldOption();
				}
				$('#popupNewsletter').bindPanel(_this.initSfParams);
				$('#popupNewsletter input[name=CUSTOMERMAIL_DOMAIN]').focus();
				$('#popupNewsletter input[name=CUSTOMERENAME_NAME]').timeFocus(100);
			});
			$(document).on('click', '#popupNewsletter a.confirm', function() {
				if ($('#popupNewsletter').validateForm()) {
					var params = $('#popupNewsletter').flushPanel();
					params = _this.setSfParams(params);

					if (params.AGREE_MUST != 'Y') {
						$.Utils.alert('개인정보 수집 및 이용 동의는 필수 항목 입니다.');
						return;
					}
					if (!$.Utils.checkEmail(params.CUSTOMERMAIL)) {
						$.Utils.alert('이메일 형식이 올바르지 않습니다..');
						return;
					}
					if (!$.Utils.checkTelNo(params.CUSTOMERTEL)) {
						$.Utils.alert('휴대전화가 올바르지 않습니다..');
						return;
					}

					if (params.CUSTOMER_INTEREST == '') {
						$.Utils.alert('관심분야를 선택하지 않으셨습니다. 최대 3개까지 선택하실수 있습니다..');
						return;
					} else {
						var checkItem = params.CUSTOMER_INTEREST.split(',');
						if (checkItem.length > 3) {
							$.Utils.alert('관심분야는 최대 3개까지 선택하실 수 있습니다..');
							return;
						} else {
							var customersel = ['CUSTOMERSEL_1', 'CUSTOMERSEL_2', 'CUSTOMERSEL_3'];

							for (var i = 0; i < customersel.length; i++) {
								if (checkItem[i]) {
									params[customersel[i]] = checkItem[i];
								} else {
									params[customersel[i]] = '';
								}
							}
						}
					}

					if (confirm('뉴스레터를 신청 하시겠습니까?')) {
						alert('뉴스레터 신청이 접수되었습니다.');
						params = _this.removeScript(params);
						_this.salesForceSend(params, 'appl');
						$('#popupNewsletter').hide();
						$('#popupNewsletter').bindPanel(_this.initSfParams);
						_this.popupClose();
						dataLayer.push ({
                        	'event' : 'ga_enquiry_complete', 		// 신청 완료 시 이벤트 전송
                        	'enquiryType' : '{{뉴스레터 신청}}'               // [신청 유형]
                        	// ex) 1:1 온라인 문의 신청, 컨설팅 신청, 뉴스레터 신청
                        	// 080콜체크인 문의, 모바일용 1:1 문의, AI Robot 컨설팅 신청, 1:1 온라인 문의(newsletter), 온라인 문의_네이버블로그, 온라인 문의_유튜브
                        });
					}
				}
			});
			$(document).off('click', 'li.consulting a').on('click', 'li.consulting a', function() {
				if (_this.consulting == null) {
					var option = { controller: _this, id: 'popupConsulting' }
					_this.consulting = new Consulting(option);
				}
				_this.consulting.open();
			});
			$(document).on('click', 'button[data-btn-search], a[data-btn-search]', function() {
				if (typeof (_this.search) == 'function') {
					_this.search();
				}
				if (typeof (_this.searchM) == 'function') {
					_this.searchM();
				}
			});
			$(document).on('click', 'a[data-popup-link]', function() {
				var link = $(this).attr('data-popup-link');
				if (link != 'undefined' && link != '') {
					new $.Utils.window(link, 'winPopup').open();
				}
			});
			$(document).on('click', 'a[data-paging-move]', function() {
				if (typeof (_this.paging) != 'undefined') {
					var pageNow = $(this).attr('data-paging-move');
					_this.paging.pagenow = pageNow;
					if (typeof (_this.searchPaging) == 'function') {
						_this.searchPaging();
					}
				}
			});
			$(document).on('click', 'a[data-link-prod]', function() {
				params = {};
				params.lCtgryCd = $(this).attr('data-link-prod');
				_this.goPage('/bt/P_BT_SM.do', params);
			});
			$(document).on('click', 'a[data-link-hashtag]', function() {
				var pageUrl = window.location.href;
				/* url 체크하여 전체, DX Story, 영상갤러리 구분 */ 
				var urlChk = null;
				if (pageUrl.indexOf("/bt/") > -1) {
					urlChk = pageUrl.split("/bt/")[1].split(".do")[0];
				} else {
					urlChk = pageUrl.split("enterprise.kt.com/")[1];
				}
				
				params = {};
				params.searchText = $(this).attr('data-link-hashtag');
				if (urlChk == 'P_BT_SM') {							//전체
					_this.goPage('/bt/P_BT_SM.do', params);
				} else if (urlChk == 'P_BT_TI_LT_001' || urlChk == 'P_BT_TI_VW_001') {				//DX Story
					_this.goPage('/bt/P_BT_TI_LT_001.do', params);
				} else if (urlChk == 'P_BT_VG_LT_001') {				//영상갤러리
					_this.goPage('/bt/P_BT_VG_LT_001.do', params);
				} else if (urlChk == 'P_BT_MR_LT_001' || urlChk == 'P_BT_MR_VW_001') {				//영상갤러리
					_this.goPage('/bt/P_BT_MR_LT_001.do', params);
				} else if (urlChk == 'main.jsp') {				//메인페이지에서 클릭했을 때 처리
					if ($(this).attr('bbsTp') == 'A') {												//DX Story
						_this.goPage('/bt/P_BT_TI_LT_001.do', params);
					} else if ($(this).attr('bbsTp') == 'B') {										//영상 갤러리
						_this.goPage('/bt/P_BT_VG_LT_001.do', params);
					} else {
						_this.goPage('/bt/P_BT_SM.do', params);
					}
				} else {												//전체>검색결과페이지
					_this.goPage('/bt/P_BT_SR_001.do', params);
				}
			});
			$(document).on('click', 'a[data-link-page]', function() {
				var linkPage = null;
				try {
					linkPage = JSON.parse($(this).attr('data-link-page'));
				} catch (e) {
					linkPage = { url: $(this).attr('data-link-page') };
				}
				var linkParams = $.extend(true, {}, linkPage);
				delete linkParams.url;
				_this.goPage(linkPage.url, linkParams);
			});
			$(document).on('click', 'a[data-link-page-vg]', function() {
				var option = JSON.parse($(this).attr('data-link-page-vg'));
				if (_this.wrapCls == '.kt_pc') {
					controller.popupVgDetail(option);
				} else {
					mController.popupVgDetail(option);
				}
			});

			// 이미지 오류시 처리
			$(document).on("error", " img", function(e) {
				$(this).unbind('error').attr('src', '/pc/images/common/no-image.jpg');
			});

			// 숫자만 입력가능 (ex: <input type="text" class="onlyNum" />)
			$(document).on("blur", " .onlyNum", function() {
				$(this).val($(this).val().replace(/[^0-9]/gi, ""));
			});

			$(document).on("keypress, keyup", " .onlyNum", function(e) {
				$(this).val($(this).val().replace(/[^0-9]/gi, ""));
			});

			// 숫자만 입력가능 (ex: <input type="text" class="onlyNum" />)
			$(document).on("blur keyup", " .onlyNum2", function() {
				$(this).val($(this).val().replace(/[^0-9\\-]/gi, ""));
			});

			// 영어, 숫자
			$(document).on("blur keyup", " .onlyNumEng", function(event) {
				var pattern = /[^\sa-zA-Z0-9]/g;
				$(this).val($(this).val().replace(pattern, ""));
			});

			// 완성형 한글, 영어 (ex: <input type="text" class="nameRegular"
			$(document).on('blur', " .nameRegular", function() {
				var pattern = /[^\s가-힝a-zA-Z]/g;
				if (pattern.test($(this).val())) {
					alert("완성된 한글, 영어만 입력가능합니다.");
					$(this).val($(this).val().replace(pattern, ""));
					$(this).focus();
				}
			});

			//Disable browser refresh key [F5, Ctrl + F5, Ctrl + R, Shift + Ctrl + R]
            /*$(document).on("keydown", function(e) {
                var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                var event = window.event || e;
                if(event.keyCode == 116 || event.ctrlKey && event.keyCode == 82) {
                    event.keyCode = 0; // ie7,8
                    if(!isFirefox) alert("현재 화면에서는 새로고침을 하실 수 없습니다.");
                    return false;
                }
            });*/

		};

		// 우편번호에 하이픈추가
		this.addHyphenZip = function(zipCode) {
			if (zipCode != undefined && zipCode.length == 6) {
				return zipCode.replace(/(^.{3})(.)/, '$1-$2');
			} else {
				return zipCode;
			}
		};

		this.addCom = function(paramInt) {
			if (isNaN(paramInt)) {
				return 0;
			}
			var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
			var rtnValue = paramInt + ''; // 숫자를 문자열로 변환

			while (reg.test(rtnValue)) {
				rtnValue = rtnValue.replace(reg, '$1,$2');
			}
			return rtnValue;
		};

		// 월의 끝 일자 얻기 (param = yyyyMM)
		this.getEndDate = function(datestr) {
			var yy = Number(datestr.substring(0, 4));
			var mm = Number(datestr.substring(4, 6));
			// 윤년 검증
			var boundDay = "";
			if (mm != 2) {
				var mon = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
				boundDay = mon[mm - 1];
			} else {
				if (yy % 4 == 0 && yy % 100 != 0 || yy % 400 == 0) {
					boundDay = 29;
				} else {
					boundDay = 28;
				}
			}
			return boundDay;
		};


		// 해당 월의 전체 일자 얻기 (param = yyyyMM)
		this.getMonthAllDateArray = function(datestr) {
			var arrayDate = new Array();

			var lastDate = this.getEndDate(datestr);
			lastDate = parseInt(lastDate);
			for (var i = 1; i <= lastDate; i++) {
				arrayDate.push(i);
			}

			return arrayDate;
		};

		this.maskingDisplay = function(name) {

			var oInput = $("input[name=" + name + "]");
			var oInputClass = oInput.attr('class');
			var oInputStyle = oInput.attr('style');
			var oInputTitle = oInput.attr('title');
			var oInputMaxlength = oInput.attr('maxlength');

			oInput.after("<input type='text' id='" + name + "_Display' name='" + name + "_Display' autocomplete='off' /> ");

			var aInput = $("input[name=" + name + "_Display]");
			if (oInputClass != null || oInputClass != undefined) {
				aInput.attr('class', oInputClass);
			}
			if (oInputStyle != null || oInputStyle != undefined) {
				aInput.attr('style', oInputStyle);
			}
			if (oInputTitle != null || oInputTitle != undefined) {
				aInput.attr('title', oInputTitle);
			}
			if (oInputMaxlength != null || oInputMaxlength != undefined) {
				aInput.attr('maxlength', oInputMaxlength);
			}
			oInput.hide();
			aInput.on({ "keyup": this.changeWordHandler, "change": this.changeWordHandler, "blur": this.allMasking2Handler, "click": this.setRightFocusHandler });
		};

		this.changeWordHandler = function() {

			var disp = $(this).attr("name");
			var hid = disp.replace("_Display", "");
			var fDisp = $(this);
			var fHid = $("input[name=" + hid + "]");

			var star = "";

			var lenhidden = fHid.val().length;
			var maskStr = that.getMaskingOnlyNumber(fDisp.val(), lenhidden);
			fDisp.val(maskStr);

			var lendisplay = $(this).val().length;

			if (lendisplay < lenhidden) {
				fHid.val(fHid.val().substring(0, lendisplay));
				$(this).val(fHid.val().substring(0, lendisplay));

			} else if (lendisplay > lenhidden) {
				var lastMaskingPosi = $(this).val().lastIndexOf('*');
				if (lendisplay != 1) {
					if (fHid.val().charAt(lastMaskingPosi + 1) == $(this).val().charAt(lastMaskingPosi + 1)) { // h : 1  d:*9
						fHid.val(fHid.val() + $(this).val().substring(lastMaskingPosi + 2));
					} else {
						fHid.val(fHid.val().substring(0, lastMaskingPosi + 1) + $(this).val().substring(lastMaskingPosi + 1));
					}
				} else {
					fHid.val(fHid.val() + $(this).val().replace(/\*/gi, ''));
				}
			}
			else { //   lendisplay == lenfHid
				if (lendisplay > 0) {
					var lastMaskingPosi = $(this).val().lastIndexOf('*');
					fHid.val(fHid.val().substring(0, lastMaskingPosi + 1) + $(this).val().substring(lastMaskingPosi + 1));
				}
			}

			if (lendisplay > 0) {
				if (lendisplay == 1) {
					star = star + $(this).val().charAt(lendisplay - 1);
				} else {
					star = "";
					for (var i = 0; i < lendisplay - 1; i++) {
						star = star + '*';
					}
					star = star + $(this).val().charAt(lendisplay - 1);
				}
				$(this).val(star);
			}

		};

		this.allMasking2Handler = function() {
			$(this).val($(this).val().trim());
			var lendisplaycardnum = $(this).val().length;
			star = "";
			for (var i = 0; i < lendisplaycardnum; i++) {
				star = star + '*';
			}
			$(this).val(star);
		};

		// 커서를 항상 맨 오른쪽으로 이동시킴.
		this.setRightFocusHandler = function() {
			var pThis = $(this).attr("id");
			var pPos = $(this).val().length;
			if (typeof pThis == "string") {
				lThis = document.getElementById(pThis);
			}
			if (lThis.setSelectionRange) {
				lThis.focus();
				lThis.setSelectionRange(pPos, pPos);
			} else if (lThis.createTextRange) {
				var range = lThis.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pPos);
				range.moveStart('character', pPos);
				range.select();
			}

		};

		// 숫자만 가능하게 * 도 가능
		this.getMaskingOnlyNumber = function(dStr, hStrCnt) {
			var retStr = "";
			for (var i = 0; i < dStr.length; i++) {
				if (dStr.charAt(i) == "*") {
					if (i < hStrCnt) {
						retStr = retStr + dStr.charAt(i);
					}
				} else {
					retStr = retStr + dStr.charAt(i).replace(/[^0-9]/gi, "");
				}
			}
			return retStr;
		};

		this.jsonToXml = function(obj) {
			var xml = [];
			for (var prop in obj) {
				xml.push((obj[prop] instanceof Array) ? '' : '<' + prop + '>');
				if (obj[prop] instanceof Array) {
					// for( var array in obj[prop] ) {
					obj[prop].forEach(function(item) {
						xml.push('<' + prop + '>');
						xml.push(that.jsonToXml(new Object(item)));
						xml.push('</' + prop + '>');
					});
				} else if (typeof (obj[prop]) == 'object') {
					xml.push(that.jsonToXml(new Object(obj[prop])));
				} else {
					xml.push(obj[prop]);
				}
				xml.push((obj[prop] instanceof Array) ? '' : '</' + prop + '>');
			}
			return xml.join('').replace(/<\/?[0-9]{1,}>/g, '');
		}

		this.xmlToJson = function(xml, extended) {

			if (!xml) return {};

			function parseXML(node, simple) {

				if (!node) return null;
				var txt = '', obj = null, att = null;
				var nt = node.nodeType, nn = jsVar(node.localName || node.nodeName);
				var nv = node.text || node.nodeValue || '';

				if (node.childNodes) {
					if (node.childNodes.length > 0) {
						$.each(node.childNodes, function(n, cn) {
							var cnt = cn.nodeType, cnn = jsVar(cn.localName || cn.nodeName);
							var cnv = cn.text || cn.nodeValue || '';
							if (cnt == 8) {
								return;
							} else if (cnt == 3 || cnt == 4 || !cnn) {
								if (cnv.match(/^\s+$/)) {
									return;
								}
								txt += cnv.replace(/^\s+/, '').replace(/\s+$/, '')
							} else {

								obj = obj || {};

								if (obj[cnn]) {

									if (!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
									obj[cnn] = myArr(obj[cnn]);
									obj[cnn][obj[cnn].length] = parseXML(cn, true);
									obj[cnn].length = obj[cnn].length;

								} else {

									obj[cnn] = parseXML(cn);

								}
							}
						});
					} // end if(node.childNodes.length > 0)
				} // end if(node.childNodes)

				if (node.attributes) {
					if (node.attributes.length > 0) {
						att = {}; obj = obj || {};
						$.each(node.attributes, function(a, at) {
							var atn = jsVar(at.name), atv = at.Value;
							att[atn] = atv;
							if (obj[atn]) {
								obj[cnn] = myArr(obj[cnn]);
								obj[atn][obj[atn].length] = atv;
								obj[atn].length = obj[atn].length;
							} else {
								obj[atn] = atv;
							}
						});
					} // end if(node.attributes.length > 0)
				} // end if(node.attributes)

				if (obj) {
					obj = $.extend((txt != '' ? new String(txt) : {}), obj || {});
					txt = (obj.text) ? ([obj.text || '']).concat([txt]) : txt;
					if (txt) obj.text = txt;
					txt = '';
				}

				var out = obj || txt;

				if (extended) {
					if (txt) out = {};
					txt = out.text || txt || '';
					if (txt) out.text = txt;
					if (!simple) out = myArr(out);
				}

				return out;

			}; // end function parseXML(node, simple)

			var jsVar = function(s) { return String(s || '').replace(/-/g, '_'); };

			function isNum(s) {
				var regexp = /^((-)?([0-9]+)(([\.\,]{0,1})([0-9]+))?$)/;
				return (typeof s == 'number') || regexp.test(String((s && typeof s == 'string') ? jQuery.trim(s) : ''));
			};

			var myArr = function(o) {
				if (!$.isArray(o)) o = [o]; o.length = o.length;
				return o;
			};

			if (typeof xml == 'string') xml = that.text2xml(xml);

			if (!xml.nodeType) return;

			if (xml.nodeType == 3 || xml.nodeType == 4) return xml.nodeValue;

			var root = (xml.nodeType == 9) ? xml.documentElement : xml;

			var out = parseXML(root, true);

			xml = null; root = null;

			return out;

		}; // end xmlToJson: funciton(xml, extended)

		this.text2xml = function(str) {
			return $.parseXML(str);
		};

	}
});

/** 왼쪽클릭 방지 */
//개발하기 불편하니 우선 주석
//function clickIE() {
//	if (document.all) {
//		return false;
//	}
//}
//function clickNS(e) {
//	if (document.layers||(document.getElementById&&!document.all)) {
//		if (e.which==2||e.which==3) {
//			return false;
//		}
//	}
//}
//
//if (document.layers) {
//	document.captureEvents(Event.MOUSEDOWN);
//	document.onmousedown=clickNS;
//} else {
//	document.onmouseup=clickNS;
//	document.oncontextmenu=clickIE;
//}
//
//document.oncontextmenu=new Function("return false");
//document.ondragstart=new Function("return false");
//if(document.body){
//	document.body.ondragstart = new Function("return false");
//}
//
//document.onselectstart= new Function("return false");
/** 왼쪽클릭 방지 END */



// 알려드립니다.
function dropDownJs() {
	if (document.getElementById("press_own").style.display == "block") {
		document.getElementById("press_dropdown").style.display = "none";
		document.getElementById("press_icon").src = "/pc/images/btn/btn_down.gif";
		document.getElementById("press_icon").setAttribute("alt", "알림내용 자세히 보기");
	} else {
		document.getElementById("press_dropdown").style.display = "block";
		document.getElementById("press_icon").src = "/pc/images/btn/btn_up.gif";
		document.getElementById("press_icon").setAttribute("alt", "알림내용 닫기");
	}
}


function FuncOnlyNumber(evt) {
	var e = evt;

	if (e == null) { e = window.event; }

	if (e.keyCode == 8 ||
		e.keyCode == 9 ||
		e.keyCode == 13 ||
		e.keyCode == 37 ||
		e.keyCode == 38 ||
		e.keyCode == 39 ||
		e.keyCode == 40 ||
		e.keyCode == 46) { return; }

	var str;
	//	var patt = new RegExp('[0-9]');

	// chrome도 Netsacape로 나온다.
	if (window.netscape || navigator.appName == 'Netscape' || navigator.appName == 'Opera') {
		//str = String.fromCharCode(e.which);
		str = e.which;
		if ((str >= 48 && str <= 57) || (str >= 96 && str <= 105)) {
		} else {
			e.preventDefault();
		}
	} else {
		//str = String.fromCharCode(e.charCode);
		str = e.keyCode;
		if ((str >= 48 && str <= 57) || (str >= 96 && str <= 105)) {

		} else {
			e.preventDefault();
			e.keyCode = 0;
			e.cancelBubble = true;
			e.returnValue = false;
		}
	}
}

function checkLogin(data) {
	try {
		if (data.header.state != 'OK') {
			if (data.header.msgCd == 'REQ_LOGOUT') {
				var logoutUrl = "https://login.kt.com/wamui/ComSSOLogout.do?urlcd=https://" + location.host + "/main.jsp?myollehUrlCd=050GNB080";

				if (data.header.msgDesc1 == "SMART") {
					logoutUrl = "http://login.kt.com/wamui/ComSSOLogout.do?mRt=https://m.kt.com";
				}

				var pageUrl = window.location.href;

				if (window.opener && endsWith(pageUrl, ".pop")) {
					window.opener.location.href = logoutUrl;
					window.close();
				} else if (window.parent && window.parent != window.self) {
					window.parent.location.href = logoutUrl;
				} else {
					window.location.href = logoutUrl;
				}

				return false;
			} else if (data.header.msgCd == 'REQ_LOGIN') {
				var loginUrl = "https://login.kt.com/wamui/AthWeb.do?urlcd=https://mybiz.kt.com/main.jsp";

				var pageUrl = window.location.href;

				if (window.opener && endsWith(pageUrl, ".pop")) {
					window.opener.location.href = loginUrl;
					window.close();
				} else if (window.parent && window.parent != window.self) {
					window.parent.location.href = loginUrl;
				} else {
					window.location.href = loginUrl;
				}

				return false;
			}
		}
	} catch (ex) {
		console.error(ex.message, ex.name);
	}

	return true;
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// 올레닷컴 제공 함수 삭제에 따른 마이올레 내 선언 사용 20141216_lbh
Array.prototype.unique = function() {
	var newArray = [], len = this.length;
	label: for (var i = 0; i < len; i++) {
		for (var j = 0; j < newArray.length; j++)
			if (newArray[j] == this[i]) continue label;
		newArray[newArray.length] = this[i];
	}
	return newArray;
};

Array.prototype.indexOf = function(str) {
	var pos = -1;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == str) {
			pos = i;
			break;
		}
	}
	return pos;
};

/*
desc : null 체크와 길이값 체크
input : 입력한 값
size : 입력한 값의 길이 값
사용 방법
if (isNullAndLen(f.subscriber_no2.value, 3)) {
	alert("no");
}
*/
function isNullAndLen(input, size) {
	if (input == null || input == "") {
		return true;
	} else {
		if (input.length >= size) {
			return false;
		} else {
			return true;
		}
	}
}

function inValidParam(input) {
	if (input == undefined || input == '[object Object]' || input == '') {
		return true;
	}
	return false;
}


function splitComma(str) {
	if (isNaN(str) || str == "") {
		return "";
	} else {
		str = str - 0;
		var txtNumber = String(str);
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var arrNumber = txtNumber.split('.');
		arrNumber[0] += '.';
		do {
			arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
		} while (rxSplit.test(arrNumber[0]));
		if (arrNumber.length > 1) {
			return arrNumber.join('');
		} else {
			return arrNumber[0].split('.')[0];
		}
	}
}

function callAdobeStatistics(locateUri, layerPopParm) {

	var domain = location.host;
	var actionUrl = "/common/AdobeStatisticsProc.do";


	var html = "";
	html += '	<iframe id="adobeStatisticsFrame" name="adobeStatisticsFrame" width="0%"  style="display:none;" title="빈프레임" ></iframe>';

	var $frm = $('<form>', {
		'action': actionUrl,
		'method': 'post',
		'target': 'adobeStatisticsFrame'
	});

	if (layerPopParm != null) { // 파라미터 값
		var paramData;
		try {
			paramData = $.getParams(layerPopParm);
			$.each(paramData, function(n, v) {
				v = decodeURIComponent(v);
				var isPassVal = false;


				if ("adobeStaticsDiv" == n) {
					isPassVal = true;
				} else if ("locateAdobeStaticsDiv" == n) {
					n = locateAdobeStaticsDiv;
				}

				if (isPassVal) {
					$input = $('<input>', { 'type': 'hidden', 'name': n, 'value': v });
					$frm.append($input);
				}
			});
		} catch (e) {

		}
	}
	$input = $('<input>', { 'type': 'hidden', 'name': 'locateUri', 'value': locateUri });
	$frm.append($input);

	$("body").append(html).append($frm);

	$frm.submit().remove();


}

/* 
 * 2017-06-30 JMH 
 * win7 - ie11, winXP - ie8, win10 - edge
 * window.print() 불가로 수정
 * */
function commonPrint() {

	if (document.queryCommandSupported('print')) {
		document.execCommand('print', false, null);
	} else {
		try {
			document.contentWindow.print();
		} catch (e) {
			window.print();
		}
	}
}

/*비동기호출 so 통계처리*/
function callSoStatistics(data) {

	try {
		if (data.soTypeCtgryNm != "") {
			MyPage_DMC(data.soTypeCtgryNm, data.soStatics, data.soAdtnInfo);
		}
	} catch (e) {
	}

}

/* 2021-03-29 : newsletter 팝업을 띄울것인지 여부 - 이영주 */
function isOnNewsLetter() {
	var url = location.href.search(/fromEmail=NewsLetter/);
	var newsletter = $("#popupNewsletter");
	if (url > 0) {
		newsletter.show();
	}
}

$(document).ready(function() {

	$(document).on('click', 'a[href="#"]', function(e) {
		e.preventDefault();
	});
	$.loadInitBlock();
	isOnNewsLetter();//2021-03-29 : newsletter 팝업을 띄울것인지 여부 - 이영주

});
