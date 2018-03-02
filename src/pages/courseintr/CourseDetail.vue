<template>
    <div id="course-detail">
        <div class="banner" ref="banner">
            <img :src="BannerUrl" alt="">
        </div>
        <div :class="{title:true,'title-top':IsTop}" ref="title">
            <span>课程介绍</span>
            <div @click="BuyCourse">购买课程</div>
        </div>
        <div :class="{'course-list':true,'course-list-top-padding':IsTop}">
            <CourseDetailItem 
            v-for="(val,index) in introductions" 
            :intr="val"
            :point="GetPoint(points,index)"
            :title="titles[index]"
            :index="index">
            </CourseDetailItem>
        </div>
        <div class="prompt-course-num" 
        v-if="CourseIntrInfo.classType == 'rz' && introductions.length < 36">
            共计36节精彩课程
        </div>
    </div>
</template>
<script>
import CourseDetailItem from "@components/courseintr/CourseDetailItem"

import { mapState } from "vuex"
import { mapMutations } from "vuex"
import { GetClassIntroduction } from "@interface"

export default {
    data(){
        return{
            points:{},
            introductions:[],
            titles:[],
            BannerUrl:"",
            IsTop:false
        }
    },
    computed:{
        ...mapState(["CourseIntrInfo"]),
    },
    components:{
        CourseDetailItem
    },
    methods:{
        ...mapMutations(["setClassType"]),
        BuyCourse(){
            this.setClassType(this.CourseIntrInfo.classTypeList)
            this.$router.push({path:"/shop"}) 
        },
        GetPoint(points,index){
            var count = 0
            var point = ""
            for (var i in points) {
                if (count >= index) {
                    point = points[i]
                    break;
                }
                count++
            }
            return point
        },
        SetPosition(){
            let banner = this.$refs.banner
            if(!banner){
                this.IsTop = false
                return
            }
            let h = banner.offsetHeight
            if(h && document.body.scrollTop >= h){
                this.IsTop = true
            }else{
                this.IsTop = false
            }        
        }
    },
    beforeMount(){
        if(this.CourseIntrInfo.classId){
            let type = this.CourseIntrInfo.classType
            if(this.CourseIntrInfo.isBaike){
                type = "bk"
            }
            this.BannerUrl = require("@image/courseintr/coursedetail_banner_" +
                            type +".png")
            GetClassIntroduction(this.CourseIntrInfo.classId).then(res =>{
                this.introductions = res.introductions
                this.points = res.points
                this.titles = res.titles
            })
        }else{
            this.$router.go(-1)
        }
    },
    mounted(){
        window.addEventListener('scroll', this.SetPosition)
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#course-detail{
    .banner{
        background: #fff;
        z-index: 9;
    }
    .title{
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 10px;
        box-sizing: border-box;
        box-shadow: 0 0 10px 0 @darkGray;
        span{
            padding-left:10px;
            border-left:3px solid @red;
            height: 12px;
            line-height: 12px;
        }
        div{
            padding:8px 18px;
            background: @red;
            color:#fff;
            border-radius: 4px;
            font-size: 13px;
        }
    }
    .title-top{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        z-index: 9;
    }
    .course-list{
        padding: 0px 10px;
        .course-detail-item{
            margin:10px 0;
        }
    }
    .course-list-top-padding{
        padding-top:41px;
    }
    .prompt-course-num{
        margin:0 10px 10px;
        background: #fff;
        text-align: center;
        font-size: 16px;
        padding:5px 0;
        border-radius: 8px;
        color:@red;
        box-shadow: 0 0 10px 0 @darkGray;
    }
}
</style>
