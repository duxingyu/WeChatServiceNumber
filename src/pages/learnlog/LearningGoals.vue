<template>
    <div id="learning-goals" ref="LearningGoals">
        <Loading type="1" v-show="loadingShow"></Loading>
        <ProgressBar :count="GoalCount" :percent="GoalPercent"></ProgressBar>
        <div class="goals">
            <div>
                <div :class="{evenPadding:j%2}" v-for="(i,j) in MytStudyGoalList">
                    <GoalsDetail :data="i"></GoalsDetail>
                    <img :class="{line1:!(j%2),line2:(j%2)}" 
                    :src="GetLineImage(j)" alt="">
                </div>
            </div>
        </div>
    </div> 
</template>
<script>
import ProgressBar from "@components/learnlog/ProgressBar"
import GoalsDetail from "@components/learnlog/GoalsDetail"
import Loading from "@components/Loading"

import { mapState } from "vuex"
import { GetStudyGoal } from "@interface"

export default {
    components:{
        ProgressBar,GoalsDetail,Loading
    },
    data(){
        return {
            GoalCount:0,
            GoalPercent:0,
            MytStudyGoalList:[],
            loadingShow:false
        }
    },
    computed:{
        ...mapState(["user","classId"])
    },
    methods:{
        Init(){
            if(this.classId){
                let options = {
                    uid:this.user.uid,
                    cid:this.classId
                }
                this.loadingShow = true
                GetStudyGoal(options).then(res =>{
                    this.loadingShow = false
                    let studyGoalVO = res.studyGoalVO
                    this.GoalCount = studyGoalVO.goalCount
                    this.GoalPercent = Math.ceil(studyGoalVO.goalCount/(studyGoalVO.goalCount + studyGoalVO.unDoGoalCount)*1000)/10
                    this.MytStudyGoalList = studyGoalVO.mytStudyGoalList
                })
            }else{
                this.$router.go(-1)
            }
        },
         GetLineImage(i){
            if(i%2){
                return require("@image/learnlog/goalsdetail_line2.png")
            }else{
                return require("@image/learnlog/goalsdetail_line1.png")
            }
        },
    },
    beforeMount(){
        this.Init()
        this.$nextTick(() =>{
            this.$refs.LearningGoals.style.height = window.innerHeight + 'px'
        })
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#learning-goals{
    overflow: auto;
    background:#fff;
    .goals{
        text-align: center;
        padding:20px 0;
        overflow: auto;
        &>div{
            display: inline-block;
            &>div{
                padding-bottom:20px;
                position: relative;
                text-align:left;
                .line1{
                    position: absolute;
                    height: 30px;
                    left: 38px;
                    width: 64px;
                    top:78px;
                }
                .line2{
                    position: absolute;
                    height: 32px;
                    left:-2px;
                    width: 48px;
                    top:78px;
                }
            }
        }
    }
    .evenPadding{
        margin-left:45px;
    }
    
}
</style>
