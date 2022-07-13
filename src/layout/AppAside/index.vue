<template>
  <div class="aside-container">
    <el-menu
      :default-active="activePath"
      text-color="#fff"
      background-color="#222d32"
      active-text-color="#ffd04b"
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
      return filterMenus(this.$store.getters.menus)
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
.el-menu{
  border-right : none;
}
</style>
