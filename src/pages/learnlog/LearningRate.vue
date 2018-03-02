<template>
    <div id="learning-rate" ref="learningRate">
        <Loading type="1" v-show="loadingShow"></Loading>
        <ProgressBar :count="stuCount" :percent="stuPercent"></ProgressBar>
        <div class="units">
            <LearningStatus></LearningStatus>
            <div class="unit-item" v-for="(val,index) in studyPercentVO"> 
                <div class="title">第{{parseInt(index.replace(/[A-Z]+/g,""))}}单元</div>
                <WordCards v-for="value in val" :name="value.name" 
                :data="value.content" :type="value.wordCardsType" v-if="value.content.length">
                </WordCards>
            </div>
            <div class="unit-item" v-if="nextStudyContentList.length"> 
                <div class="title">下单元预告</div>
                <WordCards v-for="value in nextStudyContentList" :name="value.name" 
                :data="value.content" :type="value.wordCardsType" v-if="value.content.length">
                </WordCards>
            </div>
        </div>
    </div>
</template>
<script>
import ProgressBar from "@components/learnlog/ProgressBar"
import WordCards from "@components/learnlog/WordCards"
import LearningStatus from "@components/learnlog/LearningStatus"
import Loading from "@components/Loading"

import { mapState } from "vuex"
import { GetStudyPercen } from "@interface"
import { ParseStuKnowledge } from "@js/learnlog/index.js"
import { GetLearnlogType } from "@js/learnlog/index.js"

export default {
    components:{
        ProgressBar,WordCards,
        LearningStatus,Loading
    },
    data(){
        return{
            progressData:{},
            stuCount:0,
            stuPercent:0,
            studyPercentVO:[],
            nextStudyContentList:[],
            loadingShow:false
        }
    },
    computed:{
        ...mapState(["user","classId"]),
        ClassId(){
            return this.classId
        }
    },
    methods:{
        Init(){
            let classId = this.classId
            let learnlogType =  GetLearnlogType(classId)
            if(this.classId){
                let options = {
                    uid:this.user.uid,
                    cid:this.classId
                }
                this.loadingShow = true
                GetStudyPercen(options).then(res =>{
                    this.loadingShow = false
                    this.stuCount = res.userStuCount
                    this.stuPercent = res.userStudyPercent
                    let studyPercentVOTemp = res.studyPercentVO
                    for(var i in studyPercentVOTemp){
                        studyPercentVOTemp[i] = ParseStuKnowledge(studyPercentVOTemp[i],learnlogType)
                    }
                    this.studyPercentVO = studyPercentVOTemp

                    if(res.nextStudyContentList.length){
                        let nextStudyContentListTemp = res.nextStudyContentList
                        for(var i in nextStudyContentListTemp){
                            nextStudyContentListTemp[i].isWrong = -1
                        }
                        this.nextStudyContentList = ParseStuKnowledge(nextStudyContentListTemp,learnlogType)
                    }
                })
            }else{
                this.$router.go(-1)
            }
        }
    },
    beforeMount(){
        this.Init()
        this.$nextTick(() =>{
            this.$refs.learningRate.style.height = window.innerHeight + 'px'
        })
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#learning-rate{
    overflow: auto;
    background:#fff;
    .units{
        padding:15px 20px;
        .learning-status{
            margin-bottom:20px; 
        }
        .unit-item{
            margin:8px 0;
            .title{
                text-align: center;
                color:@blue1;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
}
</style>
