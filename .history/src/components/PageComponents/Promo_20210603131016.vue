<template>
  <div class="my-5 bg-white">
    <mdb-container>
      <mdb-row>
        <mdb-col sm="4" class="p-2 py-3">
          <router-link to="profile">
            <div class="overflow-hidden pb-3">
              <img
                :src="profile.head.url" :alt="profile.head.alt"
                class="img-fluid mb-2 overflow-hidden"
              />
            </div>
            <h5>Profile</h5>
            <p>View my profile</p>
          </router-link>
        </mdb-col>
        <mdb-col sm="4" class="p-2 py-3">
          <router-link to="media">
            <div class="overflow-hidden pb-3">
              <img :src="media.head.url" :alt="media.head.alt" class="img-fluid mb-2" />
            </div>
            <h5>Media</h5>
            <p>View my media</p>
          </router-link>
        </mdb-col>
        <mdb-col sm="4" class="p-2 py-3">
          <router-link to="news">
            <div class="overflow-hidden pb-3">
              <img :src="news.head.url" :alt="news.head.alt" class="img-fluid mb-2" />
            </div>
            <h5>News</h5>
            <p>Keep up to date with my latest</p>
          </router-link>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from "mdbvue";

export default {
  name: "Promo",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
  },
  computed: {
    media() {
      return this.$store.getters["media/getMedia"];
    },
    news() {
      return this.$store.getters["posts/getPage"];
    }
  }
};
</script>

<style lang="css" scoped>
.col-sm-4 {
  transition: all 0.5s ease-in-out;
}
img {
  transition: all 0.5s ease-in-out;
}
.col-sm-4:hover {
  background: red;
}
.col-sm-4:hover a {
  color: white;
}

.col-sm-4 a {
  color: black;
}
.col-sm-4:hover img {
  transform: scale(1.1);
}
</style>
