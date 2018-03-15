<template>
    <div class="bottom" @click="buy" ref="buy-btn">
        <img :src="btnImage" alt="">
        <div class="price">
            {{title}}: ￥ <span>{{price / 100}}</span>
        </div>
        <Loading type="1" v-if="loadingShow"></Loading>
    </div>
</template>

<script>
    import Loading from "@components/Loading"

    import { mapState } from "vuex"
    import { mapActions } from "vuex"
    import { buyKernel } from '@interface'
    import { callWxJsPay } from '@interface'
    import { getWxReadGoodList } from '@interface'
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
                price:0
            }
        },
        computed:{
            ...mapState(["userOpenId","user"]),
            btnImage(){
                return  require("@image/ParentChildReading/buy.png")
            }
        },
        methods:{
            ...mapActions(["isLogin"]),
            buy(){
                if(this.$route.path == "/reading"){
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
