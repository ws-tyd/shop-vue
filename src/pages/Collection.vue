<template>
  <div class="Main">
  <span style="display: flex;justify-content:space-between;width: 100%;height: auto;padding: 20px">
  </span>
    <el-col :span="20" :offset="2">
      <el-table
          :data="Collections"
          stripe
          style="width: 100%;margin: auto">
        <el-table-column
            prop="id"
            label="id"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="name"
            width="150">
        </el-table-column>
        <el-table-column
            label="地址"
            width="300">
          <template #default="scope">
            <img :src="'/api'+scope.row.productImage" :alt="scope.row.name"  style="width: 120px;height: 120px">
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="添加时间"
            width="300">
        </el-table-column>
        <el-table-column
            label="操作"
            width="300">
          <template #default="scope">
            <el-button type="primary"   circle @click="deleteCollection(scope.row)">
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
          style="margin-top: 50px"
      >
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import {
  Delete,
} from '@element-plus/icons-vue'
export default {
  name: "Collection",
  components:{
    Delete
  },
  data(){
    return{
      pageUtil:{
        current:1,
        size:5
      },
      Collections:[],
    }
  },
  mounted() {
    this.getCollection(this.pageUtil)
  },
  methods:{
    sizeChange(size){
      this.pageUtil.size=size;
      this.getCollection(this.pageUtil)
    },
    currentChage(current){
      this.pageUtil.current=current;
      this.getCollection(this.pageUtil)
    },
    getCollection(data){
      if (data==null){
        this.$message.error("获取图片列表需要分页参数")
        return
      }
      // let limit=(data.current-1)*data.size;{skip:limit,take:data.size}
      this.axios.post('/api/collection',data).then(resp=>{
        // this.images=resp.data.records
        this.Collections=resp.data.records
      })
    },
    async deleteCollection(row){
      await this.$confirm('此操作将永久删除该收藏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.axios.delete('/image/'+row.id)
         this.axios.delete('/api/collection/'+row.productId).then(resp=>{
          if (resp){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
        this.getCollection(this.pageUtil)
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
  width: 85%;
  margin: auto;
  height: auto;
}
</style>