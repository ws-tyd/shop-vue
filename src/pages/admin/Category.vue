<template>
  <div class="Main">
    <el-col :span="20" :offset="2">
      <el-table
          :data="categoryList"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'treeList', hasChildren: 'hasChildren'}"
      >
        <el-table-column
            prop="id"
            label="ID"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="日期"
            sortable
            width="180">
        </el-table-column>
      </el-table>
      <el-pagination
          background
          :page-sizes="[5,8,10,15,20]"
          :page-size="5"
          layout="sizes, prev, pager, next"
          :total="100"
          :current-page="parseInt(pageUtil.current)"
          @size-change="sizeChange"
          @current-change="currentChage"
      >
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Category",
  data(){
    return{
      categoryList:[],
      pageUtil:{
        current:1,
        size:5
      }
    }
  },
  mounted() {
    this.getCetagoryList(this.pageUtil)
  },
  beforeRouteUpdate(to,from,next){
    next();
    this.pageUtil.current=to.params.current;
    this.getCetagoryList(this.pageUtil)
  },
  methods:{
    sizeChange(size){
      this.pageUtil.size=size;
      this.getCetagoryList(this.pageUtil)
    },
    currentChage(current){
      this.pageUtil.current=current;
      this.$router.push("/admin/category/"+current)
    },
    getCetagoryList(data){
      // data.current=this.$route.params.current;
      this.axios.get("/api/category").then(resp=>{
        this.categoryList=resp.data;
      })
    }
  }
}
</script>

<style scoped>
.Main{
  display: flex;
  flex-wrap: wrap;
  float: right;
  width: 100%;
  height: auto;
}
</style>