<template>
    <div class="word-card">
        <div class="type1" :style="Style" v-if="!index">
            <img class="icon" :src="iconUrl" alt="">
            <span class="text">{{data}}</span>
        </div>
        <div class="type2" :style="Style" v-if="index">
            <span>{{data}}</span>
            <img class="icon" :src="iconUrl" alt="">
        </div>
    </div>
</template>
<script>
export default {
    props:["index","type","data"],
    computed:{
        iconUrl(){
            switch(this.type){
                case 0:
                    return require("@image/learnlog/knowledge_icon1.png")
                break;
                case 1:
                    return require("@image/learnlog/knowledge_icon2.png")
                break;
                case -1:
                    return require("@image/learnlog/knowledge_icon3.png")
                break;
            }
        },
        Style(){
            switch(this.type){
                case 0:
                    return "border-color:#DEFACC;background:#EEFFE4"
                break;
                case 1:
                    return "border-color:#FFE3E0;background:#FFF4F2"
                break;
                case -1:
                    return "border-color:#E3E3E3;background:#E3E3E3"
                break;
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
@green2:#DEFACC;
@green3:#EEFFE4;
@pink1:#FFE3E0;
@pink2:#FFF4F2;
@gray:#E3E3E3;
.word-card{
    display: inline-block;
    // font-family: "kaiti";
    .type1{
        width: 33px;
        height: 48px;
        border:2px solid @green2;
        border-radius: 5px;
        background: @green3;
        position: relative;
        font-size:14.8px;
        .icon{
            position: absolute;
            width: 40%;
            bottom:5%;
            left: 50%;
            transform: translateX(-50%)
        }
        .text{
            transform: translate(-50%,-50%);
            position: absolute;
            top: 30%;
            left: 50%;
            white-space: nowrap;
        }
    }
    .type2{
         border-radius: 5px;
         border:2px solid @green2;
         height:22px;
         display: flex;
         align-items: center;
         padding:0 5px;
         font-size: 12px;
         .icon{
             width: 12px;
             display: block;
             margin-left:5px;
         }
    }
}
</style>
