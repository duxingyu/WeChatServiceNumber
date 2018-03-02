<template>  
    <div class="top-title">
        {{title}}
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "topTitle",
        props:['title']
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/main.less';
    .top-title {
        position: relative;
        text-align: center;
        font-size: 16px;
        font-weight: lighter;
        background-color: @darkBrown;
        color: @golden;
        height: 45px;
        line-height: 45px;
    }
</style>