<template>
    <div id="monthly-report-list">
        <Loading v-show="LoadingShow"></Loading>
        <div class="item" v-for="val in studyMonthReportSummaryPageVOList" 
        @click="ToMonthlyReport(val)">
            <div class="time">
               {{GetTime(val.month)}}
            </div>
            <p class="degree">
                宝宝已经完成{{GetUntils(val.clzIds)}}单元学习内容,已经完成课程的学习目标。
            </p>
            <div class="detail">
                <div class="lf">
                    <label>学习天数:</label>
                    <span>{{val.studyDays}}</span>
                </div>
                <div class="lf">
                    <label>学习知识点:</label>
                    <span>{{val.studyKnowledgePoints}}</span>
                </div>
                <div class="lf">
                    <label>学习单元:</label>
                    <span>{{val.studyClzIds}}</span>
                </div>
                <div class="lf">
                    <label>正确率:</label>
                    <span>{{val.studyRightPercentage}}%</span>
                </div> 
                <div class="cl"></div>
            </div>
            <div class="btn">
                点击查看详情
            </div>
        </div>
    </div>
</template>
<script>
import Loading from "@components/Loading"

import { mapState } from "vuex"
import { mapMutations } from "vuex"
import { GetStudyMonthReportSummaryPage } from "@interface"

export default {
    components:{
        Loading
    },
    data(){
        return{
            LoadingShow:false,
            studyMonthReportSummaryPageVOList:[]
        }
    },
    computed:{
        ...mapState(["user","classId","learnlogCurrentClassName"])
    },
    methods:{
        ...mapMutations(["SetStudyMonthlyReportDetailParames"]),
        GetTime(studyTime){
            let Time =studyTime.split("-")
            return Time[0]+"年"+Time[1]+"月"
        },
        GetUntils(ClzIds){
            let ArrTemp = []
            for(var i = 0; i < ClzIds.length; i++){
                ArrTemp[i] = ClzIds[i]
                ArrTemp[i] =  ArrTemp[i].match(/[0-9]{2}$/)[0]
                ArrTemp[i] = parseInt(ArrTemp[i])
            }
            return ArrTemp.join(",")
        },
        ToMonthlyReport(val){
            this.SetStudyMonthlyReportDetailParames(val)
            this.$router.push({path:"/learnlog/monthlyreport"})
        }
    },
    beforeMount(){
        document.title = this.learnlogCurrentClassName + "月报"
        if(this.classId){
            let option = {
                uid:this.user.uid,
                cid:this.classId
            }
            this.LoadingShow = true
            GetStudyMonthReportSummaryPage(option).then(res =>{
                this.LoadingShow = false
                this.studyMonthReportSummaryPageVOList = res.studyMonthReportSummaryPageVOList
            })
        }else{
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#monthly-report-list{
    padding:0 10px;
    .item{
        background: #fff;
        margin:5px 0;
        border-radius: 8px;
        box-shadow: 0 0 5px 0px @darkGray;
        padding: 10px 15px;
        .time{
            color:@blue1;
            font-size: 18px;
            font-weight: bold
        }
        .degree{
            color:@blue1;
            margin:5px 0;
            font-size: 14.6px;
            word-break: break-all;
        }
        .detail{
            color:@blue;
            &>div{
                width: 50%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin:5px 0;
                font-size: 14.6px;
                label{
                    display: inline-block;
                    // width: 64px;
                    text-align: center
                }
            }
        }
        .btn{
            margin:10px 0;
            text-align: center;
            text-decoration: underline;
            color:@darkOrange;
        }
    }
}
</style>
