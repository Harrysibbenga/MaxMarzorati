<template>
  <div>
    <Header></Header>
    <div id="news">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-row py-5">
            <button class="btn" :class="{ active: isActive == 'all' }" @click="filter('all')">All</button>
            <button
              class="btn"
              :class="{ active: isActive == 'images' }"
              @click="filter('images')"
            >Images</button>
            <button
              class="btn"
              :class="{ active: isActive == 'videos' }"
              @click="filter('videos')"
            >Videos</button>
          </div>
        </div>
        <transition name="fade">
          <div class="row" v-if="transition">
            <div
              class="col-12 col-md-6 col-lg-4 p-0"
              v-for="(item, index) in paginatedData"
              :key="index"
            >
              <img
                v-if="item.imgId"
                :src="item.url"
                :alt="item.alt"
                class="img-fluid"
                @click="showImg(index)"
              />

              <video class="video-fluid z-depth-1" controls v-if="item.videoId">
                <source :src="item.url" type="video/mp4" />
              </video>
            </div>
            <VueEasyLightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"></VueEasyLightbox>
            <div class="col-12 text-center">
              <mdb-btn :class="{ 'd-none': pageNumber == 0 }" @click="prevPage" color="primary">
                <mdb-icon icon="angle-double-left" />
              </mdb-btn>
              <mdb-btn
                :class="{ 'd-none': pageNumber >= pageCount - 1 }"
                @click="nextPage"
                color="primary"
              >
                <mdb-icon icon="angle-double-right" />
              </mdb-btn>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon, mdbBtn } from "mdbvue";
import moment from "moment";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  name: "Media",
  data() {
    return {
      isActive: null,
      pageNumber: 0,
      itemsVw: [],
      transition: false,
      visible: false,
      index: 0,
    };
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 9,
    },
  },
  computed: {
    items: {
      get: function () {
        return this.itemsVw;
      },
      set: function (newValue) {
        return newValue;
      },
    },
    pageCount() {
      let l = this.items.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.items.slice(start, end);
    },
    imgs() {
      let urls = [];
      this.items.forEach((img) => {
        urls.push(img.url);
      });
      return urls;
    },
  },
  components: {
    mdbIcon,
    mdbBtn,
    VueEasyLightbox,
  },
  methods: {
    filter(value) {
      if (value == "all") {
        this.isActive = "all";
        this.transition = false;
        this.pageNumber = 0;
        setTimeout(() => {
          this.itemsVw = this.$store.getters["media/getMedia"].galleryContent;
          this.transition = true;
        }, 500);
      } else if (value == "images") {
        this.isActive = "images";
        this.transition = false;
        this.pageNumber = 0;
        let images = this.$store.getters[
          "media/getMedia"
        ].galleryContent.filter((item) => {
          return item.imgId;
        });
        setTimeout(() => {
          this.itemsVw = images;
          this.transition = true;
        }, 500);
      } else if (value == "videos") {
        this.isActive = "videos";
        this.transition = false;
        this.pageNumber = 0;
        let videos = this.$store.getters[
          "media/getMedia"
        ].galleryContent.filter((item) => {
          return item.videoId;
        });
        setTimeout(() => {
          this.itemsVw = videos;
          this.transition = true;
        }, 500);
      }
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
  created() {
    this.isActive = "all";
  },
  mounted() {
    setTimeout(() => {
      this.itemsVw = this.$store.getters["media/getMedia"].galleryContent;
      this.transition = true;
    }, 500);
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

<style scoped>
.active {
  background-color: #322783;
  color: white;
}
</style>
