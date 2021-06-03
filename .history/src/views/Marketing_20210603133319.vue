<template>
  <div>
    <Header></Header>
    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12">
          <img :src="marketing.url" class="img-fluid" :alt="marketing.alt" />
        </div>
        <div class="col-12 col-md-6 col-xl-8">
          <div
            class="col-12 pt-3 text-justify"
            v-html="marketing.content"
          ></div>
        </div>
        <div class="col-12 col-md-6 col-xl-4 grey lighten-2 py-5 p-4">
          <h5 class="text-center">
            Max’s arrival in British F3 has attracted coverage on-line and in
            print. Here are several recent examples
          </h5>
          <div
            class="col-10 pt-3 mx-auto"
            v-for="(item, index) in marketing.galleryContent"
            :key="index"
          >
            <a :href="item.link" target="_blank">
              <img :src="item.url" :alt="item.alt" class="img-fluid" />
            </a>
          </div>
        </div>
        <div class="bg-dark">
          <div class="container text-white p-5">
            <div
              class="col-12 pt-3 text-justify"
              v-html="marketing.content2"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    marketing() {
      return this.$store.getters["marketing/getContent"];
    },
    imgs() {
      let urls = [];
      this.marketing.galleryContent.forEach((img) => {
        urls.push(img.url);
      });
      return urls;
    },
  },
  data() {
    return {
      visible: false,
      index: 0,
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
