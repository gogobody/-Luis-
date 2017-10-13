<template>
    <span class="my-icon">
        <svg class="icon" aria-hidden="true">
            <use :xlink:href="name"></use>
        </svg>
    </span>
</template>
<style>
    /*.my-icon {*/
        /*color: black;*/
        /*font-size: 19px;*/
    /*}*/

</style>
<script type="text/ecmascript-6">
    export default {
        props: ['name']
    }
</script>
