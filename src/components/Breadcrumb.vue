<template>
    <div class="breadcrumb-container">
        <el-breadcrumb separator="/">
            <!-- 最后一个面包屑不生成链接 -->
            <!-- 无链接属性的面包屑不生成链接 -->
            <el-breadcrumb-item
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="index"
                :to=" index !== breadcrumbs.length - 1 && breadcrumb.path ? { path: breadcrumb.path } : ''"
            >{{breadcrumb.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import {
    Breadcrumb,
    BreadcrumbItem,
} from 'element-ui';

export default {
    name: "Breadcrumb",
    props: {
        breadcrumbs: Array,
    },
    components: {
        ElBreadcrumb: Breadcrumb,
        ElBreadcrumbItem: BreadcrumbItem,
    },
}
</script>

<style lang="scss">
    .breadcrumb-container{
        margin-bottom: 20px;
    }
</style>