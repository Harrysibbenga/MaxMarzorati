<template>
  <header id="header" class="mx-auto">
    <b-navbar toggleable="lg" class="p-0" type="light" variant="white">
      <b-navbar-toggle target="navbar-toggle-collapse" class="ml-4">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-navbar-brand to="/home" v-if="slideDown" class="d-lg-none">
        <img
          src="../../assets/images/Max_logo_2020.png"
          alt="Max Mazorati logo"
          class="img-fluid"
          width="200px"
        />
      </b-navbar-brand>

      <b-collapse
        id="navbar-toggle-collapse"
        is-nav
        class="d-lg-flex justify-content-lg-between"
      >
        <transition name="slide-left">
          <b-navbar-nav
            class="d-md-flex justify-content-lg-around text-center"
            v-if="slideLeft"
          >
            <b-nav-item to="/profile">Profile</b-nav-item>

            <b-nav-item to="/marketing">Marketing</b-nav-item>

            <b-nav-item to="/fanclub">Fan Zone</b-nav-item>

            <b-nav-item to="/partners">Partners</b-nav-item>
          </b-navbar-nav>
        </transition>

        <transition name="slide">
          <b-navbar-brand to="/" v-if="slideDown" class="d-none d-lg-block">
            <img
              src="../../assets/images/Max_logo_2020.png"
              alt="Max Mazorati logo"
              class="img-fluid"
              width="150px"
            />
          </b-navbar-brand>
        </transition>

        <transition name="slide-right">
          <b-navbar-nav
            class="d-md-flex justify-content-lg-around flex-center"
            v-if="slideRight"
          >
            <b-nav-item to="/media">Media</b-nav-item>

            <b-nav-item to="/news">News</b-nav-item>

            <b-nav-item  href="#contact">Contact</b-nav-item>

            <div class="d-flex flex-column flex-center">
              <div class="row mx-auto py-4">
                <div class="col-4">
                  <a
                    href="https://www.linkedin.com/in/max-marzorati-b56245194/ "
                    target="_blank"
                  >
                    <mdb-icon fab icon="linkedin-in" class="black-text" />
                  </a>
                </div>
                <div class="col-4">
                  <a
                    href="https://www.instagram.com/maxmarzorati/?hl=en"
                    target="_blank"
                  >
                    <mdb-icon fab icon="instagram" class="black-text" />
                  </a>
                </div>
                <div class="col-4">
                  <a
                    href="https://twitter.com/maxmarzorati?lang=en"
                    target="_blank"
                  >
                    <mdb-icon fab icon="twitter-square" class="black-text" />
                  </a>
                </div>
              </div>
            </div>
          </b-navbar-nav>
        </transition>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mdbIcon } from "mdbvue";
export default {
  data() {
    return {
      slideDown: false,
      slideLeft: false,
      slideRight: false,
    };
  },
  name: "Header",
  components: {
    mdbIcon,
  },
  methods: {},
  mounted() {
    this.slideDown = true;
    this.slideLeft = true;
    this.slideRight = true;
  },
};
</script>

<style scoped lang="scss">
.router-link-active {
  color: #e40613 !important;
}

a:hover {
    color: red !important;
}

ul {
  li a {
    font-size: 1.2rem;
    padding: 1rem 0;
    font-weight: 700;
  }
}

@media (max-width: 991px) {
  #navbar-toggle-collapse {
    border-top: 0.25rem solid #e40613;
  }
}

@media (min-width: 992px) {
  #navbar-toggle-collapse {
    width: 100%;
    ul {
      width: 50%;
    }
  }
}
// slide-down
.slide-enter-active {
  transition: all 1.5s ease;
}
.slide-leave-active {
  transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-100px);
  opacity: 0;
}
// slide-left
.slide-left-enter-active {
  transition: all 2s ease;
}
.slide-left-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-left-enter, .slide-left-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
// slide-right
.slide-right-enter-active {
  transition: all 2s ease;
}
.slide-right-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-right-enter, .slide-right-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
