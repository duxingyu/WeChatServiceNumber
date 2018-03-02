<template>
    <div class="courseintlist-item" @click="ToDetail">
        <div class="spine-1">
            <div class="course-image">
                <img :src="data.icon" alt="">
            </div>
            <div class="course">
                <div>
                    <p>{{data.name}}</p>
                    <div>查看课程详情</div>
                </div>
            </div>
        </div>
        <div class="spine-2" v-html="data.des" v-if="!data.isBaike">
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex"

export default {
    props:["data"],
    methods:{
        ...mapMutations(["SetCourseIntrInfo"]),
        ToDetail(){
            this.SetCourseIntrInfo(this.data)
            this.$router.push({path:"/courseintr/detail"})
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.courseintlist-item{
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px 0px @darkGray;
    border:1px solid @orange;
    overflow: hidden;
    .spine-1{
        display: flex;
        
        .course-image{
            width: 45%;
            padding:2px;
            box-sizing: border-box;
            img{
                width: 100%;
                display: block;
            }
        }
        .course{
            width: 55%;
            display: flex;
            align-items: center;
            justify-content: center;
            color:@darkOrange;
            &>div{
                text-align: center;
                p{
                    // font-family: "黑体";
                    font-size:24px;
                    font-weight: bold;
                }
                div{
                    font-size: 16px;
                    border-radius: 100px;
                    border:1px solid @darkOrange;
                    padding:3px 12px;
                    margin-top:8px;
                }
            }
        }
    }
    .spine-2{
        text-align: center;
        padding:8px 0;
        font-size: 12px;
        border-top:1px solid @darkOrange;
    }
}
</style>
