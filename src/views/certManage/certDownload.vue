<template>
  <div class="app-container">
    <div class="f22">立标检测证书下载</div>
    <div style="position: relative" class="mt20">
      <el-input
        v-model="encryptionKey"
        placeholder="请输入序列号"
        style="width: 300px"
      />
      <el-button
        v-loading="submitLoading"
        style="position: absolute; left: 294px; border-radius: 0 4px 4px 0"
        type="primary"
        @click="downloadCert()"
        >下载</el-button
      >
    </div>
  </div>
</template>

<script>
import config from "@/utils/config";
const { prefix } = config[process.env.NODE_ENV];
import { getToken } from "@/utils/auth"; // get token from cookie
export default {
  data() {
    return {
      prefix: prefix,
      encryptionKey: "",
      fileName: "",
      submitLoading: false,
    };
  },
  methods: {
    downloadCert() {
      if (this.encryptionKey === "") {
        this.$message.warning("请输入序列号");
      } else {
        this.submitLoading = true;
        this.$store
          .dispatch("cert/downloadCert", this.encryptionKey)
          .then((res) => {
            const { data, success, errorMessage } = res;
            if (success) {
              this.fileName = data;
              this.$message({
                type: "info",
                message: "文件正在下载中，请稍后~",
              });
              this.handleDownLoad();
            } else {
              this.$message.error(errorMessage);
            }
          })
          .catch(() => {})
          .finally(() => {
            this.submitLoading = false;
          });
      }
    },
    handleDownLoad() {
      fetch(
        prefix.lb +
          "/api/certification/downloadByEncryptionKey?encryptionKey=" +
          this.encryptionKey,
        {
          method: "GET",
          responseType: "blob",
          headers: new Headers({
            encryptionKey: this.encryptionKey.toString(),
            "ACCESS-TOKEN": getToken().toString(),
          }),
        }
      )
        .then((res) => res.blob())
        .then((data) => {
          const blobUrl = window.URL.createObjectURL(data);
          const a = document.createElement("a");
          a.download = this.fileName + ".pdf";
          a.href = blobUrl;
          a.click();
          this.$message({
            type: "success",
            message: "文件下载成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "文件下载失败，请稍后再试~",
          });
        })
        .finally(() => {});
    },
  },
};
</script>
<style lang="scss"></style>
