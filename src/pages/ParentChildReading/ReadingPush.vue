<template>
    <div id="reading-push">
        <div class="view-goods-detail" v-if="!isShow">
            <GoodsDetail></GoodsDetail>
            <div class="join" @click="setBindPageShow(true)">
                立即参加
            </div>
        </div>
        <ReadingPushContent v-if="isShow"></ReadingPushContent>
    </div>
</template>

<script>
    import GoodsDetail from "@components/ParentChildReading/GoodsDetail"
    import ReadingPushContent from "./ReadingPushContent"
    import { wxShareOptions } from "@common"
    import { mapState } from "vuex"
    import { mapMutations } from "vuex"

    export default {
        components:{
            GoodsDetail,ReadingPushContent
        },
        data(){
            return{
                isShow:false
            }
        },
        computed:{
            ...mapState(["user"])
        },
        methods:{
            ...mapMutations(["setBindPageShow"]),
        },
        beforeMount(){
            wxShareOptions({
                title: "麦田亲子阅读",
                link: "http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-push",
                imgUrl: "http://www.mytian.com.cn/myhtml/readbook/images/logo.png",
                desc: "用心还原孩子的世界",
            })

            if(this.user.isLogin){
                this.isShow = true
            }
        },
        watch:{
            user(){
                if(this.user){
                    this.isShow = this.user.isLogin
                }
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#reading-push{
    .view-goods-detail{
        padding-bottom: 46px;
        .join{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            color: #fff;
            background: @red;
            font-size: 20px;
            letter-spacing: 8px;
            padding: 10px 0;
        }
    }
}
</style>

