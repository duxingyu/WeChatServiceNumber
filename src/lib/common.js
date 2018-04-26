let CETools = {}
window.__proto__.CETools = CETools

//去除数组元素
export function removeArray(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr
}
CETools.removeArray = removeArray

//url取值
export function GetQueryString(name) {
    let params = window.location.href.split("?")[1]
    let result = null
    if (params && params.match(name + "=")) {
        let str = params.split(name + '=')[1]
        try {
            result = str.split("&")[0]
        } catch (e) {
            result = str
        }
    }
    return result
}
CETools.GetQueryString = GetQueryString

//验证格式
export function yanzhen(type, content) {
    if (type == 'phone') {
        if (/^1[0-9]{10}$/.test(content)) {
            return true
        }
        logoutMessage("手机号码错误")
        return false
    } else if (type == 'code') {
        if (/^[0-9]{4}$/.test(content)) {
            return true
        }
        logoutMessage("验证码错误")
        return false
    } else if (type == 'password') {
        if (/^[0-9a-zA-Z]{6,16}$/.test(content)) {
            return true
        }
        logoutMessage("密码格式错误")
        return false
    }
}
CETools.yanzhen = yanzhen

//解析时间戳
export function parseTime(time, bool) {
    var date = new Date(time)
    var year = date.getFullYear();
    var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds()
    if (!bool) {
        return year + '/' + month + '/' + day
    } else {
        return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
    }
}
CETools.parseTime = parseTime

//loading图
export function loadingImage(bool) {
    let body = document.getElementsByTagName('body')[0]
    let loadingImage = document.getElementsByClassName('loading')
    if (loadingImage.length > 0) {
        for (let i = 0; i < loadingImage.length; i++) {
            loadingImage[i].style.display = "none"
        }
    }
    if (bool) {
        let img = document.createElement('img')
        img.className = 'loading'
        img.style.position = 'fixed'
        img.style.top = '5px'
        img.style.left = '50%'
        img.style.webkitTransform = 'translateX(-50%)'
        img.style.transform = 'translateX(-50%)'
        img.style.zIndex = '9999'
        img.style.width = '20px'
        img.src = require('../assets/images/timg.gif')
        body.appendChild(img)
    }
}
CETools.loadingImage = loadingImage

//提示消息
export function logoutMessage(content) {
    let now = new Date().getTime()
    let body = document.getElementsByTagName('body')[0]
    let items = document.getElementsByClassName('logout_model_item')
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "none"
        }
    }
    let div = document.createElement('div')
    div.className = "logout_model_item logout_model_" + now
    let cssStyle = {
        "position": 'fixed',
        "left": "50%",
        "top": "50%",
        "transform": "translate(-50%,-50%)",
        "padding": "6px 10px",
        "textAlign": "center",
        "borderRadius": "5px",
        "background": "rgba(0,0,0,.6)",
        "fontSize": "14px",
        "color": "#ddd",
        "whiteSpace": "nowrap",
        "zIndex": "9999"
    }
    for (let temp in cssStyle) {
        div.style[temp] = cssStyle[temp]
    }
    div.innerHTML = content
    body.appendChild(div)
    let timer = setTimeout(function() {
        let item = document.getElementsByClassName('logout_model_' + now)[0]
        if (item) {
            body.removeChild(item)
        }
    }, 2000)
}
CETools.logoutMessage = logoutMessage

//去掉alert和comfir域名
window.alert = function(name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};
window.confirm = function(message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};

//验证微信浏览器
export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
CETools.isWeiXin = isWeiXin

//ios android
export function deviceType() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return true
    } else {
        return false
    }
}
CETools.deviceType = deviceType

//复制对象
export function CopyObject(obj) { //对象复制
    var obj_buff = {}
    if (typeof(obj) != "object")
        throw new Error("参数不为对象！")

    for (var i in obj) {
        obj_buff[i] = obj[i]
    }

    return obj_buff
}
CETools.CopyObject = CopyObject

//微信分享
export function wxShareOptions(options) {
    let wx = require('weixin-js-sdk')
    wx.onMenuShareTimeline({
        title: options.title,
        link: options.link,
        imgUrl: options.imgUrl,
        desc: options.desc,
        trigger: function(res) {
            // 触发时需要做的事...
        },
        success: function() {
            // alert('分享到朋友圈成功');
        },
        cancel: function() {
            // alert('你没有分享到朋友圈');
        },
        fail: function(res) {
            //这里必须写，可以再非微信端弹出错误信息，方便调试
        }
    });
    wx.onMenuShareAppMessage({
        title: options.title,
        link: options.link,
        imgUrl: options.imgUrl,
        desc: options.desc,
        trigger: function(res) {
            // 触发时需要做的事...
        },
        success: function(res) {
            //alert('分享给朋友成功');
        },
        cancel: function(res) {
            //alert('你没有分享给朋友');
        },
        fail: function(res) {
            //这里必须写，可以再非微信端弹出错误信息，方便调试
        }
    });
}

// 数字转为汉字
export function numToWord(num, seven) {
  switch (num) {
    case 0: num = '一';
      break;
    case 1: num = '二';
      break;
    case 2: num = '三';
      break;
    case 3: num = '四';
      break;
    case 4: num = '五';
      break;
    case 5: num = '六';
      break;
    default: num = seven ? seven : '日';
      break;
  }
  return num;
}
