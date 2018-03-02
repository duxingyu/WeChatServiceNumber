<template>
    <div class="course-banner" @click="BuyGoods">
        <img :src="bannerImg" alt="">
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { mapState } from "vuex"
import { GetCourseBanner } from "@js/shop/shop.js"

export default {
    computed:{
        ...mapState(["classType"]),
        courseBanner(){
            let data = GetCourseBanner(this.classType)
            return data
        },
        bannerImg(){
            if(this.courseBanner){
                return "http://www.mytian.com.cn/myhtml/wx/images/shop/course/banner_" + 
                this.courseBanner.good_id + ".png?v=" + (new Date().getTime())
            }
        },
    },
    methods:{
        ...mapActions(["buyCourse"]),
        BuyGoods(){
            let options = {}
            options.goodId = this.courseBanner.good_id
            options.price = this.courseBanner.price
            options.title = this.courseBanner.title
            options.goodType = 1
            this.buyCourse(options)
        }
    },
    beforeMount(){
        // console.log(this.data)
    }
}
</script>
<style lang="less" scoped>
.course-banner{
    img{
        width: 100%;
    }
}
</style>
