<template>
  <div id="shop">
    <router-view></router-view>
    <BottomTabs></BottomTabs>   
  </div>
</template>

<script>
import BottomTabs from '@components/shop/BottomTabs'

export default {
    name: 'shop',
    components:{
        BottomTabs
    }
}
</script>
<style>
</style>
