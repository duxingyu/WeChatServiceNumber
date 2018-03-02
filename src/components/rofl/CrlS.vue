<template>
    <div class="crls">
        <img class="recommend" v-if="info.isRecommend" src="../../assets/images/rofl/ic_recommend.png" alt="">
        <div class="top">
            <div class="class-image">
                <img  :src="rateInfo.icon" alt="">
            </div>
            <div class="class-info">
                <div class="title">
                    <span>{{rateInfo.title}}</span>
                    <div class="ranking">学习排名: {{info.ranking}}</div>
                </div>
                <div class="sop">
                    <span class="">已学课程: {{sop}}%</span>
                    <div class="sop-p"><div :style="width"></div></div>
                </div>
                <div class="join-buy">
                    <div class="gop">已购买: {{info.buyNum}}/{{info.allClassNum}}</div>
                    <div v-if="!info.buyNum" class="joinclass" @click.stop="join">加入学习</div>
                    <div v-if="info.buyNum && !buyman" class="joinclass cpt" @click.stop="join">补全课程</div>
                </div>
            </div>
        </div>
        <div class="bottom" @click="showClass">
            <div class="join-num">{{info.allStudyPeopleNum}}人已加入学习</div>
            <div class="class-detail">
               <span>课程介绍</span>
               <img ref="img" src="../../assets/images/rofl/ic_down.png" alt=""> 
            </div>
        </div>
        <div class="class-details" v-show="isShow">
            <myVedio v-if="rateInfo.vedio" 
            :src="rateInfo.vedio" :isPlay="isShow"></myVedio>
            <div class="text" v-html="rateInfo.introduce"></div>
        </div>
    </div>
</template>

<script>
    import myVedio from "@components/rofl/Vedio" 
    import { rateList } from "@js/rofl/rofl"
    
    export default {
        data(){
            return {
                isShow:false
            }
        },
        props:['info'],
        components:{
            myVedio
        },
        computed:{
            sop(){
                let shu = (this.info.studyNum/this.info.allClassNum)*100
                return Math.round(shu * 10) / 10;
            },
            rateInfo(){
                return rateList[this.info.classType]
            },
            width(){
                return 'width:' + this.sop + '%'
            },
            buyman(){
                let shu = this.info.buyNum / this.info.allClassNum
                if(shu == 1){
                    return true
                }else{
                    return false
                }
            }
        },
        methods:{
            showClass(){
                this.isShow = !this.isShow
                if(this.isShow){
                    this.$refs['img'].style.transform = "rotate(180deg)"
                }else{
                    this.$refs['img'].style.transform = "rotate(0deg)"
                }
            },
            join(){
                this.$emit("joinClass",this.rateInfo.classType)
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
.crls{
    background-color: #fff;
    box-shadow: 0 0 2px 1px @darkGray;
    position: relative;
    .recommend{
        position: absolute;
        top:0;
        left: 0;
        width:20%; 
    }
    .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        border-bottom: 1px solid @darkGray;
        .class-image{
            width: 25%;
            img{
                width: 100%;
            }
        }
        .class-info{
            width: 70%;
            .title{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                font-size: 18px;
                white-space: nowrap;
                overflow: hidden;
                .ranking{
                    color:@darkOrange;
                    font-size: 12px;
                }
            }
            .sop{
                display: flex;
                white-space: nowrap;
                align-items: center;
                font-size: 12px;
                margin:5px 0 10px;
                color:@black;
                .sop-p{
                    width: 100%;
                    background:@darkGray;
                    height: 7px;
                    margin-left:5px;
                    border-radius: 100px;
                    div{
                        height: 100%;
                        background: @green;
                        width: 50%;
                        border-radius:100px;
                    }
                }
            }
            .join-buy{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .gop{
                    font-size: 12px;
                    color:@black;
                    margin:3px 0 5px;
                }
                .joinclass{
                    width: 60%;
                    background: @green;
                    color:#fff;
                    text-align: center;
                    border-radius: 100px;
                    font-size: 18px;
                    padding: 4px 0;
                }
                .cpt{
                    background: @darkOrange;
                }
            }
            
        }
    }
    .bottom{
        padding:5px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 2px 1px @darkGray;
        .join-num{
            color:@darkOrange;
            font-size: 12px;
        }
        .class-detail{
            display: flex;
            align-items: center;
            color:@black;
            img{
                display: block;
                width: 20px;
                margin-left: 5px;
            }
        }
    }
    .class-details{
        overflow: hidden;
        .text{
            padding:10px;
            color:@black; 
        }
        .vedio{
            width: 98%;
            margin: 10px auto;
            box-shadow: 0 0 2px 2px @darkGray;
        }
    }
}

</style>
