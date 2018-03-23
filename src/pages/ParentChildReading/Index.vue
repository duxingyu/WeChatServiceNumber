<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    import { wxShareOptions } from "@common"
    
    export default {
        computed:{
            ...mapState(["user"])
        },
        beforeMount(){
            localStorage.wxUserInfo = JSON.stringify(this.user)

            wxShareOptions({
                title: "麦田亲子阅读",
                link: "http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-free",
                imgUrl: "http://www.mytian.com.cn/myhtml/readbook/images/logo.png",
                desc: "用心还原孩子的世界",
            })
        },
    }
</script>
