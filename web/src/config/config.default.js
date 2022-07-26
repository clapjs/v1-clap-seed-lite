/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 */

export default {
    host:'http://192.168.31.100:7001',
    primaryColor: '#2F54EB', // primary color of ant design
    multiTab:true,
    lang:'zh-CN',
    expires:24 * 60 * 60 * 1000,
    storageOptions: {
        namespace: 'CLEAR_', // key prefix
        name: 'ls', // name variable Vue.[ls] o r this.[$ls],
        storage: 'local' // storage name session, local, memory
    },// vue-ls options
}
