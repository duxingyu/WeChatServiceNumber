const axios = require('axios')
import { logoutMessage } from '../common'
import { loadingImage } from '../common'
import { CopyObject } from '../common'

//url
const requestUrl = require('./url.js').url
const requestUserUrl = requestUrl.user()
const requestPayUrl = requestUrl.pay()

//请求参数
const requestOptions = {
    app_pkg_name: 'com.mytian.wx.service',
    app_channel: 'wechatservice',
    client_version: '1',
}

//ajax请求
function request(data) {
    axios({
            method: data.type ? data.type : 'get',
            url: data.url,
            params: data.data,
            responseType: 'json',
        })
        .then((response) => {
            data.success(response.data)
        }).catch((error) => {
            loadingImage()
            logoutMessage("网络错误")
            data.error(error)
            console.log(error)
        });
}

export function login(data) { //登录
    return new Promise((resolve, reject) => {
        let options = CopyObject(requestOptions)
        options["user.openId"] = data
        request({
            type: 'post',
            url: requestUserUrl.login,
            data: options,
            success(data) {
                resolve(data)
            }
        })
    })
}

export async function getWxShareOptions(callbak) { //获取微信分享配置
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.wxShareSignInfo,
            data: { url: window.location.href.split("#")[0] },
            success(data) {
                if (data.result == 1) {
                    let obj = data.info
                    let wx = require('weixin-js-sdk')
                    wx.config({
                        //debug: true, 
                        appId: obj.appId,
                        timestamp: obj.timestamp,
                        nonceStr: obj.noncestr,
                        signature: obj.sign,
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
                    });
                    resolve(true)
                    return
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
            }
        })
    })
}

export async function register(user) { //注册
    let options = CopyObject(requestOptions)
    options['user.openId'] = user.openId
    options['user.unionId'] = ''
    options['user.phone'] = user.phone
    options['user.verificationCode'] = user.code
    options['user.password'] = user.password
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.register,
            data: options,
            success(data) {
                resolve(data)
            }
        })
    })
}

export async function getCode(phone) { //获取验证吗
    let options = CopyObject(requestOptions)
    options.phone = phone
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.code,
            data: options,
            success(data) {
                logoutMessage(data.description)
                resolve(data)
            }
        })
    })
}

export async function getClassList(classTypeList) { //获取课程列表
    let options = CopyObject(requestOptions)
    if (!classTypeList) {
        classTypeList = ''
    } else {
        options.classTypeList = JSON.stringify(classTypeList)
    }
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.classGoodList,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function getPackagesList() { //套餐列表
    let options = CopyObject(requestOptions)
    options.classTypeList = JSON.stringify(["all"])
    options.classifType = "package"
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.classGoodList,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function getCoupons(data) { //获取优惠券
    let options = CopyObject(requestOptions)
    options.uid = data.uid
    options.token = data.token
    options.status = data.status
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.counpList,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                } else if (data.result == -1) {
                    logoutMessage('被登出请<br/>重新进入')
                } else {
                    logoutMessage(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function buyKernel(data) { //购买套餐
    let options = CopyObject(requestOptions)
    options.uid = data.uid
    options.token = data.token
    options.kernelId = data.kernelId
    options.channel = '1'
    options.open_id = data.openId
    options.map = {
        couponId: data.couponId ? data.couponId : ''
    }
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestPayUrl,
            data: options,
            success(data) {
                resolve(data)
            }
        })
    })
}

export function callWxJsPay(pay_param) { //检查是否在微信内
    if (typeof WeixinJSBridge == "undefined") {
        logoutMessage("请用微信打开")
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', wxPay, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', wxPay);
            document.attachEvent('onWeixinJSBridgeReady', wxPay);
        }
    } else {
        wxPay(pay_param);
    }
}

function wxPay(pay_param) { //调用微信支付
    var pay_param_arr = eval("(" + pay_param + ")");
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            'appId': pay_param_arr.appId,
            'timeStamp': pay_param_arr.timeStamp,
            'nonceStr': pay_param_arr.nonceStr,
            'package': pay_param_arr.package,
            'signType': pay_param_arr.signType,
            'paySign': pay_param_arr.sign
        },
        function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {

            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                logoutMessage("取消了支付");
            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                logoutMessage("微信支付失败")
            }
        }
    );
}

export async function downLoad(data) { //下载
    let options = CopyObject(requestOptions)
    options.app_pkg_name = 'com.mytian.appstore.' + data
    options.version = 1
    options.deviceType = 'android'
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.down,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                } else {
                    logoutMessage(data.description)
                }
            }
        })
    })
}

export async function getUserRate(data) { //获取用户学习清单
    let options = CopyObject(requestOptions)
    options.uid = data
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.getUserRate,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function unbindPhone(data) { //解绑
    let options = CopyObject(requestOptions)
    options['user.openId'] = data.openId
    options['uid'] = data.uid
    options['token'] = data.token
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.unbind,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function UpdateAddress(data) { //修改用户地址
    let options = CopyObject(requestOptions)
    options['address.id'] = data.id
    options['address.addressee'] = data.addressee
    options['address.phone'] = data.phone
    options['address.provinceId'] = data.provinceId
    options['address.cityId'] = data.cityId
    options['address.areaId'] = data.areaId
    options['address.detailAddr'] = data.detailAddr
    options['address.zipCode'] = ""
    options['uid'] = data.uid
    options['token'] = data.token
    options['address.uid'] = data.uid

    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.updateAddress,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function SaveAddress(data) { //保存用户地址
    let options = CopyObject(requestOptions)
    options['address.addressee'] = data.addressee
    options['address.phone'] = data.phone
    options['address.provinceId'] = data.provinceId
    options['address.cityId'] = data.cityId
    options['address.areaId'] = data.areaId
    options['address.detailAddr'] = data.detailAddr
    options['address.zipCode'] = ""
    options['uid'] = data.uid
    options['token'] = data.token
    options['address.uid'] = data.uid
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.saveAddress,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function GetBqHotGoods(data) { //获取热销精品屋商品
    let options = CopyObject(requestOptions)
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.getBqHotGoods,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function GetBqGoods(data) { //获取精品屋商品
    let options = CopyObject(requestOptions)
    options.type = data
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.getBqGoods,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function GetGoodIsBuy(data) { //该商品是否已购买
    let options = CopyObject(requestOptions)
    options.goodId = data.goodId
    options.uid = data.uid
    options.token = data.token
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.goodIsBuy,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function GetOrderList(data) { //获取订单列表
    let options = CopyObject(requestOptions)
    options["uid"] = data.uid
    options["token"] = data.token
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.orderList,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function GetOrderDetail(data) { //获取订单详情
    let options = CopyObject(requestOptions)
    options["uid"] = data.uid
    options["token"] = data.token
    options["orderId"] = data.orderId
    return new Promise((resolve, reject) => {
        request({
            type: 'post',
            url: requestUserUrl.orderDetail,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else if (data.result == -1) {
                    logoutMessage("账号被登<br/>出重新进入")
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function GetAppUsingNum(data) { //获取app使用人数
    let options = CopyObject(requestOptions)
    options['uid'] = data
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.appUsingNum,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetClassSummary(data) { //获取课程概述
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['cid'] = data.cid
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.classSummary,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetStudyPercen(data) { //学习进度
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['cid'] = data.cid
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.studyPercen,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetStudyGoal(data) { //学习目标
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['cid'] = data.cid
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.studyGoal,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetStudyMonthReportSummaryPage(data) { //学习月报列表
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['cid'] = data.cid
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.studyMonthReportSummaryPage,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetStudyMonthReport(data) { //学习月报详情
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['cid'] = data.cid
    options['cids'] = data.cids
    options['month'] = data.time
    options['studyDays'] = data.studyDays
    options['studyClzIds'] = data.studyClzIds
    options['studyRightPercentage'] = data.studyRightPercentage
    return new Promise((resolve, reject) => {
        request({
            type: "post",
            url: requestUserUrl.studyMonthReport,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetStudyDayReport(data) { //学习日报列表
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['cid'] = data.cid
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.studyDayReport,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetStudyDayDetailReport(data) { //学习日报详情
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['cids'] = data.cids
    options['time'] = data.time
    return new Promise((resolve, reject) => {
        request({
            type: "post",
            url: requestUserUrl.studyDayDetailReport,
            data: options,
            success(data) {
                if (data.code == 0) {
                    resolve(data.data)
                    return
                } else {
                    logoutMessage(data.msg)
                    console.log(data.msg)
                }
                loadingImage()
            }
        })
    })
}

export async function GetStudyDailyReportForWeiXin(data) { //日报推送
    let options = CopyObject(requestOptions)
    options['cid'] = data.cid
    options['uid'] = data.uid
    options['time'] = data.time
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.studyDailyReportForWeiXin,
            data: options,
            success(data) {
                resolve(data)
                return
            }
        })
    })
}

export async function GetStudyMonthReportForWeiiXin(data) { //月报推送
    let options = CopyObject(requestOptions)
    options['cid'] = data.cid
    options['uid'] = data.uid
    options['month'] = data.month
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.studyMonthReportForWeiiXin,
            data: options,
            success(data) {
                resolve(data)
                return
            }
        })
    })
}

export async function GetClassIntroduction(classId) { //课程介绍
    let options = CopyObject(requestOptions)
    options['classType'] = classId
    return new Promise((resolve, reject) => {
        request({
            url: requestUserUrl.classIntroduction,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}

export async function getUnclaimedGiftList(data) { //课程介绍
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['token'] = data.token
    return new Promise((resolve, reject) => {
        request({
            type: "post",
            url: requestUserUrl.unclaimedGiftList,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}


export async function receiveGift(data) { //课程介绍
    let options = CopyObject(requestOptions)
    options['uid'] = data.uid
    options['token'] = data.token
    options['payId'] = data.payId
    return new Promise((resolve, reject) => {
        request({
            type: "post",
            url: requestUserUrl.receiveGift,
            data: options,
            success(data) {
                if (data.result == 1) {
                    resolve(data)
                    return
                } else {
                    logoutMessage(data.description)
                    console.log(data.description)
                }
                loadingImage()
            }
        })
    })
}