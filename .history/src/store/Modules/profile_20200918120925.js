import {
    profileCollection
} from "../../../firebase";

const profile = {
    namespaced: true,
    state: {
        profile: []
    },
    mutations: {
        setProfile(state, val) {
            if (val) {
                state.profile = val;
            } else {
                state.profile = [];
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
        },

    },
    getters: {
        getProfile(state) {
            return state.profile;
        },
    },
};

export default profile;