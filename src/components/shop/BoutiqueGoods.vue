<template>
    <div class="boutique-goods" @click="BuyGoods">
        <img class="jiaobiao" :src="hotJb" v-show="!isHot">
        <img :src="goodsBgUrl" alt="">
        <img class="goods-img" :src="data.good_img"> 
        <div class="title" v-html="title"></div>
        <div class="price">
            <img :src="goodsPriceBgUrl" alt="">
            <span><span class="icon">￥</span>{{data.price/100}}</span>
        </div>
        <span class="buynum">{{data.buy_num?data.buy_num:0}}</span>
        <span class="commentnum">{{data.comment_num?data.comment_num:0}}</span>
    </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
    props:["data","isHot"],
    computed:{
        hotJb(){
            return require("@image/shop/boutique_hot_bqgoods.png")
        },
        goodsBgUrl(){
            return require("@image/shop/boutique_goods_bg.png")
        },
        goodsPriceBgUrl(){
            return require("@image/shop/boutique_goods_price_bg.png")
        },
        title(){
            let t = this.data.title
            if(t.length > 7){
                t = t.replace(t[6],t[6]+"<br/>")
            }
            return t
        }
    },
    methods:{
        ...mapActions(["buyCourse"]),
        BuyGoods(){
            let options = {}
            options.title = this.data.title
            options.goodId = this.data.good_id
            options.price = this.data.price
            options.goodType = 2
            this.buyCourse(options)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.boutique-goods{
    font-size: 12px;
    font-size: 3.2vw;
    overflow: hidden;
    color:@brown;
    img{
        width: 100%;
        display: block
    }
    position: relative;
    .goods-img{
        position: absolute;
        top:0%;
        width: 100%;
        left: 0%;
    }
    .title{ 
        position: absolute;
        top:58%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        white-space: nowrap;
    }
    .price{
        position: absolute;
        top:69%;
        width: 70%;
        left: 15%;
        &>span{
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            top: 48%;
            font-size: 15px;
            font-size: 4.8vw;
            color:#fff;
            white-space: nowrap;
            .icon{
                font-size: 12px;
                font-size: 3.2vw;
            }
        }
    }
    .buynum{
        position: absolute;
        right: 69%;
        bottom: 6.5%;
        -webkit-transform: translateY(50%);
        transform: translateY(50%);
    }
    .commentnum{
        position: absolute;
        left: 65%;
        bottom: 6.5%;
        -webkit-transform: translateY(50%);
        transform: translateY(50%);
    }
    .jiaobiao{
        position: absolute;
        top: 0;
        width: 40%;
        left: 0;
        z-index: 99;
    }
}
</style>

