<template>
    <div class="vedio">
        <video ref="myVedio" controls="false" width="100%" 
        :src="src" :poster="poster" @click="start">
        </video>
    </div>
</template>

<script>
export default {
    props:['src',"isPlay"],
    computed:{
        poster(){
            return require("@image/rofl/shipin_fengmian.png")
        }
    },
    methods:{
        start(){
            if(this.$refs['myVedio'].paused &&
            this.$refs['myVedio'].readyState == 4){
                this.$refs['myVedio'].play()
            }else{
                this.$refs['myVedio'].pause()
            }
        }
    },
    watch:{
        isPlay(){
            if(!this.isPlay){
                this.$refs['myVedio'].pause()
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .vedio{
        width: 100%;
        display: block;
    }
</style>
