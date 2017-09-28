<template>
    <div>
        <x-header class="search-header" :left-options="{preventGoBack:false}" >
            <my-icon slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
            </my-icon>
            <my-icon slot="right" name="#icon-close" @click.native="goback"></my-icon>
        </x-header>



    </div>
</template>
<style lang="less">
    .my-icon {
        color: black;
        font-size: 19px;
    }
</style>
<script type="text/ecmascript-6">
    import {XHeader } from 'vux'
    import MyIcon from './components/myIcon.vue'
    export default {
        data() {
            return {

            }
        },
        components: {
            XHeader,MyIcon
        },
        methods: {
            goback(){
                this.$router.goBack()
            }
        },
        mounted() {

        }
    }
</script>
