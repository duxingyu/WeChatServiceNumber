<template>
    <div class="bottomTabs">
        <div :class="{selected:val.select}" v-for="(val,index) in typeList" @click="select(index)">
            <div class="icon">
                <img :src="GetImage(val.type,val.select)" alt="">
                <span class="couponCount" v-if="val.type == 'coupon' && couponCount">
                    {{couponCount > 99?'99+':couponCount}}
                </span>
            </div>
            <img class="line" :src="line" alt="" v-if="(index+1) != typeList.length">
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    import { getCoupons } from "@interface"

    export default {
        name: 'bottomTabs',
        data(){
            return{
                iconUrl:"../../assets/images/shop/btabs_",
                typeList:[
                    {
                        name:"课程",
                        type:"classes",
                        select:true
                    },
                    {
                        name:"精品屋",
                        type:"boutique",
                        select:false
                    },
                    {
                        name:"礼券",
                        type:"coupon",
                        select:false
                    },
                    {
                        name:"我的",
                        type:"my",
                        select:false
                    },
                ],
                couponCount:0
            }
        },
        computed:{
            ...mapState(["user"]),
            userUid(){
                return this.user.uid
            },
            line(){
                return require("@image/shop/btabs_line.png")
            },
            path(){
                return this.$route.path
            }
        },
        methods: {
            select(index) {
                if(!this.changeType(index)){
                    return
                }
                this.$router.
                replace({path:'/shop/'+this.typeList[index]["type"]})
            },
            changeType(index){
                if(this.typeList[index]["select"] == true){
                    return false
                }
                for(var i = 0; i < this.typeList.length; i++){
                    this.typeList[i]["select"] = false
                }
                this.typeList[index]["select"] = true
                return true
            },
            GetImage(type,isSelected){
                return require("@image/shop/btabs_"+type+"_"+
                                (isSelected?"selected":"unselect")+".png")
            },
            GetRouter(){
                for(var i = 0; i < this.typeList.length; i++){
                    let reg = new RegExp("/shop/"+this.typeList[i]["type"])
                    if(reg.test(this.path)){
                        this.changeType(i)
                        return 
                    }
                }
                this.changeType(0)
            },
            GetCoupon(){
                if(this.userUid){
                    let options = {}
                    options.uid = this.user.uid
                    options.token = this.user.token
                    options.status = 0
                    getCoupons(options).then(res =>{
                       this.couponCount = res.list.length
                    })
                }else{
                    this.couponCount = 0
                }
            }
        },
        beforeMount(){
            this.GetCoupon()
            this.GetRouter()
            this.$nextTick(() =>{
                this.$parent.$el.style.paddingBottom = "50px"
                this.$parent.$el.style.boxSizing = "border-box"
                this.$parent.$el.style.height = window.innerHeight + "px"
                this.$parent.$el.style.overflow = "auto"
            })
        },
        watch:{
            userUid(){
                this.GetCoupon()
            },
            path(){
                this.GetRouter()
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/main.less';
    .bottomTabs {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        border-top: 1px solid @lightGray;
        box-sizing: border-box;
        background:@brown;
        z-index: 88;
        div {
            width: 25%;
            position: relative;
            .icon {
                position: absolute;
                right: 50%;
                top:50%;
                transform: translate(50%,-50%);
                width: 40px;
                img{
                    width: 100%;
                    display: block;
                }
                .couponCount{
                    font-size: 12px;
                    color:#fff;
                    position: absolute;
                    top: 8px;
                    right: 2px;
                    transform:translate(50%,-50%);
                    background: @red;
                    padding: 2px 5.8px;
                    border-radius: 19px;
                }
            }
            .line{
                position: absolute;
                right: 0;
                top:0;
                height: 100%;
                width: 1px;
            }
            
        }
        .selected{
            background:@darkBrown;
        }
    }
</style>