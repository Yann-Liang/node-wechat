const router = require('koa-router')();
const sha1 = require('sha1')

const config = require('../wechat/config')
const getUserInfo = require('./user/getUserInfo')

router.get('/', async (ctx, next) => {
    const signature = ctx.query.signature || ''
    const nonce = ctx.query.nonce || ''
    const timestamp = ctx.query.timestamp || ''
    const echostr = ctx.query.echostr || ''

    const token = config.token || ''
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    console.log(',,,,', ctx)
    ctx.body = (sha === signature) ? echostr + '' : 'failed'

})

// 使用路由处理get请求
router.get('/u', async (ctx, next) => {
    ctx.body = `<h1>index</h1>
<form action="/sign" method="post">
<p>Name: <input name="name"></p>
<p>Password: <input name="password" type="password"></p>
<p><input type="submit" value="Submit"></p>
</form>
`
})

router.post('/user/getUserInfo', getUserInfo)


module.exports = router