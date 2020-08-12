<template>
  <div id="latest" class="py-2">
    <div class="container-md py-md-5">
      <div class="row overflow-hidden">
        <div class="col-md-6 mt-1 p-0 main overflow-hidden">
          <div class="view overlay main-content px-1 zoom overflow-hidden">
            <img :src="latestPost.url" :alt="latestPost.alt" class="main-img" />
            <div class="mask rgba-black-strong d-flex flex-column justify-content-end pb-5 pl-5">
              <h2 class="text-white">{{ latestPost.title }}</h2>
              <p class="text-white">{{ latestPost.date | formatDate }}</p>
              <router-link :to="`/post/${latestPost.slug}`" class="text-danger">More info</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 p-0 px-1 d-flex flex-column">
          <div class="mt-1 view overlay zoom" v-for="(post, index) in posts" :key="index">
            <img :src="post.url" :alt="post.alt" class="img-fluid" />
            <div class="mask rgba-black-strong d-flex flex-column justify-content-end pb-5 pl-4">
              <h2 class="text-white">{{ post.title }}</h2>
              <p class="text-white">{{ post.date | formatDate }}</p>
              <router-link :to="`/post/${post.slug}`" class="text-danger">More info</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Latest",

  computed: {
    latestPost() {
      return this.$store.getters["posts/getPosts"][0];
    },
    posts() {
      return this.$store.getters["posts/getPosts"].slice(1, 3);
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
@media screen and (max-width: 767px) {
  .main {
    .main-img {
      max-width: 100%;
      height: auto;
    }
  }
}

@media (min-width: 768px) {
  .main {
    .main-content {
      transition: all 0.3s ease-in;
      .main-img {
        transform: translateX(-25%);
      }
    }
  }
  .main:hover {
    .main-content {
      transform: scale(1.05);
      .main-img {
        transform: translateX(-25%);
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .main {
    .main-img {
      height: 473px;
    }
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .main {
    .main-img {
      height: 633px;
    }
  }
}

@media (min-width: 1200px) {
  .main {
    .main-img {
      height: 753px;
    }
  }
}
</style>
