const Koa = require('koa');
const wechat = require('co-wechat');
const OAuth = require('wechat-oauth');
const sha1 = require('sha1')
const bodyParser = require('koa-bodyparser')
const router = require('./router/index');

const config = require('./wechat/config')

const client = new OAuth(config.appid, config.appsecret, null, null, true);
const app = new Koa();

//生成引导用户点击的URL。
const url = client.getAuthorizeURL('http://127.0.0.1:8080', 'state', 'snsapi_userinfo');
//如果是PC上的网页，请使用以下方式生成
// const url = client.getAuthorizeURLForWebsite('redirectUrl');

//获取Openid和AccessToken
//用户点击上步生成的URL后会被重定向到上步设置的 redirectUrl，并且会带有code参数，我们可以使用这个code换取access_token和用户的openid
//code 0612YAAP1yXwya1UDJAP13hIAP12YAA1
// client.getAccessToken('0612YAAP1yXwya1UDJAP13hIAP12YAA1', function (err, result) {
//     if (err) {
//         console.warn('getAccessToken err');
//     } else {
//         const accessToken = result.data.access_token;
//         const openid = result.data.openid;
//         console.log(`accessToken=${accessToken},openid=${openid}`)

//         //获取用户信息
//         //如果我们生成引导用户点击的URL中scope参数值为snsapi_userinfo，接下来我们就可以使用openid换取用户详细信息（必须在getAccessToken方法执行完成之后）
//         client.getUser(openid, function (err, result) {
//             console.log('getUser=', result)
//             //"{"openid":"o91tb01zt_wAF_4zGciaHJ9sLnUw","nickname":"踩蘑菇的怪蜀黍[奸笑]","sex":1,"language":"zh_CN","city":"Shenzhen","province":"Guangdong","country":"China","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eow7vbTHIzdDzWn9GbjO4h9dWPvOOge9NCGU61RUwzU4SYkQpeEnJbGNrJQRydKpIgTAeHbibCibCNQ/132","privilege":[]}"
//         });
//     }
// });


console.log(client, url)

// 坑啊 坑死人了
// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     console.log(ctx, next)
//     await next();
//     const signature = ctx.query.signature || ''
//     const nonce = ctx.query.nonce || ''
//     const timestamp = ctx.query.timestamp || ''
//     const echostr = ctx.query.echostr || ''

//     const token = config.token || ''
//     const str = [token, timestamp, nonce].sort().join('')
//     const sha = sha1(str)

//     ctx.body = (sha === signature) ? echostr + '' : 'failed'
// });
// 坑啊 坑死人了
// app.use(wechat(config).middleware(async (message, ctx) => {
//     console.log('message:', message, '\nctx:', ctx)
//     // 微信输入信息就是这个 message
//     if (message.Content === 'diaosi') {
//         // 回复屌丝(普通回复)
//         return 'hehe';
//     } else if (message.Content === 'text') {
//         //你也可以这样回复text类型的信息
//         return {
//             content: 'text object',
//             type: 'text'
//         };
//     } else if (message.Content === 'hehe') {
//         // 回复一段音乐
//         return {
//             type: "music",
//             content: {
//                 title: "来段音乐吧",
//                 description: "一无所有",
//                 musicUrl: "http://mp3.com/xx.mp3",
//                 hqMusicUrl: "http://mp3.com/xx.mp3"
//             }
//         };
//     } else if (message.Content === 'kf') {
//         // 转发到客服接口
//         return {
//             type: "customerService",
//             kfAccount: "test1@test"
//         };
//     } else {
//         // 回复高富帅(图文回复)
//         return [
//             {
//                 title: '你来我家接我吧',
//                 description: '这是女神与高富帅之间的对话',
//                 picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
//                 url: 'http://nodeapi.cloudfoundry.com/'
//             }
//         ];
//     }
// }));

// 进行requestbody解析
app.use(bodyParser())
app.use(router.routes())



// 在端口3000监听:
app.listen(8000);
console.log('app started at port 8000...');