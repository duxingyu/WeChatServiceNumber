<template>
    <div id="boutique" ref="boutique">
        <TopTabs @SelectType="select" @GetCount="GetNum" @GetIndex="GetIndex"
         :tabsList="boutiqueTypeList" :index="currentIndex" ref="toptabs" ></TopTabs>
        <swiper ref="mySwiper" :options="swiperOption">
            <swiper-slide v-for="(i,j) in swiperCount">
                <div class="content" v-if="(j == currentIndex)">
                    <div class="banner" v-if="!currentIndex">
                        <img :src="bannerUrl" alt="">
                    </div>
                    <Loading v-if="!goodsList.length"></Loading>
                    <div class="goods-list">
                        <BoutiqueGoods v-for="val in goodsList" 
                        :data="val" :isHot="currentIndex"></BoutiqueGoods>
                        <div class="cl"></div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import TopTabs from "@components/shop/TopTabs"
    import BoutiqueGoods from "@components/shop/BoutiqueGoods"
    import Loading from "@components/Loading"

    import { boutiqueTypeList } from "@js/shop/shop.js"
    import { GetBqHotGoods } from "@interface"
    import { GetBqGoods } from "@interface"

    export default {
        data(){
            return {
                currentIndex:0,
                swiperCount:0,
                goodsList:[],
            }
        },
        components:{
            TopTabs,BoutiqueGoods,Loading
        },
        computed:{
            boutiqueTypeList(){
                return boutiqueTypeList         
            },
            swiper(){
                return this.$refs.mySwiper.swiper
            },
            swiperOption(){
                let self = this
                let swiperOption = {
                    onSlideChangeEnd(swiper){
                        self.currentIndex = swiper.activeIndex
                    }
                }
                return swiperOption
            },
            swiperHeight(){
                return "height:" + (window.innerHeight - 92) + "px"
            },
            bannerUrl(){
                return require("@image/shop/boutique_banner.png")
            },
        },
        methods:{
            select(data){
                this.goodsList = []
                if(data.type == "hot"){
                    GetBqHotGoods().then(res =>{
                        this.goodsList = res.list
                    }) 
                }else{
                    GetBqGoods(data.type).then(res =>{
                        this.goodsList = res.list
                    }) 
                } 
            },
            GetIndex(index){
                this.currentIndex = index
                this.$nextTick(() =>{
                    this.swiper.slideTo(index)
                })
            },
            GetNum(num){
                this.swiperCount = num
            }   
        },
    }
</script>
<style scoped lang='less'>
    @import '../../assets/css/main.less';
    #boutique{
        text-align: center;
        color: @darkerGray;
        height: 100%;
        .swiper-container{
            height: 100%;
            .swiper-slide{
                overflow: auto;
                .banner{
                    img{
                        width: 100%;
                    }
                }
                .goods-list{
                    &>div{
                        width: 31%;
                        margin:5px 1%;
                        float: left;
                    }
                }
            }
        }
    }
</style>


