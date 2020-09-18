<template>
  <div>
    <Header></Header>
    <div id="driver">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-center p-0 my-auto">
            <img
              :src="driver.headline.url"
              :alt="driver.headline.alt"
              class="img-fluid"
            />
          </div>
          <div class="col-12 col-md-6 col-xl-8 py-5 bg-white">
            <div v-html="driver.career.content"></div>
          </div>
          <div class="col-12 col-md-6 col-xl-4 grey lighten-2 py-5 p-4">
            <div v-html="driver.bio.content"></div>
          </div>
          <!-- <div class="col-12 d-flex flex-column flex-center pt-5 pb-0">
            <div class="social-icons">
              <a
                class="p-1"
                :href="driver.social.platforms.facebook"
                target="_blank"
                v-if="driver.social.platforms.facebook != ''"
              >
                <mdb-icon size="lg" fab icon="facebook-square" />
              </a>
              <a
                class="p-1"
                :href="driver.social.platforms.insta"
                target="_blank"
                v-if="driver.social.platforms.insta != ''"
              >
                <mdb-icon size="lg" fab icon="instagram" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.twitter != ''"
                :href="driver.social.platforms.twitter"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="twitter-square" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.website != ''"
                :href="driver.social.platforms.website"
                target="_blank"
              >
                <mdb-icon size="lg" icon="globe" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.gplus != ''"
                :href="driver.social.platforms.gplus"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="google-plus-square" />
              </a>

              <a
                class="p-1"
                v-if="driver.social.platforms.twitch != ''"
                :href="driver.social.platforms.twitch"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="twitch" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.pinterest != ''"
                :href="driver.social.platforms.pinterest"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="pinterest" />
              </a>
              <a
                class="p-1"
                v-if="driver.social.platforms.youtube != ''"
                :href="driver.social.platforms.youtube"
                target="_blank"
              >
                <mdb-icon size="lg" fab icon="youtube" />
              </a>
            </div>
          </div>-->
        </div>
        <div class="row">
          <hooper :settings="hooperSettings" style="height: auto">
            <slide v-for="(img, index) in driver.galleryContent" :key="index">
              <img
                :src="img.url"
                :alt="img.alt"
                class="img-fluid"
                @click="showImg(index)"
              />
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
        </div>
        <VueEasyLightbox
          :visible="visible"
          :imgs="imgs"
          :index="index"
          @hide="handleHide"
        ></VueEasyLightbox>
      </div>
    </div>
  </div>
</template>

<script>
// import { mdbIcon } from "mdbvue";
import VueEasyLightbox from "vue-easy-lightbox";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  name: "Driver",
  components: {
    // mdbIcon,
    VueEasyLightbox,
    Hooper,
    Slide,
    HooperNavigation,
  },
  computed: {
    driver() {
      return this.$store.getters["profile/getProfile"];
    },
    imgs() {
      let urls = [];
      this.driver.galleryContent.forEach((img) => {
        urls.push(img.url);
      });
      return urls;
    },
  },
  data() {
    return {
      visible: false,
      index: 0,
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true,
        infiniteScroll: true,
        autoPlay: true,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 4,
          },
        },
      },
    };
  },
  methods: {
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
p {
  line-height: 1.5rem !important;
}
</style>
