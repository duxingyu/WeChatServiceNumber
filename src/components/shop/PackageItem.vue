<template>
    <div class="packages-item" @click="BuyPackage">
        <img class="package-image" :src="data.good_img" alt="">
        <div class="jiaobiao" v-if="type">
            <img :src="corner" alt="">
            <span>{{type}}</span>
        </div>
        <div class="packages-buybtn">
            <div>
                <del class="packages-orprice">￥{{data.original_price/100}}</del>
                <div class="packages-price">
                    ￥<span>{{data.price / 100}}</span>
                </div>
            </div>
        </div>
        <div class="packages-buynum" v-if="data.buy_num">
            <img :src="buyNumBg" alt="">
            <span class="num">
                {{data.buy_num}} 购买
            </span>
        </div>
        
    </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
    props:["data","index"],
    computed:{
        corner(){
            return require("@image/shop/package_corner.png")
        },
        buyNumBg(){
            return require("@image/shop/package_buynum_bg.png")
        },
        type(){
            switch(this.index){
                case 0:
                case 1:
                    return "HOT";
                break;
                case 2:
                case 3:
                case 4:
                     return "推荐";
                break;
                default:
                    return
                break;
            }
        }
    },
    methods:{
        ...mapActions(["buyCourse"]),
        BuyPackage(){
            // console.log(this.data)
            let options = {}
            options.goodId = this.data.good_id
            options.price = this.data.price
            options.title = this.data.title
            if(this.data.need_address){
                options.goodType = 3
            }else{
                 options.goodType = 1
            }
            this.buyCourse(options)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.packages-item{
    font-size: 12px;
    width: 23%;
    margin:5px 1% 0;
    position: relative;
    img{
        width: 100%;
    }
    .jiaobiao{
        position: absolute;
        right: 0;
        top: 0;
        width: 32%;
        span{
            position: absolute;
            color:@red2;
            left: 60%;
            top: 40%;
            transform:translate(-50%,-50%) rotate(45deg); 
            white-space: nowrap;
            text-align: center;
            font-weight: bold;
        }
    }
    .packages-buybtn{
        width: 90%;
        height:15%;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translateX(-50%);
        border:1px solid #3BAFBD;
        background: #fff;
        color:@red;
        &>div{
            display: flex;
            justify-content: center;
            align-items: center;
            .packages-price{
                font-size: 12px;
                margin-left: 1px;
                font-weight: bold;
                span{
                    font-size: 16px;
                }
            }
        }
    }
    .packages-buynum{
        color:#fff;
        position: absolute;
        bottom: 1%;
        width: 80%;
        left: 10%;
        .num{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            white-space: nowrap;
            color:@red;
        }
    }
}

</style>
