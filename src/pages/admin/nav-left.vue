<template>
  <div class="navLeft">
    <h1 style="display: inline-block;width:100%;text-align: center;background-color:#545c64;color:#fff;">后台管理</h1>
  <el-menu
      default-active="0"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      :unique-opened="true"
      >
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>图片管理</span>
      </template>
      <el-menu-item index="1-2" route="/admin" @click="selectd('/admin','图片列表')">
        <i class="el-icon-menu"></i>
        <span slot="title">图片列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="2-1" route="/admin/proList/1" @click="selectd('/proList','商品列表')">
        <i class="el-icon-menu"></i>
        <span slot="title">商品列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="3-1" route="/admin/user/1" @click="selectd('/user/1','用户列表')">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <i class="el-icon-location"></i>
        <span>商品分类管理</span>
      </template>
      <el-menu-item index="4-1" route="/admin/category/1" @click="selectd('/admin/category/1','商品分类列表列表')">
        <i class="el-icon-menu"></i>
        <span slot="title">商品分类列表</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  </div>
</template>

<script>
export default {
  name: "nav-left",
  methods:{
    selectd(url,name){
      this.$store.commit('saveBreadcrumbList',{url:url,name:name})
    }
  }
}
</script>

<style scoped>
.navLeft{
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #545c64;
  color:#fff;
  vertical-align: top;
}
</style>