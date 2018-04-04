<template>
    <div class="bottom" @click="buy" ref="buy-btn">
        <div v-if="!isFreePage && isWx">
            <img :src="btnImage[0]" alt="">
            <div class="price">
                {{title}}: ￥ <span>{{price / 100}}</span>
            </div>
            <Loading type="1" v-if="loadingShow"></Loading>
        </div>
        <div v-else>
            <img :src="btnImage[1]" alt="">
        </div>
        <div class="code" v-if="codeIsShow">
            <div @click.stop="closeCode"></div>
            <img :src="btnImage[2]" alt="">
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
    import { isWeiXin } from "@common";

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
                isFreePage:true,
                isWx:false,
                codeIsShow:false
            }
        },
        computed:{
            ...mapState(["userOpenId","user","readingFreeToBuy"]),
            btnImage(){
                return  [
                    require("@image/ParentChildReading/buy.png"),
                    require("@image/ParentChildReading/enroll.png"),
                    require("@image/ParentChildReading/pop_code.png"),
                ]
            },
        },
        methods:{
            ...mapMutations(["setReadingFreeToBuy"]),
            ...mapActions(["isLogin"]),
            closeCode(){
                this.codeIsShow = false
            },
            buy(){
                if(this.isFreePage){
                    this.setReadingFreeToBuy(true)
                    this.$router.push({path:"/reading/buy"})
                    return
                }

                if(!this.isWx){
                    this.codeIsShow = true
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
            },
        },
        beforeMount(){
            this.isWx = isWeiXin()

            if(this.$route.path == "/reading" || this.$route.path == "/reading/"){
                this.isFreePage = true
                return
            }else{
                this.isFreePage = false
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
                if(this.isFreePage){
                    h += 10
                }
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
        z-index: 99;
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
        .code{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            div{
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .7);
                top: 0;
                left: 0;
            }
            img{
                position: absolute;
                width: 80%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>
