<template>
    <div class="reading-class">
        <div class="cover">
            <img :src="images[0]" alt="">
        </div>
        <div class="text">
            <div class="text-c">  
                1对1父母悄悄话
            </div>
            <div class="text-d">
                第01期:我就爱说我不
            </div>
        </div>
        <img class="status" :src="status[0]" alt="">
        <img class="icon-right" :src="images[1]" alt="">
    </div>
</template>

<script>
    export default {
        computed:{
            images(){
                return [
                    require("@image/ParentChildReading/pic_list_expert.png"),
                    require("@image/ParentChildReading/ic_enter.png"),
                ]
            },
            status(){
                return[
                    require("@image/ParentChildReading/ic_reading.png"),
                    require("@image/ParentChildReading/ic_complete_no.png"),
                    require("@image/ParentChildReading/ic_supplementary_reading.png"),
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
.reading-class{
    width: 95%;
    margin: 10px auto 5px;
    padding: 1px;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    display: flex;
    position: relative;
    box-shadow: 0 0 5px 0px @darkGray;
    .cover{
        width: 42%;
    }
    .text{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 55%;
        &>div{
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
        }
        .text-c{
            color:@darkOrange;
            margin:0px 0 5px;
        }
        .text-d{
            font-size: 12px;
            color:@darkerGray;
        }
    }
    .icon-right{
        position: absolute;
        bottom: 8%;
        right: 3%;
        width: 3.5%;
    }
    .status{
        position: absolute;
        top: 8%;
        right: 3%;
        width: 5%;
    }
}
</style>
