<template>
    <div class="itemsearch">
        <sticky>
            <x-header class="search-header" :left-options="{preventGoBack:false}">
                <my-icon slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
                </my-icon>
                <my-icon slot="right" name="#icon-close" @click.native="goback"></my-icon>
            </x-header>
            <search placeholder="书包+空格+黑色或校园卡号" v-model="searchform"
                    @on-submit="searchsubmit" ref="search" class="searchinput">
                <div slot="left">
                    <group class="searchselect">
                        <selector direction="left" v-model="select" :options="choose"></selector>
                    </group>
                </div>
            </search>
        </sticky>
        <div v-for="item in items" >
            <items :user="item" @click.native="itemdetail(item.id,item.state)" class="searchitem"></items>
        </div>

        <div class="search-bottom-img" ref="bottomImg" v-if="showimg">
            <img :src="searchImg"/>
        </div>
    </div>
</template>
<style>
    .itemsearch {
        height: 100%;
    }

    .search-header {

        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        border-top: 0;
    }

    .vux-search-box {
        top: 1px;
    }

    .my-icon {
        color: black;
        font-size: 19px;
    }

    .search-bottom-img {
        position: absolute;
        bottom: 0;
        height: 150px;
        width: 100%;
    }

    .search-bottom-img img {
        width: 100%;
        height: 100%;
    }

    .searchselect .weui-cells {
        margin-top: 0 !important;
    }

    .searchselect .weui-select {
        height: 36px;
        line-height: 1;
        width: auto;
    }

    .searchinput .weui-search-bar__input {
        font-size: 16px !important;

    }
    .searchitem {
        margin: 7px 0;
    }
</style>
<script type="text/ecmascript-6">
    import MyIcon from './components/myIcon.vue'
    import Items from "./components/items.vue"
    import mixin from './utils/mixin'
    import {Search, XHeader, Selector, Group, Sticky } from 'vux'
    import Scroller from "../../../node_modules/vux/src/components/scroller/index.vue";

    let _ = require('lodash/string');
    export default {
        mixins:[mixin],
        data() {
            return {
                backtext: "",
                showimg: true,
                select: "lost",
                choose: [{key: 'lost', value: "失物"}, {key: 'found', value: "拾物"}],
                searchform: "",//搜索框输入
                searchImg: "http://osp68kn7c.bkt.clouddn.com//landf/search-bottom-img.png/lostfoundPic",
                items: []
            }
        },
        props: [],
        components: {
            Scroller,
            XHeader,
            Search, MyIcon, Selector, Group, Items, Sticky
        },
        methods: {
            searchsubmit() {
                this.showimg = false;
                this.$refs.search.setBlur();
                let form = _.lowerCase(this.searchform).split(' ');

                this.searchitem(this.items, this.select, form.join(","));

            },
            goback() {
//                this.$router.goBack()
                this.$router.push({name: 'landf'})
            },
            searchitem(items, select, name) {
                if (select === 'lost') {
                    this.$ajax.get(this.host + '/api/search_lost?s=' + name).then(res => {
                        if (res.data.status) {
                            this.items = res.data.data;
                        } else {
                            this.$vux.toast.text("没有找到任何信息~", "middle");
                            this.items = []
                        }
                    })
                } else if (select === 'found') {
                    this.$ajax.get(this.host + '/api/search_found?s=' + name).then(res => {
                        if (res.data.status) {
                            this.items = res.data.data;
                        } else {
                            this.$vux.toast.text("没有找到任何信息~", "middle");
                            this.items = []
                        }
                    })
                }
            }

        },
        created() {
            let name = this.$route.params.itemname;
            let select = this.$route.params.lost;
            if (name !== 'None') {
                this.showimg = false;
                this.searchitem(this.items, select,name);
            }
        },
//        beforeRouteLeave(next){
////            this.$destroy();
////            next()
//        }
    }
</script>