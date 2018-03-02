<template>
    <div class="order-detail">
        <div class="order-info">
            <div class="order-title">{{data.title}}</div>
            <div class="goods">
                <img :src="data.good_img" alt="" class="goods-image">
                <div class="goods-des">
                    <p class="title">购买{{data.title}}</p>
                    <p class="des">{{data.content}}</p>
                </div>
                <div class="goods-price">
                    <p class="price">￥{{data.discount_price}}</p>
                    <del class="originPrice">￥{{data.original_price}}</del>
                </div>
            </div>
            <div class="order-2 padding">
                <p class="p-margin">账户: {{data.phone}}</p>
                <p class="p-margin">订单编号: {{data.out_trade_no}}</p>
                <p class="p-margin">下单时间: {{data.order_time}}</p>
            </div>
            <div class="order-3 padding">
                <p class="p-margin">支付方式: {{data.pay_channel}}</p>
            </div>
            <div class="order-4 padding">
                <div class="space-between p-margin">
                    <span>商品总额</span><span>￥{{data.original_price}}</span>
                </div>
                <div class="space-between p-margin">
                    <span>商品优惠</span><span>-￥{{data.original_price-data.discount_price}}</span>
                </div>
                <div class="space-between p-margin" v-if="data.coupon_price">
                    <span>商品优惠券</span><span>-￥{{data.coupon_price}}</span>
                </div>
            </div>
            <div class="order-5 padding">
                <div class="space-between p-margin">
                    <span>实付款</span>
                    <span class="price">￥{{data.price}}</span>
                </div>
            </div>
            <div class="kefu padding">
                <div class="p-margin">电话:<a href="tel:4008521661">400-852-1661</a></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["data"]
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.order-info{
    width: 100%;
    background: #fff;
    color:@black;
    .order-title {
        background: @orange;
        color: #fff;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
    }
    .goods {
        display: flex;
        background: @lightGray;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        .goods-image {
            width: 18%;
            img{
                width: 100%;
            }
        }
        .goods-des {
            text-align: center;
            .des {
                color: @darkerGray;
                font-size: 10px;
                margin-top: 3px;
            }
        }
        .goods-price {
            text-align: center;
            .originPrice {
                color: @darkerGray;
            }
        }
    }        
    .order-5 .price {
        color: #f05c62
    }
    .kefu {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 5px 2px #ddd;
    }
}
.padding {
    padding: 10px 10px 5px;
    color: #585858;
    border-bottom: 1px solid #f0f0f0;
}
.p-margin {
    margin-bottom: 5px;
}        
.space-between{
    display: flex;
    justify-content: space-between;
}       
        
       
</style>
