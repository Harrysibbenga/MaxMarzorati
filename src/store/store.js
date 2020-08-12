import Vue from "vue";
import Vuex from "vuex";
import posts from "./Modules/posts";
import carousel from "./Modules/carousel";
import global from "./Modules/global";
import images from "./Modules/images";
import formula3 from "./Modules/formula3";
import formula4 from "./Modules/formula4";
import circuits from "./Modules/circuits";
import drivers from "./Modules/drivers";
import about from "./Modules/about";
import sim from "./Modules/sim";
import f3page from "./Modules/f3page";
import f4page from "./Modules/f4page";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    carousel,
    global,
    images,
    formula3,
    formula4,
    circuits,
    drivers,
    about,
    sim,
    f3page,
    f4page
  },
});