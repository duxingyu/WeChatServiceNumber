export let url = {
    domain: '/api',
    domain2: '/log',
    // domain: 'http://10.0.1.26',
    // domain2: 'http://10.0.1.26',
    // domain: 'http://www.mytian.com.cn',
    // domain2: 'http://114.215.220.162:9999',
    user() {
        return {
            wxShareSignInfo: this.domain + '/myt_wx/wxShareAction_getWxShareSignInfo.do',
            login: this.domain + '/myt_wx/wxUserAction_login.do',
            register: this.domain + '/myt_wx/wxUserAction_register.do',
            code: this.domain + '/myt_market/verificationAction_getVerificationCode.do',
            down: this.domain + '/myt_file/gameAction_checkMtGardenVersion.do',
            getUserRate: this.domain + '/myt_wx/wxUserAction_getUserRate.do',
            unbind: this.domain + '/myt_wx/wxUserAction_unbind.do',
            updateAddress: this.domain + '/myt_activity/wxUserAction_updateAddr.do',
            saveAddress: this.domain + '/myt_activity/wxUserAction_saveAddr.do',
            getBqHotGoods: this.domain + '/myt_order/marketGoodAction_getWxMarketHotMaterialGoodList.do',
            getBqGoods: this.domain + '/myt_order/marketGoodAction_getWxMarketMaterialGoodList.do',
            goodIsBuy: this.domain + '/myt_order/marketGoodAction_getGoodIsBuy.do',
            orderList: this.domain + '/myt_order/orderAction_getUserOrderList.do',
            orderDetail: this.domain + '/myt_order/orderAction_getOrderDetailInfo.do',
            classGoodList: this.domain + '/myt_order/marketGoodAction_getWxClassGoodList.do',
            counpList: this.domain + '/myt_activity/couponAction_userCouponList.do',

            appUsingNum: this.domain2 + '/api/studylog/getDefaultPage',
            classSummary: this.domain2 + '/api/studylog/getClassSummaryPage',
            studyPercen: this.domain2 + '/api/studylog/getStudyPerForSingle',
            studyGoal: this.domain2 + '/api/studylog/getStudyGoal',
            studyDayReport: this.domain2 + '/api/studylog/getStudyDayReport',
            studyDayDetailReport: this.domain2 + '/api/studylog/getStudyDayDetailReport',
            studyMonthReportSummaryPage: this.domain2 + '/api/studylog/getStudyMonthReportSummaryPage',
            studyMonthReport: this.domain2 + '/api/studylog/getStudyMonthReport',
            studyDailyReportForWeiXin: this.domain2 + '/api/weixin/getStudyDailyReportForWeiXin',
            studyMonthReportForWeiiXin: this.domain2 + '/api/weixin/getStudyMonthReportForWeiiXin',

            classIntroduction: this.domain + '/myt_das/gradeMarketAction_getClassIntroduction.do',

            unclaimedGiftList: this.domain + '/myt_group_buy/giftAction_getUnclaimedGiftList.do',
            receiveGift: this.domain + '/myt_group_buy/giftAction_receiveGift.do',

            userPayInfo: this.domain + '/myt_wx/wxReadAction_getUserPayInfo.do',
            readListByWeek: this.domain + '/myt_wx/wxReadAction_getReadListByWeek.do',
            shareUserReadInfo: this.domain + '/myt_wx/wxReadAction_getShareUserReadInfo.do',
            wxReadGoodList: this.domain + '/myt_order/marketGoodAction_getWxReadGoodList.do',
            updateUserAction: this.domain + '/myt_activity/appAction_updateUserAction.do',
            minuteDetails: this.domain + '/myt_wx/wxReadAction_getMinuteDetails.do',
            daysDetailThisWeek: this.domain + '/myt_wx/wxReadAction_getDaysDetailThisWeek.do',
            // dfd
            getUserReadHistoryThisWeek: this.domain + '/myt_wx/wxReadAction_getUserReadHistoryThisWeek.do',
            getMostFavouriteThisWeek: this.domain + '/myt_wx/wxReadAction_getMostFavouriteThisWeek.do',
            getHoursDetailThisWeek: this.domain + '/myt_wx/wxReadAction_getHoursDetailThisWeek.do',

        }
    },
    pay() {
        //return this.domain + '/myt_pay/payAction_buyKernel.do'
        return 'http://pay.mytian.com.cn/myt_pay/payAction_buyKernel.do'
    }
}
