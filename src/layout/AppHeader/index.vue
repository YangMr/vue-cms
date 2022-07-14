<template>
  <div class="header">
    <div class="left-container">
      <el-button @click="handleCollapseMenu" size="mini" type="text" :icon="$store.getters.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></el-button>
      <div class="tags-view">
        <app-tags></app-tags>
      </div>
    </div>
    <div class="right-container">
      <div class="right-tool-tip">
        <el-tooltip class="full" effect="dark" content="全屏" placement="bottom">
          <i class="el-icon-rank hand white" style="font-size:25px;"></i>
        </el-tooltip>
        <el-tooltip  effect="dark" content="关闭全部标签" placement="bottom">
          <i @click="handleRemoveAllTags" class="el-icon-circle-close hand white" style="font-size:25px;"></i>
        </el-tooltip>
      </div>
      <!-- 头像 -->
      <el-avatar class="avatar-H avatar-img hand" v-if="$store.getters.userInfo" :src="$store.getters.userInfo.avatar ? $store.getters.userInfo.avatar:''"></el-avatar>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link hand">
          {{$store.getters.userInfo.username || ""}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="settings">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import AppTags from '@/components/common/Tags.vue'
export default {
  name: 'index',
  components: { AppTags },
  methods: {
    handleCollapseMenu() {
      this.$store.dispatch('menu/setCollapse')
    },
    handleSettings() {
      alert('个人设置')
    },
    async handleLogout() {
      const response = await this.$store.dispatch('user/logout')
      if (response) {
        this.$notify.success({
          title: '提示',
          message: '您已成功退出登录'
        })
        this.$router.push('/login')
      }
    },
    handleCommand(command) {
      switch (command) {
        case 'settings':
          this.handleSettings()
          break
        case 'logout':
          this.handleLogout()
          break
      }
    },
    handleRemoveAllTags() {
      this.$store.dispatch('tags/removeAllTag')
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  height : 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-container{
    display: flex;
    align-items: center;

    .el-button{
      font-size :25px;
      color : #fff;
    }
  }

  .right-container{
    display: flex;
    align-items: center;
    height : 100%;

    .right-tool-tip{
      height : 100%;
      display: flex;
      align-items: center;

      .full {
        margin-right: 20px;
        // 旋转
        transform: rotate(20deg);
        -webkit-transform: rotate(20deg);
        /*兼容-webkit-引擎浏览器*/
        -moz-transform: rotate(20deg);
        /*兼容-moz-引擎浏览器*/
      }
    }
    .avatar-img{
      margin-left : 20px;
    }

    .el-dropdown{
      margin-left : 15px;
      height : 100%;

      .el-dropdown-link{
        color : #fff;
        font-size : 18px;
        font-weight : bold;
      }
    }

  }
}
</style>
