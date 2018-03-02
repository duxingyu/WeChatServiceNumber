<template>
    <div class="log-userinfo">
        <div class="userinfo">
            <div class="head">
                <img :src="headUrl" alt="">
            </div>
            <div class="birthday">
                <p>{{user.alias?user.alias:"麦宝"}}</p>
                <span>{{birthday?birthday:"宝宝生日"}}</span>
            </div>
        </div>
        <div class="study-num">
            <p>当前学习人数</p>
            <span>{{count}}万</span>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { parseTime } from "@common"

export default {
    props:(["data"]),
    computed:{
        ...mapState(["user"]),
        headUrl(){
            return require("@image/learnlog/userinfo_user_head.png")
        },
        birthday(){
            let now = new Date().getTime()
            let time = this.user.birthday
            if(time > now){
                return false 
            }
            let yearTime = 3600 * 24 * 365 * 1000
            let mathTime = 3600 * 24 * 30 * 1000
            let dayTime = 3600 * 24 * 1000
            let year = Math.floor((now - time) / yearTime)
            let math = Math.floor((now - time) % yearTime / mathTime)
            let day = Math.floor((now - time) % mathTime / dayTime)
            let str = ""
            if(year > 15){
                return false
            }
            if(year){
                str += (year + "岁")
            }
            if(math){
                str += (math + "月")
            }
            if(day){
                str += (day + "天")
            }
            return str
        },
        count(){
            return this.data.stuAllUserCount?
            Math.ceil(this.data.stuAllUserCount / 1000) / 10 :0
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.log-userinfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:@lightGray;
    img{
        width: 100%;
        display: block;
    }
    .userinfo{
        display: flex;
        align-items: center;
        .head{
            width:56px;
            margin-right: 10px;
        }
        .birthday{
            p{
                font-size: 18px;
                margin-bottom: 3px;
            }
        }
    }
    .study-num{
        text-align: center;
        span{
            display: inline-block;
            margin-top: 3px;
            font-size: 20px;
        }
    }
}
</style>
