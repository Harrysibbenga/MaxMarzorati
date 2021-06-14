import Vue from "vue";
import VueRouter from "vue-router";
// Views 
import Home from "../views/Home.vue";
import Fanclub from "../views/Fanclub.vue";
import Partners from "../views/Partners.vue";
import News from "../views/News.vue";
import Post from "../views/Post.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Marketing from "../views/Marketing.vue"
import DriverProfile from "../views/Profile";
import Media from "../views/Media";
// Dashboard 
import Welcome from "@/components/Dashboard/Welcome";
import Calendar from "@/components/Dashboard/Calendar";
import Posts from "@/components/Dashboard/Posts";
import Profile from "@/components/Dashboard/Profile";
import Video from "@/components/Dashboard/Video";
import Gallery from "@/components/Dashboard/Gallery";
import Images from "@/components/Dashboard/Images";
import Circuits from "@/components/Dashboard/Circuits";
import Videos from "@/components/Dashboard/Videos";
import Pages from "@/components/Dashboard/Pages";
// Page edits 
import FanclubEdit from "@/components/Pages/Fanclub"
import MarketingEdit from "@/components/Pages/Marketing"
import MediaEdit from "@/components/Pages/Media"
import PartnersEdit from "@/components/Pages/Partners"


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
      path: "/fanclub",
      name: "fanclub",
      component: Fanclub,
    },
    {
      path: "/partners",
      name: "partners",
      component: Partners,
    }, {
      path: "/news",
      name: "news",
      component: News,
    },
    {
      path: "/profile",
      name: "profile",
      component: DriverProfile,
    },
    {
      path: "/Marketing",
      name: "Marketing",
      component: Marketing,
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
      path: "/media",
      component: Media,
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
          path: "calendar",
          component: Calendar,
        },
        {
          path: "profile",
          component: Profile,
        },
        {
          path: "video",
          component: Video,
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
            {
              path: "videos",
              component: Videos,
            },
          ],
        },
        {
          path: 'pages',
          component: Pages,
          children: [{
              path: "/",
              component: FanclubEdit,
            },
            {
              path: "marketing",
              component: MarketingEdit,
            },
            {
              path: "partners",
              component: PartnersEdit,
            },
            {
              path: "media",
              component: MediaEdit,
            },
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

  // check if authorized user is present

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else if (to.name === "login" && currentUser) {
    next("/dashboard");
  } else {
    next();
  }

  // contact route 

  if (to.path === '#contact') {
    next('/')
    next('#contact')
  }

});

export default router;