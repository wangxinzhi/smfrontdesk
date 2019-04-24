<template>
    <el-form :model="login" status-icon :rules="rule" ref="login">
        <el-form-item prop="username">
            <el-input prefix-icon="el-icon-ump-yonghu" v-model="login.username"
                    auto-complete="off"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input prefix-icon="el-icon-ump-mima" type="password" v-model="login.password"
                    auto-complete="off"/>
        </el-form-item>
        <el-form-item>
            <el-checkbox class="check" v-model="checked">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('login')">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'login',
    data: function() {
        var checkUsername = (rule, value, callback) =>{
            if(value === ''){
                callback(new Error('请输入用户名'));
            }
            else{
                callback();
            }
        };
        var checkPassword = (rule, value, callback) =>{
            if(value === ''){
                callback(new Error('请输入用户名'));
            }
            else{
                callback();
            }
        };
        return {
            checked: false,
            token: '',
            login: {
                username: '',
                password: '',
            },
            rule: {
                username: [
                    {validator: checkUsername, trigger: 'blur'}
                ],
                password: [
                    {validator: checkPassword, trigger: 'blur'}
                ]
            }
        }
     },
    methods: {
         submitForm(login) {
            this.$refs[login].validate((valid) => {
                if (valid) {
                    this.$router.push({ path: 'home' }); //跳转到home组件中
                    //提交表单
                    /*this.$http.post('http://127.0.0.1:8080/login.do', {
                        username: this.login.username,
                        password: this.login.password
                    }).then(result => {
                        console.log(result);
                        if (result.bodyText === 'index') {
                            this.$router.push({ path: 'home' }); //跳转到home组件中
                        } else {
                            console.log("登录失败");
                            return false;
                        }
                    });*/
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
}
</script>
