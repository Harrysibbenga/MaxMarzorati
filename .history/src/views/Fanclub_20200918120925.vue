<template>
  <div>
    <Header></Header>

    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12">
          <img :src="about.url" class="img-fluid" :alt="about.alt" />
        </div>
        <div class="col-12">
          <div class="col-12 pt-3 text-justify" v-html="about.content"></div>
        </div>
      </div>
      <!-- <div class="row pt-5">
        <hooper :settings="hooperSettings" style="height: auto">
          <slide v-for="(img, index) in about.galleryContent" :key="index">
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
      ></VueEasyLightbox>-->
    </div>
    <contact id="contact"></contact>
  </div>
</template>

<script>
// import VueEasyLightbox from "vue-easy-lightbox";
// import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
// import "hooper/dist/hooper.css";
export default {
  computed: {
    about() {
      return this.$store.getters["fanclub/getContent"];
    },
    imgs() {
      let urls = [];
      this.about.galleryContent.forEach((img) => {
        urls.push(img.url);
      });
      return urls;
    },
  },
  // components: {
  //   VueEasyLightbox,
  //   Hooper,
  //   Slide,
  //   HooperNavigation,
  // },
  data() {
    return {
      visible: false,
      index: 0,
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true,
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
