<template>
    <div class="lists">
        <img :src="imgUrl">
        <span>{{name}}</span>
        <img src="../../assets/images/shop/ic_arrow.png" class="right">
    </div>
</template>

<script>
export default {
    data(){
        return {
            imgUrl:''
        }
    },
    props:['icon','name'],
    mounted(){
        this.imgUrl = require('../../assets/images/shop/ic_'+this.$props['icon']+'.png')
    }
}
</script>

<style lang="less" scoped>
    @import '../../assets/css/main.less';
    .lists{
        background: #fff;
        display: flex;
        align-items: center;
        padding: 2px 20px;
        position: relative;
        img{
            width: 15%;
            margin-right: 5px;
        }
        span{
            font-size: 14px;
            color:@darkerGray;
        }
        .right{
            position: absolute;
            width: 7%;
            right:20px;
            top:50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
        }
    }
</style>
