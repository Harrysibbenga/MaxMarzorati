<template>
  <div>
    <mailing-list></mailing-list>
    <contact></contact>
    <footer class="bg-dark bottom">
      <div class="container">
        <div class="row pt-3">
          <div class="col-12 col-md-6 text-center">
            <img src="../../assets/jhr.png" alt="JHR logo" class="img-fluid mb-4" width="300px" />
            <div class="d-flex flex-row px-5 pb-3 justify-content-center">
              <div class="p-2">
                <a href="#" target="_blank">
                  <img
                    src="../../assets/facebook-square-brands-white.png"
                    class="img-fluid"
                    width="35px"
                  />
                </a>
              </div>
              <div class="p-2">
                <a href="#" target="_blank">
                  <span>
                    <img
                      src="../../assets/instagram-square-brands-white.png"
                      class="img-fluid"
                      width="35px"
                    />
                  </span>
                </a>
              </div>
              <div class="p-2">
                <a href="#" target="_blank">
                  <img
                    src="../../assets/twitter-square-brands-white.png"
                    class="img-fluid"
                    width="35px"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="text-center pt-2 pb-4 col-12 col-md-6">
            <h3 class="text-white">Contact</h3>
            <p class="text-secondary">
              Steven Hunter
              <br />JHR Developments
              <br />Hunter Park
              <br />Callywhite Lane
              <br />Dronfield
              <br />Derbyshire
              <br />S18 2XR
              <br />
            </p>
            <p class="text-secondary">
              <span class="text-white">Phone:</span> 07803 669 894
            </p>

            <p class="text-secondary">
              <span class="text-white">Email:</span>
              <a
                class="text-secondary"
                href="mailto:enquiries@jhrdevelopments.com"
              >enquiries@jhrdevelopments.com</a>
            </p>
          </div>
        </div>
      </div>
      <div class="footer-copyright py-2 px-5 bg-white">
        <mdb-container class="d-flex flex-center justify-content-around">
          <div class="text-dark">
            &copy; 2020 Copyright:
            <a
              href="http://www.torquetogether.com/"
              target="_blank"
            >Torque Motorsport Ltd</a>
          </div>
          <div class="text-dark text-center">
            <p>Powered by</p>
            <img :src="require('../../assets/Torquelogo.png')" alt="Torque motorsport logo" />
          </div>
        </mdb-container>
      </div>
    </footer>
  </div>
</template>

<script>
import { mdbContainer } from "mdbvue";
export default {
  name: "Footer",
  components: {
    mdbContainer,
  },
};
</script>

<style scoped lang="scss">
.d-flex {
  img:hover {
    background-color: red;
    transform: scale(1.2);
  }
  img {
    transition: all 0.5s ease-in-out;
  }
}
p {
  line-height: 2rem;
}
a:hover {
  color: red !important;
}
</style>
