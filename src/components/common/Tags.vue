<template>
  <div class="tags-container">
    <el-tag
      @click="handleActiveTag(tag.path)"
      @close="handleRemoveTag(index)"
      class="hand"
      v-for="(tag,index) in tags"
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
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.handleAddTag()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleAddTag() {
      const path = this.$route.path
      const title = this.$route.meta.title
      if (path && title) {
        const newTag = {
          path,
          title
        }
        this.$store.dispatch('tags/addTag', newTag)
      }
    },
    handleRemoveTag(index) {
      if (!index) return
      this.$store.dispatch('tags/removeTag', index)
      const path = this.tags[index - 1].path
      this.$router.push(path)
    },
    handleActiveTag(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-container{
  margin-left : 10px;

  .el-tag{
    margin-right : 10px;
  }
}
</style>
