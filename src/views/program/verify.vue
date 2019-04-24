<template>
  <div class="el-card is-always-shadow">

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
            type="success"
            @click="openEditDialogForm(scope.$index, scope.row)">审核</el-button>
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

    <!-- verifyDialogForm -->
    <el-dialog title="审核节目" :visible.sync="verifyDialogFormVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="1.节目信息" name="first">
          <div ref="card" class="el-card_body" @mouseenter="cardenter">
            <el-form :model="form" label-width="80px">
              <el-form-item label="节目名" >
                <el-input v-model="form.pname" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="发布人">
                <el-input v-model="form.publisher" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="节目类型">
                <el-input v-model="form.ptypeStr" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="大屏">
                <el-input v-model="form.selectedscreens" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="时间范围">
                <el-input v-model="form.rangetime" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="内容描述">
                <el-input v-model="form.pcontent" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
            <div ref="mycollapse" class="meta" style="height: 0px">
              <div class="highlight">
                <pre>
                  <!--el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="item in 4" :key="item">
                      <h3>{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel-->
                </pre>
              </div>
            </div>
            <div class="block-control meta" style="left: 0px;">
              <i class="el-icon-caret-bottom"></i>
              <transition name="fade">
              </transition>
              <button ref="controlbutton" class="el-button control-button el-tooltip el-button--text el-button--small" type="button" aria-describedby="el-tooltip-717" @click="show" @mouseenter="buttonenter" @mouseleave="buttonleave"><span>在线展示</span></button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="2.图片/视频等资源" name="second">
          <!--carousel-->
          <el-carousel indicator-position="outside" v-if="carousel" >
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <!--ckeditor-->
          <ckeditor name="ckeditor" id="ckeditor" rows="10" cols="80" v-if="editor">
            This is my textarea to be replaced with CKEditor.
          </ckeditor>
        </el-tab-pane>
        <el-tab-pane label="3.节目调度表" name="third">节目调度表</el-tab-pane>
        <el-tab-pane label="4.填写审核信息" name="fourth">
          <div ref="card" class="el-card_body">
            <el-form label-width="80px">
              <el-form-item label="审核状态">
                <el-switch
                  v-model="verifyform.examinevalue"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="审核通过"
                  inactive-text="审核不通过">
                </el-switch>
              </el-form-item>
              <el-form-item label="审核反馈">
                <el-input v-model="verifyform.feedback" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="verifyDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="verify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getVerifyList, verifyProgram } from '@/api/program';
import { Message } from 'element-ui';
    export default {
      data() {
        return {
          tableData: [{
            id: 1,
            pname: '消防宣传',
            pcontent: '消防宣传',
            ptype: '图片',
            starttime: '2016-05-02',
            endtime: '2016-05-02',
            publisher: '王小虎',
            state: '待审核'
          }, {
            id: 2,
            pname: '安全宣传',
            pcontent: '消防宣传',
            ptype: '图片',
            starttime: '2016-05-02',
            endtime: '2016-05-02',
            publisher: '王小虎',
            state: '待审核'
          }, {
            id: 3,
            pname: '消防宣传',
            pcontent: '消防宣传',
            ptype: '图片',
            starttime: '2016-05-02',
            endtime: '2016-05-02',
            publisher: '王小虎',
            state: '待审核'
          }, {
            id: 4,
            pname: '消防宣传',
            pcontent: '消防宣传',
            ptype: '图片',
            starttime: '2016-05-02',
            endtime: '2016-05-02',
            publisher: '王小虎',
            state: '待审核'
          }],
          verifyDialogFormVisible: false, // 审核 dialogFormVisible
          carousel: false,
          editor: true,
          form: {
            pname: '',
            publisher: '',
            ptype: '',
            ptypeStr: '',
            rangetime: '',
            pcontent: '',
            selectedscreens: ''
          },
          verifyform: {
            pid: '',
            examinevalue: false, // 审核Boolean值 
            feedback: '', // 节目审核反馈信息
          },
          activeName: 'first', // el-tab-pane 默认设置 
          examinevalue: false, // 审核Boolean值 
          feedback: '', // 节目审核反馈信息
        }
      },
      created() {
        this.initializationData();
      },
      methods: {
        show: function() {
          this.index = !this.index
          if(this.index){
            this.$refs.mycollapse.style.height = "100px"
          }else {
            this.$refs.mycollapse.style.height = "0px"
          }
          console.log('show')
        },
        initializationData() { // initialization data
          getVerifyList(this.$store.getters.name).then(response => {
            if(response.code == 20000) {
              // console.log('tableData =' + response.data.data)
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
            } else {
              console.log('节目列表初始化失败!!!');
              Message.error('节目列表初始化失败!!!');
            }
          });
        },
        openEditDialogForm(index, row) {
          console.log('VERIFY EDITFORM');
          console.log(row);
          this.verifyDialogFormVisible = true;
          this.verifyform.pid = row.id;
          this.form.pname = row.pname;
          this.form.publisher = row.publisher;
          this.form.ptypeStr = row.ptypeStr;
          this.form.selectedscreens = row.screenlist;
          this.form.rangetime = row.starttime_localstr + '--' + row.endtime_localstr;
          this.form.pcontent = row.pcontent;
        },
        verify() {
          this.verifyDialogFormVisible = false;
          verifyProgram(this.verifyform).then(response => {
            if(response.code == 20000) {
              console.log('完成审核!!!');
              Message.success('完成审核!!!');
            } else {
              console.log('网络错误!!!');
              Message.error('审核失败!!!');
            }
          });
        },
        buttonenter: function() {
          //console.log('buttonenter')
        },
        cardenter() {

        },
        buttonenter() {

        },
        buttonleave() {

        }
      },
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
    .el-input {
      width: 350px;
    }
    .el-carousel_item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .el-carousel_item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel_item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .block-control {
      border-top: 1px solid #eaeefb;
        border-top-color: rgb(234, 238, 251);
        border-top-style: solid;
        border-top-width: 1px;
      height: 40px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;
    }
    .meta {
      background-color: #fafafa;
      border-top: 1px solid #eaeefb;
      overflow: hidden;
      transition: height .2s;
    }
    .control-button {
      height: 26px;
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
    .el-button--text {
      border-color: transparent;
      color: #409eff;
      background: transparent;
      padding-left: 0;
      padding-right: 0;
    }
    .el-button--small {
      padding: 9px 15px;
          padding-right: 15px;
          padding-left: 15px;
      font-size: 12px;
      border-radius: 3px;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
      text-align: center
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    *, ::after, ::before {
      -webkit-box-sizing: inherit;
      box-sizing: inherit;
    }
</style>
  