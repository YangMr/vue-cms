<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-if="$route.path === '/index'">
        <el-breadcrumb-item><span class="active">控制台</span></el-breadcrumb-item>
      </template>
      <template v-else>
        <el-breadcrumb-item :to="index <= breadcrumbList.length - 1 ? item.path : ''"  v-for="(item,index) in breadcrumbList" :key="index">
          {{item.title}}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      breadcrumbList: []
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.handleGetBreadcrumbList()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleGetBreadcrumbList() {
      const breadcrumbList = [{ title: '首页', path: '/index' }]
      const routeList = this.$route.matched
      routeList.forEach(item => {
        if (item.meta.title) {
          breadcrumbList.push({
            title: item.meta.title,
            path: item.path
          })
        }
      })
      console.log(breadcrumbList)
      this.breadcrumbList = breadcrumbList
    }
  }
}
</script>

<style scoped>
.active{
  font-weight: bold;
  font-size : 16px;
  color : #000;
}
</style>
