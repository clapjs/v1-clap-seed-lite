import http from '../config/config.http'

const model=(name)=> {
    const url = '/clap/model';
    return {
        get: async (params) => {
            return (await http.get([url, name].join('/'), params)).data;
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
            return (await http.get([url, name, id].join('/'), params)).data;
        },
        getByPost: async (params) => {
            return (await http.post([url.replace(new RegExp(url, "g"), '/core/getByPost'), name].join('/'), params)).data;
        },
        post: async (data) => {
            return (await http.post([url, name].join('/'), data)).data;
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
            return (await http.patch([url, name, id].join('/'), data)).data;
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
            return (await http.put([url, name, id].join('/'), data)).data;
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
            return (await http.delete([url, name, id].join('/'))).data;
        }
    }
}

const collection=(db,name)=> {
    const url = '/core/sql/'+db;
    return {
        get: async (params) => {
            return (await http.get([url, name].join('/'), params)).data;
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
            return (await http.get([url, name, id].join('/'), params)).data;
        },
        getByPost: async (params) => {
            return (await http.post([url.replace(new RegExp(url, "g"), '/core/getByPost'), name].join('/'), params)).data;
        },
        post: async (data) => {
            return (await http.post([url, name].join('/'), data)).data;
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
            return (await http.patch([url, name, id].join('/'), data)).data;
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
            return (await http.put([url, name, id].join('/'), data)).data;
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
            return (await http.delete([url, name, id].join('/'))).data;
        }
    }
}

const listToTree = (data, pId, options) => {
    options = options ? options : {}
    options.idKey = options.idKey ? options.idKey : '_id'
    options.pIdKey = options.pIdKey ? options.pIdKey : 'p_id'
    options.childKey = options.childKey ? options.childKey : 'children'
    let result = []
    let temp = []
    for (let i = 0; i < data.length; i++) {
        if (data[i][options.pIdKey] == pId) {
            let obj = data[i]
            if (options.replaceFields) {
                const getValue = (data, keys) => {
                    let value = []
                    for (let key of keys.split(',')) {
                        value.push(eval('data.' + key))
                    }
                    return value.join(' | ')
                }
                if (options.replaceFields.key) obj['key'] = getValue(data[i], options.replaceFields.key)
                if (options.replaceFields.value) obj['value'] = getValue(data[i], options.replaceFields.value)
                if (options.replaceFields.title) obj['title'] = getValue(data[i], options.replaceFields.title)
            }
            temp = listToTree(data, data[i][options.idKey], options)
            if (temp.length > 0) {
                obj[options.childKey] = temp
            }
            result.push(obj)
        }
    }
    return result
}

const getTreeNode = (treeData, value, options) => {
    let node
    options = options ? options : {}
    options.key = options.key ? options.key : 'key'
    options.childKey = options.childKey ? options.childKey : 'children'
    for (let data of treeData) {
        if (data[options.key] === value) {
            node = data
        }
        if (data[options.childKey]) {
            let result = getTreeNode(data[options.childKey], value, options)
            if (result) {
                node = result
            }
        }
    }
    return node
}

const getTreeParentNode = (data, pid, options = {}) => {
    let result = ''
    options.idKey = options.idKey ? options.idKey : '_id'
    options.pIdKey = options.pIdKey ? options.pIdKey : 'p_id'
    for (let i = 0; i < data.length; i++) {
        if (data[i][options.idKey] == pid) {
            if (data[i][options.pIdKey] != 0) {
                result += (getTreeParentNode(data, data[i][options.pIdKey]), options)
            }
            if (data[i][options.pIdKey] == 0) {
                result = data[i][options.idKey]
            } else {
                result += ',' + data[i][options.idKey]
            }
        }
    }
    return result
}

const getTreeLength = (tree, options) => {
    let count = 0
    options = options ? options : {}
    options.childKey = options.childKey ? options.childKey : 'children'
    for (let t of tree) {
        count++
        if (t[options.childKey]) {
            count = count + getTreeLength(t[options.childKey], options)
        }
    }
    return count
}

export {model,collection,listToTree,getTreeNode,getTreeParentNode,getTreeLength}
