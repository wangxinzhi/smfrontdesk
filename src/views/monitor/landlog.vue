<template>
  <div class="el-card is-always-shadow">
    <div class="el-card_body">

      <div class="el-row is-justify-space-between el-row--flex " style="margin-left: -5px; margin-right: -5px; padding: 5px 0px; fixed: right">
        <div class="el-col el-col-6 el-col-xs-24 el-col-sm-12 el-col-lg-6" style="padding-left: 5px; padding-right: 5px;">
          <button class="el-button el-button--primary el-button--small is-plain" @click="refresh"><i class="el-icon-refresh"></i></button>
        </div>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="host"
          label="访问IP"
          width="180">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="访问时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地理位置">
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
    </div>
  </div>
</template>

<script>
import { landlogs } from '@/api/monitor';
import { Message } from 'element-ui';
    export default {
      data() {
        return {
          tableData: [{
              host: 'unkonwn',
              adress: 'unknown',
              startTime: 'unkonwn'
          }]
        }
      },
      created() {
        this.initializationData();
      },
      methods: {
        initializationData() {
            landlogs().then(response => {
              if (response.code == 20000) {
                  this.tableData = response.data.data;
                  this.tableData.forEach(element => {
                      element.startTime = new Date(element.startTime).toLocaleString();
                      element.endTime = new Date(element.endTime).toLocaleString();
                  })
                  console.log('SESSION-DATA');
                  console.log(this.tableData);
              } else {
                  Message.error('网络异常!!!');
              }
            })
        },
        refresh() {
            this.initializationData();
            Message.success('已刷新!!!');
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
  