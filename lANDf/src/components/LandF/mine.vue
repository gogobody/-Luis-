<template>
    <div>
        <x-header class="search-header" :left-options="{preventGoBack:false}">
            <my-icon class="mine-icon" slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
            </my-icon>
            <my-icon class="mine-icon" slot="right" name="#icon-close" @click.native="goback"></my-icon>
        </x-header>
        <headers :imgUrl="require('../../assets/landf/background.jpg')" :search="false">
            <div slot="panel" class="user-head">
                <img class="user-head-img" src="../../assets/landf/head.jpg"/>
            </div>
            <div slot="panel" class="user-name">
                <span>{{name}}<sex-icon :sex="sex"></sex-icon></span>
            </div>
            <div slot="panel" class="user-school">
                <span>{{school}}</span>
            </div>
        </headers>
        <grid :cols="3">
            <grid-item label="我发布的" @click.native="openmine">
                <my-icon class="mine-grid" slot="icon" name="#icon-fabu1"></my-icon>
            </grid-item>
            <grid-item label="体验语义服务">
                <my-icon class="mine-grid" slot="icon" name="#icon-weibiaoti-"></my-icon>
            </grid-item>
            <grid-item label="关于">
                <my-icon class="mine-grid" slot="icon" name="#icon-guanyu"></my-icon>

            </grid-item>
        </grid>
        <popup :value="popupmine" height="100%">
            <popup-header left-text='<' right-text="x" @on-click-left="openmine" @on-click-right="openmine"></popup-header>

        </popup>
    </div>
</template>
<style>
    .mine-icon {
        color: black;
        font-size: 19px;
    }

    .search-header {
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        border-top: 0;
    }

    .user-head {
        padding-top: 15px;

    }

    .user-head-img {
        width: 94px;
        height: 94px;
        border-radius: 50px;
    }

    .user-name {
        color: white;
        font: 20px 'Microsoft YaHei', arial, tahoma, \5b8b\4f53, sans-serif;
        letter-spacing: 2px;
    }

    .user-school {
        color: white;
        font-size: 11px;
        margin-top: 7px;
    }

    .mine-grid .icon {
        font-size: 27px;
    }


</style>

<script type="text/ecmascript-6">
    import Headers from './components/headers.vue'
    import MyIcon from './components/myIcon.vue'
    import SexIcon from './components/sexIcon.vue'
    import {Search, XHeader} from 'vux'
    import {Grid, GridItem, Popup, PopupHeader} from 'vux'

    export default {
        props: [],
        data() {
            return {
                name: "李嘉图",
                sex: true,
                school: "重庆大学",
                popupmine: false,
                popuptiyan: false,
                popupguanyu: false
            }
        },
        components: {
            Headers, MyIcon, Search, XHeader, SexIcon, Grid, GridItem, Popup, PopupHeader
        },
        methods: {
            goback() {
                this.$router.goBack()
            },
            openmine() {
                (this.popupmine === true) ? (this.popupmine=false):(this.popupmine = true)
            }
        }

    }
</script>
