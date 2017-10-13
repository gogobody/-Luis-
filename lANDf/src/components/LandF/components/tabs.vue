<template>
    <div class="landf-tabs">
        <flexbox :gutter=0>
            <flexbox-item :span="1/4">
                <div class="landf-tabs-search" >
                <svg class="icon" aria-hidden="true" @click="popsearch">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/2" style="text-align: center">
                <span class="landf-tabs-lunch" @click="golunch">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fabu"></use>
                    </svg>
                    <span class="text">发布</span>
                </span>
            </flexbox-item>
            <flexbox-item :span="1/4">
                <div class="landf-tabs-me" @click="gomine">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wo"></use>
                    </svg>
                </div>
            </flexbox-item>

        </flexbox>
    </div>
</template>
<style lang="less" scoped="true">
    .tabs-main{
        background-color: white;
    }
    .icon{
        font-size: 20px;
    }
    .landf-tabs{
        position: fixed;
        width: 100%;
        bottom: 20px;
        /*padding: 8px;*/
    }
    .landf-tabs-search{
        text-align: center;
        svg{
            .tabs-main;
            padding: 6px;
            border-radius: 25px;
            border: 1px solid gainsboro;
        }
    }
    .landf-tabs-lunch{
        text-align: center;
        color: white;
        border-radius: 25px;
        background-color: dimgrey;
        padding: 6px 23px;
        padding-right: 34px;;
    }
    .landf-tabs-me{
        text-align: center;
        svg{
            background-color: white;
            padding: 6px;
            border-radius: 25px;
            border: 1px solid gainsboro;
            float: right;
            margin-right: 5px;
        }
    }
</style>
<script type="text/ecmascript-6">
    import { Flexbox ,FlexboxItem } from 'vux'

    export default {
        components: {
            FlexboxItem,
            Flexbox
        },
        props: [],
        methods:{
            popsearch : function () {
                this.$emit('openSearch')
            },
            golunch:function(){
                this.$emit('lunch')
            },
            gomine:function () {
                this.$emit('mine')
            }
        }
    }
</script>
