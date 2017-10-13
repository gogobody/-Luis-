<template>
    <div class="landf">
            <scroller
            :on-infinite="infinite" ref="scroller">
                <div class="landf-container">
                    <headers :imgUrl="img" height='180px' :search="true" @openSearch="gosearch"></headers>
                    <group gutter="5px">

                        <cell>
                            <div slot="title" class="gonggao">
                                <my-icon name="#icon-gonggao"></my-icon>
                                <span>公告：</span>
                            </div>
                            <marquee :interval="5000">
                                <marquee-item>欢迎加入虎溪失物招领群:118718555</marquee-item>
                                <marquee-item>欢迎加入爱心社失物招领群:392452095</marquee-item>
                                <marquee-item>欢迎使用智能失物招领平台~</marquee-item>

                            </marquee>
                        </cell>
                    </group>
                    <div v-for="item in items">
                        <items :user="item" @click.native="itemdetail(item.id,item.state)"></items>
                    </div>
                </div>

            </scroller>

        <tabs @openSearch="gosearch" @lunch="golunch" @mine="gomine"></tabs>

        <!--<popup v-model="search" height="100%">-->
            <!--<popup-header left-text="返回" right-text="关闭"-->
            <!--@on-click-left="search=false" @on-click-right="search=false">-->
            <!--</popup-header>-->

        <!--</popup>-->

    </div>
</template>
<style lang="less">
    @import '~vux/src/styles/reset.less';

    .landf {
        height: 100%;
        width: 100%;
        background-color: #ebe9ed;

        position: absolute;
        top: 0;
        left: 0;
    }
    .weui-search-bar:before , .weui-search-bar:after{
        border-top: 0 !important;
    }
    .weui-search-bar{
        /*background: white !important;*/
    }
    .weui-cells.vux-no-group-title {
        .vux-cell-bd.vux-cell-primary{
            flex: 0.5;
        }
        .weui-cell__ft {
            text-align: left;
        }
    }

    /*.vux-marquee.tongzhi {*/
        /*margin-top: 3px;*/
        /*background-color: white;*/
        /*!*height: 50px;*!*/
        /*.vux-marquee-box{*/
            /*padding-left: 8px;*/
        /*}*/
    /*}*/
</style>
<script type="text/ecmascript-6">
    import Headers from "./components/headers.vue"
    import Items from "./components/items.vue"
    import Tabs from "./components/tabs.vue"
    import MyIcon from "./components/myIcon.vue"
    import {PopupHeader ,Popup, Marquee, Group,Cell,MarqueeItem } from 'vux'
    import VueScroller from 'vue-scroller'
    import mixin from './utils/mixin'
    import './utils/global.js'

    export default {
        mixins:[mixin],
        route:{
            canReuse:()=>{
                return true;
            },
            canActivate:()=>{
                return true;
            }
        },
        data() {
            return {
                search:false,//popup 开关
                searchform:"",//搜索表单
                img: "http://osp68kn7c.bkt.clouddn.com//landf/landf-header.jpeg",
                items: [
                ],
            }
        },
        components: {

            Headers, Items,Tabs,PopupHeader,Popup, Marquee,  Group,Cell,MarqueeItem,MyIcon
        },
        methods: {
            infinite(done) {
                setTimeout(
                        () => {
                            let param = new FormData();
                            param.append('cnt',this.count);
                            this.$ajax.post(this.host+'/api/latestinfo',param).then((res)=>{
                                if(res.data.status){
                                    let data_ = res.data.data;
                                    if(data_.length === 0){
                                        data(true)
                                    }
                                    this.count+=5;
                                    this.items.push(...res.data.data);
                                    done();
                                }else {
                                    this.$vux.toast.text(res.data.msg, 'middle');
                                    done(true);
                                }
                            }).catch( (e) => {
                                console.error(e);
                                done(true);
                                this.infinite = undefined;

                            });

                        }, 1000);

//                done(true)
            },//无限加载
            gosearch(){
                this.position = this.$refs.scroller.getPosition();
                let itemname = "None";
                this.$router.push({
                    name:'landfSearch',
                    params:{
                        itemname:itemname,
                        lost:'lost'
                    }
                })
            },
            golunch(){
                if(is_login) {
                    this.position = this.$refs.scroller.getPosition();
                    this.$router.push({
                        name: 'landfLunch'
                    })
                }else {
                    this.checklogin(()=>{
                        if(is_login) {
                        this.position = this.$refs.scroller.getPosition();
                        this.$router.push({
                            name: 'landfLunch'
                        })
                    }},()=>{});

                }
            },
            gomine(){
                if(is_login){
                    this.position = this.$refs.scroller.getPosition();
                    this.$router.push({name:'landfMine'})
                }else {
                    this.checklogin(()=>{
                        if(is_login){
                            this.position = this.$refs.scroller.getPosition();
                            this.$router.push({name:'landfMine'})
                        }
                    },()=>{});
                }
            },
            itemdetail(id,state){
                this.position = this.$refs.scroller.getPosition();
                this.$router.push({
                    name:'landfitemdetail',
                    params:{
                        id:id,
                        state:state
                    }
                })
            }

        },
        created() {
            this.count = 0
        },
        activated(){
            this.$nextTick(() => {
                this.$refs.scroller.resize();
                this.$refs.scroller.scrollTo(this.position.left===undefined?0:this.position.left,this.position.top,false);
            })

        }
    }
</script>
