const Koa = require('koa');
const wechat = require('co-wechat');
const OAuth = require('wechat-oauth');
const sha1 = require('sha1')

const config = require('./config')

const client = new OAuth(config.appid, config.appsecret, null, null, true);
const app = new Koa();

var url = client.getAuthorizeURL('http://wwww.baidu.com/', 'state', 'snsapi_base');
console.log(client, url)




// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(ctx,next)
    await next();
    const signature = ctx.query.signature || ''
    const nonce = ctx.query.nonce || ''
    const timestamp = ctx.query.timestamp || ''
    const echostr = ctx.query.echostr || ''

    const token = config.token || ''
    const str = [token,timestamp,nonce].sort().join('')
    const sha = sha1(str)

    ctx.body = (sha === signature) ? echostr + '' : 'failed'
});



app.use(wechat(config).middleware(async (message, ctx) => {
    // 微信输入信息就是这个 message
    if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        return 'hehe';
    } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        return {
            content: 'text object',
            type: 'text'
        };
    } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
        return {
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3"
            }
        };
    } else if (message.FromUserName === 'kf') {
        // 转发到客服接口
        return {
            type: "customerService",
            kfAccount: "test1@test"
        };
    } else {
        // 回复高富帅(图文回复)
        return [
            {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }
        ];
    }
}));



// 在端口3000监听:
app.listen(8000);
console.log('app started at port 8000...');