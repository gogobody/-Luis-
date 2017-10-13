import './global'
let mixin = {
    methods:{
        checklogin(success,cancel){
            this.$ajax.post(this.host+'/api/account/checklogin').then(res=>{
                if(!res.data.status && res.data.code === 10){
                    const _this = this;
                    this.$vux.confirm.show({
                        title:"未登录",
                        content:"是否立即登录？",
                        onCancel () {
                            is_login = false;
                            // console.log("aaa")
                            cancel()
                        },
                        onConfirm () {
                            window.location.href = res.data.data;
                        }
                    })
                }else {
                    is_login = true;
                    success();
                }
            }).catch(e=>{
                let that = this;
                this.$vux.alert.show({
                    title: '错误',
                    content: '网络错误',
                    onHide () {
                        that.$router.push({
                            name: 'landf'
                        })
                    }
                })
            });

        },
        itemdetail(id, state) {
            this.$router.push({
                name: 'landfitemdetail',
                params: {
                    id: id,
                    state: state
                }
            })
        }
    }
}
export default mixin;