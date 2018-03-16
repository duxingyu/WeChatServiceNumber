<template>
    <div id="share-page" :style="style">
        <div class="touxiang">
            <img :src="images[0]" alt="">
            <img class="img-touxiang" :src="userImg?userImg:images[1]" alt="">
        </div>
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
        <div class="proposal">
            <p>孩⼦不听话？</p>
            <p>亦或不肯好好交流？</p>
            <p>。。。</p>
            <p>如何既不惩罚也不姑息地引领孩⼦的成长？</p>
            <p>。。。</p>
            <p>麦⽥亲⼦阅读将带你读懂孩⼦的内⼼，</p>
            <p>跟孩⼦建⽴舒服的关系</p>
            <p>⽽不是对抗，重拾温暖亲⼦时光！</p>
        </div>
        <div class="qrcode">
            <div class="des">
                <div>长按二维码图片</div>
                <p>参与麦田亲子互动</p>
            </div>
            <div class="code">
                <img :src="images[3]" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import { wxShareOptions } from "@common"
    import { getShareUserReadInfo } from "@interface"

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
            images(){
                return[
                    require("@image/ParentChildReading/bg_title_read_day.png"),
                    require("@image/shop/touxiang01.png"),
                    require("@image/ParentChildReading/frame_read_day.png"),
                    require("@image/ParentChildReading/qrcode.png"),
                ]
            },
            style(){
                return "height:" + window.innerHeight + "px;"
            },
        },
        beforeMount(){
            
            wxShareOptions({
                title: "麦田亲子阅读",
                link: "http://promotion.mytian.com.cn/myt_promotion/center/center_splash.html?returnTo=reading-share&uid=" + this.$route.query.uid,
                imgUrl: "http://www.mytian.com.cn/myhtml/readbook/images/logo.png",
                desc: "用心还原孩子的世界",
            })

            let uid = this.$route.query.uid
            if(uid){
                getShareUserReadInfo(uid).then(res =>{
                    this.userImg = res.info.userImg
                    this.alias = res.info.alias
                    this.words = res.info.words
                    this.time = res.info.time
                })
            }else{
                alert("分享链接错误!")
            }
            
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#share-page{
    background-color:#f6f6f6;
    overflow: auto;
    background-image: url("../../assets/images/ParentChildReading/background.png");
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size:100%;
    box-sizing: border-box;
    padding-bottom: 100px;
    .touxiang{
        position: relative;
        .img-touxiang{
            position: absolute;
            bottom: 0;
            width: 18%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 100px;
        }
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
    .proposal{
        padding-top: 10px;
        p{
            text-align: center;
            margin: 5px 0;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .qrcode{
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-around;
        padding:10px 0;
        background: rgba(255, 255, 255, .8);
        img{
            width: 80px;
        }
        .des{
            text-align: center;
            white-space: nowrap;
            font-weight: bold;
            letter-spacing: 2px;
            div{
                color:@blue1;
            }
            p{
                color:@darkOrange;
                font-size: 20px;
                margin-top:5px;
            }
        }
    }
}
</style>
