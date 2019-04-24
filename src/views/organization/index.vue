<template>
  <div class="el-card is-always-shadow">
    <div class="el-card_body">
        <div class="custom-tree-container">
            <div class="block">
                <p>学校部门组织</p>
                <el-tree
                ref="orgtree"
                :data="info"
                show-checkbox
                node-key="value"
                :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button
                                type="text"
                                size="medium"
                                @click="() => append(data)">
                                <i class="el-icon-circle-plus-outline"></i>
                            </el-button>
                            <el-button
                                type="text"
                                size="medium"
                                @click="() => deleteOrg(node, data)">
                                <i class="el-icon-delete"></i>
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </div>
        </div>
        <div>
            <el-dialog title="新增组织" :visible.sync="dialogFormVisible">
                <el-form ref="orgform" :model="form" :rules="addrules"> 
                    <el-form-item label="部门名称：" prop="depart" :label-width="formLabelWidth">
                        <el-input v-model="form.depart" type="text"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addDepart">确 定</el-button>
                </div>
            </el-dialog> 
        </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { getSysOrgTree, addOrg, deleteOrgById } from '@/api/organization';

    export default {
      data() {
        const data = [
            {
                value: 1,
                label: '一级 1',
                children: [{
                    value: 4,
                    label: '二级 1-1',
                    children: [{
                        value: 9,
                        label: '三级 1-1-1'
                    }, {
                        value: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, 
            {
                value: 2,
                label: '一级 2',
                children: [{
                value: 5,
                label: '二级 2-1'
                }, {
                value: 6,
                label: '二级 2-2'
                }]
            }, 
            {
                value: 3,
                label: '一级 3',
                children: [{
                value: 7,
                label: '二级 3-1'
                }, {
                value: 8,
                label: '二级 3-2'
                }]
            }];
        return {
            info: JSON.parse(JSON.stringify(data)),
            dialogFormVisible: false,
            formLabelWidth: '95px',
            form: {
                pid: '',
                depart: '',
            },
            addrules: {
                depart: [ {required: true, message: '请输入部门名称', trigger: 'blur'} ]
            },
            temporary: {}
        }
    },
    created() {
        this.initializationData()
    },
    methods: {
        initializationData() {
            getSysOrgTree().then(response => { // initialization the oraTree data
                if(response.data.code == 20000) {
                    this.info = response.data.data
                }else {
                    Message.error('部门信息初始化失败')
                }
            })
        },
        append(data) {
            this.dialogFormVisible = true;
            console.log('Tree-Append');
            console.log(data);
            this.temporary = data; 
        },
        addDepart() {
            this.$refs.orgform.validate(valid => {
                console.log('Get addnode parent = ' + this.$refs.orgtree.getCurrentNode().value);
                if (valid) {
                    this.dialogFormVisible = false;
                    this.form.pid = this.$refs.orgtree.getCurrentNode().value;
                    console.log('form = ' + this.form.depart + '/' + this.form.pid);
                    addOrg(this.form).then(response => { // server api function
                        this.initializationData();// initialize data, refresh orgtree
                        Message.success('添加成功!!!');
                    });
                } else {
                    console.log('org.vue : error add.action!!!');
                    return false;
                }
            });
        },
        deleteOrg(node, data) {
            this.$confirm('此操作将删除用户信息,是否继续?','提示',{ // 三个参数 message title options 
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {  // Promise 来处理后续响应
            console.log('Delete org id = ' + data.value);
            deleteOrgById(data.value);// server api function
            console.log('Delete org data = ' + node);
            this.initializationData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
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
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
    *, ::after, ::before {
      -webkit-box-sizing: inherit;
      box-sizing: inherit;
    }
</style>
  