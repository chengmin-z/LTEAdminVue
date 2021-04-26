<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div class="operateBar">
      <el-select v-model="form.tableName" size="middle" placeholder="请选择上传表" @change="selectChange">
        <el-option v-for="item in tableNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button :loading="uploadLoading" type="primary" size="middle" style="margin-left: 10px;" @click.native.prevent="handleUpload">上传</el-button>
    </div>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      form: {
        tableName: ''
      },
      tableData: [],
      tableHeader: [],
      file: '',
      tableNames: ['cell', 'kpi', 'mro_data', 'prb'],
      uploadLoading: false,
      hasFile: false
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt100M = file.size / 1024 / 1024 <= 100
      if (isLt100M) {
        console.log(file)
        this.$data.file = file
        this.$data.hasFile = true
        return true
      }
      this.$message({
        message: '无法选择上传大于 100MB 的文件',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    selectChange() {
      console.log(this.form.tableName)
    },
    handleUpload() {
      console.log('handleUpload')
      if (!this.hasFile) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        })
        return
      }
      if (this.form.tableName === '') {
        this.$message({
          message: '请选择要上传的表单',
          type: 'warning'
        })
        return
      }
      const file = this.$data.file
      const tableName = 'cell'
      const data = { file, tableName }
      this.$data.uploadLoading = true
      this.$store.dispatch('db_operate/uploadTable', data).then(res => {
        const message = '上传结果: ' + '总计: ' + res.detail.total + ' 成功: ' + res.detail.success + ' 失败: ' + res.detail.fail
        this.$message({
          message: message,
          type: 'success'
        })
        this.$data.uploadLoading = false
      }).catch(() => {
        this.$message({
          message: '上传失败',
          type: 'error'
        })
        this.$data.uploadLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.operateBar {
  glyph-orientation-horizontal: true;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  height: 40px;
}

</style>
