<template>
  <div>
    角色管理

    <el-button v-permission="'sys:role:perm'" type="primary" size="small">分配权限</el-button>
    <el-button v-permission="'sys:role:add'" type="danger" size="small">新增</el-button>
    <el-button v-permission="'sys:role:update'" type="success" size="small">编辑</el-button>
    <el-button v-permission="'sys:role:del'" type="warning" size="small">删除</el-button>

  </div>
</template>

<script>
export default {
  name: 'index.vue'
}
</script>

<style scoped>

</style>
