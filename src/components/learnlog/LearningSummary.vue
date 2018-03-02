<template>
    <div class="learning-summary">
        <div class="details" @click="ToLearningRate">
            <div v-for="val in Summary.knowledge">
                <p>{{val.value}}</p>
                <span>{{val.name}}</span>
            </div>
            <div>
                <p>{{Summary.stuScorePercent}}%</p>
                <span>掌握率</span>
            </div>
        </div>
        <div class="summary">
            <div class="des">
                <div class="learned-num">
                    <div>{{Summary.Learned.name}}</div>
                    <span>{{Summary.Learned.value}}</span>
                </div>
                <div class="level">
                    <div>
                        <img class="icon" :src="iconUrl[0]" alt="">
                        <span>击败{{Summary.killOther}}%的小朋友</span>
                    </div>
                    <div class="margin">
                        <!-- <img class="icon" :src="iconUrl[1]" alt="">
                        <span>再学3000单词完成学习目标36</span> -->
                    </div>
                    <div>
                        <img class="icon" :src="iconUrl[2]" alt="">
                        <span>累计学习{{Summary.stuDays}}天</span>
                    </div>
                </div>
            </div>
            <div class="function">
                <div class="addcourse" @click="ToClasses">
                    <img :src="functionUrl[0]" alt="">
                </div>
                <div class="viewtarget" @click="ToLearningGoals">
                    <img :src="functionUrl[1]" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { LearningSummary } from "@js/learnlog/index.js"

export default {
    props:(["data"]),
    computed:{
        iconUrl(){
            return [
                require("@image/learnlog/learningsummary_icon1.png"),
                require("@image/learnlog/learningsummary_icon2.png"),
                require("@image/learnlog/learningsummary_icon3.png"),
            ]
        },
        functionUrl(){
            return [
                 require("@image/learnlog/learningsummary_addcourse.png"),
                 require("@image/learnlog/learningsummary_target.png"),
            ]
        },
        Summary(){
            return this.ParseData()
        }
    },
    methods:{
        ParseData(){
            let key = Object.keys(this.data)
            // return LearningSummary["rzVO"]
            if(!key.length){
                return LearningSummary["rzVO"]
            }

            let summaryTemp = LearningSummary[key[0]]
            let dataTemp = this.data[key[0]]
            for(var i in summaryTemp.knowledge){
                summaryTemp.knowledge[i].value = dataTemp[i]
            }
            if(key[0] == "pyVO"){
                summaryTemp.stuScorePercent = dataTemp.stuPyScorePercent
            }else{
                summaryTemp.stuScorePercent = dataTemp.stuScorePercent
            }
            summaryTemp.Learned.value = dataTemp.allStudyCount
            summaryTemp.killOther = dataTemp.killOther
            summaryTemp.stuDays = dataTemp.stuDays

            return summaryTemp
        },
        ToLearningGoals(){
            this.$router.push({path:"/learnlog/learninggoals"})
        },
        ToLearningRate(){
            this.$router.push({ path:"/learnlog/learningrate"})
        },
        ToClasses(){
            this.$router.push({path:"/shop/"})
        }
    },
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.learning-summary{
    &>div{
        background: #fff;
        padding:10px;
        border-radius: 8px;
        box-shadow: 0 0 5px 0px @darkGray;
    }
    .details{
        margin-bottom:10px;
        display: flex;
        justify-content: space-around;
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
    .summary{
        padding:20px 10px;
        .des{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .learned-num{
                text-align: center;
                &>div{
                    font-size: 20px;
                    font-weight: bold;
                    color:@blue1;
                    margin-bottom: 10px;
                }
                &>span{
                    font-size: 40px;
                    font-weight: bold;
                    color:@darkOrange;
                }
            }
            .level{
                &>div{
                    display: flex;
                    align-items: center;
                    color:@blue1;
                    font-size: 12px;
                    // margin-top:px;
                    .icon{
                        width: 18px;
                        display: block;
                        margin-right:3px;
                    }
                }
                .margin{
                    margin:5px 0;
                }
            }
        }
        .function{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            &>div{
                width: 45%;
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>
