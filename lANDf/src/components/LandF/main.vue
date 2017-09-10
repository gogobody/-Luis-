<template>
    <div class="landf">
        <scroller
        :on-infinite="infinite">
            <div class="landf-container">
                <headers :imgUrl="img" height='180px' :search="true" @openSearch="gosearch"></headers>
                <div v-for="item in items">
                    <items :user="item"></items>
                </div>
            </div>
        </scroller>
        <tabs @openSearch="gosearch" @lunch="golunch"></tabs>

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
</style>
<script type="text/ecmascript-6">
    import Headers from "./components/headers.vue"
    import Items from "./components/items.vue"
    import img from "../../assets/landf/landf-header.jpeg"
    import Tabs from "./components/tabs.vue"
    import {PopupHeader ,Popup } from 'vux'

    export default {
        data() {
            return {
                search:false,//popup 开关
                searchform:"",//搜索表单
                img: img,
                items: [
                    {
                        username: "一个名字很长的测试永华啊啊啊啊啊啊啊啊啊啊啊啊啊",
                        headimg: require("../../assets/landf/head.jpg"),
                        createtime: "2017-09-06 23:54",
                        state: false,//true 为招领
                        type:"卡证",
                        img: require("../../assets/landf/card.jpg"),
                        desc: "测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字",
                        place: "测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文"

                    },
                    {
                        username: "一个名字很长的测试永华啊啊啊啊啊啊啊啊啊啊啊啊啊",
                        headimg: require("../../assets/landf/head.jpg"),
                        createtime: "2017-09-06 23:54",
                        state: true,//true 为招领
                        type:"卡证",
//                        img:require("../../assets/card.jpg"),
                        desc: "测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字",
                        place: "测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文"

                    }
                ]
            }
        },
        components: {

            Headers, Items,Tabs,PopupHeader,Popup},
        methods: {
            infinite(done) {
                setTimeout(
                        () => {
                            this.$ajax.get(this.host+'/static/data.json').then(function (res) {
//                                this.items.push(...res.items)
                                console.log((res.data))
                                return
                            }).catch(function (e) {
                                console.error(e)
                                done(true);
                                this.infinite = undefined;
                                return;
                            });

                        }, 1000);

//                done(true)
            },//无限加载
            gosearch(){
                this.$router.push({name:'landfSearch'})
            },
            golunch(){
                this.$router.push({name:'landfLunch'})
            }

        },
        created() {
//            this.$ajax.get(this.host+'/static/data.json').then((res)=>{
//                alert(res)
//            })
        }
    }
</script>
