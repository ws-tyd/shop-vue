<template>
  <div>
    <el-carousel height="650px">
      <el-carousel-item>
        <img src="../assets/images/banner1.jpg" class="imageCover">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/images/banner2.jpg" class="imageCover">
      </el-carousel-item>
    </el-carousel>
    <div class="categorysBox">
      <div v-for="(item,index) in categorys" :key="index" class="categorysItem">
        <span>{{ item.name }}</span>
        <span>
            <svg t="1652509880172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1245" width="32" height="32"><path d="M857.70558 495.009024 397.943314 27.513634c-7.132444-7.251148-18.794042-7.350408-26.048259-0.216941-7.253194 7.132444-7.350408 18.795065-0.216941 26.048259l446.952518 454.470749L365.856525 960.591855c-7.192819 7.192819-7.192819 18.85544 0 26.048259 3.596921 3.596921 8.311293 5.39487 13.024641 5.39487s9.42772-1.798972 13.024641-5.39487L857.596086 520.949836C864.747973 513.797949 864.796068 502.219239 857.70558 495.009024z" p-id="1246" fill="#2c2c2c"></path></svg>
          </span>
        <categorys class="showChild" :treeList="item.treeList"></categorys>
      </div>
    </div>
  </div>
</template>

<script>
import categorys from "./categorys.vue";

export default {
  name: "lunbotu",
  components:{
    categorys,
  },
  data() {
    return {
      categorys: [],
    }
  },
  mounted() {
    this.getcategory()
  },
  methods: {
    async getcategory() {
      await this.axios.get("/api/category").then(resp => {
        this.categorys = resp.data;
      })
    }
  }
}
</script>

<style scoped>
.imageCover {
  display: block;
  width: 100%;
  height: 100%;
}

.categorysBox {
  background-color: #707070;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 25%;
  height: 650px;
  position: absolute;
  top: 153px;
  z-index: 1000;
  opacity: .6;
}

.categorysItem {
  margin-top: 20px;
  display: flex;
  width: 80%;
  justify-content: space-between;
  z-index: 1000;
  color: black;
  font-size: 30px;
}
.showChild{
  display: none;
}
.categorysItem:hover .showChild{
  display: block;
  width: 300px;
  position: absolute;
  left: 300px;
  background-color: white;
  opacity: 1;
}
</style>