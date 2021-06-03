<template>
    <div>
        <image-upload :image="page.head"></image-upload>
        <mdb-btn color="primary" @click="save">Update image</mdb-btn>
    </div>
</template>

<script>
export default {
    page() {
      return this.$store.getters["posts/getPage"];
    },
}
</script>