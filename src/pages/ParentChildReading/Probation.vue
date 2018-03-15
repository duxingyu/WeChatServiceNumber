<template>
    <div id="probation">
        <!-- <img :src="images[0]" alt=""> -->
        <Banner :images="banners"></Banner>
        <div class="tip">
            <img :src="images[0]" alt="">
        </div>
        <ClassItem :data="content"></ClassItem>
        <WhisperItme :data="content"></WhisperItme>
        <BuyBtn></BuyBtn>
    </div>
</template>

<script>
    import ClassItem from "@components/ParentChildReading/ClassItem"
    import WhisperItme from "@components/ParentChildReading/WhisperItme"
    import Banner from "@components/shop/Banner"
    import BuyBtn from "@components/ParentChildReading/BuyBtn"

    import { wxShareOptions } from "@common"
      
    export default {
        components:{
            ClassItem,WhisperItme,Banner,BuyBtn
        },
        computed:{
            images(){
                return [
                    require("@image/ParentChildReading/pic_txt.png"),
                ]
            },
            banners(){
                return [
                    {src:require("@image/ParentChildReading/free_banner_01.jpg")},
                    {src:require("@image/ParentChildReading/free_banner_02.jpg")},
                    {src:require("@image/ParentChildReading/free_banner_03.jpg")},
                ]
            },
            content(){
                return{
                    "readStatus":0,
                    "readTitle":"{内测}麦田亲子阅读— “用心还原孩子的世界” （儿童成长敏感叛逆期）",
                    "expertId":1,
                    "expertName":"小付",
                    "expertReadStatus":0,
                    "readContent":"不想吃饭",
                    "clazzIndex":3,
                    "readWordsCount":231,
                    "coverUrl":"http://mytianimg.oss-cn-shanghai.aliyuncs.com/1520406286341.png",
                    "expertImgUrl":"http://mytianimg.oss-cn-shanghai.aliyuncs.com/1520849681061.png",
                    "readIsFree":1,
                    "clazzType":"YC",
                    "expertHonor":"教授",
                    "whisperContent":"专家内容解读",
                    "expertTitle":"麦田首席测试",
                    "whisperUrl":"http://www.mytian.com.cn/myhtml/parents_whisper/lesson3_free/index.html",
                    "clazzId":31003,
                    "expertRemark":"test",
                    "whisperTitle":"悄悄话",
                    "time":"",
                    "readUrl":"http://www.mytian.com.cn/myhtml/readbook/lesson3_free/index.html"}
                }
        },
        beforeMount(){
            wxShareOptions({
                title: "麦田亲子阅读",
                link: "http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-free",
                imgUrl: "http://www.mytian.com.cn/myhtml/readbook/images/logo.png",
                desc: "用心还原孩子的世界",
            })
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#probation{
    .tip{
        background: #fff;
        padding: 10px 0;
        img{
            width: 70%;
            margin:0 auto;
        }
    }
}
</style>


