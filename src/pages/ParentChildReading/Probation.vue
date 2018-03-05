<template>
    <div id="probation">
        <img :src="images[0]" alt="">
        <div class="tip">
            <img :src="images[1]" alt="">
        </div>
        <ClassItem></ClassItem>
        <WhisperItme></WhisperItme>
    </div>
</template>

<script>
    import ClassItem from "@components/ParentChildReading/ClassItem"
    import WhisperItme from "@components/ParentChildReading/WhisperItme"
      
    export default {
        components:{
            ClassItem,WhisperItme
        },
        computed:{
            images(){
                return [
                    require("@image/ParentChildReading/pic_banner.png"),
                    require("@image/ParentChildReading/pic_txt.png"),
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
#probation{
    .tip{
        background: #fff;
        padding: 10px 0;
        img{
            width: 70%;
            margin:0 auto;
        }
    }
}
</style>


