<template>
  <div class="d-flex flex-column flex-center bg-dark py-5">
    <h3 class="text-light">Keep up to date with our latest content</h3>
    <button class="btn btn-secondary" @click="open()">Subscribe</button>
  </div>
</template>

<script>
export default {
  name: "MailingList",
  methods: {
    open() {
      this.$store.dispatch("global/setModal", true);
    },
  },
};
</script>