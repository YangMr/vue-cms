<template>
  <div class="user-container">
    <div class="user-query">
      <el-form :inline="true"  :model="queryForm" class="demo-form-inline">
        <el-form-item label="用户名" prop="username">
          <el-input @clear="handleQuerySearch" clearable v-model="queryForm.username" size="small" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuerySearch" type="danger" size="small" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="add-button">
        <el-button v-permission="'sys:user:add'" @click="handleOpenDialog" style="float: right;" type="primary" size="small" icon="el-icon-edit">新增</el-button>
      </div>
    </div>

    <el-table
      v-loading="loadingStatus"
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
            :active-value="1"
            :inactive-value="2"
           ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="scope">
          <el-button size="mini" v-permission="'sys:user:update'" type="success" @click="handleOpenDialog(scope.row.id)" plain>编辑</el-button>
          <el-button size="mini" v-permission="'sys:user:assign'"  :disabled="scope.row.roles.length === 1 && scope.row.roles[0].code === 'admin'" type="warning" @click="handleOpenRoleDialog(scope.row)" plain>分配角色</el-button>
          <el-button size="mini"  v-permission="'sys:user:del'"  :disabled="scope.row.roles.length === 1 && scope.row.roles[0].code === 'admin'" type="danger" plain>删除</el-button>
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

    <el-dialog center width="30%" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :rules="rules" :model="UserDialogForm" label-width="70px" label-position="right">
        <el-form-item label="头像" prop="avatar">
          <el-avatar class="hand" :size="70" :src="UserDialogForm.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="UserDialogForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="UserDialogForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="UserDialogForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model.trim="UserDialogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="handleVerifyDialogForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="30%" center title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form :model="roleForm" :rules="roleRules" ref="roleDialogForm" label-width="60px">
        <el-form-item label="角色" prop="roleId">
          <el-select style="width : 100%;" multiple v-model="roleForm.roleId" placeholder="请选择角色">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserManagerApi from '@/api/user-manager'
import RoleManagerApi from '@/api/role-manager'
export default {
  name: 'index',
  data() {
    return {
      roleDialogFormVisible: false,
      dialogTitle: '',
      dialogFormVisible: false,
      loadingStatus: false,
      current: 1,
      size: 10,
      total: 0,
      queryForm: {
        username: ''
      },
      UserDialogForm: {
        username: '',
        password: '',
        email: '',
        status: '1',
        avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
      },
      userList: [],
      roleList: [],
      rules: {
        avatar: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      roleId: '',
      roleForm: {
        roleId: []
      },
      roleRules: {
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.handleGetUserList()
    this.handleGetRoleList()
  },
  methods: {
    /**
     * 初始化用户管理列表
     * @returns {Promise<void>}
     */
    async handleGetUserList () {
      try {
        this.loadingStatus = true
        const data = { current: this.current, size: this.size, username: this.queryForm.username }
        const response = await UserManagerApi.getUserList(data)
        this.loadingStatus = false
        this.userList = response.records
        this.total = response.total
      } catch (e) {
        console.log(e)
        this.loadingStatus = false
      }
    },
    /**
     * 初始化角色列表
     * @param val
     */
    async handleGetRoleList () {
      try {
        const data = { current: this.current, size: this.size }
        const response = await RoleManagerApi.getRoleList(data)
        this.roleList = response.records
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 分页条数改变
     * @param size
     */
    handleSizeChange(size) {
      this.size = size
      this.handleGetUserList()
    },
    /**
     * 当前页改变
     * @param current
     */
    handleCurrentChange(current) {
      this.current = current
      this.handleGetUserList()
    },
    /**
     * 用户查询
     */
    handleQuerySearch() {
      this.handleGetUserList()
    },
    /**
     * 打开新增用户弹窗
     */
    handleOpenDialog(id) {
      this.dialogTitle = typeof id === 'number' ? '编辑用户' : '新增用户'
      if (id && typeof id === 'number') this.handleFindUser(id)
      this.dialogFormVisible = true
    },
    /**
     * 新增弹窗确定按钮提交方法
     */
    handleVerifyDialogForm() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (this.UserDialogForm.id) {
            await this.handleUpdateUser()
          } else {
            await this.handleSubmitAddData()
          }
        }
      })
    },
    /**
     * 新增用户
     */
    async handleSubmitAddData() {
      this.UserDialogForm.status = Number(this.UserDialogForm.status)
      await UserManagerApi.addUser(this.UserDialogForm)
      this.dialogFormVisible = false
      this.$notify({ title: '提示', message: '添加成功', type: 'success' })
      this.handleGetUserList()
    },
    /**
     * 查询单个用户
     * @param id
     * @returns {Promise<void>}
     */
    async handleFindUser(id) {
      const response = await UserManagerApi.findUser(id)
      console.log('userinfo', response)
      this.UserDialogForm = response
    },
    /**
     * 更新用户
     * @returns {Promise<void>}
     */
    async handleUpdateUser() {
      const response = await UserManagerApi.updateUser(this.UserDialogForm)
      console.log(response)
      this.dialogFormVisible = false
      this.$notify({ title: '提示', message: '添加成功', type: 'success' })
      this.handleGetUserList()
    },
    handleOpenRoleDialog(row) {
      this.roleForm.roleId = []
      this.roleDialogFormVisible = true
      row.roles.forEach(item => {
        this.roleForm.roleId.push(item.id)
      })
      this.roleId = row.id
      console.log(this.roleForm.roleId)
    },
    handleSubmitRole() {
      this.$refs.roleDialogForm.validate(async (valid) => {
        if (valid) {
          const response = await RoleManagerApi.updateRole(this.roleId, this.roleForm.roleId)
          this.roleDialogFormVisible = false
          this.$notify({ title: '提示', message: '更新成功', type: 'success' })
          this.handleGetUserList()
          console.log(response)
        }
      })
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
.user-query{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add-button{
  height : 100%;
  position: relative;
  top : -8px;
}
</style>
