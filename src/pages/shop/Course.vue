<template>
    <div id="course">
        <div>
            <CourseBanner v-if="courseGoodsList.length">
            </CourseBanner>
        </div>
        <div class="">
            <Loading v-if="!courseGoodsList.length"></Loading>
            <CourseItem v-for="(val,index) in courseGoodsList" 
            :data="val" :index="index" v-if="ShowCourse(val,index)">
            </CourseItem>
            <div class="cl"></div>
        </div>
    </div>
</template>
<script>
    import CourseItem from "@components/shop/CourseItem"
    import CourseBanner from "@components/shop/CourseBanner"
    import Loading from "@components/Loading"

    import { mapState } from "vuex"
    import { getClassList } from "@interface"
    import { AddDate } from "@js/shop/shop.js"

    export default {
        data(){
            return {
                courseGoodsList:[]
            }
        },
        computed:{
            ...mapState(["classType"]),
        },
        components:{
            CourseItem,Loading,CourseBanner
        },
        methods:{
            GetCourseGoodsList(){
                this.courseGoodsList = []
                getClassList(this.classType).then(res =>{
                    this.courseGoodsList = AddDate(res.list,this.classType)
                    // console.log(res.list)
                })
            },
            ShowCourse(val,index){
                if(this.classType && 
                this.classType.indexOf("hi") != -1 &&
                val.class_type == "ALL" &&
                this.courseGoodsList.length != index+1){
                    return false
                }
                return true
            }
        },
        beforeMount(){
            this.GetCourseGoodsList()
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    #course{
        .course-item{
            float: left;
            width: 31%;
            margin:5px 1%;
        }
    }
</style>


