<template>
    <a-list item-layout="horizontal" :data-source="[{...user}]">
        <a-list-item slot="renderItem" slot-scope="user, index">
            <a-list-item-meta>
                <h3 slot="title">{{ user.userName }}</h3>
                <span slot="description">{{$moment(new Date()).format('a')+'好，祝您使用愉快！'}}</span>
                <a-avatar :size="50" slot="avatar" :src="user.avatar" v-if="user.avatar">{{user.userName.slice(0,1)}}</a-avatar>
                <a-avatar :size="50" slot="avatar" :style="{backgroundColor:user.avatarColor?user.avatarColor:'#1890ff'}" v-else>{{user.userName.slice(0,1)}}</a-avatar>
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "AvatarCard",
    data(){
        return {}
    },
    computed:{
        ...mapGetters(['user']),
    },
}
</script>

<style scoped>

</style>