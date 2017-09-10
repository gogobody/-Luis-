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
            <x-input title="物品名称" placeholder="必填" v-model="itemname"></x-input>
        </group>

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
</style>
<script type="text/ecmascript-6">
    import MyIcon from './components/myIcon.vue'
    import { Checker,CheckerItem,XHeader,Group,XInput } from 'vux'
    export default {
        props: [],
        components: {
            Checker,CheckerItem,XHeader,MyIcon,Group,XInput
        },
        data(){
            return {
                valtype:'lost',
                tmpval:'lost',
                itemname:''
            }
        },
        methods:{
            goback(){
                this.$router.goBack()
            },
            checkChange(){

                if(this.valtype === ''){
                    this.valtype = this.tmpval
                }
                this.tmpval = this.valtype;
            }
        }


    }
</script>
