<template>
  
</template>

<script>
export default {
    name: "PageTitle",
    props: {
        pageTitle: String,
    },
    created(){
        document.title = this.pageTitle;
    }
}
</script>

<style>

</style>