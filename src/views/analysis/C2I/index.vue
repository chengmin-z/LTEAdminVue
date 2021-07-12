<template>
  <div class="app-container">
    <div class="operateBar">
      <el-form ref="form" :model="form" :rules="Rules" label-width="80px">
        <el-form-item label="控制参数">
          <el-input v-model="form.inputValue" name="inputValue" size="middle" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" size="middle" @click="onSubmit">
            分析
          </el-button>
          <el-button :disabled="downloadUrl.length === 0" type="primary" size="middle" style="margin-left: 10px;">
            <a v-if="downloadUrl.length !== 0" target="_blank" :href="downloadUrl"> 下载 </a>
            <a v-else> 下载 </a>
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="listLoading"
        :data="listResult"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        auto
      >
        <el-table-column align="center" label="no" width="120">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column v-for="key in listHeader" :key="key" align="center" :prop="key" :label="key" min-width="150" />
      </el-table>
    </div>
  </div>
</template>

<script>
const defaultSettings = require('/src/settings.js')

export default {
  data() {
    const validateThreshold = (rule, value, callback) => {
      if (value < 10) {
        callback(new Error('控制参数不能小于10'))
      } else {
        callback()
      }
    }
    return {
      form: {
        inputValue: 100
      },
      loading: false,
      downloadUrl: '',
      Rules: {
        inputValue: [{ required: true, trigger: 'blur', validator: validateThreshold }]
      },
      listResult: [],
      listHeader: [],
      listLoading: false
    }
  },
  methods: {
    onSubmit() {
      const threshold = this.$data.form.inputValue
      if (threshold < 10) {
        this.$message({
          message: '控制参数需要大于10',
          type: 'warning'
        })
        return
      }
      const data = { threshold }
      console.log(data)
      this.loading = true
      this.$store.dispatch('query_operate/analyzeC2I', data).then(res => {
        this.listLoading = true
        const detail = JSON.parse(res.detail)
        const data = JSON.parse(detail.data)
        this.listResult = data
        const download_url = defaultSettings.host + detail.download_url
        this.downloadUrl = download_url
        console.log(data)
        console.log(download_url)
        this.listHeader = []
        console.log(data.length)
        this.loading = false
        if (data.length === 0) {
          this.listLoading = false
          this.$message({
            message: '没有数据',
            type: 'warning'
          })
        } else {
          for (const key in data[0]) {
            this.listHeader.push(key)
          }
          this.listLoading = false
          this.$message({
            message: '分析成功',
            type: 'success'
          })
        }
      }).catch(error => {
        console.log(error)
        this.loading = false
        this.listLoading = false
        this.$message({
          message: '分析失败',
          type: 'warning'
        })
      })
    }
  }
}

</script>

<style lang="scss">

.operateBar {
  glyph-orientation-horizontal: true;
  margin-top: 20px;
  display: inline;
  height: 40px;
}

</style>
