<template>
    <div class="items">
        <div class="header">
            <flexbox :gutter="0">
                <flexbox-item :span="0.83">
                    <flexbox :gutter="0">
                        <flexbox-item :span="1/6">
                            <div class="head-img">
                                <img :src="user.headimg"/>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span="0.845">
                            <div class="name-panel">
                                <flexbox :gutter="4" direction="column ">
                                    <flexbox-item style="width: 100%">
                                        <div class="username">{{user.username}}</div>
                                    </flexbox-item>
                                    <flexbox-item style="width: 100%;">
                                        <span class="type-text">{{user.type}}</span>
                                        <icon type="waiting-circle" class="time" style="font-size: 17px"></icon>
                                        <span class="time">{{user.createtime}}</span>
                                    </flexbox-item>
                                </flexbox>
                            </div>
                        </flexbox-item>
                    </flexbox>
                </flexbox-item>
                <flexbox-item :span="0.18">
                    <div v-if="user.state" class="header-right-find">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-find"></use>
                        </svg>
                        <span class="head-right-text-find">招领</span>
                    </div>
                    <div v-else="user.state" class="header-right-find" style="background-color:aliceblue;">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-lost"></use>
                        </svg>
                        <span class="head-right-text-find">寻物</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="item-body">
            <div v-if="user.img" class="item-img">
                <img :src="user.img"/>
            </div>
            <div class="item-desc">
                <div class="item-desc-text">{{user.name}}&nbsp;{{user.desc}}</div>
            </div>
        </div>
        <div class="footer" v-if="user.place">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-place"></use>
            </svg>
            <span class="time">{{user.place}}</span>
        </div>
    </div>
</template>
<style scoped="true">
    .items {
        background-color: white;
        margin: 5px 0;
        padding: 8px 10px;
    }

    .head-img {
        display: inline-block;

    }

    .time {
        color: #B2B2B2;
        font-size: 13px;
    }
    .type-text{
        font-size: 13px;
        background-color: darkseagreen;
        border-radius: 5px;
        padding: 1px 3px;
        color: white;
        font-weight: bold;
        letter-spacing: 2px;
    }
    .username {
        /*font-weight: 400;*/
        padding-left: 5px;
        margin-top: -5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
    }

    .head-img img {
        height: 38px;
        width: 38px;
        /*-moz-border-radius: 50%;*/
        /*-webkit-border-radius: 50%;*/
        border-radius: 7px;
        box-shadow: 0 0 0 2px grey;

    }
    .header-right-find{
        margin-bottom: 17px;
        float: right;
        background-color: cornsilk;
        padding: 1px;
        padding-right: 6px;
        border-radius: 5px;
    }
    .icon{
        font-size: 18px;
        vertical-align: -0.2em;
    }
    .head-right-text-find{
        font-size: 12px;
    }
    .item-body{
        margin: 6px 0;
        border-bottom: 1px solid #E5E5E5;
        padding-bottom: 10px;
    }
    .item-img{
        width:100%;
        height: 190px;
    }
    .item-img img {
        width: 100%;
        height:100%;
    }
    .item-desc {
        max-height: 38px;
        margin-top: 9px;
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .footer {
        color: #B2B2B2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>
<script type="text/ecmascript-6">
    import {Flexbox,FlexboxItem } from 'vux'
    import {Icon} from 'vux'

    export default {
        name: "items",
        props: ['user'],
        components: {
            FlexboxItem,
            Flexbox,
            Icon
        },
        data() {
            return {

            }
        }

    }
</script>
