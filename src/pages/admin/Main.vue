<template>
<div class="Main">
  <span style="display: flex;justify-content:space-between;width: 100%;height: auto;padding: 20px">
<!--    <el-button type="primary" style="width: 100px">新增</el-button>-->
    <BtnUpload @successful="uploadSuccess"></BtnUpload>
  </span>
  <el-col :span="20" :offset="2">
    <el-table
        :data="images"
        stripe
        style="width: 100%;margin: auto">
      <el-table-column
          prop="id"
          label="id"
          width="200">
      </el-table-column>
      <el-table-column
          label="地址"
          width="500">
        <template #default="scope">
          <img :src="scope.row.url" :alt="scope.row.title"  style="width: 120px;height: 90px">
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="添加时间"
          width="300">
      </el-table-column>
      <el-table-column
          label="操作"
          width="200">
        <template #default="scope">
          <el-button type="primary"  circle @click="deleteImage(scope.row)">
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
import BtnUpload from "../../components/btn-upload.vue";
import {
  Delete,
} from '@element-plus/icons-vue'
export default {
  name: "Main",
  components: {BtnUpload,Delete},
  data(){
    return{
      pageUtil:{
        current:1,
        size:5
      },
      images:[],
    }
  },
  mounted() {
    this.getImages(this.pageUtil)
  },
  methods:{
     checkUser(){
       const type=this.$store.state.type;
      if (type!=='staff'){
        this.$router.push('/')
        this.$message.warning('权限不足，不能进入改页面')
      }
    },
    uploadSuccess(e){
      if (e){
        this.$message.success('上传图片成功');
      }
      this.getImages(this.pageUtil)
    },
    sizeChange(size){
      this.pageUtil.size=size;
      this.getImages(this.pageUtil)
    },
    currentChage(current){
      this.pageUtil.current=current;
      this.getImages(this.pageUtil)
    },
    async  getImages(data){
      if (data==null){
        this.$message.error("获取图片列表需要分页参数")
        return
      }
      // let limit=(data.current-1)*data.size;
     await  this.axios.post('/api/image',data).then(resp=>{
        this.images=resp.data.records
        // this.images=resp.data.items
      })
    },
    deleteImage(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.axios.delete('/image/'+row.id)
        this.$store.dispatch('deleteImage',row.id).then(resp=>{
          if (resp){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
        this.getImages(this.pageUtil)
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