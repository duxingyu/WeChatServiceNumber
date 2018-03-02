<template>
    <div id="Classes">
        <TopTabs @SelectType="selectCourse" @GetIndex="GetIndex" @GetCount="GetNum"
         :tabsList="courseTypeList" :index="currentIndex" ref="toptabs" >
        </TopTabs>
        <swiper ref="mySwiper" :options="swiperOption">
            <swiper-slide v-for="(i,j) in swiperCount">
                <div class="content" v-if="(j == currentIndex)">
                    <router-view></router-view>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import TopTabs from "@components/shop/TopTabs"
    import Loading from '@components/Loading'

    import { logoutMessage } from "@common"
    import { getClassList } from '@interface'
    import { courseTypeList } from "@js/shop/shop.js"
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'

    export default {
        data(){
            return{
                classList:'',
                currentIndex:0,
                swiperCount:0,
            }
        },
        components:{
            TopTabs
        },
        computed:{
            ...mapState(['classType']),
            courseTypeList(){
                return courseTypeList
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
            path(){
                return this.$route.path
            }
        },
        methods:{
            ...mapMutations(["setClassType"]),
            selectCourse(data){
                this.setClassType(data.type)
                if(data.type == ["taocan"]){
                    this.$router.replace({path:"/shop/classes/packages"})
                }else{
                    this.$router.replace({path:"/shop/classes"})
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
            },
            GetWhatType(){
                for(var i = 0; i < courseTypeList.length; i++){
                    if(this.classType[0] == courseTypeList[i].type[0]){
                        return i
                    }
                }
                return 0
            }
        },
        beforeMount(){
            this.$nextTick(() =>{
                this.GetIndex(this.GetWhatType())
            })
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    #Classes {
       height: 100%; 
       .swiper-container{
           height: 100%;
           .swiper-slide{
               overflow: auto;
           }
       }
    }
</style>
