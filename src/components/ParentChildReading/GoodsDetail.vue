<template>
    <div class="goods-detail">
        <img v-for="itme in images" :src="itme" alt="">
    </div>
</template>

<script>
    export default {
        computed:{
            images(){
                return [
                    require("@image/ParentChildReading/detail_1.jpg"),
                    require("@image/ParentChildReading/detail_2.jpg"),
                    require("@image/ParentChildReading/detail_3.jpg"),
                    require("@image/ParentChildReading/detail_4.jpg"),
                    require("@image/ParentChildReading/detail_5.jpg"),
                    require("@image/ParentChildReading/detail_6.jpg"),
                    require("@image/ParentChildReading/detail_7.jpg"),
                    require("@image/ParentChildReading/detail_8.jpg"),
                    require("@image/ParentChildReading/detail_9.jpg")
                ]
            },
        },
    }
</script>

<style lang="less">

</style>

