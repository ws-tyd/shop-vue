<template>
	<div>
		<el-upload action="#" list-type="picture-card" :http-request="handleUploadFile" 
			:limit="1" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
			<i slot="default" class="el-icon-plus"></i>
		</el-upload>

		<!--    <el-upload
    class="upload-1"
    ref="uploads"
      :http-request="handleUploadFile"
      list-type="picture-card"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :before-remove="beforeRemove"
      :file-list="fileList"
	  :on-preview="handlePreview"
    :limit="1"
       action="#"
    >
    
      <i class="el-icon-plus" />
    </el-upload> -->
		<!-- <el-dialog :visible.sync="img"></el-dialog> -->


	</div>
</template>

<script>
	import {
		IMGBASEURL
	} from "@/api/index.js";
	export default {
		props: {
			value: {
				default: "",
				type: String,
			},
		},
		data() {
			return {
				disabled: false,
				imgUrls: IMGBASEURL,
				dialogImageUrl: "",
				dialogVisible: false,
				resourcesUrl: IMGBASEURL,
				img: "",
				fileList: []
			};
		},
		computed: {
			// fileList() {
			// 	const res = [];
			// 	if (this.value) {
			// 		res.push({
			// 			name: this.value,
			// 			url: this.resourcesUrl + this.value,
			// 			response: this.value,
			// 		});
			// 	}
			// 	this.$emit("input", this.value);
			// 	return res;
			// },
		},

		methods: {
			handlePreview(file) {
				this.img = file.url
			},
			handleUploadFile(params) {
				this.$emit("input", params);
				console.log("")
				// const fd = new FormData()
				// fd.append('file', params.file)
				// this.axios.put("/api/image/upload", fd).then((res) => {
				// 	console.log(res, 'sucess')
				// 	this.$emit("input", res.data.url);
				// 	this.$refs.uploads.clearFiles()
				// }).catch(err => {
				// 	console.log(err, 'error')
				// })
			},

			handleRemove(file) {
				console.log(file);
				this.$refs.uploads.clearFiles()


			},
			handlePictureCardPreview(file) {
				// this.dialogImageUrl = file.url;
				// this.dialogVisible = true;
				this.img = file.url;
			},
			handleDownload(file) {
				console.log(file);
			}
			// // 图片上传
			// handleUploadSuccess(response, file, fileList) {
			//   this.$emit("input", file.response.link);
			// },
			// handleRemove(file, fileList) {
			//   this.$emit("change", file);
			// },
			// beforeRemove(file, fileList) {
			//   return this.$confirm(`确定移除 ${file.name}？`);
			// },
		},
	};
</script>
<style scoped>
	.upload-1 {
		float: left;

	}

	.img {
		float: left;
		margin-right: 10px;
	}
</style>
