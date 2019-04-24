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
          prop="pname"
          label="节目名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pcontent"
          label="节目内容">
        </el-table-column>
        <el-table-column
          prop="ptypeStr"
          label="节目类型">
        </el-table-column>
        <el-table-column
          prop="starttime_localstr"
          label="开始时间">
        </el-table-column>
        <el-table-column
          prop="endtime_localstr"
          label="结束时间">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="发布人">
        </el-table-column>
        <el-table-column
          prop="stateStr"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="openEditDialogForm(scope.$index, scope.row)">查看 / 编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-dialog title="新增节目" :visible.sync="dialogFormVisible">
        <el-form ref="addform" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="节目名" prop="pname">
            <el-input v-model="form.pname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发布人" prop="publisher">
            <el-input v-model="form.publisher" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="节目类型" prop="ptype">
            <el-select v-model="form.ptype" placeholder="请选择">
              <el-option v-for="item in sysptype" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="大屏选择" prop="screenlist">
            <el-select v-model="form.screenlist" multiple collapse-tags placeholder="请选择">
              <el-option v-for="item in screens" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围" prop="rangetime">
            <el-date-picker
                v-model="form.rangetime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容描述" prop="pcontent">
            <el-input v-model="form.pcontent" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="form.fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/doc文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitprogram">确 定</el-button>
        </div>
      </el-dialog>

      <!-- editDialogForm -->
      <el-dialog title="查看 / 编辑节目信息" :visible.sync="editDialogFormVisible">
        <el-form ref="editform" :model="editform" :rules="rules" label-width="80px">
          <el-form-item label="节目名" prop="pname">
            <el-input v-model="editform.pname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发布内容" prop="pcontent">
            <el-input v-model="editform.pcontent" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="节目类型" prop="ptype">
            <el-select v-model="editform.ptype" placeholder="请选择">
              <el-option v-for="item in sysptype" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围" prop="rangetime">
            <el-date-picker
                v-model="editform.rangetime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="大屏选择" prop="selectedscreens">
            <el-select v-model="editform.selectedscreens" multiple collapse-tags placeholder="请选择">
                <el-option v-for="item in screens" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布人">
            <el-input v-model="editform.publisher" autocomplete="off" disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { fail, throws } from 'assert';
import { getProgramList, getScreens, addProgram, editProgram, deleteProgram, verifyProgram } from '@/api/program';
import { Message } from 'element-ui';
    export default {
      data() {
        return {
          tableData: [{
            id: 1,
            pname: '消防宣传',
            pcontent: '消防宣传',
            ptype: 1,
            ptypeStr: '图片',
            starttime: '2017-05-02',
            endtime: '2018-05-02',
            publisher: '王某',
            state: 0,
            stateStr: '待审核'
          }, {
            id: 2,
            pname: '安全宣传',
            pcontent: '消防宣传',
            ptype: 1,
            ptypeStr: '图片',
            starttime: '2016-05-02',
            endtime: '2016-05-02',
            publisher: '李某',
            state: 0,
            stateStr: '待审核'
          }, {
            id: 3,
            pname: '消防宣传',
            pcontent: '消防宣传',
            ptype: 1,
            ptypeStr: '图片',
            starttime: '2016-05-02',
            endtime: '2016-05-02',
            publisher: '刘某',
            state: 0,
            stateStr: '待审核'
          }, {
            id: 4,
            pname: '消防宣传',
            pcontent: '消防宣传',
            ptype: 1,
            ptypeStr: '图片',
            starttime: '2016-05-02',
            endtime: '2016-05-02',
            publisher: '赵某',
            state: 0,
            stateStr: '待审核'
          }],
          dialogFormVisible: false,
          editDialogFormVisible: false,
          form: {
            pname: '', //program name
            pcontent: '',// program content
            ptype: '',// program type
            rangetime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)], // program time
            screenlist: [],
            fileList: [],
            publisher: '', // program publisher
          },
          editform: {
            pid:'',
            pname: '',
            pcontent: '',
            ptype: '',
            rangetime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            selectedscreens: '',
            publisher: ''
          },
          rules: {
            pname: [ { required: true, message: '请输入节目名称', trigger: 'blur' } ],
            pcontent: [ { required: true, message: '请填写节目内容或目的', trigger: 'blur' } ],
            ptype: [ { required: true, message: '请选择节目类型', trigger: 'blur' } ],
            rangetime: [ { required: true, message: '请选择发布时间', trigger: 'blur' } ],
            screenlist: [ { required: true, message: '请选择目标大屏', trigger: 'blur' } ],
            publisher: [ { required: true, message: '请填写发布人', trigger: 'blur' } ],
            selectedscreens: [ { required: true, message: '请选择目标大屏', trigger: 'blur' } ]
          },
          screens: [ // User-Controllable Screen; need dynamic acquisition
                {
                  id: 1,
                  value: '10.10.19.39',
                  label: '3号教学楼1F北'
                },
                {
                  id: 2,
                  value: '10.10.19.31',
                  label: '3号教学楼1F南'
                },
                {
                  id: 3,
                  value: '10.10.19.32',
                  label: '3号教学楼2F'
                },
                {
                  id: 4,
                  value: '10.10.19.33',
                  label: '3号教学楼3F'
                },
                {
                  id: 5,
                  value: '10.10.19.34',
                  label: '3号教学楼4F'
                },
                {
                  id: 6,
                  value: '10.10.19.35',
                  label: '3号教学楼5F'
                },
                {
                  id: 7,
                  value: '10.10.19.21',
                  label: '2号组团楼1F'
                },
                {
                  id: 8,
                  value: '10.10.19.22',
                  label: '2号组团楼2F'
                },
                {
                  id: 9,
                  value: '10.10.19.23',
                  label: '2号组团楼3F'
                },
                {
                  id: 10,
                  value: '10.10.19.24',
                  label: '2号组团楼4F'
                },
                {
                  id: 11,
                  value: '10.10.19.25',
                  label: '2号组团楼5F'
                },
                {
                  id: 12,
                  value: '10.10.19.11',
                  label: '11号教学楼1F'
                },
                {
                  id: 13,
                  value: '10.10.19.13',
                  label: '11号教学楼3F'
                },
                {
                  id: 14,
                  value: '10.10.19.14',
                  label: '11号教学楼4F'
                },
                {
                  id: 15,
                  value: '10.10.19.15',
                  label: '11号教学楼5F'
                },
            ],
            sysptype: [
              {
                value: 0,
                label: '图片',
              },
              {
                value: 1,
                label: '视频',
              },
              {
                value: 2,
                label: '文档'
              }
            ]
        }
      },
      created() {
        this.initializationData();
      },
      methods: {
        initializationData() { // initialization data
          getProgramList(this.$store.getters.name).then(response => { // get programlist's info
            if(response.code == 20000) {
              console.log(response.data.data);
              this.tableData = response.data.data;
              this.tableData.forEach(element => {
                element.starttime_localstr = new Date(element.starttime).toLocaleString();
                element.endtime_localstr = new Date(element.endtime).toLocaleString();
                switch(element.ptype)
                {
                  case 0:
                    element.ptypeStr = '图片类';
                    break;
                  case 1:
                    element.ptypeStr = '视频类';
                    break;
                  case 2:
                    element.ptypeStr = '文字类';
                    break;
                  default: 
                    element.stateStr = '未知错误'
                    break;
                }
                switch(element.state)
                {
                  case 0:
                    element.stateStr = '未审核';
                    break;
                  case 1:
                    element.stateStr = '审核通过';
                    break;
                  case 2:
                    element.stateStr = '审核未通过';
                    break;
                  case 3:
                    element.stateStr = '发布成功';
                    break;
                  default: 
                    element.stateStr = '未知错误'
                    break;
                }
              });
              console.log('TABLE-DATA');
              console.log(this.tableData);
            } else {
              console.log('节目列表初始化失败!!!');
              Message.error('节目列表初始化失败!!!');
            }
          });
          getScreens().then(response => { // get screenlist's info
            if(response.code == 20000) {
              this.screens = response.data.data;
            } else {
              console.log('LED屏幕信息初始化失败!!!');
              Message.error('LED屏幕信息初始化失败!!!');
            }
          });
        },
        refresh() { // refresh program list
          this.initializationData();
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        submitprogram() {
          this.$refs.addform.validate(valid => {
            if (valid) {
              this.dialogFormVisible = false;
              addProgram(this.form).then(response => {
                Message.success('添加成功!!!');
              });
            } else {
              this.dialogFormVisible = true;
              console.log('programs.vue : error submit.action!!!');
              return false;
            }
          })
        },
        edit() {
          this.$refs.editform.validate(valid => {
            if(valid) {
              this.editDialogFormVisible = false;
              editProgram(this.editform).then(response => {
                Message.success('修改成功!!!');
              });
            } else {
              this.editDialogFormVisible = true;
              console.log('programs.vue : error edit.action!!!');
              return false;
            }
          })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        openEditDialogForm(index, row) {
          this.editDialogFormVisible = true;
          this.editform.pid = row.id;
          this.editform.pname = row.pname;
          this.editform.pcontent = row.pcontent;
          this.editform.ptype = row.ptype;
          this.editform.publisher = row.publisher;
          console.log('row range = ' + new Date(row.starttime).toString() + ' / ' + new Date(row.endtime).toString());
          this.editform.rangetime = [new Date(row.starttime), new Date(row.endtime)];
        },
        handleDelete(index, row) {
          console.log(row);
          this.$confirm('此操作将删除用户信息,是否继续?','提示',{ // three parameters: message / title / options 
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {  // Promise object to process subsequent responses
            deleteProgram(row.id).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
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
  