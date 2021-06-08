<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="查询关键字">
        <el-select v-model="form.keyword" placeholder="请选择关键字" @change="keywordChange">
          <el-option label="ENODEB_ID" value="ENODEBID" />
          <el-option label="ENODEB_NAME" value="ENODEB_NAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="列表选择">
        <el-select v-model="form.selectValue" filterable :loading="selectLoading" size="middle" placeholder="请选择">
          <el-option v-for="item in selectValues" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="文本输入">
        <el-input v-model="form.inputValue" />
      </el-form-item>
      <el-form-item label="查询方式">
        <el-radio-group v-model="form.mode">
          <el-radio label="列表选择" />
          <el-radio label="文本输入" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="queryLoading" type="primary" @click="onSubmit">查询</el-button>
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
      <el-table-column v-for="key in listHeader" :key="key" align="center" :prop="key" :label="key" width="150" />
    </el-table>
  </div>
</template>

<script>
import { getEnodeBID, getEnodeBName } from '@/api/query'

export default {
  data() {
    return {
      form: {
        keyword: 'ENODEBID',
        selectValue: '',
        inputValue: '',
        mode: '列表选择'
      },
      selectValues: [],
      queryLoading: false,
      selectLoading: false,
      listLoading: false,
      resultExtraInfo: {
        currentPage: 1,
        totalPage: 1
      },
      listResult: [],
      listHeader: []
    }
  },
  created() {
    this.keywordChange()
  },
  methods: {
    onSubmit() {
      console.log('提交')
      let value = ''
      const key = this.form.keyword
      const tableName = 'cell'
      if (this.$data.form.mode === '列表选择') {
        if (this.$data.form.selectValue === '') {
          this.$message({
            message: '请在列表选择查询的值',
            type: 'warning'
          })
          return
        }
        value = this.$data.form.selectValue
      } else {
        if (this.$data.form.inputValue === '') {
          this.$message({
            message: '请在文本框输入查询的值',
            type: 'warning'
          })
          return
        }
        value = this.$data.form.inputValue
      }
      console.log('查询的KeyWord为 ' + key)
      console.log('查询的KeyValue为 ' + value)
      const keyandvalues = [{ key, value }]
      const currentPage = this.$data.resultExtraInfo.currentPage
      const data = { keyandvalues, currentPage, tableName }
      this.queryLoading = true
      this.$store.dispatch('query_operate/universeQuery', data).then(res => {
        this.$data.queryLoading = false
        console.log(res)
        this.$data.listResult = res.detail.records
        this.$data.listHeader = []
        this.$data.resultExtraInfo.currentPage = res.detail.current
        this.$data.resultExtraInfo.totalPage = res.detail.total_pages
        if (res.detail.total_pages === 0) {
          this.$message({
            message: '没有匹配的条目',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '查询成功',
            type: 'success'
          })
          for (const key in this.$data.listResult[0]) {
            this.$data.listHeader.push(key)
          }
          console.log(this.$data.listHeader)
        }
      }).catch(error => {
        console.log(error)
        this.$data.queryLoading = false
        this.$message({
          message: '查询失败',
          type: 'warning'
        })
      })
    },
    keywordChange() {
      console.log('keyword change ' + this.form.keyword)
      this.selectLoading = true
      if (this.form.keyword === 'ENODEBID') {
        getEnodeBID().then(res => {
          this.selectValues = res.detail.data
          this.selectLoading = false
        }).catch(error => {
          console.log(error)
          this.selectLoading = false
        })
      } else {
        getEnodeBName().then(res => {
          this.selectValues = res.detail.data
          this.selectLoading = false
        }).catch(error => {
          console.log(error)
          this.selectLoading = false
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
