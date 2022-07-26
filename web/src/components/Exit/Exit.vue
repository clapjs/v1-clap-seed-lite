<template>
    <a-tooltip placement="bottom" title="退出系统">
        <a-icon type="close" @click="quit"/>
    </a-tooltip>
</template>

<script>
    export default {
        name: "exit",
        methods:{
            quit(){
                if(!this.$electron) return;
                this.$electron.ipcRenderer.invoke("quit");
            }
        }
    }
</script>

<style scoped>

</style>
