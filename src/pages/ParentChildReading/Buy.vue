<template>
    <div id="reading-buy" ref="reading-buy">
        <img v-for="itme in images" :src="itme" alt="">
        <div class="bottom" @click="buy" ref="buy-btn">
            <img :src="btnImage" alt="">
            <div class="price">
                {{title}}: ￥ <span>{{price / 100}}</span>
            </div>
        </div>
        <Loading type="1" v-if="loadingShow"></Loading>
    </div>
</template>

<script>
    import Loading from "@components/Loading"

    import { mapState } from "vuex"
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
            images(){
                return [
                    require("@image/ParentChildReading/details01.png"),
                    require("@image/ParentChildReading/details02.png"),
                    require("@image/ParentChildReading/details03.png"),
                    require("@image/ParentChildReading/details04.png"),
                    require("@image/ParentChildReading/details05.png"),
                    require("@image/ParentChildReading/details06.png"),                   
                    require("@image/ParentChildReading/details07.png"),
                ]
            },
            btnImage(){
                return  require("@image/ParentChildReading/buy.png")
            }
        },
        methods:{
            buy(){
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
            this.$nextTick((res) =>{
                let h = this.$refs["buy-btn"].offsetHeight
                this.$refs["reading-buy"].style.paddingBottom = h + "px"
            })
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#reading-buy{
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
}
</style>
