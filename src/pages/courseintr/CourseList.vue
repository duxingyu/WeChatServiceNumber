<template>
    <div id="course-list">
        <div class="banner">
            <img :src="bannerUrl" alt="">
        </div>
        <CourseIntrListItem 
        v-for="val in CourseList" 
        :data="val">
        </CourseIntrListItem>
    </div>
</template>
<script>
import CourseIntrListItem from "@components/courseintr/CourseIntrListItem"

import { CourseIntrList } from "@js/courseintr/index.js"

export default {
    components:{
        CourseIntrListItem
    },
    computed:{
        bannerUrl(){
            return require("@image/courseintr/courselist_banner.png")
        },
        CourseList(){
            return CourseIntrList
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
#course-list{
    .banner{
        img{
            width: 100%;
            display: block;
        }
    }
    .courseintlist-item{
        width: 96%;
        margin:8px auto;
    }
}
</style>
