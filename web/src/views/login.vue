<template>
    <div class="login" style="-webkit-app-region: drag">
        <img src="../assets/logo.png" height="64" style="float: right;margin:24px 0 0 24px"/>
        <div class="login-form noDrag">
            <c-login @doLogin="doLogin" @resetPwd="rsVisible=true" @register="rVisible=true"/>
        </div>
        <c-register :visible.sync="rVisible" @doRegister="doRegister"></c-register>
        <c-reset-pwd :visible.sync="rsVisible" @doResetPwd="doResetPwd"></c-reset-pwd>
        <div style="width:100%;text-align:center;font-size: 14px;bottom: 12px;position: fixed;">© 2015-{{ new Date().getFullYear() }} <a href="https://www.clear-js.com">clear-js.com</a></div>
    </div>
</template>
<script>

import {mapActions, mapGetters} from "vuex";
import {CLogin,CRegister,CResetPwd} from "@/components/CSign"

export default {
    components: {CLogin,CRegister,CResetPwd},
    data() {
        return {
            rVisible: false,
            rsVisible: false,
        };
    },
    mounted() {
        if (this.user && this.userOrgan) {
            this.$router.push({name: 'dash'});
        }
    },
    computed: {
        ...mapGetters(['user', 'userOrgan']),
    },
    methods: {
        ...mapActions(['Logout', 'SetUser', 'SetUserOrgan']),
        async doLogin(user) {
            user.userCode = user.userCode.trim();
            user.userPwd = user.userPwd.trim();
            const result = await this.$http.post(this.$url.login, user);
            if (result.data.error.code === '0') {
                await this.entry(result.data.record);
            }
        },
        async doRegister(user) {
            user.userCode = user.userCode.trim();
            user.userPwd = user.userPwd.trim();
            user.userPwd2 = user.userPwd2.trim();
            const result = await this.$http.post(this.$url.register, user);
            this.rVisible=false;
            if (result.data.error.code === '0') {
                this.$confirm({
                    title: '确认',
                    content: '恭喜,注册成功!是否立即登录？',
                    centered:true,
                    onOk: async () => {
                        await this.entry(result.data.record);
                    }
                });
            }
        },
        async doResetPwd(user) {
            const result = await this.$http.post(this.$url.changePwd, user);
            if (result.data.error.code === '0') {
                this.$success({title: '密码修改成功！',onOk:()=>{this.rsVisible=false;}});
            }
        },
        async entry(user){
            this.SetUser(user);
            const defaultOrgan = (await this.$helper.model('org_organ_user').get({
                params: {
                    filter: {
                        idUser: user._id
                    },
                    populate: 'idOrgan'
                }
            })).records[0];
            this.SetUserOrgan(defaultOrgan.idOrgan._id)
            await this.$router.push({name: 'dash'});
        },
        download(){

        }
    }
};
</script>

<style lang="less">
@import "~ant-design-vue/es/style/themes/default.less";

    .noDrag {
        -webkit-app-region: no-drag
    }

    .login {
        width: 100%;
        height: 100%;
        background-image: url('../assets/backgroud/login.png');
        background-size: cover;
        background-position: center;

        &-form {
            position: absolute;
            right: 120px;
            top: 55%;
            transform: translateY(-60%);
            width: 450px;

            .form {
                padding: 0 20px;
            }
        }
    }

    .user-login-other {
        text-align: center;
        margin-top: 24px;
        line-height: 22px;

        .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: @primary-color;
            }
        }
    }

    .text {
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
