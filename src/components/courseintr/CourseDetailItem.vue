<template>
    <div class="course-detail-item" @click="OpenDetail">
        <div class="course-show">
            <div class="top">
                <div class="icon lf">
                    <img :src="CoursCoverUrl" alt="">
                </div>
                <div class="cl"></div>
                <div class="content" v-html="ParseIntroduction(intr,point,title)">
                </div>
            </div>
            <div class="bottom" v-if="!isBaike">
                <span>建议学习时长30分钟</span>
                <div>
                    <span>详细学习内容</span>
                    <img :src="IconUrl[0]" alt="">
                </div>
            </div>
        </div>
        <CoureseDetailOpen 
        :index="index"
        :target="SetCourseTarget(intr.study_goal_content)"
        :classType="classType"
        :point="point"
        v-if="DetailShow && !isBaike">
        </CoureseDetailOpen>
    </div>
</template>
<script>
import CoureseDetailOpen from "@components/courseintr/CoureseDetailOpen"

import { mapState } from "vuex"
import { ParsePoints } from "@js/courseintr/index.js"

export default {
    components:{
       CoureseDetailOpen 
    },
    props:["intr","point","title","index"],
    data(){
        return {
            DetailShow:false
        }
    },
    computed:{
        ...mapState(["CourseIntrInfo"]),
        IconUrl(){
            return[
                require("@image/courseintr/ic_zhankai.png")
            ]
        },
        classType(){
            return this.CourseIntrInfo.classType
        },
        isBaike(){
            return this.CourseIntrInfo.isBaike
        },
        CoursCoverUrl(){
            return "http://mytianimg.oss-cn-shanghai.aliyuncs.com/classIntroduce/" +
                    this.classType + "/ic_" + this.classType +'_' + 
                    (this.index>=9?(this.index+1):'0'+(this.index+1)) + ".png"
        },
    },
    methods:{
        OpenDetail(){
            this.DetailShow = !this.DetailShow
        },
        SetCourseTarget(introduction){
            let str = ""
            let IntrTemp = introduction.split(/\s/g)
            for (var i = 0; i < IntrTemp.length; i++) {
                str += ('<p class="target">' + IntrTemp[i] + "</p>")
            }
            return str
        },
	    ParseIntroduction(introduction,point,title){
            var str = ""
            if(this.classType == "rz" || this.classType == "en"){
                var PointTypes = ParsePoints(point,this.classType)
                for(var i in PointTypes){
                    var Label = PointTypes[i].name
                    var Points = []
                    for(var j in PointTypes[i].content){
                        Points.push(PointTypes[i].content[j].point)
                    }
                    Points = Points.join("、")
                    Label = Points?Label + ": ":""
                    str += ('<p class="study-content">' + Label + '<span>' +Points +'</span>'+ '</p>')
                }
            }else{
                str = this.SetCourseTarget(introduction.study_goal_content)
            }
            
            var title_ = "学习内容"
            if(this.isBaike){
                title_ = title
            }

            var StudyContent = '<div class="title">'+title_+'</div>' +
                                '<div class="list">' +
                                    str +
                                '</div>' 
            return StudyContent
        },
        
    },
    beforeMount(){
        // console.log(this.intr)
    }
}
</script>
<style lang="less">
@import '../../assets/css/main.less';
.course-detail-item{
    .course-show{
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 @darkGray;
        .top{
            padding: 2px;
            position: relative;
            .icon{
                width: 42%;
            }
            .content{
                position: absolute;
                right: 0;
                top:0;
                height: 100%;
                width: 55%;
                overflow: hidden;
                padding-top:2px;
                box-sizing: border-box;
                .title{
                    font-weight: bold;
                }
                .list{
                    p{
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 13px;
                        margin:1px 0;
                    }
                    .study-content{
                        span{
                            color:@red;
                        }
                    }
                }
            }
        }
        .bottom{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            padding:3px 20px;
            border-top: 1px solid @lightGray;
            div{
                display: flex;
                align-items: center;
                white-space: nowrap;
                img{
                    width: 15px;
                    margin-left:4px;
                    transform: rotate(-90deg)
                }
            }
        }
    }
}
</style>
