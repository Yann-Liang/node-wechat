
import { userAction } from './action'
import { userGetter } from './getter'
import { userMutation } from './mutation'

export const user = {
    state: {
        userInfo: {
            "openid": "o91tb01zt_wAF_4zGciaHJ9sLnUw",
            "nickname": "踩蘑菇的怪蜀黍[奸笑]", "sex": 1, "language": "zh_CN", "city": "Shenzhen", "province": "Guangdong", "country": "China", "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eow7vbTHIzdDzWn9GbjO4h9dWPvOOge9NCGU61RUwzU4SYkQpeEnJbGNrJQRydKpIgTAeHbibCibCNQ/132",
            "privilege": []
        }
    },
    actions: userAction,
    getters: userGetter,
    mutations: userMutation
};

export default user;
