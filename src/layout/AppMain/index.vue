<template>
  <div class="main-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <AppBreadCrumb></AppBreadCrumb>
      </div>
      <div class="text item">
        <router-view></router-view>
      </div>
    </el-card>
  </div>
</template>

<script>
import AppBreadCrumb from '@/components/common/BreadCrumb'
export default {
  name: 'index',
  components: {
    AppBreadCrumb
  }

}
</script>

<style scoped>

</style>
