<template>
    <div id="pay-money">
        <div class="good">
            <div class="title">{{goods.title}}</div>
            <div class="price">实际支付: <span>￥
                {{Math.round(goods.price - (coupon.couponId?coupon.couponPrice:0))/100}}
                </span>元
            </div>
        </div>
        <div class="coupon" @click="toCoupon" v-if="couponCount && isUseCoupon">
            <span class="title">*现金抵用券</span>
            <span v-if="!coupon.couponId">{{couponCount}} 张可用></span>
            <span v-if="coupon.couponId">{{coupon.couponPrice/100}} 元抵用券</span>
        </div>
        <div class="address" @click="ToAddress" v-if="isNeedAddr">
            <div class="title">*地址</div>
            <div class="detail" v-if="address">
                <div>
                    <span class="label">收件人:</span>
                    <span class="info">{{address.addressee}}</span>
                </div>
                <div>
                    <span class="label">手机号:</span>
                    <span class="info">{{address.phone}}</span>
                </div>
                <div>
                    <span class="label">详细地址:</span>
                    <span class="info">{{detailAddr}}</span>
                </div>
                <div class="modify">修改></div>
            </div>
            <div class="create" v-if="!address">+ 创建地址</div>
        </div>
        <div class="btn" @click="pay">确&nbsp&nbsp&nbsp定</div>
        <transition name="slide">
            <router-view class="children-route"></router-view> 
        </transition>
        <Loading type="1" v-if="loadingShow"></Loading>
    </div>
</template>
<script>
    import TopTitle from '@components/shop/TopTitle'
    import Loading from '@components/Loading'
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    import { getCoupons } from '@interface'
    import { buyKernel } from '@interface'
    import { callWxJsPay } from '@interface'
    import { logoutMessage } from '@common'

    export default {
        data(){
            return {
                couponCount:0,
                loadingShow:''
            }
        },
        computed:{
            ...mapState(['goods','coupon','user',"userOpenId"]),
            isNeedAddr(){
                if(this.goods.goodType == 1){
                    return false
                }
                return true
            },
            isUseCoupon(){
                 if(this.goods.goodType == 2){
                    return false
                }
                return true
            },
            address(){
                return this.user.address
            },
            detailAddr(){
                let address = this.address
                return (address.province?address.province:'') + 
                        (address.city?address.city:'') + 
                        (address.area?address.area:'') + 
                        (address.detail_addr?address.detail_addr:'')
            }
        },
        components:{
            "topTitle":TopTitle,Loading
        },
        methods:{
            ...mapMutations(["setCouponInfo","setGoodsInfo"]),
            toCoupon(){
                this.$router.push({
                    path:'/payMoney/coupon',query:{from:'payMoney'}
                })
            },
            ToAddress(){
                this.$router.push({
                    path:'/payMoney/address',query:{from:'payMoney'}
                })
            },
            pay(){
                if(this.goods.goodId){
                    if(this.isNeedAddr){
                        if(!this.address){
                            logoutMessage('地址未填写')
                            return false
                        }
                    }
                    this.CreateOrder()
                }else{
                    this.$router.go(-1)
                }
            },
            CreateOrder(){
                this.loadingShow = true
                buyKernel({
                    openId:this.userOpenId,
                    uid:this.user.uid, 
                    token:this.user.token, 
                    kernelId:this.goods.goodId, 
                    couponId:this.coupon.couponId, 
                }).then(res =>{
                    this.loadingShow = false
                    if (res.result == 1) {
                        callWxJsPay(res.orderInfo)
                    } else if (res.result == -1) {
                        logoutMessage('被登出请<br/>重新进入')
                    } else {
                        logoutMessage(res.description)
                    }
                })
            },
            LoadCounpon(){
                getCoupons({
                    uid:this.user.uid,
                    token:this.user.token,
                    status:0
                }).then(res =>{
                    let list = res.list
                    for(let i = 0; i<list.length; i++){
                        if(this.goods.price > list[i].price){
                            this.couponCount ++
                        }
                    }
                })
            },
        },
        beforeMount(){
            if(!this.goods.goodId){
                this.$router.go(-1)
                return 
            }
            if(this.isUseCoupon){
                this.LoadCounpon()
            }
        },
        beforeRouteLeave (to, from, next) {
           if(to.path  != '/coupon'){
                this.setCouponInfo({couponId:'',couponPrice:'',couponMinUse:''})
                this.setGoodsInfo({title:'',goodId:'',price:0})
           }
           next()
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    #pay-money{
        color:@black;
        .good{
            background: #fff;
            display: flex;
            align-items: center;
            padding: 15px 0px;
            margin:10px 0;
            .title{
                width: 55%;
                text-align: center;
                border-right: 2px solid @red;
                white-space: nowrap;
                overflow: hidden;
            }
            .price{
                width: 45%;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                    color:@red;
                    font-size: 16px;
                }
            }
        }
        .coupon{
            background: #fff;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            .title{
                color: @red;
            }
        }
        .address{
             background: #fff;
             padding: 15px 20px 25px;
             margin-top: 10px;
            .title{
                color: @red;
            }
            .detail{
                position: relative;
                &>div{
                    margin:5px 0 0 14px;
                    display: flex;
                    .label{
                        white-space: nowrap;
                    }
                    .info{
                        margin-left:5px;
                        color:@darkerGray
                    }
                }
                .modify{
                    position: absolute;
                    bottom:-19.5px;
                    right:0px;
                    text-decoration: underline
                }
            }
            .create{
                width: 55%;
                height: 35px;
                line-height: 35px;
                font-size: 16px;
                background: @red;
                border-radius: 5px;
                color:#fff;
                text-align: center;
                margin:10px auto;
            }
        }
        .btn{
            width: 80%;
            margin:100px auto 10px;
            text-align: center;
            background: @orange;
            font-size: 16px;
            line-height: 35px;
            border-radius:5px;
            color: #fff;
        }
    }   
</style>


