<template>
    <div id="daily">
        <Loading type="1" v-show="loadingShow"></Loading>
        <Tabs :data="TabsOptions" @GetType="GetTabsType"></Tabs>
        <LearningTime 
        class="padding-box"
        :data="StudyTimeVO" 
        v-if="StudyTimeVO">
        </LearningTime>
        <div class="study-detail padding-box" 
        v-for="(val,index) in StudyDetailContentlist">
            <DailyLearningDetail :data="val">
            </DailyLearningDetail>
            <div class="proposal" v-if="StudySuggestionVOList">
                <div class="title">
                    *学习建议
                </div>
                <span>
                    {{StudySuggestionVOList[index].suggestContent}}
                </span>
            </div>
        </div>
        <div class="unstudy" v-if="unstudy">该课程未学习</div>
    </div>
</template>
<script>
import Tabs from "@components/learnlog/Tabs"
import LearningTime from "@components/learnlog/LearningTime"
import DailyLearningDetail from "@components/learnlog/DailyLearningDetail"
import Loading from "@components/Loading"

import { mapState } from "vuex"
import { GetStudyDailyReportForWeiXin } from "@interface"
import { DailyPushTabsOptions } from "@js/learnlog/index.js"

export default {
    components:{
        LearningTime,DailyLearningDetail,Loading,Tabs
    },
    data(){
        return{
            loadingShow:false,
            StudyTimeVO:null,
            StudyDetailContentlist:[],
            StudySuggestionVOList:[],
            TabsOptions:{},
            unstudy:false
        }
    },
    computed:{
        ...mapState(["user"]),
    },
    methods:{
        GetTabsType(data){
            let options = {
                uid:this.user.uid,
                cid:data.classId,
                time:this.$route.query.time
            }
            this.loadingShow = true
            this.unstudy = false
            GetStudyDailyReportForWeiXin(options).then(message =>{
                this.loadingShow = false
                if(message.code == 0){
                    let res = message.data
                    this.StudyTimeVO = res.studyDailyReportVO.studyTimeVO
                    this.StudySuggestionVOList = res.studyDailyReportVO.studySuggestionVOList
                    for(var index in res.studyDailyReportVO.studyDetailContentlist){
                        let ObjTemp = {}
                        ObjTemp.cid = index
                        ObjTemp.value = res.studyDailyReportVO.studyDetailContentlist[index]
                        this.StudyDetailContentlist.push(ObjTemp)
                    }
                }else if(message.code == 3000){
                    this.unstudy = true
                    this.StudyTimeVO = null
                    this.StudyDetailContentlist = []
                    this.StudySuggestionVOList = []
                    CETools.logoutMessage(this.$route.query.time 
                    + "<br/>" + data.name + "未学习")
                }else{
                    logoutMessage(data.msg)
                }
            })
        }
    },
    beforeMount(){
        document.title = this.$route.query.time + "日报"
    },
    mounted(){
         this.TabsOptions = DailyPushTabsOptions
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#daily{
    padding:0px 10px 0;
    .learnlog-tabs{
        margin-top:10px;
    } 
    &>.padding-box{
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
    .unstudy{
        text-align: center;
        padding:10px 0;
        border-radius: 8px;
        margin-top: 10px;
        color:@blue1;
        background: #fff;
        box-shadow: 0 0 5px 0px @darkGray;
    }
}
</style>
