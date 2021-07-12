<template>
  <div class="dashboard-container">
    <img src="https://cdn11.bigcommerce.com/s-bf3bb/images/stencil/1280w/uploaded_images/4g-vs-lte-blog-header.jpg?t=1609797046"/>
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
.dashboard-container {
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
  padding: 5px;
  opacity: 0.95;
}
</style>
