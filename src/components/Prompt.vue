<template>
    <div class="prompt">
        <LadderName name="使用方法"></LadderName>
        <div class="prompt-text">
            <p class="tips">下载麦田园APP并使用绑定的手机号登录</p>
            <p class="tips">即可同步解锁麦田早教服务号购买的课程</p>
            <img src="../assets/images/shop/pic_app.png" alt="">
            <p class="ps">●麦田早教服务号购买课程可同步手机、pad端，可永久使用</p>
            <p class="ps">●下载APP后请使用麦田早教服务号绑定的手机号登录,如有疑问请联系客服: <span class="tel">400-852-1661</span></p>
        </div>
        <div class="down" @click="downLoad">立即下载</div>
    </div>
</template>

<script>
import LadderName from '@components/shop/LadderName'
import { mapState } from 'vuex'
import { downLoad } from '@interface'
import { isWeiXin } from '@common'
import { deviceType } from '@common'

export default {
    data(){
        return{
            iosUrl:{
                'rz':'https://itunes.apple.com/app/id1203542281',
                'en':'https://itunes.apple.com/app/id1203230406',
                'lo':'https://itunes.apple.com/app/id1203229959',
                'ma':'https://itunes.apple.com/app/id1203189278',
            }
        }
    },
    computed:{
        ...mapState(['classType'])
    },
    components:{
        LadderName
    },
    methods:{
        downLoad(){
            let classT = this.classType
            if(!classT || (classT && classT.length > 1)){
                classT = 'rz'
            }else{
                 classT = (classT[0] == 'py'?'rz':classT[0])
            }
            if(deviceType()){
                if(isWeiXin()){
                    alert("请点击右上角\n在浏览器中打开")
                    return false
                }
                downLoad(classT).then(res =>{
                    location.href = res.url
                })
            }else{
                location.href = this.iosUrl[classT]
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/main.less";
.prompt{
    background-color:#fff;
    box-shadow: 0 0 3px 1px @darkGray;
    padding: 5px;
    color:@black;
    line-height: 23px;
    .prompt-text{
        .tips{
            text-align: center;
        }
        img{
            width: 60%;
            display: block;
            margin:5px auto;
        }
        .ps{
            width:80%;
            margin:0 auto;
            font-size: 12px;
            .tel{
                color:blue;
                text-decoration: underline;
            }
        }
    }
    .down{
        font-size: 18px;
        background: @green;
        color:#fff;
        width: 150px;
        text-align: center;
        margin: 10px auto;
        border-radius: 100px;
        padding:6px 0;
    }
}
</style>
