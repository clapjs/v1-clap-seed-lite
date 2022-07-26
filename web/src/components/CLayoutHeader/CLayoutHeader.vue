<template>
    <div style="float:right;height: 100%;margin-right: 24px;">
        <slot name="left"></slot>
        <avatar></avatar>
        <toggle-lang style="margin-left: 12px"></toggle-lang>
        <toggle-color style="margin-left: 12px"></toggle-color>
        <minimize v-if="$electron" style="margin-left: 12px"></minimize>
        <exit v-if="$electron" style="margin-left: 12px"></exit>
        <slot name="right"></slot>
    </div>
</template>

<script>
    import Avatar from './components/CAvatar'
    import ToggleLang from "../ToggleLang";
    import {ToggleColor} from "../ToggleColor";
    import Exit from "../Exit";
    import Minimize from "../Minimize";

    export default {
        name: "GlobalHeader",
        components: {Minimize,Exit, ToggleLang, ToggleColor, Avatar}
    }
</script>

<style scoped>

</style>
