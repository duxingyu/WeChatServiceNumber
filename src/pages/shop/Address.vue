<template>
    <div id="modify_address">
        <TopTitle title="编 辑 地 址"></TopTitle>
        <div class="address">
            <div class="name">
                <label for="name">收件人: </label>
                <input type="text" name="" v-model="name" placeholder="请输入收件人姓名" id="name">
            </div>
            <div class="tel">
                <label for="tel">手机号码: </label>
                <input type="text" name="" v-model="tel" placeholder="请输入收件人手机号码" id="tel">
            </div>
            <div class="address_city">
                <label for="pick_city">所在地区: </label>
                <input id="pick_city" type="text" name="" v-model="pick_city" placeholder="请输入地区" readonly="readonly">
            </div>
            <div class="address_detail">
                <label for="address_detail">详细地址: </label>
                <input type="text" name="" value="" placeholder="请输入详细地址" v-model="address_detail" id="address_detail">
            </div>
        </div>
        <p class="title">
            *地址信息将被用于商品寄送使用，务必填写正确！
        </p>
        <button type="button" name="button" class="preservation" @click="Save">保存</button>
        <Loading type="2" v-show="show"></Loading>
    </div>
</template>

<script>
    import LAreaData from "@js/shop/LAreaData1"
    import LArea from "@js/shop/LArea"
    import Loading from "@components/Loading"
    import TopTitle from '@components/shop/TopTitle'

    import { mapState } from "vuex"
    import { mapMutations } from "vuex"
    import { logoutMessage } from "@common"
    import { UpdateAddress } from "@interface"
    import { SaveAddress } from "@interface"

    export default {
        data() {
            return {
                name: "",
                tel: "",
                pick_city: "",
                address_detail: "",
                address_id: "",
                show:false
            }
        },
        computed: {
            ...mapState(["user"])
        },
        components:{
            Loading,TopTitle
        },
        methods: {
            ...mapMutations(["setUserAddress"]),
            Save() {
                if(!this.Verification()){
                    return false
                }
                let options = this.SetOptions()
                let self = this
                this.show = true
                if(this.user.address){
                options["id"] = this.address_id
                UpdateAddress(options).then(res =>{
                    logoutMessage("地址修改成功")
                    self.BackCall(options)
                })
                }else{
                SaveAddress(options).then(res =>{
                    logoutMessage("地址创建成功")
                    options["id"] = res.addId
                    self.BackCall(options)
                })
                }
            },
            Verification(){
                if(!this.name){
                    logoutMessage("收件人未填写")
                    return false
                }else if(!/^1[0-9]{10}$/.test(this.tel)){
                    logoutMessage("手机格式错误")
                    return false
                }else if(this.pick_city == ""){
                    logoutMessage("地区未选择")
                    return false
                }else if(this.address_detail == ""){
                    logoutMessage("详细地址未填写")
                    return false
                }
                return true
            },
            SetOptions() {
                let options = {}

                let area = this.PareseArea()
                options.provinceId = area.provinceId
                options.province = area.province
                options.cityId = area.cityId
                options.city = area.city
                options.areaId = area.areaId
                options.area = area.area

                options.addressee = this.name
                options.phone = this.tel
                options.detailAddr = this.address_detail
                options.detail_addr = this.address_detail
                options.uid = this.user.uid
                options.token = this.user.token
                return options
            },
            PareseArea() {
                let pickCity = this.pick_city
                let area = {}
                for (let i = 0; i < LAreaData.length; i++) {
                    if (LAreaData[i].name == pickCity.split(",")[0]) {
                        area.provinceId = LAreaData[i].id
                        area.province =  pickCity.split(",")[0]
                        for (let j = 0; j < LAreaData[i].child.length; j++) {
                            if (LAreaData[i].child[j].name == pickCity.split(",")[1]) {
                                area.cityId = LAreaData[i].child[j].id
                                area.city = pickCity.split(",")[1]
                                for (let k = 0; k < LAreaData[i].child[j].child.length; k++) {
                                    if (LAreaData[i].child[j].child[k].name == pickCity.split(",")[2]) {
                                        area.areaId = LAreaData[i].child[j].child[k].id
                                        area.area = pickCity.split(",")[2]
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                return area
            },
            BackCall(options){
                this.show = false
                this.setUserAddress(options)
                clearTimeout(this.backTimer)
                let self = this
                this.backTimer = setTimeout(() =>{
                self.$router.go(-1)
                },500)
            }
        },
        beforeMount() {
            if (this.user.address) {
              let address = this.user.address
              this.name = address.addressee
              this.tel = address.phone
              this.address_detail = address.detail_addr
              this.pick_city = address.province + "," + (address.city ? address.city : '') + "," + (address.area ? address.area : '')
              this.address_id = address.id
            }
        },
        mounted() {
            let area = new LArea();
            area.init({
                'trigger': '#pick_city',
                'valueTo': '#value',
                'keys': {
                    id: 'id',
                    name: 'name'
                },
                'type': 1,
                'data': LAreaData
            });
        }
    }
</script>

<style lang="css" scoped>
    @import "../../assets/css/LArea.min.css";
    .course {
        font-size: 21px;
        color: white
    }
    
    .address {
        background: #fff;
        padding: 15px 20px 0;
        margin: 0 auto;
        box-sizing: border-box;
        box-shadow: 0 0 5px 2px #ccc
    }
    
    .address div {
        padding-left: 15px;
        padding: 10px 0;
        border-bottom: 1px solid #EEEEEE;
        display: flex;
    }
    
    .address div input {
        border: 0;
        outline: 0;
        display: block;
    }
    
    .title {
        color: #F23030;
        font-size: 12px;
        text-align: center;
        line-height: 50px;
    }
    
    .preservation {
        width: 200px;
        height: 40px;
        border: 0;
        background: #F23030;
        border-radius: 2px;
        color: white;
        font-size: 18px;
        display: block;
        margin: 15px auto;
        outline: 0;
    }
</style>