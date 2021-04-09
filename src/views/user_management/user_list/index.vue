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
      <el-table-column label="用户名" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="权限" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role | statusFilter">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button :loading="deleteLoading" type="danger" size="small" @click="deleteUser(scope.row.username, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { MessageBox } from 'element-ui'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      deleteLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.detail
        this.listLoading = false
      })
    },
    deleteUser(username, index) {
      MessageBox.confirm('您确认删除该用户吗？此操作无法还原。', '删除确认', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteLoading = true
        this.$store.dispatch('user/deleteUser', { username }).then(() => {
          this.deleteLoading = false
          this.list.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }).catch(() => {
          this.deleteLoading = false
        })
      }).catch(() => {
        this.deleteLoading = false
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
