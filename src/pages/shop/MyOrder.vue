<template>
    <div id="myorder">
        <TopTitle title="我的订单"></TopTitle>
        <Loading v-if="isShowLoading"></Loading>
        <OrderItem v-for="val in orderList" 
        :data="val" @ViewDetail="ViewOrderDetail">
        </OrderItem>
        <div class="detail" v-show="showDetail && orderInfo">
            <div class="close" @click="hideDetail"></div>
            <OrderDetail :data="orderInfo"></OrderDetail>
        </div>
    </div>
</template>
<script>
    import TopTitle from '@components/shop/TopTitle'
    import Loading from "@components/Loading"
    import OrderItem from "@components/shop/OrderItem"
    import OrderDetail from "@components/shop/OrderDetail"
    

    import { mapState } from "vuex"
    import { GetOrderList } from "@interface"
    import { GetOrderDetail } from "@interface"
    import { logoutMessage } from "@common"

    export default {
        data(){
            return {
                orderList:[],
                orderInfo:'',
                showDetail:false,
                isShowLoading:true
            }
        },
        components:{
            TopTitle,OrderItem,Loading,OrderDetail
        },
        computed:{
            ...mapState(["user"]),
        },
        methods:{
            ViewOrderDetail(orderId){
                this.orderInfo = ''
                this.showDetail = false
                let options = {}
                options.uid = this.user.uid
                options.token = this.user.token
                options.orderId = orderId
                GetOrderDetail(options).then(res =>{
                    this.orderInfo = res.orderInfo
                    this.showDetail = true
                })
            },
            hideDetail(){
                this.showDetail = false
            }
        },
        beforeMount(){
            let options = {
                uid:this.user.uid,
                token:this.user.token,
            }
            GetOrderList(options).then(res =>{
                this.isShowLoading = false
                this.orderList = res.orderList
                if(res.orderList.length <= 0){
                    logoutMessage("订单列表为空,<br/>如果已经购买,<br/>请待会再重试!")
                }
            })
        }
    }
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#myorder{
    .order-item{
        width: 95%;
        margin:10px auto;
    }
    .detail{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        overflow: auto;
        .close{
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            top:0;
        }
        .order-detail{
            position: absolute;
            top: 20px;
            width: 95%;
            left:2.5%;
        }
    }
}
</style>
