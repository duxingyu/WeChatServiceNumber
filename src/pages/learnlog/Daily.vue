<template>
    <div id="daily">
        <Loading type="1" v-show="loadingShow"></Loading>
        <LearningTime :data="StudyTimeVO" 
        v-if="StudyTimeVO">
        </LearningTime>
        <div class="study-detail" 
        v-for="(val,index) in StudyDetailContentlist">
            <DailyLearningDetail :data="val">
            </DailyLearningDetail>
            <div class="proposal">
                <div class="title">
                    *学习建议
                </div>
                <span>
                    {{StudySuggestionVOList[index].suggestContent}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import LearningTime from "@components/learnlog/LearningTime"
import DailyLearningDetail from "@components/learnlog/DailyLearningDetail"
import Loading from "@components/Loading"

import { mapState } from "vuex"
import { GetStudyDayDetailReport } from "@interface"

export default {
    components:{
        LearningTime,DailyLearningDetail,Loading
    },
    data(){
        return{
            loadingShow:false,
            StudyTimeVO:null,
            StudyDetailContentlist:[],
            StudySuggestionVOList:[]
        }
    },
    computed:{
        ...mapState(["user","StudyDayReportDetailParames"])
    },
    beforeMount(){
        let studyTime = this.StudyDayReportDetailParames.studyTime
        if(studyTime){
            let ArrTemp = []
            for(var i in this.StudyDayReportDetailParames.clzIds)
            {
                let ObjTem = {cid:""}
                ObjTem.cid = this.StudyDayReportDetailParames.clzIds[i]
                ArrTemp.push(ObjTem)
            }
            let options = {
                uid:this.user.uid,
                cids:JSON.stringify(ArrTemp),
                time:studyTime
            }
            this.loadingShow = true
            GetStudyDayDetailReport(options).then(res =>{
                this.loadingShow = false
                this.StudyTimeVO = res.studyDailyReportVO.studyTimeVO
                this.StudyTimeVO.time = res.studyDailyReportVO.studyTime
                this.StudySuggestionVOList = res.studyDailyReportVO.studySuggestionVOList
                for(var index in res.studyDailyReportVO.studyDetailContentlist){
                    let ObjTemp = {}
                    ObjTemp.cid = index
                    ObjTemp.value = res.studyDailyReportVO.studyDetailContentlist[index]
                    this.StudyDetailContentlist.push(ObjTemp)
                }
            })
        }else{
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#daily{
    padding:0px 10px 0; 
    &>div{
        border-radius: 8px;
        padding: 10px 15px;
        box-shadow: 0 0 5px 0px @darkGray;
        margin:10px 0;
    }
    .study-detail{
        background: #fff;
        box-sizing: border-box; 
        .proposal{
            span{
                display: block;
                font-size: 13px;
                color:@blue1;
            }
            .title{
                color:@blue1;
                font-size: 15px;
                font-weight: bold;
                margin:5px 0;
            }
        }     
    }
}
</style>
