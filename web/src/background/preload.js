const {ipcRenderer} = require('electron');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const jsZip = require('jszip');
const jsBeautify = require('js-beautify');

const $core={};
$core.model = (name) => {
    return {
        get: async (params) => {
            return await ipcRenderer.invoke('core:model:get', name, params && params.params ? params.params : params);
        },
        getByID: async (id, params) => {
            if (!id) {
                return {
                    error: {
                        code: '9999',
                        message: 'param id missing'
                    }
                }
            }
            return await ipcRenderer.invoke('core:model:getById', name, id, params && params.params ? params.params : params);
        },
        post: async (data) => {
            return await ipcRenderer.invoke('core:model:post', name, data);
        },
        patch: async (id, data) => {
            if (!id || (Array.isArray(id) && id.length === 0)) {
                return {
                    error: {
                        code: '9999',
                        message: 'param id missing'
                    }
                }
            }
            return await ipcRenderer.invoke('core:model:update', name, id, data);
        },
        put: async (id, data) => {
            if (!id || (Array.isArray(id) && id.length === 0)) {
                return {
                    error: {
                        code: '9999',
                        message: 'param id missing'
                    }
                }
            }
            return await ipcRenderer.invoke('core:model:update', name, id, data);
        },
        delete: async (id) => {
            if (!id || (Array.isArray(id) && id.length === 0)) {
                return {
                    error: {
                        code: '9999',
                        message: 'param id missing'
                    }
                }
            }
            return await ipcRenderer.invoke('core:model:delete', name, id);
        },
        aggregate: async (params) => {
            return await ipcRenderer.invoke('core:model:aggregate', name, params);
        },
    }
};
$core.page={
    async getPageConfig(refer) {
        const PageConfig = await window.$core.model('cdp_page').get({
            params: {
                filter: /^[a-fA-F0-9]{24}$/.test(refer)?{_id: refer}: {code: refer},
                populate: 'idEntityList,idEntityCard,idEnum'
            }
        }).then(res => res.records[0])
        PageConfig.widgets = PageConfig._id ? await window.$core.model('cdp_page_widget').get({params: {filter: {idPage: PageConfig._id},order:'order',populate: 'idEnum'}}).then(res => res.records) : []
        PageConfig.populate = [];
        for (let widget of PageConfig.widgets.filter(item => item.mode === 'listCard')) {
            if ('RadioRefer' === widget.widget) {
                const parent = PageConfig.widgets.filter(item => item._id === widget.p_id)[0]
                PageConfig.populate.push(parent.widget === 'Table' ? parent.field + '.' + widget.field : widget.field);
            } else if ('CheckboxRefer' === widget.widget) {
                const parent = PageConfig.widgets.filter(item => item._id === widget.p_id)[0]
                PageConfig.populate.push(parent.widget === 'Table' ? parent.field + '.' + widget.field + '.idObject' : widget.field + '.idObject');
            }
        }
        return new Promise(function (resolve, reject) {
            resolve(PageConfig);
        });
    }
}
$core.entity={
    async resolveFilter(idEntity,filter) {
        return await ipcRenderer.invoke('core:model:resolve:filter',idEntity,filter);
    }
}

$core.tool={
    async unzip(zipFilePath,zipToFilePath){
        const zip = await jsZip.loadAsync(fs.readFileSync(path.join(zipFilePath)));
        for (const filename of Object.keys(zip.files)) {
            const dest = path.join(zipToFilePath, filename.replace(path.basename(path.join(zipFilePath),'.zip')+'/', ''));
            if (!fs.existsSync(path.join(zipToFilePath))) {
                fs.mkdirSync(path.join(zipToFilePath), {recursive: true});
            }
            // 如果该文件为目录需先创建文件夹
            if (zip.files[filename].dir) {
                fs.mkdirSync(dest, {recursive: true});
            } else {
                // 把每个文件buffer写到硬盘中
                zip.files[filename].async('uint8array').then(content => fs.writeFileSync(dest, content));
            }
        }
    },
    command:{
        exec(cmd, {cwd},callback){
            const exec = require('child_process').exec;
            const workerProcess = exec(cmd, {cwd: path.join(cwd)},callback)
            // 退出之后的输出
            workerProcess.on('close', function (code) {
                console.log('out code：' + code);
            })
        },
        async execSync(cmd, {cwd}){
            await require('child_process').execSync(cmd, {cwd: path.join(cwd),windowsHide:false,shell:true})
        },
    }
}
$core.fs = fs;
$core.mkdirp = mkdirp;
$core.path = path;
$core.jsZip = jsZip;
$core.jsBeautify = jsBeautify;
window.$core=$core;

