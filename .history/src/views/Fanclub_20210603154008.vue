<template>
  <div>
    <Header></Header>

    <div id="about" class="container-fluid">
      <div class="row d-flex flex-center">
        <div class="col-12 col-lg-6 p-0">
          <img :src="about.url" class="img-fluid" :alt="about.alt" />
        </div>
        <div class="col-12 col-lg-6 p-5 mx-5" v-html="about.content">
          <!-- <div class="p-5 text-justify" ></div> -->
        </div>
      </div>
    </div>
    <contact id="contact"></contact>
  </div>
</template>

<script>
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
