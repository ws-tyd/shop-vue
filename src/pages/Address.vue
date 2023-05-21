<template>
<div class="addressBox">
    <div v-for="(item,index) in addressList" :key="index" :class="selectId==item.id?'addBox selectedAddress':'addBox'"  @click.stop="selectAddress(item.id)">
      <div class="boxRow">
        <span >{{item.receiveName}}</span>
      </div>
      <div class="boxRow">
        <span >{{item.receivePhone}}</span>
      </div>
      <div class="boxRow">
        <span>{{item.street}}</span>
      </div>
      <div class="boxRow">
        <div style="display: flex;justify-content: space-between;width: 100%;padding: 20px">
          <span style="text-align: left;width: 50%" @click.stop="deleteAddress(item.id)">删除</span>
          <span style="text-align: right;width: 50%" @click.self="changeFlag('updata',item)">修改</span>
        </div>
      </div>
    </div>
    <div class="addBox" @click="changeFlag('add',null)">
      添加地址
    </div>
  <address-drawer :title="title" :is-show="showFlag" :addressInfo="addressInfo" @closedrawer="closedrawer"></address-drawer>


</div>
</template>

<script>
import AddressDrawer from "../components/addressDrawer.vue";
import {mapState} from "vuex";
export default {
  name: "Address",
  components: {AddressDrawer},
  data(){
    return{
      orderClass:'addBox',
      selectId:'',
      title:'',
      addressInfo:{},
      showFlag:false
    }
  },
  mounted() {
    this.getAddress()
  },
  computed:{
    ...mapState({
      addressList: (state) => state.addressList
    })
  },
  methods:{
    selectAddress(addressId){
      this.selectId=addressId;
      this.$emit('selectAddress',addressId)
    },
    changeFlag(title,addressInfo){
      this.showFlag=!this.showFlag;
      if (title=='add'){
        this.title='新增地址'
      }else {
        this.addressInfo=addressInfo
        this.title='修改地址'
      }
    },
    closedrawer(e){
      this.showFlag=e;
    },
    async getAddress(){
      await this.$store.dispatch('saveAddressList')
    },
    async deleteAddress(id){
     await this.$store.dispatch('deleteAddress',id)
    }
  },
}
</script>

<style scoped>
.addressBox{
  display: flex;
  width: 80%;
  margin: auto;
  flex-wrap: wrap;
  transition: ease-in-out 1s;
}

.boxRow{
  display: flex;
  width: 100%;
  justify-content: center;
}
.boxRow span{
  width: 70%;
  font-size: 15px;
  margin-top: 5px;
}
.addBox{
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
  cursor: pointer;
  width: 20%;
  height: 160px;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  background-color: #f7f8f8;
  border: #E0E0E0 1px solid;
  border-radius: 10px;
}
@media screen and (max-width: 1000px){
  .addBox{
    margin: 3px;
    cursor: pointer;
    width: 20%;
    height: 140px;
  }
}
.selectedAddress{
  border: chartreuse 2px solid;
}
</style>