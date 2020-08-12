import Vue from "vue";
import VueRouter from "vue-router";
// Views 
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import News from "../views/News.vue";
import Post from "../views/Post.vue";
import Login from "../views/Login.vue";
import F3 from "../views/F3.vue";
import F4 from "../views/F4.vue";
import Dashboard from "../views/Dashboard.vue";
import Simulator from "../views/Simulator.vue"
import Driver from "../views/Drivers";
import DriverProfile from "../views/Driver";
// Dashboard 
import Welcome from "@/components/Dashboard/Welcome";
import Calendars from "@/components/Dashboard/Calendars";
import Posts from "@/components/Dashboard/Posts";
import Drivers from "@/components/Dashboard/Drivers";
import Formula_3 from "@/components/Dashboard/Formula3";
import Formula_4 from "@/components/Dashboard/Formula4";
import Carousel from "@/components/Dashboard/Carousel";
import Gallery from "@/components/Dashboard/Gallery";
import Images from "@/components/Dashboard/Images";
import Circuits from "@/components/Dashboard/Circuits";
import Pages from "@/components/Dashboard/Pages"
// Page edits 
import AboutEdit from "@/components/Pages/About"
import SimulatorEdit from "@/components/Pages/Simulator"
import F3Edit from "@/components/Pages/F3"
import F4Edit from "@/components/Pages/F4"

import {
  auth
} from "../../firebase";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/news",
      name: "news",
      component: News,
    },
    {
      path: "/driver/:id",
      name: "driverProfile",
      component: DriverProfile,
    },
    {
      path: "/drivers",
      name: "drivers",
      component: Driver,
    },
    {
      path: "/simulator",
      name: "simulator",
      component: Simulator,
    }, {
      path: "/post/:slug",
      name: "post",
      component: Post,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/f3",
      name: "F3",
      component: F3,
    },
    {
      path: "/f4",
      name: "F4",
      component: F4,
    }, {
      path: "/dashboard",
      component: Dashboard,
      children: [{
          path: "/",
          component: Welcome,
        },
        {
          path: "posts",
          component: Posts,
        },
        {
          path: "calendars",
          component: Calendars,
          children: [{
              path: "/",
              component: Formula_3,
            },
            {
              path: "f4",
              component: Formula_4,
            },
          ],
        },
        {
          path: "drivers",
          component: Drivers,
        },
        {
          path: "carousel",
          component: Carousel,
        },
        {
          path: "gallery",
          component: Gallery,
          children: [{
              path: "/",
              component: Images,
            },
            {
              path: "circuits",
              component: Circuits,
            },
          ],
        },
        {
          path: 'pages',
          component: Pages,
          children: [{
              path: "/",
              component: AboutEdit,
            },
            {
              path: "simulator",
              component: SimulatorEdit,
            },
            {
              path: "f3",
              component: F3Edit,
            },
            {
              path: "f4",
              component: F4Edit,
            }
          ]
        }
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else if (to.name === "login" && currentUser) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;