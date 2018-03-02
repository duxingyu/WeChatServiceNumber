<template>
    <div id="daily-list">
        <Loading v-if="LoadingShow"></Loading>
        <div class="item" v-for="(val,index) in DayReportList" @click="ToDaily(index)">
            <div class="time">
                {{GetTime(index)}}
            </div>
            <p class="degree">
                宝宝已经完成{{GetUntils(index)}}单元学习内容,已经完成课程的学习目标。
            </p>
            <div class="detail">
                <p>对应单元: {{GetUntils(index)}}</p>
                <p>学习时间: {{GetTime(index)}}</p>
                <p>学习效果: {{val.studyEffection}}</p>
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
import { GetStudyDayReport } from "@interface"
import { CopyObject } from "@common"

export default {
    components:{
        Loading
    },
    data(){
        return {
            LoadingShow:false,
            DayReportList:[],
        }
    },
    computed:{
        ...mapState(["user","classId","learnlogCurrentClassName"]),
    },
    methods:{
        ...mapMutations(["SetStudyDayReportDetailParames"]),
        GetTime(index){
            let DayReportTemp = this.DayReportList[index]
            let Time = DayReportTemp.studyTime.split("-")
            return Time[0]+"年"+Time[1]+"月"+Time[2]+"日"
        },
        GetUntils(index){
            let DayReportTemp = this.DayReportList[index]
            let ClzIds = DayReportTemp.clzIds
            let ArrTemp = []
            for(var i = 0; i < ClzIds.length; i++){
                ArrTemp[i] = ClzIds[i]
                ArrTemp[i] = ArrTemp[i].match(/[0-9]{2}$/)[0]
                ArrTemp[i] = parseInt(ArrTemp[i])
            }
            return ArrTemp.join(",")
        },
        ToDaily(index){
            let DayReportTemp = this.DayReportList[index]
            this.SetStudyDayReportDetailParames(DayReportTemp)
            this.$router.push({path:"/learnlog/daily"})
        }
    },
    beforeMount(){
        document.title = this.learnlogCurrentClassName + "日报"
        if(this.classId){
            let options = {
                uid:this.user.uid,
                cid:this.classId
            }
            this.LoadingShow = true
            GetStudyDayReport(options).then(res =>{
                this.LoadingShow = false
                this.DayReportList = res.studyDailyReportVO
            })
        }else{
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
@import '../../assets/css/main.less';
#daily-list{
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
            &>p{
                margin:3px 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
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

