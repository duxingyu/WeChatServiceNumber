<template>
    <div class="loading">
        <div :class="{type1:true, type2:typeClass}">
            <div class="content">
                <img src="../assets/images/timg.gif" alt="">
                <span>正在加载...</span>
            </div>
        </div>
    </div>
    
</template>
<script>
    export default {
        props:['type'],
        computed:{
            typeClass(){
                if(this.type){
                    return true
                }else{
                    return false
                }
            }
        }
    }
</script>
<style lang="less" scoped>
@import "../assets/css/main.less";
.loading{
    .type1{
        text-align: center;
        .content{
            img{
                width: 20px;
                display: block;
                margin: 10px auto 5px;
            }
            span{
                color: @black;
                font-size: 12px;
            }
        }
    }
    .type2{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;left:0;
        box-sizing: border-box;
        .content{
            position: absolute;
            left: 50%;
            top:40%;
            transform: translateX(-50%);
            background:rgba(0,0,0,.6);
            padding:0 10px 7px;
            border-radius: 5px;
            span{
                color:@darkGray;
            }
        }
    }
}
    
</style>
