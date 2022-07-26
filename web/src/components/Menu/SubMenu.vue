<template>
    <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners" :icon-park="iconPark">
    <span slot="title">
        <a-icon :type="menuInfo.icon" v-if="menuInfo.icon&&!iconPark"/>
        <a-icon type="folder" v-else-if="!menuInfo.icon&&!iconPark"/>
        <c-icon :type="menuInfo.icon" v-if="menuInfo.icon&&iconPark" class="anticon"/>
        <c-icon type="folder-close" v-else-if="!menuInfo.icon&&iconPark" class="anticon"/>
      <span>{{ menuInfo.title }}</span>
    </span>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.key" :style="item.style?item.style:{}">
                <a-icon :type="item.icon" v-if="item.icon&&!iconPark"/>
                <a-icon type="folder" v-else-if="!item.icon&&!iconPark"/>
                <c-icon :type="item.icon" v-if="item.icon&&iconPark" class="anticon"/>
                <c-icon type="folder-close" v-else-if="!item.icon&&iconPark" class="anticon"/>
                <span>{{ item.title }}</span>
            </a-menu-item>
            <c-sub-menu v-else :key="item.key" :menu-info="item" :icon-park="iconPark"/>
        </template>
    </a-sub-menu>
</template>
<script>
    import {Menu} from 'ant-design-vue';

    export default {
        name: 'CSubMenu',
        // must add isSubMenu: true
        isSubMenu: true,
        props: {
            ...Menu.SubMenu.props,
            // Cannot overlap with properties within SideMenu.SubMenu.props
            menuInfo: {
                type: Object,
                default: () => ({}),
            },
            iconPark:{
                type: Boolean,
                default: false
            }
        },
    };
</script>
