import Vue from "vue";
import Vuex from "vuex";
import posts from "./Modules/posts";
import videos from "./Modules/videos";
import global from "./Modules/global";
import images from "./Modules/images";
import calendar from "./Modules/calendar";
import circuits from "./Modules/circuits";
import profile from "./Modules/profile";
import media from "./Modules/media";
import fanclub from "./Modules/fanclub";
import partners from "./Modules/partners";
import marketing from "./Modules/marketing";
import videoSection from "./Modules/videoSection";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    videos,
    global,
    images,
    calendar,
    circuits,
    profile,
    fanclub,
    partners,
    marketing,
    videoSection,
    media
  },
});