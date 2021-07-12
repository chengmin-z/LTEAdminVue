<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      auto
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="参数名称" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.info_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前设置" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.current_value }}
        </template>
      </el-table-column>
      <el-table-column label="修改" width="110" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.changeable === 'true'" type="primary" size="small" @click="editInfo(scope.row.info_name, scope.row.current_value, scope.$index)">修改</el-button>
          <el-tag v-else type="draft">无法修改</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="修改参数">
      <el-form :model="form" label-width="210px" label-position="left">
        <el-form-item :label="form.key">
          <el-input v-model="form.value" :placeholder="form.value" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button :loading="editLoading" type="primary" @click="confirmEdit">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDbInfo } from '@/api/db'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      editLoading: false,
      dialogVisible: false,
      form: {
        index: 0,
        key: '',
        value: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDbInfo().then(response => {
        // 字典转数组
        const keys = Object.keys(response.detail)
        const edit_result = []
        const no_edit_result = []
        for (const key of keys) {
          const item = response.detail[key]
          item['info_name'] = key
          if (item.changeable === 'true') {
            edit_result.push(item)
          } else {
            no_edit_result.push(item)
          }
        }
        this.list = edit_result.concat(no_edit_result)
        this.listLoading = false
      })
    },
    editInfo(info_name, value, index) {
      this.dialogVisible = true
      this.form.index = index
      this.form.key = info_name
      this.form.value = value
    },
    confirmEdit() {
      this.editLoading = true
      const data = { key: this.form.key, value: this.form.value }
      this.$store.dispatch('db_operate/updateDbInfo', data).then(() => {
        this.fetchData()
        this.editLoading = false
        this.dialogVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(() => {
        this.dialogVisible = false
        this.editLoading = false
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss">

.el-table::before {
  height: 0px;
  border: none;
}

</style>
