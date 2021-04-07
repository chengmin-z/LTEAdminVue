<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前用户: {{ name }}</div>
    <div class="dashboard-text">用户类型: {{ role }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'role'
    ])
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
</style>
