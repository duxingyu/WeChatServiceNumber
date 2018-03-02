<template>
    <div class="learning-status" @click="ShowTips">
        <div>
            <div class="icon">
                <img :src="iconUrl[0]" alt="">
            </div>
            <p>已掌握</p>
        </div>
         <div>
            <div class="icon">
                <img :src="iconUrl[1]" alt="">
            </div>
            <p>未掌握</p>
        </div>
         <div>
            <div class="icon">
                <img :src="iconUrl[2]" alt="">
            </div>
            <p>未学习</p>
        </div>
        <img class="question-mark" :src="iconUrl[4]" alt="">
        <div class="tips" v-show="tipsShow">
            <div class="content">
                <div class="text">
                    是否掌握<br/>以宝宝最后一次学习记录为准
                </div>
                <div class="btn">
                    我知道了
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            tipsShow:false
        }
    },
    computed:{
        iconUrl(){
            return [
                require("@image/learnlog/knowledge_icon1.png"),
                require("@image/learnlog/knowledge_icon2.png"),
                require("@image/learnlog/knowledge_icon3.png"),
                require("@image/learnlog/knowledge_icon4.png"),
                require("@image/learnlog/knowledge_icon5.png"),
            ]
        }
    },
    methods:{
        ShowTips(){
            this.tipsShow = !this.tipsShow
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.learning-status{
    position: relative;
    display: flex;
    text-align: center;
    justify-content: space-around;
    color:@darkerGray;
    border:2px solid @darkOrange;
    border-radius: 8px;
    padding:5px 0;
    .icon{
        width: 20px;
        margin:0 auto 5px;
        img{
            width: 100%;
            display: block;
        }
    }
    .question-mark{
        position: absolute;
        right: 2%;
        top: 10%;
        width: 4%;
    }
    .tips{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        top: 0;
        left:0;
        z-index: 99;
        .content{
            position: absolute;
            // width: 80%;
            top: 50%;
            left:50%;
            transform: translate(-50%,-50%);
            background: #fff;
            border-radius: 8px;
            padding: 20px;
            .text{
                font-size: 16px;
                color:@blue1;
                white-space: nowrap;
            }
            .btn{
                display: inline-block;
                font-size: 18px;
                color:@darkOrange;
                background: @yellow;
                padding:5px 30px;
                border-radius: 100px;
                margin-top: 20px;
            }
        }
    }
}
</style>
