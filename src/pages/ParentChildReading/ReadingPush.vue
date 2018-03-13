<template>
    <div id="reading-push" ref="reading-push" :style="wH">
        <div class="banner">
            <img :src="currentPush && currentPush.bannerUrl?currentPush.bannerUrl:images[0]" alt="">
            <img class="banner-list" v-if="currentPush && currentPush.bannerUrl && isBuy" :src="currentPush.bannerUrl" alt="">
            <img class="touxiang" :src="user.wxHeadImg?user.wxHeadImg:images[2]" alt="">
        </div>
        <div class="status">
            <img :src="images[1]" alt="">
        </div>
        <div class="time">
            <div class="left" v-if="days.length">
                {{days[currnetIndex].month}}月{{days[currnetIndex].day}}日,
                {{getXQ(currnetIndex + 1)}}
            </div>
            <div class="right" v-if="currentPush">
                <span>亲子陪伴阅读第{{accompanyDays}}天</span>
            </div>
        </div>
        <div v-if="currentPush">
            <ClassItem :data="currentPush"></ClassItem>
            <WhisperItme :data="currentPush"></WhisperItme>
        </div>
        <div class="tips" >
            <p v-if="!currentPush && isBuy && days.length && days[currnetIndex].date >= today">本期阅读内容将于当日19:00点推送,敬请期待</p>
            <p v-if="!currentPush && isBuy && days.length && days[currnetIndex].date < today">当日未推送阅读内容</p>
            <div v-if="!currentPush && !isBuy && !loadingShow" @click="toBuy">
                <p>您还未订购麦田亲子阅读</p>
                <div class="buy-tips-img">
                    <img :src="images[4]" alt="">
                </div>
            </div>
        </div>
        <div class="time-select" ref="time-select"  v-if="isBuy">
            <div class="icon icon-left" @click="toLeft">
                <img :src="images[3]" alt="">
            </div>
            <div  v-for="(item,index) in days" 
            :class="{'day-item':true,'day-item-select':(index == currnetIndex)}"
            @click="selectIndex(index)">
                {{item.month + "/" + item.day}}
            </div>
            <div class="icon icon-right" @click="toRight">
                <img :src="images[3]" alt="">
            </div>
        </div>
        <Loading type="1" v-if="loadingShow"></Loading>
    </div>
</template>

<script>
    import ClassItem from "@components/ParentChildReading/ClassItem"
    import WhisperItme from "@components/ParentChildReading/WhisperItme"
    import Loading from "@components/Loading"

    import { getUserPayInfo } from "@interface"
    import { getReadListByWeek } from "@interface"
    import { parseTime } from "@common"
    import { mapState } from "vuex"
    
    export default {
        components:{
            ClassItem,WhisperItme,Loading
        },
        data(){
            return{
                initCount:0,
                loadingShow:false,
                isBuy:false,
                days:[],
                currnetIndex:0,
                pushList:[],
                currentPush:null,
                week:0,
                maxWeek:0,
                year:2018,
                accompanyDays:0,
                today:0
            }
        },
        computed:{
            ...mapState(["user"]),
            images(){
                return [
                    require("@image/ParentChildReading/pic_banner.png"),
                    require("@image/ParentChildReading/pic_reading_status.png"),
                    "http://www.mytian.com.cn/myhtml/parents_whisper/images/md.png",
                    require("@image/ParentChildReading/ic_enter.png"),                    
                    require("@image/ParentChildReading/buy_no.png"),                    
                ]
            },
            wH(){
                return "minHeight:" + window.innerHeight + "px;"
            }
        },
        methods:{
            getWeek(date){
                var date2 = new Date(date.getFullYear(), 0, 1);  
                var day1 = date.getDay();  
                if(day1 == 0){
                    day1 = 7;
                }   
                var day2 = date2.getDay();  
                if(day2 == 0){
                    day2=7;  
                } 
                let d = Math.ceil((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);    
                return Math.ceil(d / 7) 
            },
            getMaxWeek(year){
                let d1 = new Date(year, 0, 1)
                let day1 = d1.getDay()
                d1 = new Date(year, 0, (7 - day1) + 1)

                let d2 = new Date(year, 11, 31)
                return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24 * 7)) + 1
            },
            getXQ(q){
                switch(q){
                    case 0:
                        q = "星期日";
                    break;
                    case 1:
                        q = "星期一";
                    break;
                    case 2:
                        q = "星期二";
                    break;
                    case 3:
                        q = "星期三";
                    break;
                    case 4:
                        q = "星期四";
                    break;
                    case 5:
                        q = "星期五";
                    break;
                    case 6:
                        q = "星期六";
                    break;
                }
                return q
            },
            parseDays(days){
                let a = []
                for(let i = 0; i < days.length; i++){
                    let obj = {}
                    obj.date = days[i]
                    let b = days[i].split("-")
                    obj.year = b[0]
                    obj.month = b[1]
                    obj.day = b[2]
                   
                    a.push(obj)
                }
                return a
            },
            isInited(){
                this.initCount++;
                if(this.initCount >= 2){
                    this.loadingShow = false
                    this.initCount = 2
                }
            },
            getUserPayInfo(){
                this.loadingShow = true
                let options = {}
                options.uid = this.user.uid
                options.token = this.user.token
                options.clazzType = "YC"
                getUserPayInfo(options).then(res =>{
                    this.isInited()
                    if(res.info && res.info.buyNum > 0){
                        this.isBuy = true
                        this.$nextTick((res) =>{
                            let h = this.$refs["time-select"].offsetHeight
                            if(h){
                                this.$refs["reading-push"].style.paddingBottom = h + "px"
                            }
                            
                        })
                    }
                })
            },
            getReadListByWeek(callback){
                this.loadingShow = true
                let options = {}
                options.uid = this.user.uid
                options.token = this.user.token
                options.clazzType = "YC"
                options.year = this.year
                options.week = this.week
                getReadListByWeek(options).then(res =>{
                    this.isInited()
                    this.days = this.parseDays(res.days)
                    this.pushList = res.list
                    this.accompanyDays = res.accompanyDays
                    callback ? callback(res) : ""
                })
            },
            selectIndex(index){
                this.currnetIndex = index
                this.getCurrentPush()
            },
            toLeft(){
                this.week--
                if(this.week <= 0){
                    this.year--
                    if(this.year <= 2017){
                        this.week++
                        this.year++
                        return
                    }
                    this.maxWeek = this.getMaxWeek(this.year)
                    this.week = this.maxWeek
                }
                this.currnetIndex = 0
                this.getReadListByWeek(() =>{
                        this.getCurrentPush()
                })
            },
            toRight(){
                this.week++
                if(this.week > this.maxWeek){
                    this.year++
                    this.maxWeek = this.getMaxWeek(this.year)
                    this.week=1
                }
                this.currnetIndex = 0
                this.getReadListByWeek(() =>{
                    this.getCurrentPush()
                })
            },
            getCurrentPush(){
                let days = this.days[this.currnetIndex]
                let day = days.year + "-" +  days.month + "-" + days.day
                for(let i = 0; i < this.pushList.length; i++){
                   if(this.pushList[i].time == day){
                        this.currentPush =  this.pushList[i]
                        return 
                    }
                }
                this.currentPush =  null
            },
            toBuy(){
                this.$router.push({path:"/reading/buy"})
            }
        },
        beforeMount(){
            this.year = new Date().getFullYear()
            this.week = this.getWeek(new Date())
            this.maxWeek = this.getMaxWeek(this.year)
            if(this.week > this.maxWeek){
                this.year++
                this.week = 1
                this.maxWeek = this.getMaxWeek(this.year)
            }
            this.today = parseTime(new Date(), true).split(" ")[0]

            this.getUserPayInfo()
            this.getReadListByWeek((res) =>{
                for(let i = 0; i < res.days.length; i++){
                    if(res.days[i] == this.today){
                        this.currnetIndex = i
                    }
                }
                this.getCurrentPush()
            })
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#reading-push{
    background: #f6f6f6;
    box-sizing: border-box;
    .banner{
        position: relative;
        overflow: hidden;
        .banner-list{
            position:absolute;
            width:0;
            top:0;
            left:0;
        }
       .touxiang{
            position: absolute;
            width: 13%;
            bottom: 3%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 1000px;
            z-index: 99;
       } 
    }
    .status{
        background: #fff;
        padding: 12px 0;
        img{
            width: 95%;
            margin: 0 auto;
        }
    }
    .time{
        padding:15px 2.5% 5px;
        display: flex;
        justify-content: space-between; 
        color:@darkerGray;
        .right{
            display: flex;
            align-items: center;
            i{
                display: inline-block;
                height: 70%;
                width: 1px;
                background: @darkOrange;
                margin:0 5px;
            }
        }
    }
    .tips{
        text-align: center;
        padding: 20px 0;
        color:@darkerGray;
        .buy-tips-img{
            width: 70%;
            margin: 20px auto;
        }
    }
    .time-select{
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        background: #fff;
        align-items: center;
        padding: 10px 0;
        z-index: 99;
        &>div{
            margin: 0 1%;
        }
        .icon{
            width: 4.3%;
            margin-left: 2%
        }
        .icon-left{
            transform: rotate(180deg);
            margin: 0 2% 0 0; 
        }
        .day-item{
            display: inline-block;
            color:@darkOrange;
            width: 46px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            border: 1px solid @darkOrange;
            border-radius: 100px;
            font-size: 12px;
        }
        .day-item-select{
            border: 1px solid @darkOrange;
            background: @darkOrange;
            color:#fff;
        }
    }
}
</style>


