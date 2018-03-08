<template>
    <div class="reading-class" @click="toRead">
        <div class="cover">
            <img :src="data.coverUrl" alt="">
        </div>
        <div class="text">
            <div class="text-a">
                用心还原孩子的世界
            </div>
            <div class="text-b">
                65天儿童成长敏感期主题阅读
            </div>
            <div class="text-c">  
                今日亲子阅读内容
            </div>
            <div class="text-d">
               <span v-if="!data.readIsFree"> 第{{data.clazzIndex}}/65期，</span>{{data.readContent}}
            </div>
        </div>
        <img class="status" :src="status[data.readStatus]" alt="">
        <img class="icon-right" :src="images[1]" alt="">
    </div>
</template>

<script>
    export default {
        props:["data"],
        computed:{
            images(){
                return [
                    require("@image/ParentChildReading/lesson_01.png"),
                    require("@image/ParentChildReading/ic_enter.png"),
                ]
            },
            status(){
                return[
                    require("@image/ParentChildReading/ic_complete_no.png"),
                    require("@image/ParentChildReading/ic_reading.png"),
                    require("@image/ParentChildReading/ic_supplementary_reading.png"),
                ]
            }
        },
        methods:{
            toRead(){
                console.log(this.data.readUrl)
                location.href = this.data.readUrl
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/css/main.less';
.reading-class{
    width: 95%;
    margin: 10px auto 0px;
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
        .text-a{
            font-weight: bold;
        }
        .text-c{
            color:@darkOrange;
            margin:8px 0 3px;
        }
        .text-b,.text-d{
            font-size: 12px;
            color:@darkerGray;
        }
        .text-b{
            margin:3px 0 0px;
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
