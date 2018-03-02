<template>
    <div class="goals-detail">
        <div class="course-img">
            <img class="mask" :src="maskImgUrl" alt="" v-if="!data.isComplete">
            <img :src="data.picUrl?data.picUrl:maskImgUrl" alt="">
        </div>
        <div :class="{'course-content':true,unComplete:!data.isComplete}">
            <div class="title">学习目标{{data.squence}}</div>
            <div class="num">{{data.content}}</div>
            <div class="achievement">
                {{data.isComplete?'':'该目标还未完成'}}
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import { GetLearnlogType } from "@js/learnlog/index.js"

export default {
    props:["data"],
    computed:{
        ...mapState(["classId"]),
        maskImgUrl(){
            let learnlogType = GetLearnlogType(this.classId)
            return require("@image/learnlog/goalsdetail_mask_"+
            learnlogType.toLowerCase()+".png")
        },
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.goals-detail{
    display: flex;
    align-items: center;
    font-size: 13px;
    img{
        width: 100%;
        display: block;
    }
    .course-img{
        width: 80px;
        height: 80px;
        margin-right:10px;
        position: relative;
        .mask{
             position: absolute;
             width: 100%;
             left: 0;
             top:0;
        }
    }
    .course-content{
        // white-space: nowrap;
        width: 180px;
        .title{
            color:@blue1;
            font-weight: bold;
            font-size: 16px;
        }
        .num{
            color:@blue;
            word-wrap: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .achievement{
            color:@darkerGray;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    .unComplete{
        .title{
            color:@darkerGray;
        }
        .num{
            color:@darkerGray;
        }
    }
}
</style>
