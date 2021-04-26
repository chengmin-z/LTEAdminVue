<template>
  <div class="dashboard-container">
    <div class="operateBar">
      <el-select v-model="form.tableName" size="middle" placeholder="请选择下载表" @change="selectChange">
        <el-option v-for="item in tableNames" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button :loading="downLoading" :disabled="downloadUrl.length === 0" type="primary" size="middle" style="margin-left: 10px;">
        <a v-if="downloadUrl.length !== 0" target="_blank" :href="downloadUrl"> 下载 </a>
        <a v-else> 下载 </a>
      </el-button>
    </div>
  </div>
</template>

<script>
import { getTableList } from '@/api/db'

export default {
  name: 'ExportData',
  data() {
    return {
      form: {
        tableName: ''
      },
      file: '',
      tableNames: ['cell', 'kpi', 'prb'],
      downLoading: false,
      downloadUrl: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('fetch')
      getTableList().then(res => {
        const keys = Object.keys(res.detail)
        const canDownload_result = []
        for (const key of keys) {
          const item = res.detail[key]
          if (item.downloadable === 'true') {
            canDownload_result.push(key)
          }
        }
        this.$data.tableNames = canDownload_result
      })
    },
    handleDownload() {
      console.log('downloading')
      if (this.$data.form.tableName === '') {
        this.$message({
          message: '请先选择要下载的表',
          type: 'warning'
        })
        return
      }
      const tableName = this.$data.form.tableName
      const data = { tableName }
      this.$store.dispatch('db_operate/getDownloadUrl', data).then(res => {
        const url = 'https://www.bupt.site' + res.detail.downloadUrl
        console.log(url)
        this.$data.downloadUrl = url
        this.$data.downLoading = false
        this.$message({
          message: '获取url成功',
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
        this.$data.downLoading = false
        this.$message({
          message: '获取url失败',
          type: 'warning'
        })
      })
    },
    selectChange() {
      this.$data.downloadUrl = ''
      this.$data.downLoading = true
      console.log(this.form.tableName)
      this.handleDownload()
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 25px;
    line-height: 40px;
  }
}

.operateBar {
  glyph-orientation-horizontal: true;
  margin-top: 20px;
  display: inline;
  height: 40px;
}
</style>
