import axios from 'axios'
export function uploadToqiniu(file,images,tokenurl){
    let updatetoken = tokenurl+"/api/get_token";
    let bucketname = "http://osp68kn7c.bkt.clouddn.com/";

    let param = new FormData(); //创建form对象
    param.append('chunk','0');//断点传输
    param.append('chunks','1');
    param.append('file',file,file.name);
    console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    let config = {
        headers:{'Content-Type':'multipart/form-data'}
    };
    //先从自己的服务端拿到token
    axios.post(updatetoken)
        .then(response=>{
            console.log(response);
            if(!response.data.status){
                alert("获取token失败！");
                return;
            }
            let token = response.data.data[0];
            let key = response.data.data[1];
            param.append('token',token);
            param.append('key',key);

            //然后将参数上传七牛
            axios.post('http://upload-z2.qiniup.com',param,config)
                .then(response=>{
                    console.log(response);
                    images.push({url:bucketname+response.data.key});
                }).catch(e=>{
                    console.error(e)
            })
        })
}