import {
    mediaCollection
} from "../../../firebase";

const media = {
    namespaced: true,
    state: {
        media: []
    },
    mutations: {
        setMedia(state, val) {
            if (val) {
                state.media = val;
            } else {
                state.media = [];
            }
        },
    },
    actions: {
        setMedia({
            commit
        }) {
            mediaCollection.onSnapshot((querySnapshot) => {
                let driverArray = [];

                querySnapshot.forEach((doc) => {
                    let media = doc.data();
                    media.id = doc.id;
                    driverArray.push(media);
                });
                commit("setMedia", driverArray[0]);
            });
        },

    },
    getters: {
        getMedia(state) {
            return state.media;
        },
    },
};

export default media;