<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px">
        <nav-left></nav-left>
      </el-aside>
      <el-container>
        <el-header>
          <nav-top></nav-top>
        </el-header>
        <el-main>  <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavTop from "./nav-top.vue";
import NavLeft from "./nav-left.vue";
export default {
  name: "index",
  components: {NavLeft, NavTop}
}
</script>

<style scoped>

</style>