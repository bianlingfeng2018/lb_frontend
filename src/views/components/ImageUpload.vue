<template>
  <div>
    <el-form-item label="" prop="imgList">
      <el-upload
        action="#"
        list-type="picture-card"
        :on-change="handleChangeFile"
        :on-remove="handleChangeFile"
        :auto-upload="false"
        :file-list="imgList"
        :limit="limit"
      >
        <i slot="default" class="el-icon-plus" />
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            alt=""
            style="height: 400px"
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in" />
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download" />
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete" />
            </span>
          </span>
        </div>
      </el-upload>
      <p class="remark-content">
        可上传{{ limit }}张图片，比例16:9，支持jpg、jpeg、gif、png
      </p>
      <el-dialog :visible.sync="imgDialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
  </div>
</template>

<script>
import config from "@/utils/config"
const { prefix } = config[process.env.NODE_ENV]

export default {
  name: "ImageUpload",
  props: {
    imageList: {
      type: Array,
      // default: () => {
      //   return []
      // }
      required: true
    },
    limit: {
      type: Number,
      default: () => {
        return 5
      }
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      imgDialogVisible: false,
      disabled: false,
      imgList: undefined
    }
  },
  watch: {
    imageList: function(o, n) {
      console.log('watch imageList change.')
      console.log(n)
      this.imgList = n
    }
  },
  created() {

  },
  methods: {
    getData() {
      return this.imgList
    },
    updateFooterEvent() {
      const $table = this.$refs.xTable
      $table.updateFooter()
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "总金额："
          }
          if (["amountRmb"].includes(column.property)) {
            return this.sumNum(data, column.property) + "元"
          }
          return null
        })
      ]
    },
    downloadImage(url, name) {
      fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          // the filename you want
          a.download = name
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
        .catch(() => alert('An error sorry'))
    },
    getFileBlobUrl(file) {
      console.log(file)
      const _url = prefix.lb + "/api/file?path=" + file.path + "&name=" + file.name
      return _url.replaceAll('\\', '%2F')
    },
    handleRemove(file) {
      console.log(file)
      let _index = -1
      for (let i = 0; i < this.imgList.length; i++) {
        const img = this.imgList[i]
        console.log(img)
        if (img.uid === file.uid) {
          _index = i
          break
        }
      }
      if (_index !== -1) {
        console.log('slice -' + _index)
        this.imgList.splice(_index, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    handleDownload(file) {
      this.downloadImage(file.url, file.name)
    },
    handleChangeFile(file, fileList) {
      this.imgList = fileList
    }
  }
}
</script>

<style scoped>

</style>
