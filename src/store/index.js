import Vuex from 'vuex'
import Vue from 'vue'
import vm from '../main'
Vue.use(Vuex)

import { GetQueryString } from '@common'
import { logoutMessage } from '@common'
import { login } from '@interface'
import { GetGoodIsBuy } from '@interface'

//获取用户openId
let openId = ''
if (localStorage.openId) {
    if (GetQueryString('openId')) {
        localStorage.openId = GetQueryString('openId')
    }
    openId = localStorage.openId
} else {
    openId = GetQueryString('openId')
    if (openId) {
        localStorage.openId = openId
    }
}

let state = {
    //用户信息
    userOpenId: openId,
    user: {
        isLogin: false,
        phone: '',
        uid: '',
        token: '',
        name: '',
        birthday: '',
        wxAlias: "",
        wxHeadImg: "",
        address: {}
    },
    //商品
    goods: {
        title: '',
        goodId: '',
        price: 0,
        goodType: 1
    },
    coupon: {
        couponId: '',
        couponPrice: '',
        couponMinUse: ''
    },
    classType: [],
    //绑定手机
    bindPageShow: false,
    bindPageBackHide: false,
    //学习日志
    classId: 0,
    learnlogCurrentClassName: "",
    StudyDayReportDetailParames: {},
    StudyMonthlyReportDetailParames: {},
    //课程介绍
    CourseIntrInfo: {},
    //亲子阅读
    readingFreeToBuy: false,
}

let mutations = {
    setUserInfo(state, info) {
        state.user = info
    },
    setUserAddress(state, info) {
        state.user.address = info
    },
    setGoodsInfo(state, info) {
        state.goods = info
        state.goods.goodId = info.good_id ? info.good_id : info.goodId
        state.goods.goodType = info.goodType ? info.goodType : 1
    },
    setCouponInfo(state, info) {
        state.coupon = info
    },
    setBindPageShow(state, status) {
        state.bindPageShow = status
    },
    setBindPageBackHide(state, status) {
        state.bindPageBackHide = status
    },
    setClassType(state, info) {
        state.classType = info;
    },
    setClassId(state, info) {
        state.classId = info
    },
    setLearnlogCurrentClassName(state, info) {
        state.learnlogCurrentClassName = info
    },
    SetStudyDayReportDetailParames(state, info) {
        state.StudyDayReportDetailParames = info
    },
    SetStudyMonthlyReportDetailParames(state, info) {
        state.StudyMonthlyReportDetailParames = info
    },
    SetCourseIntrInfo(state, info) {
        state.CourseIntrInfo = info
    },
    setReadingFreeToBuy(state, info) {
        state.readingFreeToBuy = info
    }
}

let actions = {
    buyCourse({ dispatch, commit, state }, goodInfo) {
        dispatch("isLogin").then(res => {
            if (res) {
                let options = {}
                options.goodId = goodInfo.goodId
                options.uid = state.user.uid
                options.token = state.user.token
                GetGoodIsBuy(options).then(res => {
                    if (res.isBuy > 0) {
                        logoutMessage("该商品已购买<br/>无需再次购买")
                        return
                    }
                    commit("setGoodsInfo", goodInfo)
                    vm.$router.push({ path: "/payMoney" })
                })
            }
        })
    },
    isLogin({ commit, state }, isHide) {
        return new Promise((resolve, reject) => {
            if (state.user.isLogin) {
                resolve(true)
            } else {
                if (state.userOpenId) {
                    commit("setBindPageShow", true)
                    commit("setBindPageBackHide", isHide)
                } else {
                    logoutMessage('请从微信公<br/>众号内打开')
                }
                reject(false)
            }
        })
    }
}

let store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store