<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <router-view/>
        </div>
    </a-config-provider>
</template>

<script>
    import {mapGetters} from "vuex";
    export default {
        name: 'App',
        data() {
            return {

            }
        },
        computed: {
            locale () {
                return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
            }
        },
        mounted(){
            if(!this.$electron)return;
            const {ipcRenderer} = this.$electron;
            ipcRenderer.on("update-message", (event, data) => {
                switch (data.status){
                    case -1:
                        this.$message.error({content: data.msg});
                        break;
                    case 0:
                        this.$message.loading({content: data.msg, duration: 0,key:'autoUpdate'});
                        break;
                    case 2:
                        this.$message.success({content: data.msg,key:'autoUpdate'});
                        break;
                    case 3:
                        this.$message.success({content: data.msg,key:'autoUpdate'});
                        this.$confirm({title: '更新', content: '新版本已准备就绪,是否立即更新？', cancelText:'稍后更新', okText:'立即更新', onOk:  () => {this.$electron.ipcRenderer.invoke("quitAndInstall");}});
                        break;
                }
            });
            ipcRenderer.on("downloadProgress", (event, progressObj) => {
                if (progressObj.percent) {
                    this.$message.loading({content: '检测到新版本，正在下载,请稍后...'+parseFloat(progressObj.percent.toFixed(2))+'%', duration: 0,key:'autoUpdate'});
                    if (progressObj.percent == 100) {
                        this.$message.success({content: '下载完成！',key:'autoUpdate'});
                    }
                }
            });
            ipcRenderer.invoke("checkForUpdate");
        }
    }
</script>

<style>
    #app {
        height: 100%;
    }
</style>
