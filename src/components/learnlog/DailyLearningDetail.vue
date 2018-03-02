<template>
    <div class="daily-learning-detail">
        <div class="top">
            <div class="title">
                第{{parseInt(data.cid.match(/[0-9]+$/)[0])}}单元
            </div>
            <div class="enum">
                <div>
                    <img :src="iconUrl[0]" alt=""><span>已掌握</span>
                </div>
                <div>
                    <img :src="iconUrl[1]" alt=""><span>未掌握</span>
                </div>
                <div>
                    <img :src="iconUrl[2]" alt=""><span>未学习</span>
                </div>
                <!-- <div>
                    <img :src="iconUrl[3]" alt=""><span>识字率 100%</span>
                </div> -->
            </div>
        </div>
        <WordCards v-for="val in content" 
        :type="val.wordCardsType" 
        :data="val.content" 
        :name="val.name" 
        v-if="val.content.length">
        </WordCards>
    </div>
</template>
<script>
import WordCards from "@components/learnlog/WordCards"

import { mapState } from "vuex"
import { GetLearnlogType } from "@js/learnlog/index.js"
import { ParseStuKnowledge } from "@js/learnlog/index.js"

export default {
    components:{
        WordCards
    },
    props:["data"],
    computed:{
        ...mapState(["classId"]),
        iconUrl(){
            return [
                require("@image/learnlog/knowledge_icon1.png"),
                require("@image/learnlog/knowledge_icon2.png"),
                require("@image/learnlog/knowledge_icon3.png"),
                require("@image/learnlog/knowledge_icon4.png")
            ]
        },
        content(){
            return ParseStuKnowledge(this.data.value,GetLearnlogType(this.classId))
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.daily-learning-detail{
    .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            color:@blue1;
            font-size: 16px;
            font-weight: bold;
            margin:0 0 5px;
            text-align: center;
        }
        .enum{
            display: flex;
            div{
                display: flex;
                align-items: center;
                font-size: 12px;
                color:@blue1;
                margin-right:8px;
                white-space: nowrap;
                img{
                    width: 16px;
                    display: block;
                    margin-right:3px;
                }
            }
        }
    }
    .word-cards{
        margin:5px 0;
    }
}
</style>
