<template>
  <div>
    <transition name="fade">
      <div class="loading" v-if="showing">
        <div class="position-relative d-flex flex-center">
          <socket></socket>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Socket } from "vue-loading-spinner";
export default {
  props: ["show"],
  data() {
    return {
      showing: false,
    };
  },
  computed: {
    getLoading() {
      return this.$store.getters["global/getLoading"];
    },
  },
  methods: {
    showProgress(show) {
      this.showing = show;
    },
    start() {
      this.showProgress(true);
    },
    stop() {
      setTimeout(() => {
        this.showProgress(false);
      }, 250);
    },
  },
  watch: {
    getLoading: function (val) {
      if (val) {
        console.log("start fired");
        this.start();
      } else {
        console.log("stop fired");
        this.stop();
      }
    },
  },
  components: {
    Socket,
  },
};
</script>

