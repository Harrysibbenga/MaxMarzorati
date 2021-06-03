<template>
    <div>
        <image-upload :image="page.head"></image-upload>
        <mdb-btn color="primary" @click="save">Update image</mdb-btn>
    </div>
</template>

<script>
import { newsPage } from "../../../firebase";
export default {
    data() {
        return {
            head: ""
        }
    },
    computed: {
        page() {
          return this.$store.getters["posts/getPage"];
        },
    },
    methods: {
        save() {
            newsPage
                .doc(this.page.id)
                .update({
                    head: this..head
                })
        }
    }
}
</script>