<template>
    <div>
        <router-view v-if="isShow"></router-view>
    </div>
</template>
<script>
    import { wxShareOptions } from "@common"
    import { mapActions } from "vuex"
    import { mapState } from "vuex"

    export default {
        data(){
            return {
                isShow:false
            }
        },
        computed:{
            ...mapState(["user"]),
        },
        methods:{
            ...mapActions(["isLogin"])
        },
        beforeMount(){
            localStorage.wxUserInfo = JSON.stringify(this.user)

            wxShareOptions({
                title: "麦田亲子阅读",
                link: "http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-share&uid=" + this.user.uid,
                imgUrl: "http://www.mytian.com.cn/myhtml/readbook/images/logo.png",
                desc: "用心还原孩子的世界",
            })

            this.isLogin(true).then(res =>{
                this.isShow = true
            })
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
