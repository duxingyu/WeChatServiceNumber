<template>
    <div id='my'>
        <div class="info">
            <img :src="user.wxHeadImg?user.wxHeadImg:txImage">
            <div class="num">
                <div class="alias">
                    <span>{{user.wxAlias ? user.wxAlias : '麦麦'}}</span>
                    <!-- <div class="edit" v-if="user.isLogin">
                        <img src="../../assets/images/shop/my_edit.png" alt="">
                    </div> -->
                </div>
                <div class="ANum" v-if="user.phone">
                    <span>{{user.phone}}</span>
                    <span class="unbundling" @click.stop="unbind">解绑</span>
                </div>
            </div>
            <div class="bind" @click="setBindPageShow(true)" v-if="!user.isLogin">
                 绑定麦田账号 
            </div>
        </div>
        
        <Lists icon='order' name='我的订单' @click.native="toMyOrder"></Lists>
        <!-- <Lists icon='coupon' name='优惠券' @click.native="toCoupon"></Lists> -->
        <Lists icon='address' name='地址' @click.native="toAddress"></Lists>
        <transition name="slide">
            <router-view class="children-route"></router-view> 
        </transition>
    </div>
</template>

<script>
    import Lists from '@components/shop/Lists'
    import { unbindPhone } from '@interface'
    import { logoutMessage } from '@common'
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'

    export default {
        computed: {
            ...mapState(['user',"userOpenId"]),
            txImage(){
                return require("@image/shop/touxiang01.png")
            }
        },
        components: {
            Lists
        },
        methods: {
            ...mapMutations(['setBindPageShow',"setUserInfo"]),
            ...mapActions(['isLogin']),
            unbind(){
                if(confirm("确定解除绑定\n该手机号码吗")){
                    unbindPhone({
                        uid:this.user.uid,
                        token:this.user.token,
                        openId:this.userOpenId,
                    }).then(res =>{
                        this.setUserInfo({})
                    })
                }
            },
            // ToEdit(){
            //     if(!this.user.isLogin){
            //         return false
            //     }
            //     location.href = 
            //         "http://www.mytian.com.cn/myt_activity/activityCenter/#/center/info?openId=" +
            //         this.userOpenId
            // },
            toAddress() {
                this.isLogin().then(res =>{
                    this.$router.push({
                        path: this.$route.path + '/address',
                        query: { from: "my" }
                    })
                })
            },
            toMyOrder(){
                this.isLogin().then(res =>{
                    this.$router.push({path:  this.$route.path+'/myorder'})
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/main.less';
    #my {
        .info {
            background: #fff;
            display: flex;
            align-items: center;
            padding: 10px 20px;
            position: relative;
            color: @black;
            img {
                width: 20%;
                margin-right: 5px;
                border-radius: 1000px;
            }
            .bind {
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 16px;
                background: @red;
                color: #fff;
                font-weight: lighter;
                padding: 5px 15px;
                border-radius: 5px;
                text-decoration: none;
            }
            .num{
                width: 100%;
                .alias {
                    font-size: 16px;
                    display: flex;
                    align-items: flex-start;
                    .edit{
                        width: 15px;
                        margin-left: 5px;
                        img{
                            width: 100%;
                        }
                    }
                }
                .ANum{
                    margin-top:5px;
                    font-size: 16px;
                    color:@darkerGray;
                    display: flex;
                    width: 100%;
                    align-items: center;
                    justify-content: space-between;
                    .unbundling{
                        color:#fff;
                        background:@red;
                        padding:3px 8px;
                        border-radius: 5px;
                        font-size: 14px;
                        margin-left: 5px;
                    }
                }
            }
            
        }
        
        .lists {
            margin-top: 5px;
        }
    }
</style>