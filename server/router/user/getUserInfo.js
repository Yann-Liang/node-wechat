const OAuth = require('wechat-oauth');

const config = require('../../wechat/config')

const client = new OAuth(config.appid, config.appsecret, null, null, true);

module.exports = async (ctx) => {
    const { body } = ctx.request
    console.log('/user/userInfo', ctx, '参数:', body)
    if (!body.code) {
        return ctx.body = {
            code: 1,
            data: null,
            msg: 'code不能为空'
        }
    }
    client.getAccessToken(body.code, (err, result) => {
        if (err) {
            console.warn('getAccessToken err', err);
        } else {
            const accessToken = result.data.access_token;
            const openid = result.data.openid;
            console.log(`accessToken=${accessToken},openid=${openid}`)

            //获取用户信息
            //如果我们生成引导用户点击的URL中scope参数值为snsapi_userinfo，接下来我们就可以使用openid换取用户详细信息（必须在getAccessToken方法执行完成之后）
            client.getUser(openid, (err, result) => {
                console.log('getUser=', err, result)
                if (err) {
                    console.warn('getUser err', err);
                } else {
                    const { nickname, sex, city, headimgurl } = result
                    ctx.status = 200;
                    ctx.type = 'application/json; charset=utf-8';
                    ctx.body = {
                        code: 0,
                        data: { nickname, sex, city, headimgurl }
                        //"{"openid":"o91tb01zt_wAF_4zGciaHJ9sLnUw","nickname":"踩蘑菇的怪蜀黍[奸笑]","sex":1,"language":"zh_CN","city":"Shenzhen","province":"Guangdong","country":"China","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eow7vbTHIzdDzWn9GbjO4h9dWPvOOge9NCGU61RUwzU4SYkQpeEnJbGNrJQRydKpIgTAeHbibCibCNQ/132","privilege":[]}"
                    }
                }
            });
        }

    });


}