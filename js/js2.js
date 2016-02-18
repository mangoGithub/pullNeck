

function connectWebViewJavascriptBridge(a) {
	
	if(window.WebViewJavascriptBridge){
		alert(4)
		a(WebViewJavascriptBridge)
	}else{
		document.addEventListener("WebViewJavascriptBridgeReady", function() {
		alert(5)
		a(WebViewJavascriptBridge), is_same = !0, enableShare(),  heightControl(height), $(".share-panel .close-share-panel").addClass("rank-button").html("")
	}, !1)
	}
//	window.WebViewJavascriptBridge ? a(WebViewJavascriptBridge) : document.addEventListener("WebViewJavascriptBridgeReady", function() {
//		alert(4)
//		a(WebViewJavascriptBridge), is_same = !0, enableShare(),  heightControl(height), $(".share-panel .close-share-panel").addClass("rank-button").html("")
//	}, !1)
}

//function connectWebViewJavascriptBridge(callback) {  
//  if (window.WebViewJavascriptBridge) {  
//      callback(WebViewJavascriptBridge)  
//  } else {  
//      document.addEventListener('WebViewJavascriptBridgeReady', function() {  
//          callback(WebViewJavascriptBridge)  
//      }, false)  
//  }  
//}  

//遮罩
function BLACKOUT(a){
	var b = {
		duration: 400,
		easing: "easeOutCubic",
		color: "rgba(0,0,0,0.3)",
		click: !1
	};
	if (void 0 === a) var a = {};
	$.extend(b, a), a = b;
	var c = $("<div class='BLACKOUT'></div>");
	return a.insertBefore ? c.insertBefore(a.insertBefore) : c.appendTo("body"), c.css({
		height: "100%",
		width: "100%",
		position: "fixed",
		"background-color": a.color,
		top: "0",
		bottom: "0",
		left: "0",
		right: "0",
		display: "none"
	}), c.fadeIn(a.duration, a.easing), $("body").css({
		overflow: "hidden"
	}).on("touchmove.handler1", function(a) {
		a.preventDefault()
	}), c.clear = function() {
		c.trigger("clearStart"), c.fadeOut(a.duration, a.easing, function() {
			c.trigger("clearEnd"), c.remove()
		}), $("body").css({
			overflow: "auto"
		}).off("touchmove.handler1")
	}, a.click && c.click(function() {
		return c.clear()
	}), c
}

//
function commitScore() {
	$.ajax({
		url: "" + highRank,
		beforeSend: function(a) {
			a.setRequestHeader("Authorization", "Token " + user_token)
		},
		type: "POST",
		dataType: "json"
	})
}

//页面自适应高度
function heightControl(a) {
	scrollStartValue = a / responsiveScale - 380, $("body").height(a), $(".character-wrapper").css({
		transform: "translate3d(0,0,0) scale(" + responsiveScale + ")"
	})
}

function cssAnimationKicker(a, b, c) {
	a.css(b), setTimeout(function() {
		a.css(c)
	})
}

//更新分数
function rankUpdate() {
	rank = parseInt(-idol.data.y / 3), rankObj.html(rank + " m"), rank > highRank && (highRank = rank, highRankObj.html("best: " + highRank + " m")), rank > rankSingle && (rankSingle = rank);
	money=money*0.01;
}

//单次分数
function showSingleRank() {
	$(".single-rank").html(rankSingle + " m").css({
		opacity: 1
	}), shareEnable && rankSingle == highRank && (is_same && commitScore(), highRank > 10 && (rankSingle = 0, $(".share-button").trigger("touchend"))), rankSingle = 0
}

//隐藏单次分数
function hideSingleRank() {
	$(".single-rank").css({
		opacity: 0
	})
}

//游戏部分
function GAME_START() {
	function a() {
		var a = 0,
			c = 100,
			d = idol.data.y,
			e = 0;
		0 != d && (scrollResetTimer = setInterval(function() {
			return a > c ? (clearInterval(scrollResetTimer), idol.data.y = 0, void idol.css({
				transform: "translate3d(0,0,0)"
			})) : (idol.data.y = $.easing.easeOutElastic(null, a, d, e - d, c), 0 > d && idol.data.y > 0 && (gameover || (gameover = !0, showSingleRank())), a++, b(), void rankUpdate())
		}, 16))
	}

	function b() {
		idol.css({
			transform: "translate3d(0," + idol.data.y + "px,0)",
			transition: "none"
		}), scrollValue = -idol.data.y - scrollStartValue, scrollerWrapper.css(idol.data.y < -scrollStartValue ? {
			transform: "translate3d(0," + scrollValue * responsiveScale + "px,0)",
			transition: "none"
		} : {
			transform: "translate3d(0,0,0)",
			transition: "none"
		}), $(".cloud-wrapper").each(function() {
			var a = $(this).index(),
				b = -Math.round((scrollValue + 80 * a) / height) * height * responsiveScale;
			$(this).css({
				transform: "translate3d(0," + b + "px,0)"
			})
		});
		var a = -idol.data.y,
			b = 0;
		switch (a > 1800 && (b = 1800 - a, a = 1800), characterIndex) {
			case 0:
				scale = a > 0 ? a / 30.5 + 1 : a / 31.5 + 1;
				break;
			case 1:
				scale = a > 0 ? a / 31.5 + 1 : a / 32.5 + 1;
				break;
			case 2:
				scale = a > 0 ? a / 39.5 + 1 : a / 40.5 + 1;
				break;
			case 3:
				scale = a > 0 ? a / 37.5 + 1 : a / 38.5 + 1
		}
		idolBody.css({
			transform: "translate3d(0," + b + "px,0) scaleY(" + scale + ")"
		})
	}
	
	container.on("touchmove.drag mousemove.drag", function(c) {
		function d(a, b) {
			return a > 100 ? a = 100 : -1800 > a && (a = -1800), b *= .3, 0 > a ? b * $.easing.easeOutSine(null, a, 1, -.9, -1800) : a > 0 ? b * $.easing.easeOutSine(null, a, 1, -1, 100) : b
		}
		if (hideSingleRank(), gameover = !1, is_draging = !0, clearInterval(scrollResetTimer), c.originalEvent.touches || (c.originalEvent.touches = [c.originalEvent]), c.originalEvent.touches[0]) {
			if (touches[0] = {
				x: c.originalEvent.touches[0].pageX,
				y: c.originalEvent.touches[0].pageY
			}, touches[0].y < 30) return void a()
		} else touches[0] = {
			x: null,
			y: null
		}; if (c.originalEvent.touches[1]) return touches[1] = {
			x: c.originalEvent.touches[1].pageX,
			y: c.originalEvent.touches[1].pageY
		}, void(touches[1].y < 30 && a());
		touches[1] = {
			x: null,
			y: null
		}, null == dragLast[0] && (dragLast[0] = touches[0]), dragIncrement = touches[0].y - dragLast[0].y, Math.abs(touches[0].x - dragLast[0].x) > 40 && (dragIncrement = 0), dragLast[0] = touches[0], dragIncrement = d(idol.data.y, dragIncrement), idol.data.y += dragIncrement, null == dragLast[1] && (dragLast[1] = touches[1]), dragIncrement = touches[1].y - dragLast[1].y, Math.abs(touches[1].x - dragLast[1].x) > 40 && (dragIncrement = 0), dragLast[1] = touches[1], dragIncrement = d(idol.data.y, dragIncrement), idol.data.y += dragIncrement;
		idol.data.y;
		b(), rankUpdate()
	}), container.on("touchend.drag mouseup.drag", function(b) {
		b.preventDefault(), b.stopPropagation(), b.originalEvent.touches || (b.originalEvent.touches = [b.originalEvent]), is_draging = !1, clearInterval(scrollResetTimer), dragLast = new Array, (0 === b.originalEvent.touches.length || "mouseup" == b.type) && a()
	})
}

//初始化分享
function initSharePanel() {
	$(".share-button").show(), $(".share-button").on("touchend mouseup", function(a) {
		a.preventDefault();
		var b = BLACKOUT({
			click: !0,
			insertBefore: $(".share-panel"),
			color: "rgba(66,33,11,0.8)"
		});
		$(".share-rank").html(highRank + "m"), cssAnimationKicker($(".share-panel"), {
			transform: "translate3d(0,200%,0)",
			display: "block",
			opacity: "0",
			transition: "0.3s ease-out"
		}, {
			transform: "translate3d(0,0,0)",
			opacity: "1"
		}), b.one("clearStart", function() {
			cssAnimationKicker($(".share-panel"), {
				transform: "translate3d(0,0,0)",
				display: "block",
				opacity: "1",
				transition: "0.3s ease-out"
			}, {
				transform: "translate3d(0,200%,0)",
				opacity: "0"
			})
		}), is_same ? $(".share-panel .close-share-panel").one("click", function(a) {
			a.preventDefault()
		}) : $(".share-panel .close-share-panel").one("click", function(a) {
			a.preventDefault(), b.clear()
		})
	})
}

function onShare() {
	$("#idol-d").removeClass("void")
}

function enableShare() {
	shareEnable = !0, initSharePanel()
}



var nua = navigator.userAgent,
	is_android_browser = nua.indexOf("Mozilla/5.0") > -1 && nua.indexOf("Android ") > -1 && nua.indexOf("AppleWebKit") > -1 && !(nua.indexOf("Chrome") > -1),
	container = $(".content"),
	idol = $(".idol-head"),
	idolBody = $(".idol-body"),
	rank = 0,
	rankObj = $(".rank"),
	highRank = 0,
	highRankObj = $(".high-rank"),
	touches = new Array,
	dragDistance, dragStart, dragLast = new Array,
	scrollResetTimer, gameover = !1,
	is_draging = !1,
	scrollerWrapper = $(".scroller-wrapper"),
	characterWrapper = $(".character-wrapper"),
	responsiveScale = 1,
	characterIndex = 0,
	scale = 1,
	scrollStartValue, rankSingle = 0,
	shareEnable = !1,
	is_same = !1,
	height, scrollValue = 0,
	money=0;

idol.data.y = 0,
$(document).on("touchmove", function(a) {
	a.preventDefault()
});
$(".guide-ok").on("touchend mouseup", function(a) {
	a.preventDefault(), $(".guide").fadeOut()
});


! function() {
	var a = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		b = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		c = Math.min(a, b) / 32;
	c > 16 && (c = 16), responsiveScale = c / 10, height = b
}();


heightControl(height);


GAME_START();


$(".guide-button").on("touchend mouseup", function(a) {
	a.preventDefault(), a.stopPropagation();
	var b = BLACKOUT({
		click: !0,
		insertBefore: $(".guide"),
		color: "rgba(66,33,11,0.8)"
	});

	cssAnimationKicker($(".guide"), {
		transform: "translate3d(0,200%,0)",
		display: "block",
		opacity: "0",
		transition: "0.3s ease-out"
	}, {
		transform: "translate3d(0,0,0)",
		opacity: "1"
	}), b.one("clearStart", function() {
		cssAnimationKicker($(".guide"), {
			transform: "translate3d(0,0,0)",
			display: "block",
			opacity: "1",
			transition: "0.3s ease-out"
		}, {
			transform: "translate3d(0,200%,0)",
			opacity: "0"
		})
	}), $(".guide-ok").one("click", function() {
		b.clear()
	})
});
$(".guide-button").trigger("touchend").on("touchend", function() {
	e.stopPropagation()
});


var focus=false,
	time=["0930","2400"],
	totalMoney=1,
	logined=false,
	bindMobile=false,
	newMember=true,
	receive=false;

if(WeixinApi.openInWeixin()){	
	$(".share-panel").css({
		height: "30rem"
	})
	enableShare();
		
	var oD=new Date();
	var fullTime=oD.getHours()+""+oD.getMinutes();
	
	if(fullTime>time[0]&&fullTime<time[1]){
		if(logined==false){
			$(".share-text").html("绑定手机号可获得XX.XX元微信红包");
			$(".share-bind a").text("绑定手机号领红包");
			$(".share-bind a").on("touchend mouseup",function(){
				if(bindMobile==true){
					$(".success").show();
				}else{
					$(".failed").show();
				}
			})
			$(".share-bind").show()
		}else{
			if(receive==true){
				$(".share-info,.QRcode,.share-text,.share-bind").remove();
			}else{
				if(focus==false){
					$(".share-info").html("您还有xx.xx元微信红包未领取").show();
					$(".share-bind a").text('关注公众号并领取红包');
					$(".share-bind ").show();
				}else{
					$(".share-info").html("您还有XX.XX元微信红包未获取~微信关注XXX后获取红包，红包未获取2天后将过期").show();
					$(".share-bind").remove();
					$(".QRcode").show();
				}	
				
			}
		}
	}else{
		$(".share-text").html("目前非活动时间，明日早起再来吧~");
		$(".share-bind a").html("绑定手机号").show();
	}
	

	if(totalMoney>1.01){
		$(".share-text").html("红包已被抢光，请期待下次活动");
		$(".share-bind a").html("绑定手机号").show();
	}
	
	
		
	heightControl(height);	
}else{
	$(".share-panel").css({
		height: "30rem"
	})
	enableShare();

	heightControl(height);

	
		if(logined==false){
			console.log(money)
			if(money<1){
				$(".share-text").html("红包金额太小了，微信扫描后再玩吧");
				$(".QRcode").show();
				$(".share-bind a").text("注册");
				$(".share-bind").show();
			}
		}else{

			if(receive==true){
				$(".share-info,.QRcode,.share-text,.share-bind").remove();
			}else{
				if(focus==false){
					$(".share-info").html("您还有xx.xx元微信红包未领取").show();
					$(".share-bind a").text('关注公众号并领取红包');
					$(".share-bind ").show();
				}else{
					$(".share-info").html("您还有XX.XX元微信红包未获取~微信关注XXX后获取红包，红包未获取2天后将过期").show();
					$(".share-bind").remove();
					$(".QRcode").show();
				}	
				
			}
		}
	
	
	
	
}




WeixinApi.ready(function(a) {
		var b = {
			async: !0,
			ready: function() {
				var a = {
					appId: "",
					imgUrl: "",
					link: "",
					desc: "我将脖子拔高了" + highRank + "米 还是没救出来T T 要不你来试试？",
					title: "拉脖子"
				};
				this.dataLoaded(a)
			},
			cancel: function() {},
			fail: function() {},
			confirm: function() {},
			all: function() {}
		};
		a.shareToFriend({}, b), a.shareToTimeline({}, b)
	});



connectWebViewJavascriptBridge(function(bridge) {  
    var uniqueId = 1  
    function log(message, data) {  
        var log = document.getElementById('log')  
        var el = document.createElement('div')  
        el.className = 'logLine'  
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)  
        if (log.children.length) { log.insertBefore(el, log.children[0]) }  
        else { log.appendChild(el) }  
    }  
    bridge.init(function(message, responseCallback) {  
        log('JS got a message', message)  
        var data = { 'Javascript Responds':'Wee!' }  
        log('JS responding with', data)  
        responseCallback(data)  
    })  
  
    bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {  
        log('ObjC called testJavascriptHandler with', data)  
        var responseData = { 'Javascript Says':'Right back atcha!' }  
        log('JS responding with', responseData)  
        responseCallback(responseData)  
    })  
  
    var button = document.getElementById('buttons').appendChild(document.createElement('button'))  
    button.innerHTML = 'Send message to ObjC'  
    button.onclick = function(e) {  
        e.preventDefault()  
        var data = 'Hello from JS button'  
        log('JS sending message', data)  
        bridge.send(data, function(responseData) {  
            log('JS got response', responseData)  
        })  
    }  
  
    document.body.appendChild(document.createElement('br'))  
  
    var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))  
    callbackButton.innerHTML = 'Fire testObjcCallback'  
    callbackButton.onclick = function(e) {  
        e.preventDefault()  
        log('JS calling handler "testObjcCallback"')  
        bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function(response) {  
            log('JS got response', response)  
        })  
    }  
})  
window.onerror = function(a) {
	console.log("window.onerror: " + a)
};


//$(".share").on("touchend mouseup",function(){
//	var b = BLACKOUT({
//			click: !0,
//			insertBefore: $(".share_mask"),
//			color: "rgba(0,0,0,0.8)"
//		});	
//	$(".share_mask").append('“我把脖子拉长到'+highRank+'米了，获得了'+money+'元微信红包！快来挑战！”').show();
//	
//	
//})
//$(".share_mask").one("click", function(a) {
//			a.preventDefault()
//			$(this).hide();
//			$(".BLACKOUT:last-child").remove();
//		})