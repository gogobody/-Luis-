<template>
    <div>
        <x-header class="search-header" :left-options="{preventGoBack:false}">
            <my-icon class="mine-icon" slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
            </my-icon>
            <my-icon class="mine-icon" slot="right" name="#icon-close" @click.native="goback"></my-icon>
        </x-header>
        <headers imgUrl="http://osp68kn7c.bkt.clouddn.com//landf/background.jpg" :search="false">
            <div slot="panel" class="user-head">
                <img class="user-head-img" :src="headimg"/>
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
            <grid-item label="体验语义服务" @click.native="opentiyan">
                <my-icon class="mine-grid" slot="icon" name="#icon-weibiaoti-"></my-icon>
            </grid-item>
            <grid-item label="关于" @click.native="openguanyu">
                <my-icon class="mine-grid" slot="icon" name="#icon-guanyu"></my-icon>
            </grid-item>
        </grid>

        <popup :value="popupmine" height="100%">
            <div style="height:44px;" >
                <sticky :offset="0">
                    <popup-header left-text='返回'
                                  right-text="关闭" @on-click-left="openmine" @on-click-right="openmine"></popup-header>
                    <tab active-color="#FF9900" bar-active-color="#FF9900" v-model="index">
                        <tab-item selected :badge-label="lost.length.toString()" :key="0">失物信息</tab-item>
                        <tab-item badge-background="#38C972" badge-color="#fff" :badge-label="found.length.toString()" :key="1">拾物信息</tab-item>
                    </tab>
                </sticky>
            </div>
            <div v-model="index" style="margin-top: 44px;">

                <div :key="0" v-show="!index">
                    <swipeout v-for="(item,index) in lost" :key="index">
                        <swipeout-item transition-mode="follow">
                            <div slot="right-menu">
                                <swipeout-button @click.native="deletelost(item.id)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="demo-content vux-1px-t">
                                <items :user="item" @click.native="itemdetail(item.id,item.state)" class="searchitem"></items>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </div>
                <div :key="1" v-show="index">
                    <swipeout v-for="(item,index) in found" :key="index">
                        <swipeout-item transition-mode="follow">
                            <div slot="right-menu">
                                <swipeout-button @click.native="deletefound(item.id)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="demo-content vux-1px-t">
                                <items :user="item" @click.native="itemdetail(item.id,item.state)" class="searchitem"></items>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </div>
            </div>
            <divider>没有更多数据了</divider>
        </popup>
        <popup :value="popuptiyan" height="100%">
            <popup-header left-text='返回'
                          right-text="关闭" @on-click-left="opentiyan" @on-click-right="opentiyan"></popup-header>
            <group title="输入一点失物招领信息试试啦">
                <x-textarea placeholder="我丢了一个黑色的书包" v-model="luisinput" :max="500" ></x-textarea>
            </group>
            <x-button class="luis-submit" type="primary" :disabled="luisshowloading" :show-loading="luisshowloading" @click.native="luissubmit">提交</x-button>
            <group v-if="luisitemlist.length>0">
                <cell title="识别结果" value="概率" class="mine-result"></cell>
                <cell-form-preview :list="luisitemlist"></cell-form-preview>
            </group>
            <group v-show="luisfeaturelist.length>0">
                <cell title="特征识别"></cell>
                <cell-form-preview :list="luisfeaturelist"></cell-form-preview>
            </group>
        </popup>
        <popup :value="popupguanyu" height="100%">
            <popup-header left-text='返回'
                          right-text="关闭" @on-click-left="openguanyu" @on-click-right="openguanyu"></popup-header>
            <div style="width: 100%">
                <img src="http://osp68kn7c.bkt.clouddn.com//landf/school.jpg" style="width: 100%"/>
            </div>
            <div style="width: 100%;height: 200px;background: white">
                <br>
                <p style="margin-left: 10px">重庆大学智能失物招领平台为您服务！</p>
                <br>
                <p style="margin-left: 10px">为您提供失物招领查询和管理,通过智能失物招领服务帮您快速找到丢失的物品！</p>
                <br>
                <p style="margin-left: 10px">茫茫人海，为您找到丢东西的那个他</p>
            </div>
            <div style="width: 100%;height: 200px;background: white">
                <br>
                <p style="margin-left: 10px">欢迎加入虎溪失物招领1群:118718555</p>
                <br>
                <p style="margin-left: 10px">欢迎加入爱心社失物招领群:392452095</p>
                <br>
                <p style="margin-left: 10px">感谢各失物招领群的大力支持~！</p>
            </div>
            <div style="margin-top: 10px">
                <p style="font-size: 12px;line-height: 32px;color: #999;text-align: center;">Copyright © 2017 All Rights Reserved</p>
            </div>
        </popup>
    </div>
</template>
<style>
    .tab-swiper {
        background-color: #fff;
        height: 100%;
    }
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
    .luis-submit {
        margin-top: 5px;
    }
    .weui-cell.mine-result .vux-cell-bd.vux-cell-primary {
            -webkit-box-flex: 1!important;
            flex: 1!important;
        }


</style>

<script type="text/ecmascript-6">
    import Headers from './components/headers.vue'
    import MyIcon from './components/myIcon.vue'
    import SexIcon from './components/sexIcon.vue'
    import {Search, XHeader,Sticky,XButton,CellFormPreview,Cell } from 'vux'
    import {Grid, GridItem, Popup, PopupHeader,Tab, TabItem,Divider,Swipeout, SwipeoutItem, SwipeoutButton,XTextarea,Group } from 'vux'
    import mixin from './utils/mixin'
    import Items from "./components/items.vue"

    export default {
        props: [],
        mixins:[mixin],
        data() {
            return {
                index:0,
                name: "李嘉图",
                sex: true,
                school: "重庆大学",
                headimg:"http://osp68kn7c.bkt.clouddn.com//landf/head.jpg",
                popupmine: false,
                popuptiyan: false,
                popupguanyu: false,
                lost:[],
                found:[],
                luisinput:"",
                luisitemlist:[],
                luisfeaturelist:[],
                luisshowloading:false
            }
        },
        components: {
            Headers, MyIcon, Search, XHeader, SexIcon, Grid, GridItem, Popup, PopupHeader,Tab, TabItem,Cell
            ,Items,Sticky,Divider,Swipeout, SwipeoutItem, SwipeoutButton,XTextarea,Group,XButton,CellFormPreview
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            openmine() {
                (this.popupmine === true) ? (this.popupmine=false):(this.popupmine = true);
                this.$vux.toast.show({
                    text: '右滑删除~',
                    type:'text'
                })
            },
            opentiyan() {
                (this.popuptiyan === true) ? (this.popuptiyan=false):(this.popuptiyan = true)
            },
            openguanyu() {
                (this.popupguanyu === true) ? (this.popupguanyu=false):(this.popupguanyu = true)
            },
            getUserinfo(){
                this.$ajax.post(this.host+'/api/account/info').then(res=>{
                    let data = res.data;
                    if(data.status){
                        this.name = data.data.yb_username;
                        this.school = data.data.yb_schoolname;
                        this.sex = data.data.yb_sex === 'M';
                        this.headimg = data.data.yb_userhead;
                    }else {
                        this.checklogin(()=>{},()=>{this.$router.push({name:'landf'})});
                    }

                })
            },
            getminelunch(){
                this.$ajax.post(this.host+'/api/userlunch').then(res=>{
                    if(res.data.status){
                        this.lost = res.data.data.lost;
                        this.found = res.data.data.found;
                    }
                })
            },
            luissubmit(){
                if(this.luisinput.length < 5){
                    this.$vux.toast.text("输入信息太少啦~！","middle")
                }else {
                    this.luisshowloading = true;
                    let param = new FormData();
                    param.append('msg',this.luisinput);
                    this.$ajax.post(this.host+'/luis/experience',param).then(res=>{
                        this.luisshowloading = false;
                        if(res.data.status){
                            let data = res.data.data;
                            let tmp = [];
                            data.intents.forEach((val)=>{
                                tmp.push({
                                    label:val.intent,
                                    value:val.score
                                })
                            });
                            this.luisitemlist = tmp;
                            tmp = [];
                            data.entities.forEach((val)=>{
                                tmp.push({
                                    label:val.type,
                                    value:val.entity
                                })
                            });
                            this.luisfeaturelist = tmp;

                        }
                    })
                }
            },
            deletelost(id){
                let param = new FormData();
                param.append('id',id);
                param.append('param','lost');
                this.$ajax.post(this.host+'/api/delete',param).then(res=>{
                    if(res.data.status){
                        this.lost = this.lost.filter(val=>{
                            return val.id!==id;
                        })
                    }else {
                        this.$vux.toast.text(res.data.msg,"middle")
                    }
                })
            },
            deletefound(id){
                let param = new FormData();
                param.append('id',id);
                param.append('param','found');
                this.$ajax.post(this.host+'/api/delete',param).then(res=>{
                    if(res.data.status){
                        this.lost = this.lost.filter(val=>{
                            return val.id!==id;
                        })
                    }else {
                        this.$vux.toast.text(res.data.msg,"middle")
                    }
                })
            }

        },
        created(){
            this.getUserinfo();
            this.getminelunch();
        },


    }
</script>
