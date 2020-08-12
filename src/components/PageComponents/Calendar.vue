<template>
  <div id="calendar" class="mb-3">
    <div class="container bg-dark pb-5">
      <div class="row py-5">
        <div class="col-12 d-flex justify-content-around">
          <a
            class="text-white"
            :class="{'router-link-active': f3 }"
            @click="changeView('f3')"
          >F3 Calendar</a>
          <a
            class="text-white"
            :class="{'router-link-active': f4 }"
            @click="changeView('f4')"
          >F4 Calendar</a>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div class="row px-4" v-if="view === 'f3'" key="f3">
          <div
            class="col-12 col-md-6 col-lg-4 flex-column flex-center my-2"
            :class="{ 'view' : !fixture.ongoing}"
            v-for="(fixture,index) in f3Check"
            :key="index"
          >
            <img
              :src="fixture.circuit.url"
              :alt="fixture.circuit.alt"
              class="img-fluid d-none d-md-block"
            />
            <div class="mask rgba-black-strong" v-if="!fixture.ongoing"></div>
            <div class="border border-light w-100 text-center text-white pt-3">
              <h5 class="track">{{fixture.circuit.title}}</h5>
              <p class="date">{{ fixture.date|formatDate }}</p>
            </div>
          </div>
        </div>
        <div class="row px-4" v-if="view === 'f4'" key="f4">
          <div
            class="col-12 col-md-6 col-lg-4 flex-column flex-center my-2"
            :class="{ 'view' : !fixture.ongoing}"
            v-for="(fixture,index) in f4Check"
            :key="index"
          >
            <img
              :src="fixture.circuit.url"
              :alt="fixture.circuit.alt"
              class="img-fluid d-none d-md-block"
            />
            <div class="mask rgba-black-strong" v-if="!fixture.ongoing"></div>
            <div class="border border-light w-100 text-center text-white pt-3">
              <h5 class="track">{{fixture.circuit.title}}</h5>
              <p class="date">{{ fixture.date|formatDate}}</p>
            </div>
          </div>
        </div>
      </transition>
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
      view: "f3",
      f3: true,
      f4: false,
      ongoing: false,
    };
  },
  computed: {
    f4Fixtures() {
      return this.$store.getters["formula4/getFixtures"];
    },
    f3Fixtures() {
      return this.$store.getters["formula3/getFixtures"];
    },
    f3Check() {
      let now = new Date(new Date().toDateString());
      let ongoing = [];
      this.f3Fixtures.forEach((fixture) => {
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
    f4Check() {
      let now = new Date(new Date().toDateString());
      let ongoing = [];
      this.f4Fixtures.forEach((fixture) => {
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
  methods: {
    changeView(view) {
      if (view == "f3") {
        this.f3 = true;
        this.f4 = false;
      } else if (view == "f4") {
        this.f3 = false;
        this.f4 = true;
      }
      this.view = "";
      this.view = view;
    },
    checkDate() {},
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
  text-decoration: underline;
  font-size: 1rem;
}
.date {
  font-size: 1rem;
  font-weight: 400;
}
// .border.border-light.w-100.text-center {
//   z-index: 2;
// }
@media screen and (max-width: 767px) {
  .border {
    border: none !important;
  }
}
</style>
