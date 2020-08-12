<template>
  <div id="app">
    <loader></loader>
    <router-view />
    <mailing-model></mailing-model>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Header-footer/Footer";
import MailingModel from "@/components/Modals/MailingListModal";

export default {
  components: {
    Footer,
    MailingModel,
  },
  created() {
    this.$store.dispatch("posts/setPosts");
    this.$store.dispatch("drivers/setDrivers");
    this.$store.dispatch("formula3/setFixtures");
    this.$store.dispatch("formula4/setFixtures");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("carousel/setImages");
    this.$store.dispatch("about/setContent");
    this.$store.dispatch("sim/setContent");
    this.$store.dispatch("f3page/setContent");
    this.$store.dispatch("f4page/setContent");
  },
};
</script>
