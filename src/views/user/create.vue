<template>
  <div class="el-card is-always-shadow">
    <div class="el-card_body">

      <div class="el-row is-justify-space-between el-row--flex " style="margin-left: -5px; margin-right: -5px; padding: 5px 0px; fixed: right">
        <div class="el-col el-col-6 el-col-xs-24 el-col-sm-12 el-col-lg-6" style="padding-left: 5px; padding-right: 5px;">
          <button class="el-button el-button--primary el-button--small is-plain" @click="refresh"><i class="el-icon-refresh"></i></button>
          <button class="el-button el-button--primary el-button--small is-plain" @click="dialogFormVisible = true"><i class="el-icon-plus"></i></button>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="organization"
          label="所属部门"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色">
          <!--template slot-scope="scope">
            <span v-for="item in scope.row" :key="item">{{ item }}</span>
          </template-->
        </el-table-column>
        <el-table-column
          prop="locking"
          label="是否锁定">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.locking"
              disabled
              active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="使用中"
                inactive-text="锁定中">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="openEditDialogForm(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="resetPwdMessageBox(scope.$index, scope.row)">重置密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteMessageBox(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <div class="el-pagination is-background">
          <span class="el-pagination_total">共 7 条</span>
          <button class="btn-prev" type="button" disabled="disabled"><i class="el-icon el-icon-arrow-left"></i></button>
          <ul class="el-pager"></ul>
          <button class="btn-next" type="button"><i class="el-icon el-icon-arrow-right"></i></button>
        </div>
      </div>

      <!-- addDialogForm -->
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form ref="addform" :model="form" :rules="addrules">
          <el-form-item label="用户名：" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门：" prop="selectedOption" :label-width="formLabelWidth">
            <el-cascader  v-model="form.selectedOption" :options="orgOptions" :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="角色：" prop="selectedRoles" :label-width="formLabelWidth">
             <el-select v-model="form.selectedRoles" multiple collapse-tags placeholder="请选择">
                <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态：" :label-width="formLabelWidth">
            <el-switch
              v-model="form.locking"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="使用中"
              inactive-text="锁定中">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>

      <!-- editDialogForm -->
      <el-dialog title="修改用户信息" :visible.sync="editDialogFormVisible">
        <el-form :model="editform" ref="editform" :rules="editrules">
          <el-form-item label="用户名：" :label-width="formLabelWidth">
            <el-input v-model="editform.name" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="部门：" prop="selectedOption" :label-width="formLabelWidth">
            <el-cascader  v-model="editform.selectedOption" :options="orgOptions"></el-cascader>
          </el-form-item>
          <el-form-item label="角色：" prop="selectedRoles" :label-width="formLabelWidth">
             <el-select v-model="editform.selectedRoles" multiple collapse-tags placeholder="请选择">
                <el-option v-for="item in roles" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态：" :label-width="formLabelWidth">
            <el-switch
              v-model="editform.locking"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="使用中"
              inactive-text="锁定中">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="verify">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getUserList, addUser, editUserInfo, deleteUser, resetpassword } from '@/api/user'
import { getSysOrgTree } from '@/api/organization'
import { getSysRoles } from '@/api/role'
import { Message } from 'element-ui'
import loginVue from '../login/login.vue';
    export default {
      data() {
        return {
          tableData: [{
            id: '1',
            organization: '计算机学院',
            name: '喀啥',
            roles: [{ value: 'admin', label: '管理员' },{ value: 'teacher', label: '教师' }],
            locking: true
          }, {
            id: '2',
            organization: '理学院',
            name: '阿拉',
            roles: [{value: 'teacher', label: '教师'},{value: 'instructor', label: '辅导员'}],
            locking: false
          }, {
            id: '3',
            organization: '艺术学院',
            name: '小虎',
            roles: [{value: 'worker', label: '职工'}],
            locking: false
          }, {
            id: '4',
            organization: '能源与环境学院',
            name: '马哥',
            roles: [{value: 'teacher', label: '教师'},{value: 'instructor', label: '辅导员'}],
            locking: false
          }],
          dialogFormVisible: false,
          editDialogFormVisible: false,
          formLabelWidth: '85px',
          form: {
            name: '',
            password: '',
            selectedOption: '',
            selectedRoles: [],
            locking: false
          },
          addrules: {
            name: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 13, message: '长度在 3 到 13 个字符之间', trigger: 'blur'}
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符之间', trigger: 'blur' }
            ],
            selectedOption: [{ required: true, message: '请选择用户所属部门', trigger: 'blur'}],
            selectedRoles: [{ required: true, message: '请选择用户角色', trigger: 'blur'}],
          },
          editform: {
            id: '',
            name: '',
            selectedOption: '',
            selectedRoles: [],
            locking: false
          },
          editrules: {
            selectedOption: [{ required: true, message: '请选择用户所属部门', trigger: 'blur'}],
            selectedRoles: [{ required: true, message: '请选择用户角色', trigger: 'blur'}],
          },
          orgOptions: [
            {
              value: 'PAGA',
              label: '党政管理部门',
              children: [{
                value: 'PD',
                label: '宣传部'
              },{
                value: 'DCASO',
                label: '纪委、监察处'
              }]
            },
            {
              value: 'TATAD',
              label: '教学教辅部门',
              children: [{
                value: '计算机学院',
                label: '计算机学院'
              },{
                value: '理学院',
                label: '理学院'
              },{
                value: '能源与环境学院',
                label: '能源与环境学院'
              },{
                value: '艺术学院',
                label: '艺术学院'
              }]
            }
          ],
          roles: [
            {
              id: 1,
              value: 'admin',
              label: '管理员'
            },
            {
              id: 2,
              value: 'instructor',
              label: '辅导员'
            },
            {
              id: 3,
              value: 'teacher',
              label: '教师'
            },
            {
              id: 4,
              value: 'worker',
              label: '职工'
            }
          ]
        }
      },
      created() {
         this.initializationData();
         console.log('LOGIN USER = ' + this.$store.getters.name);
      },
      methods: {
        initializationData() {// Initialization of the managed user data list data based on the logged-in user
          getUserList(this.$store.getters.name).then(response => {
            if(response.code == 20000) {
              // console.log('tableData =' + response.data.data)
              this.tableData = response.data.data;
            }
          })
          getSysOrgTree().then(response => {// 
            if(response.code == 20000){
              // console.log('org =' + response.data.data)
              this.orgOptions = response.data.data;
            }
          })
          getSysRoles().then(response => {
            if(response.code == 20000){
              this.roles = response.data.data;
              console.log(this.roles)
            }
          })
        },
        refresh() { // refresh users' info
          this.initializationData();
          Message.success('已刷新!');
        },
        add() {// create new user info
          this.$refs.addform.validate(valid => {
            if(valid) {
              this.dialogFormVisible = false;
              addUser(this.form).then(response => {
                if(response.code == 20000) {
                  // successful addition
                  this.refresh();
                  Message.success('添加成功!');
                }else {
                  // failed addition
                  Message.error('添加失败!');
                }
              })
            } else {
              this.dialogFormVisible = true;
              console.log('user.vue : error add.action!!!');
              return false;
            }
          });
        },
        verify() {// verify user's info
          this.$refs.editform.validate(valid => {
            if (valid) {
              this.editDialogFormVisible = false;
              editUserInfo(this.editform).then(response => {
                if(response.data == 20000) {
                  // successful verify
                  Message.success('修改成功!')
                }else {
                  // failed verify
                  Message.error('修改失败!')
                }
              });
            } else {
              this.editDialogFormVisible = true;
              console.log('user.vue : error verify.action!!!');
              return false;
            }
          });
        },
        delete(id) {// delete user
          deleteUser(id).then(response => {
            if(response.code == 20000) {
              // successful delete
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              //failed delete
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          });
        },
        resetpwd(id) {// reset user's password
          resetpassword(id).then(response => {
            if(response.code == 20000){
              Message.success('密码重置为: 123456 ');
            } else {
              Message.error('密码重置失败，请联系管理员');
            }
          });
        },
        openEditDialogForm(index, row) {
          this.editDialogFormVisible = true;
          this.editform.id = row.id;
          this.editform.name = row.name;
          this.editform.locking = row.locking;
          // this.editform.selectedOption = row.organization;
          // this.editform.selectedRoles = row.roles;
          // console.log(index);
        },
        resetPwdMessageBox(index, row) {
          this.$confirm('重置用户密码 , 是否继续 ? ( 重置密码为 123456 ) ','提示',{ // 三个参数 message title options 
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {  // Promise 来处理后续响应
            this.resetpwd(row.id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消重置'
            });
          });
        },
        deleteMessageBox(index, row) {
          this.$confirm('此操作将删除用户信息 , 是否继续 ?','提示',{ // 三个参数 message title options 
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {  // Promise 来处理后续响应
            this.delete(row.id)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
</script>

<style scoped>
    .el-card{
      box-shadow:  0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border: 1px solid #ebeef5;
      color: #303133;
      transition: .3s;
        transition-property: all;
        transition-duration: 0.3s;
        transition-timing-function: ease;
        transition-delay: 0s;
      border-radius: 4px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      overflow: hidden;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .el-card_body {
      padding: 20px;
    }
    .el-pagination {
      white-space: nowrap;
      padding: 5px 10px;
      color: #303133;
      font-weight: 700;
    }
    .el-pagination_total {
      margin-right: 10px;
      font-weight: 400;
      color: #606266;
    }
    *, ::after, ::before {
      -webkit-box-sizing: inherit;
      box-sizing: inherit;
    }
</style>
  