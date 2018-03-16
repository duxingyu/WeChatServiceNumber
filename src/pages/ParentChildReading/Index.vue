<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapState } from "vuex"

    export default {
        computed:{
            ...mapState(["user"])
        },
        beforeMount(){
            localStorage.wxUserInfo = JSON.stringify(this.user)
        },
    }
</script>
