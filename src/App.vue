<template>
  <div id="app">
    <loader></loader>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header-footer/Footer";

export default {
  components: {
    Footer,
  },
  created() {
    this.$store.dispatch("posts/setPosts");
    this.$store.dispatch("profile/setProfile");
    this.$store.dispatch("media/setMedia");
    this.$store.dispatch("calendar/setFixtures");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("videoSection/setVideo");
    this.$store.dispatch("videos/setVideos");
    this.$store.dispatch("fanclub/setContent");
    this.$store.dispatch("partners/setContent");
    this.$store.dispatch("marketing/setContent");
  },
};
</script>
