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
          prop="value"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="label"
          label="角色描述"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="角色状态">
          <el-switch
            v-model="state"
            disabled
            active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="使用中"
              inactive-text="锁定中">
          </el-switch>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="openEditDialogForm(scope.$index, scope.row)">查看详细信息 / 编辑</el-button>
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
      <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
        <el-form ref="addform" :model="form" :rules="rules">
          <el-form-item label="角色名称：" prop="value" :label-width="formLabelWidth">
            <el-input v-model="form.value" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述：" prop="label" :label-width="formLabelWidth">
            <el-input v-model="form.label" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统权限：" prop="resource" :label-width="formLabelWidth">
            <el-tree
              ref="addtree"
              :data="resourcedata"
              show-checkbox
              node-key="id"
              v-model="form.resource">
            </el-tree>
          </el-form-item>
          <el-form-item label="角色状态：" :label-width="formLabelWidth">
            <el-switch
              v-model="form.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="使用中"
              inactive-text="锁定中">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>

      <!-- editDialogForm -->
      <el-dialog title="修改角色信息" :visible.sync="editDialogFormVisible">
        <el-form ref="editform" :model="editform" :rules="rules">
          <el-form-item label="角色名称：" prop="value" :label-width="formLabelWidth">
            <el-input v-model="editform.value" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述：" prop="label" :label-width="formLabelWidth">
            <el-input v-model="editform.label" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="拥有权限：" prop="resource" :label-width="formLabelWidth">
            <el-tree
              ref="edittree"
              :data="resourcedata"
              show-checkbox
              node-key="id"
              v-model="editform.resource"
              :default-expanded-keys="[1]"
              :default-checked-keys="editform.resource">
            </el-tree>
          </el-form-item>
          <el-form-item label="角色状态：" :label-width="formLabelWidth">
            <el-switch
              v-model="editform.state"
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
import { getSysRoles, addRole, editRole, deleteRole } from '@/api/role'
import { getSysResource } from '@/api/resource'
import { Message } from 'element-ui'

    export default {
      data() {
        return {
          tableData: [{
            id: '1',
            value: 'admin',
            label: '系统管理员',
            roles: [{value: 'admin', label: '管理员'},{value: 'teacher', label: '教师'}],
            resource: [],
            state: false
          }, {
            id: '2',
            value: 'teacher',
            label: '普通教师',
            roles: [{value: 'admin', label: '管理员'},{value: 'teacher', label: '教师'}],
            resource: [],
            state: false
          }, {
            id: '3',
            value: 'check',
            label: '节目审核员',
            roles: [{value: 'worker', label: '职工'}],
            resource: [],
            state: false
          }],
          dialogFormVisible: false,
          editDialogFormVisible: false,
          formLabelWidth: '95px',
          form: {
            id: '',
            value: '',
            label: '',
            resource: [],
            state: false
          },
          editform: {
            id: '',
            value: '',
            label: '',
            resource: [1],
            state: false
          },
          rules: {
            value: [ { required: true, message: '请输入角色名', trigger: 'blur' } ],
            label: [ { required: true, message: '请输入角色描述信息(如: 拥有权限、创建日期等)', trigger: 'blur' } ],
            resource: [ { required: true, message: '请选择角色权限信息', trigger: 'blur' } ]
          },
          resourcedata: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }]
              }]
            }, {
              id: 2,
              label: '一级 2',
              children: [{
                id: 5,
                label: '二级 2-1'
              }, {
                id: 6,
                label: '二级 2-2'
              }]
            }, {
              id: 3,
              label: '一级 3',
              children: [{
                id: 7,
                label: '二级 3-1'
              }, {
                id: 8,
                label: '二级 3-2'
              }]
            }]
        }
      },
      created() {
        this.initializationData()
      },
      methods: {
        initializationData() { // Initialization of the managed user data list data based on the logged-in user
          getSysResource().then(response => {
            if (response.data.code == 20000) {
              this.resourcedata = response.data.data;
            } else {
              Message.error('数据初始化失败')
            }
          });
          getSysRoles().then(response => {
            if (response.data.code == 20000) {
              this.tableData = response.data.data;
            } else {
              Message.error('列表数据初始化失败')
            }
          })
        },
        refresh() { // refresh role' info
          this.initializationData();
        },
        add() {// create new role info
          this.form.resource = this.$refs.addtree.getCheckedKeys();
          this.$refs.addform.validate(valid => {
            if (valid) {
              this.dialogFormVisible = false;
              addRole(this.form).then(response => {
                if(response.data == 20000) {
                  // successful addition
                  this.refresh();
                  Message.success('添加成功!');
                } else {
                  // failed addition
                  Message.error('添加失败!');
                }
              });
            } else {
              this.dialogFormVisible = true;
              console.log('role.vue : error add.action!!!');
              return false;
            }
          });
        },
        verify() {// verify role's info
          this.editform.resource = this.$refs.edittree.getCheckedKeys();
          this.$refs.editform.validate(valid => {
            if (valid) {
              this.editDialogFormVisible = false;
              editRole(this.editform).then(response => {
                if(response.code == 20000) {
                  // successful verify
                  Message.success('修改成功!')
                }else {
                  // failed verify
                  Message.error('修改失败!')
                }
              });
            } else {
              this.editDialogFormVisible = true;
              console.log('role.vue : error verify.action!!!');
              return false;
            }
          })
          
        },
        delete(id) {// delete user
          deleteRole(id).then(response => {
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
          })
        },
        openEditDialogForm(index, row) {
          this.editDialogFormVisible = true;
          this.editform.id = row.id;
          this.editform.value = row.value;
          this.editform.label = row.label;
          this.editform.resource = row.resourceid.split(',').map(Number);
          this.$refs.edittree.setCheckedKeys(this.editform.resource);
          this.editform.state = row.state;
          console.log(row);
          console.log(index);
        },
        deleteMessageBox(index, row) {
          this.$confirm('此操作将删除角色信息,是否继续?','提示',{ // 三个参数 message title options 
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {  // Promise 来处理后续响应
            this.delete(row.id);
            /*this.$message({
              type: 'success',
              message: '删除成功!'
            });*/
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
        },
        cancel() {
          this.editDialogFormVisible = false;
          this.editform.id = '';
          this.editform.value = '';
          this.editform.label = '';
          this.editform.resource = [];
          this.editform.state = false; 
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
  