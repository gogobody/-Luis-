<template>
    <div class="headers">

        <div class="header-img" :style='{height:height,backgroundImage:"url("+imgUrl+")"}'>
            <div class="panel">
                <slot name="panel"></slot>
            </div>
            <div v-if="search" class="search-box" @click="$emit('openSearch')">
                <icon type="search"></icon>
                <span>搜搜看  &nbsp;:&nbsp;    输入物品名称</span>
            </div>
            <slot></slot>
        </div>

    </div>
</template>
<style scoped>

    .header-img {
        top: 0;
        margin: 0;
        display: block;
        background-size: 100% 100%;
        height: 180px;
    }

    .panel {
        display: block;
        height: 144px;
        text-align: center;
    }

    .search-box {
        background-color: #fff;
        opacity: .9;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 20px;
        padding-left: 15px;
        line-height: 30px;
    }
</style>
<script type="text/ecmascript-6">
    import {Icon,Sticky } from 'vux'

    export default {
        name: 'headers',
        props: ['imgUrl', 'height', 'search'],
        components: {
            Icon,Sticky
        },
        data(){
          return {

          }
        },
//        computed:{
//            container :()=> (console.log(this.$parent))
//        },
//        mounted:
//            function(){
//                console.log(this.$parent.$el.id);
//                this.container = this.$parent.$el.id;
//            }
    }
</script>
