<template>
  <div class="user-container">
    <el-table
      :data="userList"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{textAlign: 'center'}"
      style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column  label="头像">
        <template v-slot="scope">
          <el-avatar :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column  label="角色">
        <template v-slot="scope">
          <el-tag v-for="(item,index) in scope.row.roles" :key="index">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="createTime" label="注册时间"></el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            :active-value="scope.row.status"
            :inactive-value="2"
            @change="handleChangeStatus(scope.row.id,scope.row.status)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template>
          <el-button size="mini" type="success" plain>编辑</el-button>
          <el-button size="mini" type="warning" plain>分配角色</el-button>
          <el-button size="mini" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[2, 5, 10]"
      :page-size="size"
      layout="jumper,  prev, pager, next,sizes,  total"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import UserManagerApi from '@/api/user-manager'
export default {
  name: 'index',
  data() {
    return {
      current: 1,
      size: 5,
      total: 0,
      username: '',
      userList: []
    }
  },
  created () {
    this.handleGetUserList()
  },
  methods: {
    async handleGetUserList () {
      const data = { current: this.current, size: this.size, username: this.username }
      const response = await UserManagerApi.getUserList(data)
      this.userList = response.records
      this.total = response.total
    },
    handleChangeStatus() {

    },
    handleSizeChange(size) {
      this.size = size
      this.handleGetUserList()
    },
    handleCurrentChange(current) {
      this.current = current
      this.handleGetUserList()
    }
  }
}
</script>

<style scoped>
.el-pagination{
  float: right;
  margin-top: 10px;
  padding-bottom : 20px;
}
</style>
