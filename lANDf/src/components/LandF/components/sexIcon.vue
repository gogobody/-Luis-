<template>
    <span class="sex-panel">
        <span v-if="sex">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-nan"></use>
            </svg>
        </span>
        <span v-else>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-nv"></use>
            </svg>
        </span>
    </span>
</template>
<style scoped="true">
    .sex-panel {
        margin: 0px 10px;
    }
</style>
<script type="text/ecmascript-6">
    export default {
        props: ['sex']
    }
</script>