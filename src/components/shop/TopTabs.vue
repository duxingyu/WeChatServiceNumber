<template>
    <div class="toptabs" v-if="isShow">
        <div class="tabs-item" :style="width" 
        v-for="(val,index) in tabsList" @click="hit(index)">
            <span :class="{'selected':val.selected}">{{val.name}}</span>
            <i v-if="val.selected"></i>
            <img  class="hot"  v-if="val.isHot" :src="hotImageUrl" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:true
        }
    },
    name:"TopTabs",
    props:["index","tabsList"],
    computed:{
        length(){
            return this.tabsList.length
        },
        width(){
            return "width:" + 100/this.length + '%'
        },
        hotImageUrl(){
            return require("@image/shop/ttabs_hot_type.png")
        },
        list(){
            if(!this.tabsList){
                return []
            }
            return this.tabsList
        }
    },
    methods:{
        select(index){
            this.isShow = false
            for(var i = 0; i < this.length; i++){
                this.tabsList[i]["selected"] = false
            }
            this.tabsList[index]["selected"] = true
            this.isShow = true
            this.$emit("SelectType",this.tabsList[index])
        },
        hit(index){
            this.$emit("GetIndex",index)
        }
    },
    beforeMount(){
        this.$nextTick(() =>{
            this.select(this.index)
            this.$emit("GetCount",this.length)
            this.$parent.$el.style.paddingTop = "45px"
            this.$parent.$el.style.boxSizing = "border-box"
        })
    },
    watch:{
        index(){
            this.select(this.index)
        }
    }
}
</script>
<style lang="less" scoped>
 @import '../../assets/css/main.less';
 .toptabs{
     position: fixed;
     top: 0;
     width: 100%;
     height: 45px;
     background: @darkBrown;
     display: flex;
     align-items: center;
     z-index: 999;
    .tabs-item{
        color:@darkGray;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            position: absolute;
            width: 23px;
            height: 4px;
            background: @golden;
            bottom:0;
        }
        .selected{
            color:@golden
        }
        .hot{
            position: absolute;
            width: 18px;
            right: 0;
            top: 0;
        }
    }
 }
</style>
