<template>
    <div>
        <image-upload :image.sync="page.head"></image-upload>
        <mdb-btn color="primary" @click="save">Update image</mdb-btn>
    </div>
</template>

<script>
import { profilePage } from "../../../firebase";
import { mdbBtn } from "mdbvue"

export default {
    data() {
        return {
            head: ''
        }
    },
    components: {
        mdbBtn
    },
    computed: {
        page() {
          return this.$store.getters["profile/getPage"];
        },
    },
    methods: {
        save() {
            profilePage
                .doc(this.page.id)
                .update({
                    head: this.page.head
                })
        }
    }
}
</script>