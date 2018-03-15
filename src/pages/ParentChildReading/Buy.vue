<template>
    <div id="reading-buy">
        <GoodsDetail></GoodsDetail>
        <BuyBtn></BuyBtn>
    </div>
</template>

<script>
    import BuyBtn from "@components/ParentChildReading/BuyBtn"
    import GoodsDetail from "@components/ParentChildReading/GoodsDetail"
    
    export default {
        components:{
            BuyBtn,GoodsDetail
        }
    }
</script>

<style lang="less" scoped>
#reading-buy{
    
}
</style>
