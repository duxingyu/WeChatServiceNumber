<template>
    <div class="word-cards">
        <div class="type1" v-if="!type">
            <div class="title">*{{name}}</div>
            <div class="content">
                <div class="word" v-for="val in data">
                    <WordCard :index="0" :type="val.isWrong" :data="val.value"></WordCard>
                </div>
                <div class="cl"></div>
            </div>
        </div>
        <div class="type2" v-if="type">
            <div class="title">*{{name}}</div>
            <div class="content">
                <WordCard v-for="val in data" :index="1" :type="val.isWrong" :data="val.value"></WordCard>
                <div class="cl"></div>
            </div>
        </div>
    </div>
</template>
<script>
import WordCard from "@components/learnlog/WordCard"

export default {
    components:{
        WordCard
    },
    props:["name","type","data"]
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.word-cards{
    .title{
        font-size: 15px;
        color:@blue1;
        font-weight: bold
    }
    .type1{
        .word{
            float: left;
            width: 16.6%;
            text-align: center;
            margin:5px 0;
        }
    }
    .type2{
        .word-card{
            float: left;
            margin:5px 6px;
        }
    }
}
</style>
