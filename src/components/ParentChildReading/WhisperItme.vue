<template>
    <div class="reading-class" @click="toWhisper">
        <div class="cover">
            <img :src="data.expertImgUrl" alt="">
        </div>
        <div class="text">
            <div class="text-c">  
                5分钟父母悄悄话
            </div>
            <div class="text-d">
                <span v-if="!data.readIsFree"> 第{{data.clazzIndex}}/65期 </span>{{data.whisperContent}}
            </div>
        </div>
        <img v-if="!data.readIsFree" class="status" :src="status[data.expertReadStatus]" alt="">
        <img class="icon-right" :src="images[1]" alt="">
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
                    require("@image/ParentChildReading/pic_list_expert.png"),
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
            toWhisper(){
                if(this.user.isLogin){
                    let option = {}
                    option.uid = this.user.uid
                    option.token = this.user.token
                    option.actionId = 19
                    updateUserAction(option).then(res =>{
                        location.href = this.data.readUrl
                    })
                }else{
                    location.href = this.data.whisperUrl
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
            font-weight: bold;
        }
        .text-d{
            font-size: 12px;
            color:@darkerGray;
        }
    }
    .icon-right{
        position: absolute;
        bottom: 50%;
        transform: translateY(50%);
        right: 1.5%;
        width: 3.35%;
        -webkit-animation: slideRight 1s linear infinite;
        animation: slideRight 1s linear infinite;
    }
    .status{
        position: absolute;
        top: 8%;
        right: 1.1%;
        width: 5%;
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
