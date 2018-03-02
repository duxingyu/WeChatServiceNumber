<template>
    <div id="coupon">
        <TopTabs @SelectType="getCouponList" @GetIndex="GetIndex"  @GetCount="GetNum"
        :tabsList="couponType" :index="currentIndex"></TopTabs> 
        <Loading v-show="!couponList && userUid"></Loading>
        <div class="tips" v-if="!userUid">请先登录</div>
        <swiper ref="mySwiper" :options="swiperOption">
            <swiper-slide v-for="(i,j) in swiperCount">
                <div class="content" v-if="(j == currentIndex)">
                    <CouponList v-for="val in couponList" :content="val"></CouponList>
                </div>
            </swiper-slide>
        </swiper>
        <transition name="slide">
            <router-view class="children-route"></router-view> 
        </transition>
    </div>
</template>
<script>
    import TopTabs from "@components/shop/TopTabs"
    import CouponList from '@components/shop/CouponList'
    import Loading from '@components/Loading'

    import { couponType } from "@js/shop/shop.js"
    import { getCoupons } from '@interface'
    import { logoutMessage } from '@common'
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    
    export default {
        data(){
            return{
                couponList:'',
                fromPath:'',
                currentIndex:0,
                swiperCount:0,
            }
        },
        computed:{
            ...mapState(['user','goods']),
            userUid(){
                return this.user.uid
            },
            couponType(){
                return couponType         
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
        },
        components:{
            CouponList,Loading,TopTabs
        },
        methods:{
            ...mapActions(["isLogin"]),
            getCouponList(data){
                this.isLogin().then(res =>{
                    this.getCoupons(data.type)
                })
            },
            getCoupons(status){
                this.couponList = ''
                 getCoupons({
                    uid:this.user.uid,
                    token:this.user.token,
                    status:status,
                }).then(res =>{
                    if(this.goods.goodId){
                        let goodPrice = this.goods.price
                        let list = res.list,lista = [], listb=[];
                        for(var i = 0; i < list.length; i++){
                            if(goodPrice > list[i].min_use_price && 
                            goodPrice > list[i].price){
                                lista.push(list[i])
                            }else{
                                listb.push(list[i])
                            }
                        }
                        this.couponList = lista.concat(listb)
                    }else{
                        this.couponList = res.list
                    }
                    if(res.list.length == 0){
                        alert('此类型优惠券\n数量为0')
                    }
                })
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
        watch:{
            userUid(){
                if(this.currentIndex == 0){
                    this.getCouponList({type:0})
                }else{
                    this.GetIndex(0)
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    #coupon{
        height: 100%;
        overflow:auto;
        .tips{
            text-align: center;
            color:@black;
            margin-top: 15px;
        }
        .swiper-container{
            height: 100%;
            .swiper-slide{
                overflow: auto;
            }
        }
        .couponList{
            margin: 10px 5px;
        }
    }
</style>

