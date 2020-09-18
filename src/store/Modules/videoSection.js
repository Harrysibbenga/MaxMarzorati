import {
    videoSection
} from "../../../firebase"

const video = {
    namespaced: true,
    state: {
        video: ''
    },
    mutations: {
        setVideo(state, val) {
            state.video = val
        }
    },
    actions: {
        setVideo({
            commit
        }) {
            videoSection.orderBy("createdOn").onSnapshot((querySnapshot) => {
                let videoArray = [];

                querySnapshot.forEach((doc) => {
                    let video = doc.data();
                    video.id = doc.id;
                    videoArray.push(video);
                });
                commit("setVideo", videoArray);
            });
        }
    },
    getters: {
        getVideo(state) {
            return state.video
        }
    }
}

export default video;