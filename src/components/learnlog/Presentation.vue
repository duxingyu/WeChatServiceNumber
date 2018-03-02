<template>
    <div class="presentation">
        <!-- <div class="review">
            <img :src="reviewUrl" alt="">
        </div> -->
        <div class="study-repor">
            <div @click="ToDailyList">
                <img :src="ReporUrl[0]" alt="">
            </div>
            <div @click="ToMonthlyReport">
                <img :src="ReporUrl[1]" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    computed:{
        reviewUrl(){
            return require("@image/learnlog/presentation_review.png")
        },
        ReporUrl(){
            return [
                require("@image/learnlog/learnlog_daily.png"),
                require("@image/learnlog/learnlog_monthlyreport.png"),
            ]
        }
    },
    methods:{
        ToDailyList(){
            this.$router.push({path:"/learnlog/dailylist"})
        },
        ToMonthlyReport(){
            this.$router.push({path:"/learnlog/monthlyreportlist"})
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.presentation{
    img{
        width: 100%;
        display: block;
    }
    .study-repor{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        &>div{
            width: 49%;
            box-shadow: 0 0 5px 0px @darkGray;
            border-radius: 5px;
        }
    }
}
</style>
