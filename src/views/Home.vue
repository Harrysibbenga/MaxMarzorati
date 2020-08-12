<template>
  <div id="home">
    <Header></Header>
    <carousel class="position-relative"></carousel>
    <latest></latest>
    <calendar></calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/PageComponents/Carousel.vue";
import Latest from "@/components/PageComponents/Latest.vue";
import Calendar from "@/components/PageComponents/Calendar.vue";

export default {
  name: "Home",
  components: {
    Carousel,
    Latest,
    Calendar,
  },
};
</script>

