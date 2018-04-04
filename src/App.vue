<template>
  <div id="app">
    <Loading type="1" v-if="loadingShow"></Loading>
    <router-view v-if="isInit"></router-view>
    <BindPhone></BindPhone>
  </div>
</template>

<script>
  import BindPhone from "@pages/BindPhone";
  import Loading from "@components/Loading"

  import { mapState } from "vuex";
  import { mapMutations } from "vuex";
  import { login } from "@interface";
  import { getWxShareOptions } from "@interface";
  import { isWeiXin } from "@common";

  export default {
    name: "app",
    components: {
      BindPhone,Loading
    },
    data(){
      return{
        isInit:false,
        loadingShow:false,
        count:0
      }
    },
    computed: {
      ...mapState(["userOpenId"])
    },
    methods: {
      ...mapMutations(["setUserInfo"]),
      isInited(){
        this.count++;
        if(this.count == 2){
          this.isInit = true
          this.loadingShow = false
        }
      },
      init(){
        this.loadingShow = true

        getWxShareOptions().then(res =>{
          this.isInited()
        })

        login(this.userOpenId).then(res =>{
          if(res.result == 1){
            this.setUserInfo({
              isLogin: true,
              uid: res.baby.uid,
              token: res.baby.token,
              phone: res.baby.phone,
              alias: res.baby.alias,
              birthday: res.baby.birthday,
              wxAlias:res.baby.alias,
              wxHeadImg:res.wxUserInfo.headImg,
              address: res.address
            });
          }
          this.isInited()
        })
        
      },
    },
    beforeMount() {
      let whereFrom = this.$route.query.whereFrom
      if((isWeiXin() && this.userOpenId) || whereFrom == "app"){
        this.init()
      }else{
        alert("请在服务号中打开")
      }
      
    }
  };
</script>

<style>

</style>
