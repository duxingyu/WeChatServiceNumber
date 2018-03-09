<template>
  <div class="banner">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in images">
          <img :src="item.src">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 4000,
          autoplayDisableOnInteraction:false,
          loop:true,
          // pagination : '.swiper-pagination',
        }
      }
    },
    props:['images'],
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    }
  }
</script>
<style lang="less" scoped>
    .swiper-slide img{
        display: block;
        width: 100%;
    }
</style>


