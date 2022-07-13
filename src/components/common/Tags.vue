<template>
  <div class="tags-container">
    <el-tag
      class="hand"
      v-for="(tag) in tags"
      :key="tag.path"
      size="medium"
      :closable="tag.path !== '/index'"
      :effect="$route.path === tag.path ? 'dark' : 'plain'"
      type="warning">
      {{tag.title}}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  computed: {
    tags() {
      return this.$store.getters.tags
    }
  }
}
</script>

<style scoped>
.tags-container{
  margin-left : 10px;
}
</style>
