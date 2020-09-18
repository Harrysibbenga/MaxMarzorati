<template>
  <div id="calendar" class="bg-white">
    <div class="container py-5 text-center">
      <h3 class="text-dark">Calendar</h3>
      <div class="row bg-white">
        <div
          class="col-12 col-md-4 col-lg-3 flex-column flex-center pb-5"
          v-for="(fixture, index) in fixturesCheck"
          :key="index"
        >
          <img
            :src="fixture.circuit.url"
            :alt="fixture.circuit.alt"
            class="img-fluid d-none d-md-block"
          />
          <div class="w-100 text-center text-dark">
            <h5 class="track font-uppercase">{{ fixture.circuit.title }}</h5>
            <p class="date">
              {{ fixture.date | formatDate }} - {{ fixture.date2 | formatDate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Calendar",
  props: {
    msg: String,
  },
  data() {
    return {
      ongoing: false,
    };
  },
  computed: {
    fixtures() {
      return this.$store.getters["calendar/getFixtures"];
    },
    fixturesCheck() {
      let now = new Date(new Date().toDateString());
      let ongoing = [];
      this.fixtures.forEach((fixture) => {
        if (moment(fixture.date).toDate() >= now) {
          fixture.ongoing = true;
          ongoing.push(fixture);
        } else {
          fixture.ongoing = false;
          ongoing.push(fixture);
        }
      });
      return ongoing;
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
};
</script>

<style scoped lang="scss">
a {
  font-size: 1.2rem;
  padding: 1rem 0;
  font-weight: 700;
}

a:hover,
.router-link-active {
  color: red !important;
}

.track {
  font-size: 1.2rem;
}
.date {
  font-size: 1rem;
  font-weight: 400;
}
@media screen and (max-width: 767px) {
  .border {
    border: none !important;
  }
}
</style>
