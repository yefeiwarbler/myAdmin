<template>
    <el-row>
        <PageTitle pageTitle="出错啦！ - MARKET AMIN" />
        <p class="err-msg">出错啦！</p>
        <el-col :span="24">
            <span class="err-redirect">找不到该路径，<el-link type="primary">点我返回首页</el-link></span>
        </el-col>
    </el-row>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import { MessageBox, Message } from "element-ui";

export default {
    name: "PageError",
    components: {
        PageTitle,
    },
    created(){
        MessageBox.confirm('找不到该路径，是否跳转至首页?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            this.$router.push("/");
        });
    },
}
</script>
<style lang="scss" scoped>
    .err-msg{
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: 700;
    }
    .err-redirect{
        display: inline-flex;
        font-size: 14px;
    }
</style>
