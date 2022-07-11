<template>
  <div class="aside-container">
    <el-menu
      default-active="0"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0">
        <i class="el-icon-setting"></i>
        <span slot="title">控制台</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
.el-menu{
  background-color: $aside-bg-color;
}
</style>
