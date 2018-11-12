const OAuth = require('wechat-oauth');

const config=require('./config')
var client = new OAuth(config.appid, config.appsecret, null, null, true);


var url = client.getAuthorizeURL('http://localhost:8080/', 'state', 'snsapi_base');
console.log(client, url)