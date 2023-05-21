<template>
  <div>
    <el-dialog
      class="context"
      title="图片素材"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
     
      <el-row :gutter="20" class="con">
          <el-col :span="24">
              <div class="upload">
                  <picUpload @change="handleRemove" @input="handleUploadSuccess" />
              </div>
               
          </el-col>
        <el-col
          :span="6"
          v-for="(item, index) in infoList"
          :key="index"
          class="box"
        >
          <el-radio v-model="radio" border :label="item.url" class="radio">{{
            ""
          }}</el-radio>
          <img :src="resourcesUrl + item.url" alt="" class="img" />
        </el-col>
        <el-col :span="24">
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.current"
            :limit.sync="queryParams.size"
            @pagination="getList"
          />
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
          
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleCancel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import picUpload from "@/components/btn-upload.vue";
import { IMGBASEURL } from "@/api/index.js";
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean,
    },
  },
  components: {
    picUpload,
  },
  data() {
    return {
      radio: null,
      total: 0,
      resourcesUrl: IMGBASEURL,
      infoList: [],
      queryParams: {
        current: 1,
        size: 12,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleUploadSuccess(res) {
     this.getList();
    },
    handleRemove(res) {},
    handleCancel() {
      this.$emit("handle-cancel", this.radio);
    },
    handleClose() {
      this.$emit("close-dialog");
    },
    getList() {
      this.loading = true;
      //   let token=
      this.axios.post("/api/image", this.queryParams).then((response) => {
        this.infoList = response.data.records;
        this.total = response.data.total * 1;
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
.img {
  width: 60%;
  display: block;
  margin: 0 auto;
}
.box {
	overflow: hidden;
  position: relative;
  height:120px;
}
.radio {
  position: absolute;
  /* background-color: antiquewhite; */
  height:95%;
  width: 92%;
  z-index: 6;
}
.con {
  width: 99%;
}
.upload{
    float: right;
   height: 50px;
}
</style>