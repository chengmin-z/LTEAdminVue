<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
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
      tableData: [],
      tableHeader: [],
      file: ''
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt100M = file.size / 1024 / 1024 <= 100
      if (isLt100M) {
        console.log(file)
        this.$data.file = file
        const tableName = 'cell'
        const data = { file, tableName }
        this.$store.dispatch('db_operate/uploadTable', data).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        })
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
    }
  }
}
</script>
