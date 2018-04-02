<template>
    <div class="bottom" @click="buy" ref="buy-btn">
        <div v-if="!isFree">
            <img :src="btnImage[0]" alt="">
            <div class="price">
                {{title}}: ￥ <span>{{price / 100}}</span>
            </div>
            <Loading type="1" v-if="loadingShow"></Loading>
        </div>
        <div v-else>
            <img :src="btnImage[1]" alt="">
        </div>
    </div>
</template>

<script>
    import Loading from "@components/Loading"

    import { mapState } from "vuex"
    import { mapMutations } from "vuex"
    import { mapActions } from "vuex"
    import { buyKernel } from '@interface'
    import { callWxJsPay } from '@interface'
    import { getWxReadGoodList } from '@interface'
    import { updateUserAction } from '@interface'
    import { logoutMessage } from '@common'

    export default {
        components:{
            Loading
        },
        data(){
            return{
                loadingShow:false,
                title:"",
                goodId:"",
                price:0,
                isFree:true
            }
        },
        computed:{
            ...mapState(["userOpenId","user","readingFreeToBuy"]),
            btnImage(){
                return  [
                    require("@image/ParentChildReading/buy.png"),
                    require("@image/ParentChildReading/enroll.png"),
                ]
            }
        },
        methods:{
            ...mapMutations(["setReadingFreeToBuy"]),
            ...mapActions(["isLogin"]),
            buy(){
                if(this.$route.path == "/reading" ||　this.$route.path == "/reading/"){
                    this.setReadingFreeToBuy(true)
                    this.$router.push({path:"/reading/buy"})
                    return
                }
                this.isLogin().then(res =>{
                    this.pay()
                })
            },
            pay(){
                this.loadingShow = true
                buyKernel({
                    openId:this.userOpenId,
                    uid:this.user.uid, 
                    token:this.user.token, 
                    kernelId:this.goodId, 
                }).then(res =>{
                    this.loadingShow = false
                    if (res.result == 1) {
                        callWxJsPay(res.orderInfo,() =>{
                            let option = {}
                            option.uid = this.user.uid
                            option.token = this.user.token
                            if(this.readingFreeToBuy){
                                option.actionId = 16
                            }else{
                                option.actionId = 17
                            }
                            updateUserAction(option)
                            this.$router.replace({path: "/reading/push"})
                        })
                    } else if (res.result == -1) {
                        logoutMessage('被登出请<br/>重新进入')
                    } else {
                        logoutMessage(res.description)
                    }
                })
            }
        },
        beforeMount(){
            if(this.$route.path == "/reading" || this.$route.path == "/reading/"){
                this.isFree = true
                return
            }else{
                this.isFree = false
            }

            this.loadingShow = true
            getWxReadGoodList().then(res =>{
                this.loadingShow = false
                this.title = res.list[0].content
                this.goodId = res.list[0].goodId
                this.price = res.list[0].price
            })
            
        },
        mounted(){
            this.$nextTick((res) =>{
                let h = this.$refs["buy-btn"].offsetHeight
                this.$parent.$el.style.paddingBottom = h + "px"
            })
        },
        watch:{
            user(){
               this.pay() 
            }
        }
    }
</script>

<style lang="less">
@import '../../assets/css/main.less';
.bottom{
        position: fixed;
        width: 100%;
        bottom:0%;
        .price{
            position: absolute;
            bottom: 5%;
            left: 28%;
            color:@red;
            font-size: 12px;
            font-size: 3.2vw;
            span{
                font-size: 20px;
            }
        }
    }
</style>
