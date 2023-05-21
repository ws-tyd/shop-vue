<template>
<div class="Main">
  <el-col :span="20" :offset="2">
    <el-table
        :data="proList"
        stripe
        style="width: 100%;margin: auto">
      <el-table-column
          prop="id"
          label="id"
          width="100">
      </el-table-column>
      <el-table-column
          label="图片"
          width="300">
        <template  #default="scope">
          <img :src="'/api/'+scope.row.mainImage" :alt="scope.row.name"  style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column
          prop="subTitle"
          label="信息"
          width="200"
      >
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="添加时间"
          width="300">
      </el-table-column>
      <el-table-column
          label="操作"
          width="300">
        <template  #default="scope">
          <el-button type="primary" circle @click="deleteProduct(scope.row)">
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </template>
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
import {Delete} from '@element-plus/icons-vue'
export default {
  name: "ProListAdmin",
  components:{
    Delete
  },
  data(){
    return{
      proList:[],
      pageUtil:{
        current:1,
        size:5
      }
    }
  },
  mounted() {
    this.getProList(this.pageUtil)
  },
  beforeRouteUpdate(to,from,next){
    next();
    this.pageUtil.current=to.params.current;
    this.getProList(this.pageUtil)
  },
  methods:{
    sizeChange(size){
      this.pageUtil.size=size;
      this.getProList(this.pageUtil)
    },
    currentChage(current){
      this.pageUtil.current=current;
      this.$router.push("/admin/proList/"+current)
    },
    getProList(data){
      // data.current=this.$route.params.current;
      this.axios.post("/api/product",data).then(resp=>{
        this.proList=resp.data.records;
      })
    },
    deleteProduct(row){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.axios.delete('/image/'+row.id)
        this.axios.delete('api/product/'+row.id).then(()=>{
          this.$message.success('删除成功');
        })
        this.getProList(this.pageUtil)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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