<template>
    <div>
        <router-view v-if="isShow"></router-view>
    </div>
</template>
<script>
    import { mapActions } from "vuex"
    import { mapState } from "vuex"

    export default {
        data(){
            return {
                isShow:false
            }
        },
        computed:{
            ...mapState(["user"]),
        },
        methods:{
            ...mapActions(["isLogin"])
        },
        beforeMount(){
            this.isLogin(true).then(res =>{
                this.isShow = true
            })
        },
        watch:{
            user(){
                if(this.user){
                    this.isShow = this.user.isLogin
                }
            }
        }
    }
</script>
