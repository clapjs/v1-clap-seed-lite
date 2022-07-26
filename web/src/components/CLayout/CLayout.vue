<template>
    <a-layout id="basic-layout">
        <a-layout-sider v-model="collapsed" collapsible>
            <img src="../../assets/logo_white.png" height="64" width="200" v-if="!collapsed"/>
            <img src="../../assets/logo_mini.png" height="64" width="80" v-else/>
            <Menu theme="dark" mode="inline" :menus="menus" :inlineCollapsed="collapsed" @menuSelect="menuSelect" :selectedKeys="[menu.key]" :openKeys.sync="menu.keyPath" icon-park></Menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff;display:flex;justify-content:space-between; padding: 0;-webkit-app-region: drag">
                <a-page-header title="T+数据分析" sub-title="V1.0.0" @back="() => null">
                    <a-icon slot="backIcon" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)"/>
                </a-page-header>
                <CLayoutHeader style="-webkit-app-region: no-drag"/>
            </a-layout-header>
            <multi-tab v-if="multiTab" :style="{ margin: '2px 12px' }" @change="(activePanes)=>this.activePanes=activePanes"></multi-tab>
            <a-layout-content :style="{ margin: '0  12px 2px 12px', background: '#fff', minHeight: innerHeight ,maxHeight:innerHeight,overflow:'auto'}">
                <keep-alive v-if="multiTab" :include="activePanes.map(item=>item.key)">
                    <router-view/>
                </keep-alive>
                <router-view v-else/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import Menu from "@/components/Menu"
import MultiTab from "@/components/MultiTab";
import CLayoutHeader from "@/components/CLayoutHeader";

import {mapGetters, mapActions} from 'vuex'

export default {
    name: "basic",
    components: { MultiTab, Menu ,CLayoutHeader},
    data() {
        return {
            visible:false,
            activePanes:[],
            innerHeight:window.innerHeight - 120 +'px',
            collapsed: true,
            menus: [
                {
                    key:'order',
                    icon:'order',
                    title:'订单',
                    routeName:'order'
                }
            ],
        };
    },
    created() {
        window.onresize = ()=>{
            this.innerHeight =  window.innerHeight - 120 +'px';
        };
    },
    computed: {
        ...mapGetters(["multiTab","menu"]),
    },
    methods: {
        ...mapActions(['ToggleMenu','ToggleMultiTab']),
        async menuSelect(menu) {
            const activeMenu = this.$helper.getTreeNode(this.menus, menu.key);
            activeMenu.keyPath = menu.keyPath;
            this.ToggleMenu(activeMenu);
        }
    }
}
</script>

<style scoped lang="less">
#basic-layout {
    height: 100%;
}
</style>


