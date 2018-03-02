<template>
    <div class="order-item" @click="ViewDetail">
        <div class="order">
            <div class="order-title">{{data.title}}</div>
            <div class="goods">
                <div class="goods-image">
                    <img :src="data.good_img" alt="">
                </div>   
                <div class="goods-des">
                    <p class="title">购买{{data.title}}</p>
                    <p class="des">{{data.content}}</p>
                </div>
                <div class="goods-price">
                    <p class="price">￥{{data.discount_price}}</p>
                    <del class="originPrice">￥{{data.original_price}}</del>
                </div>
            </div>
            <div class="order-des">
                <span>共{{data.good_num}}件商品</span>
                <span class="order-price">
                    合计:<span class="price"> ￥{{data.price}}</span>
                </span>
                <span class="order-status">{{data.order_status}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['data'],
        methods:{
            ViewDetail(){
                this.$emit("ViewDetail",this.data.order_id)
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    .order {
        width: 100%;
        background: #fff;
        box-shadow: 0 0 5px 2px @darkGray;
        color:@black;
        .order-title {
            background: @orange;
            color: #fff;
            text-align: center;
            line-height: 28px;
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
        .order-des {
            padding: 8px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .order-status {
                color: @red;
            }
            .order-price .price {
                font-size: 16px;
            }
        }
    }
    
    
     
    
    
    
    
</style>