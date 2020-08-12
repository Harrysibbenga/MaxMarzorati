<template>
  <div>
    <div class="container">
      <div class="my-4">
        <router-link to="/">
          <mdb-icon icon="arrow-left" />&nbsp; Home
        </router-link>
        <hr />
      </div>
      <b-nav tabs>
        <b-nav-item to="/dashboard/posts/">Posts</b-nav-item>
        <b-nav-item to="/dashboard/calendars/">Calendars</b-nav-item>
        <b-nav-item to="/dashboard/carousel/">Carousel</b-nav-item>
        <b-nav-item to="/dashboard/drivers/">Drivers</b-nav-item>
        <b-nav-item to="/dashboard/gallery/">Gallery</b-nav-item>
        <b-nav-item to="/dashboard/pages/">Pages</b-nav-item>
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-nav>
    </div>
    <router-view class="pt-3"></router-view>
  </div>
</template>

<script>
import { auth } from "../../firebase";
import { mdbIcon } from "mdbvue";

export default {
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push("/");
      });
    },
  },
  components: {
    mdbIcon,
  },
};
</script>

<style>
.nav-link {
  color: black;
}
.nav-tabs {
  border-bottom: 0.25rem solid black;
}
.nav-tabs .nav-link:focus {
  border-color: black;
}
.nav-tabs .nav-link:hover {
  border-color: red;
}
a {
  color: black;
}
a:hover {
  color: red;
}
</style>
