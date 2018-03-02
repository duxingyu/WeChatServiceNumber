<template>
    <div id="course">
        <div class="banner">
            <img :src="bannerUrl" alt="">
        </div>
        <Loading v-if="!getPackagesList.length"></Loading>
        <div v-if="getPackagesList.length">
            <PackageItem v-for="(val,index) in getPackagesList" :data="val" :index="index">
            </PackageItem>
            <div class="cl"></div>
        </div>
    </div>
</template>
<script>
    import Loading from "@components/Loading"
    import PackageItem from "@components/shop/PackageItem"

    import { getPackagesList } from "@interface"

    export default {
        data(){
            return {
                getPackagesList:[]
            }
        },
        components:{
            PackageItem,Loading
        },
        computed:{
            bannerUrl(){
                return require("@image/shop/package_banner.png")
            }
        },
        beforeMount(){
            getPackagesList().then(res =>{
                this.getPackagesList = res.list
            })
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    #course{
        width: 100%;
        margin:0 auto;
        img{
            width: 100%;
        }
        .packages-item{
            float: left;
            width: 31%;
            margin:5px 1%;
        }
    }
</style>