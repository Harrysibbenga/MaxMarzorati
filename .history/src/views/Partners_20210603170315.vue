<template>
  <div>
    <Header></Header>

    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12 p-0">
          <img :src="about.url" class="img-fluid" :alt="about.alt" />
        </div>
        <div class="col-12">
          <div class="container">
            <div class="row py-2">
              <div class="col-12 p-0" v-for="(item, index) in about.partners" :key="index">
                <div class="row flex-center">
                  <div class="col-md-6">
                     <img :src="item.image.url" class="img-fluid" :alt="item.image.url" />
                  </div>
                  <div class="col-md-6 text-center text-md-left" v-html="item.content"></div>
                </div>
              </div>
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
      return this.$store.getters["partners/getContent"];
    },
    imgs() {
      let urls = [];
      this.about.galleryContent.forEach((img) => {
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
