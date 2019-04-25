<template>
    <div class="login-container" @click.stop="blank">
        <el-form ref="loginForm" :model="loginForm" :rules="LoginRules" class="login-form" auto-complete="on" label-position="left">
            <div>
                <img :src="bear"/>
            </div>
            <h3 class="title">中原工学院电子屏幕管理系统</h3>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user"/>
                </span>
                <el-input 
                    v-model="loginForm.username" 
                    @click.native.stop="greeting" 
                    name="username" 
                    type="text" 
                    auto-complete="on" 
                    placeholder="username" 
                    clearable="clearable"/>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"/>
                </span>
                <el-input
                    @click.native.stop="blindfold"
                    :type="pwdType"
                    v-model="loginForm.password" 
                    name="password"  
                    auto-complete="on"  
                    placeholder="password"
                    @keyup.enter.native="handleLogin" 
                    />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
                </span>
            </el-form-item>
            <el-form-item>
                <el-checkbox class="check" v-model="loginForm.rememberMe">记住我</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" style="width: 100%;" @click.native.prevent="handleLogin" >
                    Sigin In
                </el-button>
            </el-form-item>

        </el-form>
    </div>
</template>


<script>
// '@/xxx/xx' means：相对路径, @/ 是webpack设置的路径别名,webpack的build文件夹下webpack.base.conf.js是对于@进行配置, eg:我的配置文件中 @ 就代表 src 目录.
import { isvalidUsername } from '@/utils/validate'

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if(!isvalidUsername(value)){
                callback(new Error('请输入正确的用户名'))
            }
            else{
                callback()
            }
        }
        const vaildatePassword = (rule, value, callback) => {
            if(value.length < 4){
                callback(new Error('密码不能小于4位'))
            }
            else{
                callback()
            }
        }
        return {
            img: {
                normal: 'http://cdn.tycoding.cn/normal.0447fe9.png',
                blindfold: 'http://cdn.tycoding.cn/blindfold.58ce423.png',
                greeting: 'http://cdn.tycoding.cn/greeting.1415c1c.png'
            },
            bear: 'http://cdn.tycoding.cn/normal.0447fe9.png',
            loginForm: {
                username: 'admin',
                password: 'admin',
                rememberMe: false
            },
            LoginRules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: vaildatePassword}]
            },
            loading: false,
            pwdType: 'password',
            redirect: undefined,
            clearable: true
        }
    },
    watch: {
        $route: {
            handler: function(route){
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        blank() {
            this.bear = this.img.normal;
        },
        blindfold() {
            this.bear = this.img.blindfold;
        },
        greeting() {
            this.bear = this.img.greeting;
        },

        showPwd() {
            if(this.pwdType === 'password'){
                this.pwdType = '';
            }
            else{
                this.pwdType = 'password';
            }
        },

        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    console.log('Begin to login')
                    console.log(this.loginForm)
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        console.log('Get Info/Succeed Login')
                        this.loading = false
                        this.$router.push({path: this.redirect || '/redirect'})
                    }).catch(() => {
                        console.log('Succeed Login, but response error')
                        this.loading = false
                    })
                } else {
                    console.log('Failed Login ,error submit!!!')
                    return false
                }
            })
        }
    }
}
</script>


<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            color: #454545;
            .el-form-item__content {
                border-bottom: 1px solid #dcdfe6;
            }
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #b8e5f8;
        background-image: url("http://cdn.tycoding.cn/db29b0fbd2f78dd8c1b7.db29b0f.png");
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 432px;
            max-width: 100%;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
            background-color: #fff;

            div>img{
                position: absolute;
                top: 0;
                left: 50%;
                width: 10rem;
                -webkit-transform: translate(-50%, -83%);
                transform: translate(-50%, -83%);
                z-index: 1;
            }
        }
        .tips {
            font-size: 14px;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: #0084ff;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>

