import {
    profileCollection
} from "../../../firebase";

const profile = {
    namespaced: true,
    state: {
        profile: [],
        page
    },
    mutations: {
        setProfile(state, val) {
            if (val) {
                state.profile = val;
            } else {
                state.profile = [];
            }
        },
         setPage(state, val) {
            if (val) {
                state.page = val;
            } else {
                state.page = [];
            }
        },
    },
    actions: {
        setProfile({
            commit
        }) {
            profileCollection.orderBy("lastName").onSnapshot((querySnapshot) => {
                let driverArray = [];

                querySnapshot.forEach((doc) => {
                    let profile = doc.data();
                    profile.id = doc.id;
                    driverArray.push(profile);
                });
                commit("setProfile", driverArray[0]);
            });

            profilePage.onSnapshot((querySnapshot) => {
                let driverArray = [];

                querySnapshot.forEach((doc) => {
                    let profile = doc.data();
                    profile.id = doc.id;
                    driverArray.push(profile);
                });
                commit("setPage", driverArray[0]);
            });
        },

    },
    getters: {
        getProfile(state) {
            return state.profile;
        },
        getPage(state) {
            return state.page;
        },
    },
};

export default profile;