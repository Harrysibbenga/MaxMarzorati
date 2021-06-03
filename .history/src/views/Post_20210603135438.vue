<template>
  <div>
    <Header></Header>
    <div id="post">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-center p-0">
            <img :src="post.url" :alt="post.alt" class="img-fluid" />
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-12 mt-3 text-center">
            <h2 class="pt-3">{{post.title}}</h2>
          </div>
          <div class="col-12 text-center">
            <p>{{post.date | formatDate}}</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 pt-3 text-justify link" v-html="post.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "News",
  computed: {
    post() {
      return this.$store.getters["posts/getPost"];
    },
  },
  created() {
    this.$store.dispatch("posts/setPosts");
    let slug = this.$route.params.slug;
    this.$store.dispatch("posts/setPostSlug", slug);
  },
  destroyed() {
    this.$store.commit("posts/clearPost");
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
 
<style scoped lang="css">
.active {
  background-color: #6e6e6d;
  color: white;
}

link a {
    color: red !important;
}
</style>
