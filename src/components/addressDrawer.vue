<template>
<div>
<!--        :before-close="handleClose"-->
  <el-drawer
      :title="title"
      v-model="flag"
      direction="ltr"
      :before-close="closeDrawer"
      custom-class="demo-drawer"
      ref="drawer"
  >
    <div  style="display:block;width: 80%;margin:auto;">
      <el-form :model="form">
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.receiveName" autocomplete="off" aria-required="true"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话" :label-width="formLabelWidth">
          <el-input v-model="form.receivePhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-select v-model="form.province" placeholder="省份" @change="SelectdP">
            <el-option v-for="(item,index) in provinces" :key="index" :label="item.name" :value="item.name" ></el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="城市"  @change="SelectdC">
            <el-option v-for="(item,index) in citys" :key="index" :label="item.name" :value="item.name" ></el-option>
          </el-select>
          <el-select v-model="form.area" placeholder="地区" @change="SelectdA">
            <el-option v-for="(item,index) in areas" :key="index" :label="item.name" :value="item" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.street" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input v-model="form.postalCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="display:flex;width: 80%;margin:auto;justify-content: space-between">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="handleClose()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </div>
  </el-drawer>
</div>
</template>

<script>
import city2 from '../assets/static/city2.json'
export default {
  name: "addressDrawer",
  props: {
    title:String,
    isShow:Boolean,
    addressInfo:Object,
  },
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      flag:false,
      form: {
        receiveName: this.addressInfo.receiveName,
        receivePhone: this.addressInfo.receivePhone,
        province: this.addressInfo.province,
        provinceCode: this.addressInfo.provinceCode,
        city: this.addressInfo.city,
        cityCode: this.addressInfo.cityCode,
        area: this.addressInfo.area,
        areaCode: this.addressInfo.areaCode,
        street: this.addressInfo.street,
        postalCode: this.addressInfo.postalCode
      },
      provinces:[],
      citys:[],
      areas:[],
      formLabelWidth: '120px',
      timer: null,
    };
  },
  watch:{
    addressInfo:function (val){
          this.form.receiveName= val.receiveName,
          this.form.receivePhone= val.receivePhone,
          this.form.province= val.province,
          this.form.provinceCode= val.provinceCode,
          this.form.city=val.city,
          this.form.cityCode= val.cityCode,
          this.form.area= val.area,
          this.form.areaCode= val.areaCode,
          this.form.street= val.street,
          this.form.postalCode= val.postalCode
    },
    isShow:function (val){
      this.flag=val;
    }
  },
  mounted() {
    for (const city2Key in city2) {
      this.provinces.push({key:city2Key,...city2[city2Key]})
    }
  },
  methods: {
    SelectdP(value){
      this.citys=[];
      this.areas=[];
      this.form.cityCode='';
      this.form.areaCode='';
      this.form.city=''
      this.form.area=''
      for (let i = 0; i < this.provinces.length; i++) {
        if (value==this.provinces[i].name){
          this.form.provinceCode=this.provinces[i].key;
          for (const citykey in this.provinces[i].child) {
            this.citys.push({key:citykey,...this.provinces[i].child[citykey]})
          }
        }
      }
    },
    SelectdC(value){
      this.areas=[];
      this.form.areaCode='';
      this.form.area=''
      for (let i = 0; i < this.citys.length; i++) {
        if (value==this.citys[i].name){
          this.form.cityCode=this.citys[i].key;
          for (const areakey in this.citys[i].child) {
            this.areas.push({key:areakey,name:this.citys[i].child[areakey]})
          }
        }
      }
    },
    SelectdA(value){
      this.form.area=value.name;
      this.form.areaCode=value.key;
    },
    handleClose() {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(() => {
            this.loading = true;
            this.timer = setTimeout(() => {
              if (this.title=='新增地址'){
                this.$store.dispatch('createAddress',this.form).then(resp=>{
                  if (resp){
                    this.closeDrawer();
                  }
                })
                // this.axios.put('api/address',this.form).then(resp =>{
                //   this.closeDrawer();
                // })
              }else {
                this.$store.dispatch('updateAddress',{addressId:this.addressInfo.id,data:{...this.form}}).then(resp=>{
                  if (resp){
                    this.closeDrawer();
                  }
                })
                // this.axios.put('api/address/'+this.addressInfo.id,this.form).then(resp =>{
                //   this.closeDrawer();
                // })
              }
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 100);
            }, 400);
          })
          .catch(() => {});
    },
    closeDrawer(){
      this.$emit('closedrawer',false);
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
      this.$emit('closedrawer',false);
    }
  }
}
</script>

<style scoped>

</style>