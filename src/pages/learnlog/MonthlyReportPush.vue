<template>
    <div id="monthly-report">
        <Loading type="1" v-show="loadingShow"></Loading>
        <Tabs :data="TabsOptions" @GetType="GetTabsType"></Tabs>
        <div class="containt" v-if="studyClzIds.length">
            <div class="effect padding-box">
                <div class="time">
                    {{time.split("-")[0] + "年" + time.split("-")[1] + "月"}}
                </div>
                <div class="units">
                    <label>对应单元:</label>
                    <div class="list">
                        <span v-for="(i,j) in studyClzIds">
                            {{parseInt(i.match(/[0-9]{2}$/)[0])}}
                        </span>
                        <div class="cl"></div>
                    </div>
                </div>
                <div class="achievement">
                    <p class="title">
                        学习效果
                    </p>
                    <div class="ratio">
                        <div>
                            <p>{{studyEffectionVO.studyDays}}</p>
                            <span>学习天数</span>
                        </div>
                        <div>
                            <p>{{studyEffectionVO.studyUnits}}</p>
                            <span>学习单元</span>
                        </div>
                        <div>
                            <p>{{studyEffectionVO.stuWord}}</p>
                            <span>学习知识点</span>
                        </div>
                        <div>
                            <p>{{studyEffectionVO.rightPercentage}}%</p>
                            <span>正确率</span>
                        </div>
                    </div>
                </div>
            </div>
            <LearningTimeRatio 
            class="padding-box"
            :data="studyTimePercentageVOList">
            </LearningTimeRatio>
            <div class="unit-detail padding-box">
                <LearningStatus></LearningStatus>
                <div class="unit-item" v-for="(val,index) in studyContentList"> 
                    <div class="title">第{{parseInt(index.replace(/[a-zA-Z]+/g,""))}}单元</div>
                    <WordCards 
                    v-for="value in val" 
                    :name="value.name" 
                    :data="value.content" 
                    :type="value.wordCardsType" 
                    v-if="value.content.length">
                    </WordCards>
                </div>
            </div>
            <div class="proposal padding-box" 
            v-if="studySuggestion.length">
                <div class="title">
                    学习建议
                </div>
                <p>还需要巩固复习的知识点有: {{studySuggestion.join("、")}}</p>
            </div>
            <div class="proposal padding-box" 
            v-if="!studySuggestion.length">
                您的宝宝这个月表现很好，学习积极性很高，注意力非常集中，继续保持哦！
            </div>
        </div>
        <div class="unstudy" v-if="unstudy">该课程未学习</div>
    </div>
</template>
<script>
import Tabs from "@components/learnlog/Tabs"
import Loading from "@components/Loading"
import LearningTimeRatio from "@components/learnlog/LearningTimeRatio"
import WordCards from "@components/learnlog/WordCards"
import LearningStatus from "@components/learnlog/LearningStatus"

import { mapState } from "vuex"
import { GetStudyMonthReport } from "@interface"
import { ParseStuKnowledge } from "@js/learnlog/index.js"
import { GetLearnlogType } from "@js/learnlog/index.js"
import { DailyPushTabsOptions } from "@js/learnlog/index.js"
import { GetStudyMonthReportForWeiiXin } from "@interface"

export default {
    components:{
        LearningTimeRatio,WordCards,LearningStatus,
        Loading,Tabs
    },
    data(){
        return {
            loadingShow:false,
            time:"-",
            studyClzIds:[],
            studyEffectionVO:{},
            studyTimePercentageVOList:[],
            studySuggestion:[],
            studyContentList:{},
            TabsOptions:{},
            unstudy:false
        }
    },
    computed:{
        ...mapState(["user","StudyMonthlyReportDetailParames"])
    },
    methods:{
        GetTabsType(data){
            let options = {
                uid:this.user.uid,
                cid:data.classId,
                month:this.$route.query.month
            }
            this.loadingShow = true
            this.unstudy = false
            GetStudyMonthReportForWeiiXin(options).then(message =>{
                this.loadingShow = false
                if(message.code == 0){
                    let res = message.data
                    let studyMonthReportVO = res.studyMonthReportVO
                    this.time = studyMonthReportVO.time
                    this.studyClzIds = studyMonthReportVO.studyClzIds
                    this.studyEffectionVO = studyMonthReportVO.studyEffectionVO
                    this.studyTimePercentageVOList = studyMonthReportVO.studyTimePercentageVOList
                    this.studySuggestion = studyMonthReportVO.studySuggestion
                    let  studyMonthReportVOTemp = studyMonthReportVO.studyContentList
                    for(var i in studyMonthReportVOTemp){
                        studyMonthReportVOTemp[i] = ParseStuKnowledge(studyMonthReportVOTemp[i],GetLearnlogType(data.classId))
                    }
                    this.studyContentList = studyMonthReportVOTemp
                }else if(message.code == 3000){
                    this.unstudy = true
                    this.studyClzIds = []
                    CETools.logoutMessage(this.$route.query.month 
                    + "<br/>" + data.name + "未学习")
                }else{
                    CETools.logoutMessage(message.msg)
                }
            })
        }
    },
    beforeMount(){
        document.title = this.$route.query.month + "月报"
    },
    mounted(){
         this.TabsOptions = DailyPushTabsOptions
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#monthly-report{
    padding:0 10px;
    &>.loading{
        z-index: 999;
    }
    &>.learnlog-tabs{
        margin-top:10px;
        padding:0;
    }
    .padding-box{
        margin:10px 0;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 0 5px 0px @darkGray;
        background: #fff;
    }
    .containt{
        .effect{
            .time{
                color:@blue1;
                font-weight: bold;
                font-size: 20px;
            }
            .units{
                display: flex;
                align-items: flex-start;
                white-space: nowrap;
                margin: 5px 0;
                label{
                    color:@blue;
                }
                .list{
                    width: 100%;
                    span{
                        float: left;
                        width: 17px;
                        height: 17px;
                        line-height: 17px;
                        text-align: center;
                        font-size: 12px;
                        font-weight: bold;
                        background: #38A9CB;
                        margin:2px 2px 2px;
                        color:#fff;
                    }
                }
            }
            .achievement{
                .title{
                    color:@blue;
                }
                .ratio{
                    margin:6px 0 0 0;
                    display: flex;
                    justify-content: space-around;
                    border: 2px solid @darkOrange;
                    border-radius: 8px;
                    padding:5px 0;
                    &>div{
                        text-align: center;
                        p{
                            color:@blue;
                            font-size: 22px;
                            font-weight: bold;
                        }
                        span{
                            color:@darkerGray;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        
        .unit-detail{
            .learning-status{
                // border:0;
                margin-bottom: 20px;
            }
            .unit-item{
                margin:5px 0;
                &>.title{
                    text-align: center;
                    margin-bottom: 10px;
                    color:@blue1;
                    font-weight: bold;
                    font-size: 16px;
                }
            }
        }
        .proposal{
            color:@blue1;
            .title{
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 3px;
            }
            p{
                font-size: 13px;
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
