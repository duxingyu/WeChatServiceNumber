<template>
    <div class="course-item" @click="BuyGoods">
        <div class="jiaobiao" v-if="data.discount != '10折'">
            <img :src="cornerUrl" alt="">
            <span>{{data.discount}}</span>
        </div>
        <img :src="goodsImg" alt="">
        <div class="buyBtn" v-if="isShowPrice">
            <div>
                <del>￥{{data.original_price / 100}}</del>
                <div class="price">
                    ￥<span>{{data.price / 100}}</span>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
    import { mapActions } from "vuex"
    import { mapState } from "vuex"

    export default {
        props:['data'],
        computed:{
            cornerUrl(){
                return require("@image/shop/course_corner.png")
            },
            goodsImg(){
                return "http://www.mytian.com.cn/myhtml/wx/images/shop/course/" + 
                this.data.good_id + ".png?v=" + (new Date().getTime())
            },
            //处理天才套餐
            isShowPrice(){
                if(this.data.class_type == "ALL"){
                    return false
                }
                return true
            }
        },
        methods:{
            ...mapActions(["buyCourse"]),
            BuyGoods(){
                if(!this.isShowPrice){
                    this.$router.push({path:"/shop/packages"})
                    return
                }
                let options = {}
                options.goodId = this.data.good_id
                options.price = this.data.price
                options.title = this.data.title
                console.log(this.data.need_address)
                if(this.data.need_address){
                    options.goodType = 3
                }else{
                    options.goodType = 1
                }
                
                this.buyCourse(options)
            }
        }
    }
</script>
<style lang="less">
@import '../../assets/css/main.less';
.course-item{
    position: relative;
    font-size: 12px;
    img{
        width: 100%;
        display: block;
    }
    .jiaobiao{
        position: absolute;
        right: 0;
        top: 0;
        width: 30%;
        span{
            position: absolute;
            color:#d70c00;
            left: 60%;
            top: 40%;
            transform:translate(-50%,-50%) rotate(45deg); 
            font-size: 12px;
            font-weight: bolder;
            white-space: nowrap;
            text-align: center;
        }
    }
    .buyBtn{
        width: 90%;
        height:15%;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 81%;
        left: 50%;
        transform: translateX(-50%);
        border:1px solid #3BAFBD;
        background: #fff;
        color:@red;
        &>div{
            display: flex;
            justify-content: center;
            align-items: center;
            .price{
                font-size: 12px;
                font-weight: bold;
                margin-left: 1px;
                span{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>