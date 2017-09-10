<template>
    <div class="itemsearch">
        <x-header class="search-header" :left-options="{preventGoBack:false}" >
            <my-icon slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
            </my-icon>
            <my-icon slot="right" name="#icon-close" @click.native="goback"></my-icon>
        </x-header>
        <search placeholder="输入信息试试，如：书包+空格+黑色" v-model="searchform"
                @on-submit="searchsubmit" ref="search">
        </search>
        <div class="search-bottom-img" ref="bottomImg">
            <img :src="searchImg"/>
        </div>
    </div>
</template>
<style scoped="true">
    .itemsearch {
        height: 100%;
    }
    .search-header{

        background-color: white;
        box-shadow: 0 0 10px rgba(0,0,0,.15);
        border-top: 0px;
    }
    .vux-search-box {
        top:1px;
    }
    .my-icon {
        color: black;
        font-size: 19px;
    }
    .search-bottom-img {
        position: absolute;
        bottom: 0;
    }
    .search-bottom-img img {
        width: 100%;
        height: 100%;
    }
</style>
<script type="text/ecmascript-6">
    import MyIcon from './components/myIcon.vue'
    import { Search,XHeader  } from 'vux'
    let _ = require('lodash/string');
    export default {
        data(){
            return{
                backtext:"",
                searchform:"",//搜索框输入
                searchImg:require('../../assets/landf/search-bottom-img.png')
            }
        },
        props: [],
        components:{
            XHeader,
            Search,MyIcon
        },
        methods:{
            searchsubmit () {
                this.$refs.search.setBlur();
                let form = _.lowerCase(this.searchform).split(' ')
            },
            goback(){
                this.$router.goBack()
    }
        }
    }
</script>