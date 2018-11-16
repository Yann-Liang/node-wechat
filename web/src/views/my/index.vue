<template>
    <div class="">
        <mt-cell title="用户">{{userInfo.nickname}}</mt-cell>
        <mt-cell title="头像">
            <img :src="userInfo.headimgurl" alt="">
        </mt-cell>

        <!-- <mt-index-section index="1">
            <mt-cell title="钱包"> </mt-cell>
        </mt-index-section>
        <mt-index-section index="2">
            <mt-cell title="收藏" class="mint-cell-wrapper1"> </mt-cell>
            <mt-cell title="卡包"> </mt-cell>
        </mt-index-section>
        <mt-index-section index="3">
            <mt-cell title="设置"></mt-cell>
        </mt-index-section> -->
    </div>
</template>

<script>
//import  from ''
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
    //组件名
    name: "my",
    //实例的数据对象
    data() {
        return {
            showIndicator:false
        };
    },
    //数组或对象，用于接收来自父组件的数据
    props: {},
    //计算
    computed: {
        ...mapGetters(["userInfo"]),
    },
    //方法
    methods: {
        go() {
            return this.$router.push({
                path: "/index",
            });
        },
    },
    //生命周期函数
    created() {},
    beforeMount() {},
    mounted() {},
    //监视
    watch: {},
    //组件
    components: {},
    //过滤器
    filters: {},
    //自定义指令
    directive: {},
};
</script>

<!--
	作者：liangyanxiangde@163.com
	时间：2017-03-27
	描述：统一使用less,局部样式
-->
<style lang="less" scoped>
.mint-cell-wrapper1 {
    border-bottom: 1px solid #ccc;
}
</style>