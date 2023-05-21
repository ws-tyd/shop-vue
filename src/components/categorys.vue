<template>
  <div>
    <div v-for="(item,index) in treeList" :key="index" class="categorysItem">
      <span>{{ item.name }}</span>
      <span>
        <svg t="1652509880172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1245" width="32" height="32"><path d="M857.70558 495.009024 397.943314 27.513634c-7.132444-7.251148-18.794042-7.350408-26.048259-0.216941-7.253194 7.132444-7.350408 18.795065-0.216941 26.048259l446.952518 454.470749L365.856525 960.591855c-7.192819 7.192819-7.192819 18.85544 0 26.048259 3.596921 3.596921 8.311293 5.39487 13.024641 5.39487s9.42772-1.798972 13.024641-5.39487L857.596086 520.949836C864.747973 513.797949 864.796068 502.219239 857.70558 495.009024z" p-id="1246" fill="#2c2c2c"></path></svg>
      </span>
      <categorys class="showChild" :treeList="item.treeList"></categorys>
    </div>
  </div>
</template>

<script>
export default {
  name: "categorys",
  props:{
    treeList:Array
  }
}
</script>

<style scoped>
.categorysItem {
  margin-top: 10px;
  display: flex;
  width: 80%;
  justify-content: space-between;
  z-index: 1000;
  color: black;
  font-size: 16px;
}
.showChild{
  display: none;
}
.categorysItem:hover .showChild{
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  position: absolute;
  left: 300px;
  background-color: white;
  z-index: 1000;
}
</style>