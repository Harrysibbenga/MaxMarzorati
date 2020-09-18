<template>
  <div id="home">
    <Header></Header>
    <Video></Video>
    <hr class="py-2 bg-dark m-0" />
    <promo></promo>
    <hr class="py-2 bg-dark m-0" />
    <calendar></calendar>
    <hr class="py-2 bg-dark m-0" />
    <Social></Social>
    <Social2></Social2>
    <hr class="py-2 bg-dark m-0" />
    <stay-connected></stay-connected>
    <hr class="py-2 bg-dark m-0" />
    <contact id="contact"></contact>
  </div>
</template>

<script>
// @ is an alias to /src
import Video from "@/components/PageComponents/Video.vue";
import Promo from "@/components/PageComponents/Promo.vue";
import Calendar from "@/components/PageComponents/Calendar.vue";
import Social from "@/components/PageComponents/Social.vue";
import Social2 from "@/components/PageComponents/Social2.vue";

export default {
  name: "Home",
  components: {
    Video,
    Promo,
    Calendar,
    Social,
    Social2,
  },
  mounted() {
    var section = this.$router.currentRoute.hash.replace("#", "");
    if (section)
      this.$nextTick(() =>
        window.document.getElementById(section).scrollIntoView()
      );
  },
};
</script>
