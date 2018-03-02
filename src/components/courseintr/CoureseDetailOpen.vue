<template>
    <div class="course-detail-open">
        <div class="detail">
            <div class="title">第{{index+1}}单元</div>
            <div class="content">
                <div class="target">
                    <label>学习目标:</label>
                    <div v-html="target">
                    </div>
                </div>
                <div v-html="SetCourseDetailImage(point)">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ParsePoints } from "@js/courseintr/index.js"

export default {
    props:["index","target","classType","point"],
    computed:{
        
    },
    methods:{
    //设置课程详情图片
        SetCourseDetailImage(points,index){
            var StudyDetailContent = ""
            if(this.classType == "rz"){
                var point = ParsePoints(points,this.classType)
                var word = ""
                var terms = ""
                for(var i = 0; i < point[0].content.length; i++){
                    word += '<div class="item lf">' +
                                '<img src="'+require("@image/courseintr/rz_tzg_bg.png")+'" alt="">' +
                                '<span>'+point[0].content[i].point+'</span>' +
                            '</div>' 
                }
                word = word?
                        '<div class="word">' +
                            '<label>汉字</label>' +
                            '<div>' +
                                word+
                                '<div class="cl"></div>' +
                            '</div>' +
                        '</div>':""
                for(var i = 0; i < point[1].content.length; i++){
                    terms += '<div class="item lf">' +
                                '<span>'+point[1].content[i].point+'</span>' +
                            '</div>'
                }
                terms = terms?
                        '<div class="terms">' +
                            '<label>词语</label>' +
                            '<div>' +
                                terms+
                                '<div class="cl"></div>'+
                            '</div>' +
                        '</div>':""
                StudyDetailContent = '<div class="study-content-rz">' +
                                    word+
                                    terms+
                                '</div>'

            }else{
                StudyDetailContent = '<div class="study-content-img">'+
                        '<img src="http://mytianimg.oss-cn-shanghai.aliyuncs.com/classIntroduce/' +
                        this.classType + '/' + this.classType + (this.index>=9?(this.index+1) : "0" + (this.index+1)) +
                        '.png" alt="">'+
                    '</div>'
            }
            return StudyDetailContent
        }
    }
}
</script>
<style lang="less">
@import '../../assets/css/main.less';
.course-detail-open{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    top:0;
    left:0;
    overflow: auto;
    z-index: 99;
    .detail{
        border-radius: 8px;
        width: 95%;
        position: absolute;
        margin: 3% 0;
        left:50%;
        top:50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        background: #fff;
        .title{
            text-align: center;
            background: #dbfed6;
            font-size: 15px;
            font-weight: bold;
            padding:3px 0;
            box-shadow: 0 0 5px 0 @darkGray;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }	
        .content{
            padding: 10px;
            &>.target{
                display: flex;
                margin-bottom:10px;
                label{
                    font-size: 14px;
                    font-weight: bold;
                    margin-right: 5px;
                    white-space: nowrap;
                }	
                div{
                    font-size: 13px;
                    p{
                        margin-bottom: 3px;
                    }
                }
            }
            .study-content-rz{
                &>div{
                    display: flex;
                    justify-content: space-between;
                    margin:0 0 10px;
                    &>div{
                        width: 84%;
                        color:#6493BC;
                    }
                    label{
                        font-size: 14px;
                        font-weight: bold;
                    }
                }
                .word{
                    label{
                        padding: 4vw 0 0;
                    }
                    .item{
                        width: 14.66%;
                        margin:5px 1%;
                        position: relative;
                        span{
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            font-size: 17px;
                        }
                    }
                } 
                .terms{
                    label{
                        padding: 5px 0 0;
                    }
                    .item{
                        background-color: #E0FEEB;
                        border:1px solid #B1FFCE;
                        border-radius: 4px;
                        font-size: 12px;
                        padding:2px 4.5px;
                        margin:5px 1%;
                    }
                } 
            }
            	
        }
    }
    
}
</style>
