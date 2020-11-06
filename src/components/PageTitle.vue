<template>
  
</template>

<script>
export default {
    name: "PageTitle",
    props: {
        pageTitle: "",
    },
    created(){
        document.title = this.pageTitle;
    }
}
</script>

<style>

</style>