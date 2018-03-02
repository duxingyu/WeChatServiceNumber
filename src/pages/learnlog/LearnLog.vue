<template>
    <div ref="learnlog" id="learnlog">
        <UserInfo :data="AppUsingState"></UserInfo>
        <Tabs @GetType="GetTabsType" :data="AppUsingState"></Tabs>
        <LearningSummary :data="ClassSummary"></LearningSummary>
        <Presentation></Presentation>
        <AppUsingNum :data="AppUsingState"></AppUsingNum>
        <Loading type="1" v-if="LoadingShow"></Loading>
    </div>
</template>

<script>
    import UserInfo from "@components/learnlog/UserInfo"
    import Tabs from "@components/learnlog/Tabs"
    import LearningSummary from "@components/learnlog/LearningSummary"
    import Presentation from "@components/learnlog/Presentation"
    import AppUsingNum from "@components/learnlog/AppUsingNum"
    import Loading from "@components/Loading"

    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { GetAppUsingNum } from '@interface'
    import { GetClassSummary } from '@interface'

    export default {
        components:{
            UserInfo,Tabs,LearningSummary,Presentation,
            AppUsingNum,Loading
        },
        data(){
            return{
                AppUsingState:{},
                ClassSummary:{},
                LoadingShow:true,
            }
        },
        computed:{
            ...mapState(["user"]),
            UserUid(){
                return this.user.uid
            }
        },
        methods:{
            ...mapActions(["isLogin"]),
            init(){
                this.LoadingShow = true
                GetAppUsingNum(this.user.uid).then(res =>{
                    this.LoadingShow = false
                    this.AppUsingState = res.masterPageVO
                })
            },
            GetTabsType(data){
                let options = {
                    uid:this.user.uid,
                    cid:data.classId
                }
                this.LoadingShow = true
                GetClassSummary(options).then(res =>{
                    this.LoadingShow = false
                    this.ClassSummary = res
                    this.ClassSummary.cid = data.classId
                })
            }
        },
        beforeMount(){
            this.isLogin(true).then(res =>{
                this.init()
            })
            this.$nextTick(() =>{
                let bgImageUrl = require("@image/learnlog/learnlog_background.jpg")
                this.$refs.learnlog.style.height = window.innerHeight + 'px'
                this.$refs.learnlog.style.backgroundImage = 'url('+bgImageUrl+')'
            })
        },
        watch:{
            UserUid(){
                this.init()
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#learnlog{
    overflow:hidden;
    background-position: center top;
    background-size: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    &>div{
        margin-bottom:10px;
    }
}
</style>