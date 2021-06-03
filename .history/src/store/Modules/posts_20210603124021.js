import {
  postsCollection
} from "../../../firebase";

const posts = {
  namespaced: true,
  state: {
    allPosts: [],
    post: null,
    postsByYear: [],
    page: null
  },
  mutations: {
    setPosts(state, val) {
      if (val) {
        state.allPosts = val;
      } else {
        state.allPosts = [];
      }
    },
    setPostsByYear(state, val) {
      if (val) {
        state.postsByYear = val;
      } else {
        state.postsByYear = [];
      }
    },
    setPost(state, val) {
      if (val) {
        state.post = val;
      } else {
        state.post = null;
      }
    },
    clearPost(state) {
      state.post = null;
    },
    clearPosts(state) {
      state.allPosts = null;
    },
  },
  actions: {
    setPost({
      commit
    }, id) {
      postsCollection
        .doc(id)
        .get()
        .then((doc) => {
          let post = doc.data();
          commit("setPost", post);
        });
    },
    setPostSlug({
      commit
    }, slug) {
      postsCollection
        .where("slug", "==", slug)
        .onSnapshot((doc => {

          doc.forEach((doc) => {
            let post = doc.data();
            post.id = doc.id;
            commit("setPost", post);
          });
        }));
    },
    setPosts({
      commit
    }) {
      postsCollection.orderBy("date", "desc").onSnapshot((querySnapshot) => {
        let postsArray = [];

        querySnapshot.forEach((doc) => {
          let post = doc.data();
          post.id = doc.id;
          postsArray.push(post);
        });
        commit("setPosts", postsArray);
      });
    },
    setPostsByYear({
      commit
    }, year) {
      postsCollection.where('year', "==", year).orderBy('date', 'desc').onSnapshot((doc => {
        let postsArray = [];

        doc.forEach((doc) => {
          let post = doc.data();
          post.id = doc.id;
          postsArray.push(post);
        });
        commit("setPostsByYear", postsArray);
      }))
    }
  },
  getters: {
    getPost(state) {
      return state.post;
    },
    getPosts(state) {
      return state.allPosts;
    },
    getPostsByYear(state) {
      return state.postsByYear;
    },
    getPage(state) {
      return state.page;
    }
  },
};

export default posts;