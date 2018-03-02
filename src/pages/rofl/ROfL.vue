<template>
    <div id="rofl">
        <Banner :images="banners"></Banner>
        <Loading v-show="!rateList"></Loading> 
        <CrlS v-for="item in rateList" :info="item" @joinClass="join"></CrlS>
    </div> 
</template>

<script>

import Banner from '@components/shop/Banner'
import CrlS from '@components/rofl/CrlS'
import Loading from '@components/Loading'
import { bannerList } from '@js/banner'
import { getUserRate } from "@interface"
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data(){
        return {
            banners:bannerList,
            rateList:'',
        }
    },
    components:{
       Banner,CrlS,Loading
    },
    computed:{
        ...mapState(['user']),
        userIsLogin(){
            return this.user.isLogin
        }
    },
    methods:{
        ...mapMutations(['setClassType']),
        ...mapActions(['isLogin']),
        join(type){
            this.setClassType(type);
            this.$router.push({path:"/shop/classes"})
        },
        getClassInfo(){
            getUserRate(this.user.uid).then(res =>{
                this.rateList = res.classInfos
            })
        }
    },
    beforeMount(){
        let self = this
        this.isLogin(true).then(res =>{
            self.getClassInfo()
        }) 
    },
    watch:{
        userIsLogin(){
             this.getClassInfo()
        }
    }
}
</script>

<style lang="less" scoped>
#rofl{
    .crls{
        margin:10px 5px;
    }
}
</style>
