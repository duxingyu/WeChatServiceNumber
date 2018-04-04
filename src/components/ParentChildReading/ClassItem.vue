<template>
    <div class="reading-class" @click="toRead">
        <div class="cover">
            <img :src="data.coverUrl" alt="">
        </div>
        <div class="text">
            <!-- <div class="text-a">
                用心还原孩子的世界
            </div> -->
            <div class="text-f">
                <div class="text-b">
                    65天儿童成长敏感期主题阅读
                </div>
                <img v-if="!data.readIsFree" class="status" :src="status[data.readStatus]" alt="">
            </div>
            <div class="text-e">
                <div class="text-c">  
                    今日亲子阅读内容
                </div>
                <div class="text-d">
                    <span v-if="!data.readIsFree"> 第{{data.clazzIndex}}/65期，</span>{{data.readContent}}
                </div>
                <img class="icon-right" :src="images[1]" alt="">
            </div>
        </div>
        
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import { updateUserAction } from "@interface"

    export default {
        props:["data"],
        computed:{
            ...mapState(["user"]),
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
                if(this.user.isLogin && this.data.readIsFree){
                    let option = {}
                    option.uid = this.user.uid
                    option.token = this.user.token
                    option.actionId = 19
                    updateUserAction(option).then(res =>{
                        location.href = this.data.readUrl
                    })
                }else{
                    location.href = this.data.readUrl
                }
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
        width: 54%;
        .text-b,.text-c,.text-d{
            width: 89%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
        }

        .text-c{
            color:@darkOrange;
            font-weight: bold;
            margin:0px 0 5px;
        }
        .text-d{
            font-size: 12px;
            color:@darkerGray;
        }
        .text-e{
            margin:20px 0 0px;
            position: relative;
            .icon-right{
                position: absolute;
                bottom: 50%;
                transform: translateY(50%);
                right: 3%;
                width: 6%;
                -webkit-animation: slideRight 1s linear infinite;
                animation: slideRight 1s linear infinite;
            }
        }
        .text-f{
            position: relative;
            .text-b{
                font-weight: bold;
                color: @darkerGray;
                font-size: 12px;
            }
            .status{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 2%;
                width: 9%;
            }
        }
    }
}
@-webkit-keyframes slideRight{
    0%{
        -webkit-transform: translate(-100%,50%);
    }
}
@keyframes slideRight{
    0%{
        transform: translate(-100%,50%);
    }
}
</style>
