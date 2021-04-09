<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="form.confrimPassword" />
      </el-form-item>
      <el-form-item label="用户类型">
        <el-radio-group v-model="form.role">
          <el-radio label="管理员" />
          <el-radio label="普通用户" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        role: '',
        confrimPassword: ''
      },
      loading: false
    }
  },
  methods: {
    onSubmit() {
      let role = this.form.role
      const username = this.form.username
      const password = this.form.password
      const confrimPassword = this.form.confrimPassword
      switch (role) {
        case '管理员':
          role = 'admin'
          break
        case '普通用户':
          role = 'user'
          break
        default:
          break
      }
      if (username < 4) {
        this.$message({
          message: '用户名不能少于4个字符',
          type: 'warning'
        })
        return
      }
      if (password < 4) {
        this.$message({
          message: '密码不能少于4个字符',
          type: 'warning'
        })
        return
      }
      if (password !== confrimPassword) {
        this.$message({
          message: '两次密码输入不一致',
          type: 'warning'
        })
        return
      }
      if (role === 0) {
        this.$message({
          message: '请选择用户类型',
          type: 'warning'
        })
        return
      }
      this.loading = true
      this.$store.dispatch('user/addUser', { username, password, role }).then(() => {
        this.loading = false
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      }).catch(() => {
        this.loading = false
      })
    },
    onCancel() {
      this.loading = false
      this.$message({
        message: '取消',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

