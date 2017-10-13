<template>
    <div>
        <x-header class="search-header" :left-options="{preventGoBack:false}" >
            <my-icon slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
            </my-icon>
            <my-icon slot="right" name="#icon-close" @click.native="goback"></my-icon>
        </x-header>
        <div class="detail-header" >
            <span v-if="item.state">拾物信息</span>
            <span v-else="item.state">失物信息</span>
        </div>
        <group title="基本信息">
            <cell title="物品类型" :value="item.type"></cell>
            <cell title="物品名字" :value="item.itemname"></cell>
            <cell title="发布时间" :value="item.createtime"></cell>
            <cell title="发布人" >
                <div slot="default" style="margin-left: 30px;">
                    <span class="detail-head-img">
                        <img :src="item.headimg"/>
                        <span class="detail-username">{{item.username}}</span>
                    </span>
                </div>
            </cell>
            <cell title="手机" :value="item.phone"></cell>
        </group>
        <group title="物品描述">

            <div slot="default">
                <cell title="校园卡号" v-if="item.card_num" :value="item.card_num"></cell>

                <div class="item-img">
                    <div v-for="imgs in item.img" class="imgs">
                        <img :src="imgs"/>
                    </div>
                </div>
                <div style="margin:10px 10px;">
                    <span style="line-height: 1.41176471;font-size: 17px;text-align: right;color: #999999;">{{item.desc}}</span>
                </div>

            </div>

        </group>
        <group title="拾取地点" v-if="item.state">
            <cell :value="item.place" class="desc" value-align="left"></cell>
        </group>
        <group title="失物地点" v-if="!item.state&&item.place">
            <cell :value="item.place" class="desc" value-align="left"></cell>
        </group>

    </div>
</template>
<style lang="less">
    .my-icon {
        color: black;
        font-size: 19px;
    }
    .detail-header {
        font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
        font-size: 4em;
        color: #04BE02;
        text-align: center;
    }
    .search-header {
        background-color: white !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        border-top: 0;
    }
    .weui-cell.desc {
        margin-bottom: 60px;
        .weui-cell__ft{
            text-align: left;
        }
    }
    .weui-cell.detail-username{
        .weui-cell__ft{
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .vux-cell-bd.vux-cell-primary{
            .vux-label{
                word-break:keep-all;
                white-space:nowrap;
            }
        }
    }
    .vux-cell-bd.vux-cell-primary{
        white-space: nowrap;
    }
    .detail-head-img {
        img{
            height: 23px;
            width: 23px;
            float: left;
            border-radius: 6px;
            margin-right: 7px;
        }

    }
    .item-img {
        img{
            width:100%;
        }
        .imgs{
            margin: 10px 10px;
        }
    }
</style>
<script type="text/ecmascript-6">
    import {XHeader,Cell,Group } from 'vux'
    import MyIcon from './components/myIcon.vue'
    export default {
        route:{
            canReuse:()=>{
                return false;
            }
        },
        data() {
            return {
                item:{}

            }
        },
        components: {
            XHeader,MyIcon,Cell,Group
        },
        methods: {
            goback(){
                this.$router.back(-1)
//                this.$router.push({name:'landf'})
            },
            fetchData(){
                let id = this.$route.params.id;
                let state = this.$route.params.state;
                if(state){
                    this.$ajax.post(this.host+'/api/found/'+id).then(res=>{
                        this.item = res.data.data;
                    })
                }else{
                    this.$ajax.post(this.host+'/api/lost/'+id).then(res=>{
                        this.item = res.data.data;
                    })
                }

            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                vm.fetchData()
            })
        },
//        watch: {
//            // 如果路由有变化，会再次执行该方法
//            '$route': 'fetchData'
//        }

    }
</script>
