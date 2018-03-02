<template>
    <div class="progress-bar">
        <div class="bar">
            <div class="completion">
                已学习{{count}}个单元 完成{{percent}}%
            </div>
            <div class="progress">
                <i :style="width"></i>
            </div>
            <p class="proposal">
                宝贝已学习{{count}}个单元，请您多给宝宝一些赞美，增强他对学习的兴趣。
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props:["count","percent"],
    computed:{
        width(){
            return "width:" + this.percent + "%"
        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.progress-bar{
    background:@blue;
    padding: 15px;
    .bar{
        background: #fff;
        border-radius: 8px;
        padding:14px 5%;
        box-shadow: 0 0 5px 0px @darkerGray;
        .completion{
            text-align: center;
            color:@blue1;
            font-size: 16px;
            font-weight: bold;
        }
        .progress{
            height: 10px;
            border-radius: 100px;
            background:@darkGray;
            margin: 0 auto;
            margin:15px 0 10px;
            i{
                display: block;
                width: 0%;
                height: 100%;
                border-radius: 100px;
                background:@darkOrange;
            }
        }
        .proposal{
            color:@darkerGray;
        }
    }
}

</style>

