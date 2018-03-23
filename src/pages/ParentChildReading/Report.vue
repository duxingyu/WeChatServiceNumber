<template>
    <div id="reading-report">
        <img :src="images[0]" alt="">
        <img class="touxiang" :src="userImg?userImg:images[1]" alt="">
        <div class="info">
            <img :src="images[2]" alt="">
            <div class="name">{{alias?alias:"麦麦"}}</div>
            <div class="days">
                {{time}} <span>天</span>
            </div>
            <div class="words">
                {{words}} <span>字</span>
            </div>
        </div>
        <div class="medal">
            <div class="des" v-html="medals[medalIndex].content">
            </div>
            <img class="medal-icon" :src="medals[medalIndex].src" alt="">
        </div>
        
    </div>
</template>

<script>
    import { wxShareOptions } from "@common"
    import { getShareUserReadInfo } from "@interface"
    import { medals } from "@js/reading/index"

    import { mapState } from "vuex"
    import { mapActions } from "vuex"

    export default {
        data(){
            return {
                userImg:"",
                alias:"麦麦",
                words:0,
                time:0,
            }
        },
        computed:{
            ...mapState(["user"]),
            images(){
                return[
                    require("@image/ParentChildReading/report_title.png"),
                    require("@image/shop/touxiang01.png"),
                    require("@image/ParentChildReading/frame_read_day.png"),
                    require("@image/ParentChildReading/button.png"),
                ]
            },
            medals(){
                return medals
            },
            medalIndex(){
                return Math.floor(this.time / 5) > 14 ? 14 : Math.floor(this.time / 5)
            }
        },
        methods:{
            ...mapActions(["isLogin"]),
            toProbation(){
                this.$router.push({path:"/reading"})
            },
            init(){
                wxShareOptions({
                    title: "麦田亲子阅读",
                    link: "http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-share&uid=" + this.user.uid,
                    imgUrl: "http://www.mytian.com.cn/myhtml/readbook/images/logo.png",
                    desc: "用心还原孩子的世界",
                })

                getShareUserReadInfo(this.user.uid).then(res =>{
                    this.userImg = res.info.userImg
                    this.alias = res.info.alias
                    this.words = res.info.words
                    this.time = res.info.time
                })
            }
        },
        beforeMount(){
            this.isLogin(true).then(res =>{
                this.init()
            })
        },
        watch:{
            user(){
                if(this.user && this.user.isLogin){
                    this.init()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#reading-report{
    // background-color:#f6f6f6;
    overflow: auto;
    position: relative;
    .touxiang{
        width: 18%;
        margin: 10px auto 0;
        border-radius: 100px;
    }
    .info{
        position: relative;
        color:@darkOrange;
        img{
            width: 95%;
            margin:0 auto;
        }
        .name{
            position: absolute;
            left: 50%;
            top: 6.5%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            width: 20%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .days{
            white-space: nowrap;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 78%;
            left: 25%;
            font-size: 30px;
            font-weight: bold;
            span{
                font-size: 16px;
            }
        }
        .words{
            white-space: nowrap;
            position: absolute;
            top: 78%;
            left: 75%;
            transform: translate(-50%, -50%);
            font-size: 30px;
            font-weight: bold;
            span{
                font-size: 16px;
            }
        }
    }
    .medal{
        .des{
            text-align: center;
            font-size: 16px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 10px  0 10px;
            color:@darkOrange;
            span{
                text-decoration: underline;
            }
        }
        .medal-icon{
            width: 35%;
            margin:5px auto 5px;
        }
    }
}
</style>
