<template>
    <div id="gift">
        <img :src="images[0]" alt="">
        <div class="content" 
        v-for="(val,index) in giftList">
            <img :src="images[1]" alt="">
            <div class="gift">
                <img :src="images[3]" alt="">
                <div class="text">
                    <p>您购买了{{val.goodName}}</p>
                    <p>获得{{val.giftName}}</p>
                </div>
                <img class="btn" :src="images[4]" v-if="!val.status"
                @click="determine(index)">
                <img class="btn" :src="images[5]" v-if="val.status">
            </div>
        </div>
        <img :src="images[1]" alt="" v-for="i in count">
        <img :src="images[2]" alt="">
        <div class="popu" v-if="popuShow">
            <div class="close" @click="closePopu"></div>
            <div class="content">
                <div class="title">确认地址信息</div>
                <div class="name">
                    <label>收件人:</label><span>{{user.address.addressee}}</span>
                </div>
                <div class="phone">
                    <label>电话:</label><span>{{user.address.phone}}</span>
                </div>
                <div class="detail">
                    <label>地址:</label>
                    <span>{{user.address.province + user.address.city + 
                    user.address.area + " " + user.address.detail_addr}}</span>
                </div>
                <div class="ps">
                    *由于春节销售火爆，节后（正月初八）起按付款先后顺序发货
                </div>
                <div class="btn modify" @click="modifyAddress">
                    修 改
                </div>
                <div class="btn queding" @click="receiveGift">   
                    确 定
                </div>
            </div>
        </div>
        <Loading type="1" v-show="loadingShow"></Loading> 
    </div>
</template>
<script>
import Loading from "@components/Loading"

import { mapState } from "vuex"
import { mapActions } from "vuex"
import { getUnclaimedGiftList } from "@interface"
import { receiveGift } from "@interface"
import {logoutMessage} from "@common"

export default {
    components:{Loading},
    data(){
        return{
            giftList:[],
            count:4,
            popuShow:false,
            index:0,
            loadingShow:false,
        }
    },
    computed:{
        ...mapState(["user"]),
        images(){
            return [
                require("@image/gift/weixin_bg_01.png"),
                require("@image/gift/weixin_bg_02.png"),
                require("@image/gift/weixin_bg_03.png"),
                require("@image/gift/weixin_bg_04.png"),
                require("@image/gift/button_receive.png"),
                require("@image/gift/button_already_receive.png"),
            ]
        },
        userUid(){
            return this.user.uid
        }
    },
    methods:{
        ...mapActions(["isLogin"]),
        init(){
            let option = {
                uid:this.user.uid,
                token:this.user.token,
            }
            this.loadingShow = true
            getUnclaimedGiftList(option).then(res =>{
                 this.loadingShow = false
                if(res.list.length){
                    this.giftList = res.list
                    if(res.list.length <= 4){
                        this.count = 4 - res.list.length
                    }else{
                        this.count = 0
                    }
                }else{
                    alert("您还没有购买任何套餐")
                }
            })
        },
        modifyAddress(){
            this.$router.push({path:"/my/address"})
        },
        determine(index){
            if(!this.user.address){
                if(alert("请先填写地址")){
                    this.$router.push({path:"/my/address"})
                }
            }else{
                this.popuShow = true
                this.index = index
            }
        },
        receiveGift(){
            let option = {
                uid:this.user.uid,
                token:this.user.token,
                payId:this.giftList[this.index].payId
            }
            this.loadingShow = true
            receiveGift(option).then(res =>{
                this.loadingShow = false
                this.giftList[this.index].status = 1
                this.popuShow = false
                logoutMessage("领取成功")
            })
        },
        closePopu(){
            this.popuShow = false
        }  
    },
    beforeMount(){
        console.log(this.user)
        this.isLogin(true).then(res =>{
            this.init()
        })
    },
    watch:{
        userUid(){
            this.init()
        }
    }
}
</script>
<style lang="less" scoped>
#gift{
    &>.content{
        position: relative;
        .gift{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 85%;
            .text{
                position: absolute;
                top: 50%;
                left: 36%;
                transform: translate(-50%, -50%);
                text-align: center;
                width: 65%;
                font-size: 14px;
                font-size: 4vw;
                color:#d03020;
            }
            .btn{
                position: absolute;
                top: 50%;
                right: 15%;
                transform: translate(50%, -50%);
                width: 26%;
            }
        }
    }
    .popu{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        .close{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .content{
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%, -50%);
            padding:10px;
            border-radius:8px;
            background: #fff;
            width: 60%;
            .title{
                font-size: 16px;
                text-align: center;
                font-weight: bold;
            }
            .name{
                margin:10px 0;
            }
            .detail{
                margin:10px 0;
            }
            .ps{
                font-size: 12px;
                color:#d70c00;
            }
            .btn{
                width: 80%;
                margin:15px auto;
                text-align: center;
                background: #f05c62;
                color:#fff;
                font-size: 18px;
                height: 32px;
                line-height: 32px;
                border-radius: 5px;
            }
            .queding{
                background: #FFC100;
                margin-bottom: 0px;
            }
        }
    }
}
</style>
