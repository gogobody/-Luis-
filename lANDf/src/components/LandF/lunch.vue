<template>
    <div class="lunch-box">
        <x-header class="search-header" :left-options="{preventGoBack:false}" >
            <my-icon slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
            </my-icon>
            <my-icon slot="right" name="#icon-close" @click.native="goback"></my-icon>
        </x-header>

        <checker v-model="valtype" default-item-class="default-item" selected-item-class="selected-item"
                 class="checker" @on-change="checkChange">
            <checker-item value="lost"><span class="lost">丢失</span></checker-item>
            <checker-item value="found"><span class="right">捡到</span></checker-item>
        </checker>
        <group title="信息填写">

            <popup-picker title="物品类型" :data="types" :columns="1" v-model="typevalue" :show-name="true" ref="typepicker"></popup-picker>

            <x-input title="物品名称" placeholder="丢了什么东西呢" should-toast-error="true" v-if="valtype==='lost'" is-type="china-name" v-model="itemname" required></x-input>
            <x-input title="物品名称" placeholder="捡到了什么东西呢" v-else="valtype" is-type="china-name" v-model="itemname" required></x-input>

            <x-input title="物品特征" placeholder="如：黑色" v-if="this.typevalue[0]!=='kazheng'" is-type="china-name" v-model="character" required></x-input>
            <x-input title="您的姓名" placeholder="留下您的姓名吧" is-type="china-name" v-model="username" required></x-input>
            <x-input title="联系手机" placeholder="留下您的手机号吧" keyboard="number" is-type="china-mobile" v-model="userphone" required></x-input>
            <!--<x-input title="拾取地点" v-if="valtype==='lost'" placeholder="在哪捡到哒" v-model="itemplace" required></x-input>-->
            <x-input title="拾取地点" v-if="valtype==='found'" placeholder="在哪捡到哒" v-model="itemplace" required></x-input>
            <!--<x-input title="物品名称" placeholder="例如：校园卡" is-type="china-name" v-model="itemname" required></x-input>-->

        </group>
        <group title="失卡信息" v-if="this.typevalue[0]=='kazheng'&&valtype==='lost'">
            <x-input title="校园卡号" placeholder="登记一下校园卡号喔" v-model="card_num" required></x-input>
        </group>
        <group title="拾卡信息" v-if="this.typevalue[0]=='kazheng'&&valtype==='found'">
            <x-input title="校园卡号" placeholder="登记一下校园卡号喔" v-model="card_num" required></x-input>
        </group>

        <group title="物品图片">
            <uploader
                    ref="uploader"
                    :max="1"
                    :images="uploadimages"
                    :handle-click="false"
                    :show-header="true"
                    :showTip="true"
                    :readonly="false"
                    :autoUpload="false"
                    size="small"
                    @upload-image="uploadimg"

            ></uploader>
        </group>

        <group title="具体描述">
            <x-textarea :max="200" name="itemdesc" placeholder="描述一下具体的信息吧,如：在松院篮球场丢了或捡到一个黑色的背包" v-model="desc"></x-textarea>
        </group>
        <x-button text="提交" type="primary" action-type="submit" :show-loading="showloading" class="submit-button" @click.native="addinfo"></x-button>

    </div>

</template>
<style scoped="true">
    .checker{
        width: 100%;
        margin: 10px 0;
        padding: 5px 0;
    }
    .vux-tap-active:active{
        background-color: transparent!important;
    }
    .default-item {
        width: 49%;
        text-align: center;

        color: #1aad19;
    }
    .default-item span{
        border: 1px solid #1aad19;
        padding: 6px 31px;
        border-radius: 25px;
    }

    .selected-item span{
        background: #1AAD19;

        color: #FFFFFF;
    }
    .search-header{

        background-color: white;
        box-shadow: 0 0 10px rgba(0,0,0,.15);
        border-top: 0;
    }
    .my-icon {
        color: black;
        font-size: 19px;
    }
    .lunch-box .lost {
        margin-right: -25%;
    }
    .lunch-box .right {
        margin-left: -25%;

    }
    .submit-button {
        width: 98%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
<script type="text/ecmascript-6">
    import MyIcon from './components/myIcon.vue'
    import Uploader from 'vux-uploader'
    import { Checker,CheckerItem,XHeader,Group,XInput,PopupPicker,XTextarea,XButton } from 'vux'
    import { uploadToqiniu } from './utils/qiniu'
    import mixin from './utils/mixin'
    import  './utils/global.js'
    export default {
        mixins:[mixin],
        props: [],
        components: {
            Checker,CheckerItem,XHeader,MyIcon,Group,XInput,PopupPicker,XTextarea,Uploader,XButton
        },
        data(){
            return {
                valtype:'lost',
                tmpval:'lost',
                showloading:false,

                itemname:"",
                username:'',
                character:"",
//                itemname:"",
                card_num:"",
                userphone:"",
                itemplace:"",
                desc:'',
                uploadimages:[],
                typevalue:['kazheng'],

                types:[
                    {
                        name:"卡证",
                        value:"kazheng",
                        parent:0
                    },
                    {
                        name:"包类",
                        value:"baolei",
                        parent:0
                    },
                    {
                        name:"钥匙",
                        value:"yaoshi",
                        parent:0
                    },
                    {
                        name:"宠物",
                        value:"chongwu",
                        parent:0
                    },
                    {
                        name:"数码产品",
                        value:"shumachanping",
                        parent:0
                    },
                    {
                        name:"首饰",
                        value:"shoushi",
                        parent:0
                    },
                    {
                        name:"衣服/鞋帽",
                        value:"yifuxiemao",
                        parent:0
                    },
                    {
                        name:"行李/包裹",
                        value:"xinglibaoguo",
                        parent:0
                    },
                    {
                        name:"书籍/文件",
                        value:"shujiwenjian",
                        parent:0
                    },
                    {
                        name:"其他",
                        value:"qita",
                        parent:0
                    }

                ]
            }
        },
        methods:{
            goback(){
//                this.$router.go(-1)
                this.$router.push({name:'landf'})

            },
            checkChange(){

                if(this.valtype === ''){
                    this.valtype = this.tmpval
                }
                this.tmpval = this.valtype;
            },
            uploadimg(data){
                let img = data.get('img');
                if(img){
                    uploadToqiniu(img,this.uploadimages,this.host);
                }else{
                    this.$vux.toast.text('img add error', 'middle')
                }
            },
            addinfo(){
                if(!this.itemname||!this.username||!this.userphone||!this.desc||!this.typevalue){
                    this.$vux.toast.text('请填写完整信息！', 'middle');
                    return;
                }
                this.showLoading = true;
                let param = new FormData();
                if(this.uploadimages.length>0){
                    param.append('img',this.uploadimages[0].url);

                }
                param.append('name',this.itemname);
                param.append('user_name',this.username);
                param.append('phone',this.userphone);
                param.append('card_num',this.card_num);
                param.append('describe',this.desc);
                param.append('character',this.character);
                param.append('type',this.$refs.typepicker.getNameValues());
                let refreshing = ()=>{
                    this.itemname = "";
                    this.username = '';
                    this.userphone = "";
                    this.itemplace = "";
                    this.desc = '';
                    this.uploadimages = [];
                    this.typevalue = [];

                };
                if(this.valtype==='lost'){
                    this.$ajax.post(this.host+'/api/add_lost',param).then(res=>{
                        let that = this;
                        if(res.data.status){
                            this.showLoading = false;
                            this.$vux.alert.show({
                                title: '提示',
                                content: '提交成功！',
                                onHide () {
                                    refreshing();
                                    that.$router.push({
                                        name:'landfitemdetail',
                                        params: {
                                            id: res.data.data,
                                            state: false
                                        }
                                    })
                                }
                            })
                        }else {
                            this.showLoading = false;
                            this.$vux.alert.show({
                                title: '提示',
                                content: res.data.msg,
                                onHide () {
                                    if(res.data.code === 10){

                                    }
                                }
                            })
                        }
                    })
                }else {
                    param.append('address',this.itemplace);
                    this.$ajax.post(this.host+'/api/add_found',param).then(res=>{
                        if(res.data.status){
                            this.showLoading = false;
                            let that = this;
                            this.$vux.alert.show({
                                title: '提示',
                                content: '提交成功！',
                                onHide () {
                                    refreshing();
                                    that.$router.push({
                                        name:'landfitemdetail',
                                        params: {
                                            id: res.data.data,
                                            state: true
                                        }
                                    })
                                }
                            })
                        }else {
                            this.showLoading = false;
                            this.$vux.alert.show({
                                title: '提示',
                                content: res.data.msg,
                                onHide () {
                                }
                            })
                        }
                    })
                }
            }
        },
        watch:{
            '$route' (to,from,val){
                this.$destroy();
            }
        },
        created(){
            if(!is_login) {
                this.checklogin(()=>{},()=>{
                    this.$router.push({
                        name:'landf'
                    })
                });
            }
        }
    }
</script>
