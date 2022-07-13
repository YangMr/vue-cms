<template>
  <div class="aside-container">
    <el-menu
      :style="{width: $store.getters.isCollapse ? '60px' : '200px'}"
      :default-active="activePath"
      text-color="#fff"
      background-color="#222d32"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      router
    >
      <MenuTree v-for="(item, index) in menus" :key="index" :item="item"></MenuTree>
    </el-menu>
  </div>
</template>

<script>
import MenuTree from '@/layout/AppAside/MenuTree'
import { filterMenus } from '@/utils/menus'

export default {
  name: 'index',
  data() {
    return {

    }
  },
  computed: {
    activePath() {
      return this.$route.path
    },
    menus() {
      if (this.$store.getters.menus) {
        return filterMenus(this.$store.getters.menus)
      }
    },
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  },
  components: {
    MenuTree
  },
  created () {
    console.log('create', this.menus)
  }
}
</script>

<style lang="scss" scoped>
.aside-container{
  width: auto;
}
.el-menu{
  border-right : none;
}
</style>
