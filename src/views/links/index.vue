<template>
    <div class="app-container">
        <!-- 添加框 -->
        <el-card class="card-category">
            <div slot="header">
                <span>保存友链</span>
            </div>
            <div>
                <el-form :inline="true" :model="editor" class="demo-form-inline">
                    <el-form-item required prop="name" :rules="[{ required: true, message: '请输入友链名称'}]" label="友链名称">
                        <el-input style="width: 300px" v-model="editor.name" placeholder="请输入友链名称"></el-input>
                    </el-form-item>
                    <el-form-item required prop="url" :rules="[{ required: true, message: '请输入链接地址'}]" label="链接地址">
                        <el-input style="width: 300px" v-model="editor.url" placeholder="请输入链接地址"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="handleSave">保存友链</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <br/>
            <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="编号" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>

                <el-table-column width="300px" align="center" label="友链名称">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column min-width="300px" align="center" label="连接地址">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.url" class="edit-input" size="small"/>
                            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
                        </template>
                        <span v-else>{{ scope.row.url }}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button>
                        <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">Edit</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .edit-input {
        padding-right: 100px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
</style>

