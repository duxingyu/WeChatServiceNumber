import Vue from 'vue'
import Router from 'vue-router'
import Store from "../store"
Vue.use(Router)

//商城
import Shop from '@pages/shop/Shop'
import Classes from '@pages/shop/Classes'
import Course from '@pages/shop/Course'
import Packages from '@pages/shop/Packages'
import Boutique from '@pages/shop/Boutique'
import My from '@pages/shop/My'
import Coupon from '@pages/shop/Coupon'
import MyOrder from '@pages/shop/MyOrder'
import Address from '@pages/shop/Address'
//付款
import PayMoney from '@pages/shop/PayMoney'
//学习进度
import ROfL from '@pages/rofl/ROfL'
//学习日志
import LearnlogIndex from '@pages/learnlog/Index'
import Learnlog from '@pages/learnlog/LearnLog'
import LearningGoals from '@pages/learnlog/LearningGoals'
import DailyList from '@pages/learnlog/DailyList'
import Daily from '@pages/learnlog/Daily'
import MonthlyReport from '@pages/learnlog/MonthlyReport'
import MonthlyReportList from '@pages/learnlog/MonthlyReportList'
import LearningRate from '@pages/learnlog/LearningRate'
import DailyPush from '@pages/learnlog/DailyPush'
import MonthlyReportPush from '@pages/learnlog/MonthlyReportPush'
//课程介绍
import CourseIntrIndex from "@pages/courseintr/Index"
import CourseList from "@pages/courseintr/CourseList"
import CourseDetail from "@pages/courseintr/CourseDetail"
//礼品
import Gift from "@pages/gift/Gift"
//亲子阅读
import ParentChildReading from "@pages/ParentChildReading/Index"
import Probation from "@pages/ParentChildReading/Probation"
import ReadingPush from "@pages/ParentChildReading/ReadingPush"
import ReadingBuy from "@pages/ParentChildReading/Buy"
import ReadingSharePage from "@pages/ParentChildReading/SharePage"
import ReadingReport from "@pages/ParentChildReading/Report"

const router = new Router({
    routes: [
        //商城
        {
            path: '/shop',
            component: Shop,
            children: [
                //
                {
                    path: '/',
                    redirect: "classes"
                },
                {
                    path: 'classes',
                    component: Classes,
                    beforeEnter(to, from, next) {
                        document.title = "课程中心"
                        next()
                    },
                    children: [
                        //
                        {
                            path: '/',
                            component: Course,
                        },
                        {
                            path: 'packages',
                            component: Packages,
                        },
                    ]
                },
                {
                    path: 'packages',
                    component: Packages,
                    beforeEnter(to, from, next) {
                        document.title = "套餐列表"
                        next()
                    },
                },
                {
                    path: 'boutique',
                    component: Boutique,
                    beforeEnter(to, from, next) {
                        document.title = "精品屋"
                        next()
                    },
                },
                {
                    path: 'coupon',
                    component: Coupon,
                    beforeEnter(to, from, next) {
                        document.title = "礼券中心"
                        next()
                    },
                },
                {
                    path: 'my',
                    component: My,
                    beforeEnter(to, from, next) {
                        document.title = "我的"
                        next()
                    },
                    children: [
                        //
                        {
                            path: 'myorder',
                            component: MyOrder,
                        },
                        {
                            path: 'address',
                            component: Address,
                        }
                    ]
                },
            ]
        },
        //我的
        {
            path: '/my',
            component: My,
            beforeEnter(to, from, next) {
                document.title = "我的"
                next()
            },
            children: [
                //
                {
                    path: 'myorder',
                    component: MyOrder,
                },
                {
                    path: 'address',
                    component: Address,
                }
            ]
        },
        //付款
        {
            path: '/payMoney',
            component: PayMoney,
            beforeEnter(to, from, next) {
                document.title = "支付"
                next()
            },
            children: [
                //
                {
                    path: 'coupon',
                    component: Coupon,
                },
                {
                    path: 'address',
                    component: Address,
                }
            ]
        },
        //学习日志
        {
            path: "/learnlog",
            component: LearnlogIndex,
            children: [
                //
                {
                    path: "/",
                    component: Learnlog,
                    beforeEnter(to, from, next) {
                        document.title = "学习日志"
                        next()
                    }
                },
                {
                    path: "learninggoals",
                    component: LearningGoals,
                    beforeEnter(to, from, next) {
                        document.title = "学习目标"
                        next()
                    }
                },
                {
                    path: "dailylist",
                    component: DailyList,
                },
                {
                    path: "daily",
                    component: Daily,
                },
                {
                    path: "monthlyreportlist",
                    component: MonthlyReportList,
                },
                {
                    path: "monthlyreport",
                    component: MonthlyReport,
                },
                {
                    path: "learningrate",
                    component: LearningRate,
                    beforeEnter(to, from, next) {
                        document.title = "学习进度"
                        next()
                    }
                },
                {
                    path: "dailypush",
                    component: DailyPush,
                    beforeEnter(to, from, next) {
                        document.title = "日报详情"
                        next()
                    }
                },
                {
                    path: "monthlyreportpush",
                    component: MonthlyReportPush,
                    beforeEnter(to, from, next) {
                        document.title = "月报详情"
                        next()
                    }
                }
            ]
        },
        //课程介绍
        {
            path: "/courseintr",
            component: CourseIntrIndex,
            children: [
                //
                {
                    path: "/",
                    component: CourseList,
                    beforeEnter(to, from, next) {
                        document.title = "课程介绍"
                        next()
                    }
                },
                {
                    path: "detail",
                    component: CourseDetail,
                    beforeEnter(to, from, next) {
                        document.title = "课程详情"
                        next()
                    }
                }
            ]
        },
        //课程进度
        {
            path: "/rofl",
            component: ROfL,
            beforeEnter(to, from, next) {
                document.title = "课程进度"
                next()
            }
        },
        //礼品
        {
            path: "/gift",
            component: Gift,
            beforeEnter(to, from, next) {
                document.title = "礼品"
                next()
            }
        },
        // 亲子阅读
        {
            path: "/reading",
            component: ParentChildReading,
            beforeEnter(to, from, next) {
                document.title = "亲子阅读"
                next()
            },
            children: [
                //
                {
                    path: "/",
                    component: Probation,
                    beforeEnter(to, from, next) {
                        document.title = "阅读试听"
                        next()
                    },
                },
                {
                    path: "push",
                    component: ReadingPush
                },
                {
                    path: "buy",
                    component: ReadingBuy
                },
                {
                    path: "share",
                    component: ReadingSharePage,
                    beforeEnter(to, from, next) {
                        document.title = "亲子阅读分享"
                        next()
                    },
                },
                {
                    path: "report",
                    component: ReadingReport,
                }
            ]
        },
    ]
})

export default router