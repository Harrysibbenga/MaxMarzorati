<template>
  <div>
    <Header></Header>

    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-6 mr-auto">
          <img :src="about.url" class="img-fluid" :alt="about.alt" />
        </div>
        <div class="col-6">
          <div class="container">
            <div class="row">
                <div class="col-8 pt-3 text-justify" v-html="about.content"></div>
            </div>
          </div>
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
