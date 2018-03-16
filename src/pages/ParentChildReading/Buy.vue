<template>
    <div id="reading-buy">
        <GoodsDetail></GoodsDetail>
        <BuyBtn></BuyBtn>
    </div>
</template>

<script>
    import BuyBtn from "@components/ParentChildReading/BuyBtn"
    import GoodsDetail from "@components/ParentChildReading/GoodsDetail"
    import { wxShareOptions } from "@common"
    
    export default {
        components:{
            BuyBtn,GoodsDetail
        },
        beforeMount(){
            wxShareOptions({
                title: "麦田亲子阅读",
                link: "http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-buy",
                imgUrl: "http://www.mytian.com.cn/myhtml/readbook/images/logo.png",
                desc: "用心还原孩子的世界",
            })
        }
    }
</script>

<style lang="less" scoped>
#reading-buy{
    
}
</style>
