//home组件
const My = resolve => require(['@/views/my/'], resolve)

// export default {
//     path: '/',
//     component: Home,
//     name: 'home',
//     icon: '', //图标样式class
//     children: [{
//         path: '/index',
//         component: Index,
//         name: '主页',
//         icon: ''
//     }]
// }

export default {
    path: '/my',
    component: My,
    name: '我的',
    icon: '',
}