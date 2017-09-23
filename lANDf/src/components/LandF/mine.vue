<template>
  <div>
    <x-header class="search-header" :left-options="{preventGoBack:false}" >
      <my-icon slot="overwrite-left" name="#icon-fanhui" @click.native="goback">
      </my-icon>
      <my-icon slot="right" name="#icon-close" @click.native="goback"></my-icon>
    </x-header>
    <headers :imgUrl="require('../../assets/landf/head.jpg')" :search="false"></headers>
  </div>
</template>
<style scoped>
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
  import Headers from './components/headers.vue'
  import MyIcon from './components/myIcon.vue'
  import { Search,XHeader  } from 'vux'
  export default {
    props: [],
    data() {
      return {}
    },
    components: {
      Headers,MyIcon,Search,XHeader
    },
    methods:{
      goback(){
        this.$router.goBack()
      }
    }

  }
</script>
