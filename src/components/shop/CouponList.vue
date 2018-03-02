<template>
    <div class="couponList" @click="useCoupon">
        <div class="left">
            <img :src="isCanUse()?imgUrl:notImgUrl">
            <div class="des">
                <span>￥{{content.price/100}}</span>
                <p>可购买商品使用<br/>(满{{content.min_use_price/100}}元可使用)</p>
            </div>
        </div>
        <div class="center">
            <span :class="{title:true,titledisabled:!isCanUse()}">{{content.title}}</span>
            <p class="content">{{content.content}}</p>
            <div class="time">{{time()}}</div>
        </div>
        <div class="botton" v-if="isCanUse()">
            立即使用
        </div>
    </div>
</template>
<script>
    import { parseTime } from '@common'
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
                imgUrl: require('../../assets/images/shop/bg_coupon.png'),
                notImgUrl: require('../../assets/images/shop/bg_coupon_use.png'),
                path: this.$route.query.from
            }
        },
        computed: {
            ...mapState(['goods'])
        },
        props: ['content'],
        methods: {
            ...mapMutations(["setCouponInfo"]),
            bigger() {
                let goodPrice = this.goods.price
                if (goodPrice > this.content.price) {
                    return true
                } else {
                    return false
                }
            },
            isCanUse() {
                if (this.content.status == 0) {
                    let now = new Date().getTime()
                    let endTime = this.content.end_time
                    if (endTime == 0) {
                        if (this.path == 'payMoney') {
                            return this.bigger()
                        }
                        return true
                    } else {
                        if (now > endTime) {
                            return false
                        } else {
                            if (this.path == 'payMoney') {
                                return this.bigger()
                            }
                        }
                    }
                    return true
                } else {
                    return false
                }
            },
            time() {
                let startTime = this.content.start_time
                let endTime = this.content.end_time
                if (endTime == 0) {
                    return '无期限使用'
                } else {
                    return parseTime(startTime) + ' - ' + parseTime(endTime)
                }
            },
            useCoupon() {
                if (this.isCanUse()) {
                    if (this.path == 'my') {
                        this.$router.go(-1)
                    } else if (this.path == 'payMoney') {
                        this.setCouponInfo({
                            couponId: this.content.id,
                            couponPrice: this.content.price,
                            couponMinUse: this.content.min_use_price,
                        })
                        this.$router.go(-1)
                    }else{
                         this.$router.push({path:"/shop/classes"})
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    .couponList {
        display: flex;
        position: relative;
        .left {
            width: 40%;
            text-align: center;
            position: relative;
            img {
                display: block;
                width: 100%;
            }
            .des {
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                color: #fff;
                span {
                    font-size: 22px;
                }
                p {
                    font-size: 10px;
                    white-space: nowrap;
                }
            }
        }
        .center {
            width: 60%;
            padding-left: 5px;
            position: relative;
            background: #fff;
            .title {
                background: @red;
                color: #fff;
                padding: 2px 5px;
                font-size: 10px;
                display: inline-block;
                border-radius: 2px;
                margin: 5px 0 10px 0;
            }
            .titledisabled {
                background: @darkerGray;
            }
            .content {
                color: @black;
            }
            .time {
                position: absolute;
                bottom: 10px;
            }
        }
        .botton {
            position: absolute;
            font-size: 10px;
            right: 5px;
            top: 5px;
            color: @orange;
            padding: 2px 5px;
            border: 1px solid @orange;
            border-radius: 100px;
        }
    }
</style>