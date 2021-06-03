<template>
  <div class="bg-dark py-5">
    <div class="container">
      <h3 class="text-white text-center">
        To stay up to date on everything that’s going on at the race track
        follow me on my social media channels.
      </h3>

      <div class="d-flex flex-column flex-center">
        <div class="row mx-auto py-4">
          <div class="col-4">
            <a
              href="https://www.linkedin.com/in/max-marzorati-b56245194/ "
              target="_blank"
            >
              <mdb-icon fab icon="linkedin-in" size="2x" class="white-text" />
            </a>
          </div>
          <div class="col-4">
            <a
              href="https://www.instagram.com/maxmarzorati/?hl=en"
              target="_blank"
            >
              <mdb-icon fab icon="instagram" size="2x" class="white-text" />
            </a>
          </div>
          <div class="col-4">
            <a href="https://twitter.com/maxmarzorati?lang=en" target="_blank">
              <mdb-icon
                fab
                icon="twitter-square"
                size="2x"
                class="white-text"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon } from "mdbvue";
export default {
  name: "StayConnected",
  components: {
    mdbIcon,
  },
};
</script>

<style lang="scss" scoped>
.col-4 {
  img:hover {
    background-color: red;
    transform: scale(1.2);
  }
  img {
    transition: all 0.5s ease-in-out;
  }
}
</style>
