<template>
    <div>
        <image-upload :image.sync="head"></image-upload>
        <mdb-btn color="primary" @click="save">Update image</mdb-btn>
    </div>
</template>

<script>
import { newsPage } from "../../../firebase";
import {mdbBtn} from "mdbvue"
export default {
    data() {
        return {
            head: this.page.head
        }
    },
    components: {
        mdbBtn
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
                    head: this.head
                })
        }
    }
}
</script>