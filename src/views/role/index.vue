<template>
  <div class="role-container">

    <div class="user-query">
      <el-form :inline="true"  :model="queryForm" class="demo-form-inline">
        <el-form-item label="角色" prop="username">
          <el-input @clear="handleGetRoleList" clearable v-model="queryForm.name" size="small" placeholder="请输入角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleGetRoleList" type="danger" size="small" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="add-button">
        <el-button v-permission="'sys:user:add'" @click="handleOpenDialog" style="float: right;" type="primary" size="small" icon="el-icon-edit">新增</el-button>
      </div>
    </div>

    <el-table
      v-loading="loadingStatus"
      :data="roleList"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{textAlign: 'center'}"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="角色" width="180"></el-table-column>
      <el-table-column prop="code" label="编码"></el-table-column>
      <el-table-column prop="remark" label="描述"></el-table-column>
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
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="scope">
          <el-button size="mini" plain @click="handleOpenDialog(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="warning" @click="handlePermissionOpenDialog(scope.row)"  plain>分配权限</el-button>
          <el-button size="mini" type="danger" plain :disabled="scope.row.code === 'admin'">删除</el-button>
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
      <el-form ref="dialogForm" :rules="rules" :model="RoleDialogForm" label-width="70px" label-position="right">
        <el-form-item label="角色" prop="name">
          <el-input v-model.trim="RoleDialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input  v-model.trim="RoleDialogForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model.trim="RoleDialogForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model.trim="RoleDialogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleResetDialogForm">取 消</el-button>
        <el-button type="warning" @click="handleVerifyDialogForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog center :title="permissionDialogTitle" :visible.sync="permissionDialogFormVisible">
      <el-form :model="permissionForm">
        <el-tree
          ref="tree"
          :data="menuList"
          show-checkbox
          node-key="id"
          default-expand-all
          check-strictly
          :props="{label : 'label', children : 'children'}">
        </el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitPermission">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RoleManagerApi from '@/api/role-manager'
import MenuManagerApi from '@/api/menu-manager'
export default {
  name: 'index.vue',
  data() {
    return {
      permissionForm: {},
      permissionDialogFormVisible: false,
      permissionDialogTitle: '',
      roleId: '',
      RoleDialogForm: {
        name: '',
        status: 1,
        code: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
        remark: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
      },
      dialogFormVisible: false,
      dialogStatus: 'add',
      dialogTitle: '',
      loadingStatus: false,
      current: 1,
      size: 10,
      total: 0,
      queryForm: {
        name: ''
      },
      roleList: [],
      menuList: [],
      menuIds: [],
      permissionId: ''
    }
  },
  created () {
    this.handleGetRoleList()
    this.handleGetMenuList()
  },
  methods: {
    async handleGetMenuList() {
      try {
        const response = await MenuManagerApi.getMenuList()
        this.menuList = response
      } catch (e) {
        console.log(e)
      }
    },
    async handleGetRoleList () {
      try {
        const data = { current: this.current, size: this.size, name: this.queryForm.name }
        this.loadingStatus = true
        const response = await RoleManagerApi.getRoleList(data)
        this.loadingStatus = false
        this.roleList = response.records
        this.total = response.total
      } catch (e) {
        this.loadingStatus = false
        console.log(e)
      }
    },
    handleSizeChange(size) {
      this.size = size
      this.handleGetRoleList()
    },
    handleCurrentChange(page) {
      this.current = page
      this.handleGetRoleList()
    },
    handleOpenDialog(id) {
      if (typeof id === 'number') {
        this.dialogTitle = '编辑角色'
        this.roleId = id
        this.handleFindRole(id)
      } else {
        this.dialogTitle = '新增角色'
      }
      this.dialogFormVisible = true
    },
    async handleFindRole(id) {
      const response = await RoleManagerApi.findRole(id)
      if (response) {
        this.RoleDialogForm = response
        this.menuIds = response.menuIds
        console.log(this.menuIds)
        this.$refs.tree.setCheckedKeys(this.menuIds)
      }
    },
    handleVerifyDialogForm() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (this.roleId) {
            this.handleEditSubmit()
          } else {
            this.handleAddSubmit()
          }
        }
      })
    },
    async handleAddSubmit() {
      try {
        await RoleManagerApi.addRole(this.RoleDialogForm)
        this.dialogFormVisible = false
        this.$notify({ title: '提示', message: '新增角色成功', type: 'success' })
        this.handleGetRoleList()
      } catch (e) {
        console.log(e)
      }
    },
    async handleEditSubmit() {
      try {
        await RoleManagerApi.updateRoleInfo(this.RoleDialogForm)
        this.dialogFormVisible = false
        this.$notify({ title: '提示', message: '更新角色成功', type: 'success' })
        this.handleGetRoleList()
      } catch (e) {
        console.log(e)
      }
    },
    handleResetDialogForm() {
      this.$refs.dialogForm.resetFields()
      this.dialogFormVisible = false
    },
    handlePermissionOpenDialog(row) {
      this.permissionDialogTitle = `给"${row.name}"分配权限`
      this.permissionDialogFormVisible = true
      this.handleFindRole(row.id)
      this.permissionId = row.id
    },
    async handleSubmitPermission() {
      const keys = this.$refs.tree.getCheckedKeys()
      const response = await RoleManagerApi.assignPermissions(this.permissionId, keys)
      console.log(response)
      this.permissionDialogFormVisible = false
      this.handleGetRoleList()
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
