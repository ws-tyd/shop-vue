<template>
	<div>
		<el-upload class="upload-1" ref="uploads" :http-request="handleUploadFile" :limit="1" action="#" :show-file-list="false">
			<el-button size="small" type="primary">新增</el-button>
		</el-upload>
<!--		 <el-dialog :visible.sync="img"></el-dialog> -->
	</div>
</template>

<script>
	import {
		IMGBASEURL
	} from "../api/index.js";
	export default {
		props: {
			value: {
				default: "",
				type: String,
			},
		},
		data() {
			return {
				imgUrls: IMGBASEURL,
				dialogImageUrl: "",
				dialogVisible: false,
				resourcesUrl: IMGBASEURL,
				img: "",
			};
		},
		computed: {

		},

		methods: {
      successfuls(){
        this.$emit('successful',true);
      },
			handleUploadFile(params) {
				const fd = new FormData()
				fd.append('file', params.file)
				this.axios.put("/api/image/upload", fd).then((res) => {
					this.$emit("input", res.data.url);
					this.$refs.uploads.clearFiles()
          this.successfuls()
				})
			},

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
