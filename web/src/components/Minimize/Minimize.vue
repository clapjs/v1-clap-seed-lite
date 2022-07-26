<template>
    <a-tooltip placement="bottom" title="最小化">
        <a-icon type="minus" @click="minus"/>
    </a-tooltip>
</template>

<script>
    export default {
        name: "exit",
        methods:{
            minus(){
                if(!this.$electron) return;
                this.$electron.ipcRenderer.invoke("minimize");
            }
        }
    }
</script>

<style scoped>

</style>
