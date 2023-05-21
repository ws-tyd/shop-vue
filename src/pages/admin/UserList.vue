<template>
  <div class="Main">
    <el-col :span="20" :offset="2">
      <el-table
          :data="userList"
          stripe
          style="width: 100%;margin: auto">
        <el-table-column
            prop="id"
            label="id"
            width="100">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="用户名"
            width="150"
        >
        </el-table-column>
        <el-table-column
            prop="nickname"
            label="网名"
            width="150"
        >
        </el-table-column>
        <el-table-column
            prop="type"
            label="账号类型"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="150"
        >
        </el-table-column>
        <el-table-column
            prop="balance"
            label="账号余额"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号码"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="添加时间"
            width="200">
        </el-table-column>
        <el-table-column
            label="操作"
            width="200">
          <template  #default="scope">
            <el-button type="primary" circle @click="deleteUser(scope.row)">
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
import {
  Delete,
} from '@element-plus/icons-vue'
export default {
  name: "UserList",
  components:{
    Delete,
  },
  data(){
    return{
      userList:[],
      pageUtil:{
        current:1,
        size:5
      }
    }
  },
  mounted() {
    this.getUserList(this.pageUtil)
  },
  beforeRouteUpdate(to,from,next){
    next();
    this.pageUtil.current=to.params.current;
    this.getUserList(this.pageUtil)
  },
  methods:{
    sizeChange(size){
      this.pageUtil.size=size;
      this.getUserList(this.pageUtil)
    },
    currentChage(current){
      this.pageUtil.current=current;
      this.$router.push("/admin/user/"+current)
    },
    getUserList(data){
      // data.current=this.$route.params.current;
      this.axios.post("/api/user",data).then(resp=>{
        this.userList=resp.data.records;
      })
    },
    deleteUser(row){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.axios.delete('/image/'+row.id)
        this.axios.delete('api/user/'+row.id).then(resp=>{
          if (resp){
            this.$message.success('删除成功');
          }
        })
        this.getUserList(this.pageUtil)
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