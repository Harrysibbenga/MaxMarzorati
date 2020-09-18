import {
    videoCollection,
    storage
} from "../../../firebase"

import store from "../store";

const videos = {
    namespaced: true,
    state: {
        video: "",
        videos: [],
        msg: {}
    },
    mutations: {
        setVideo(state, val) {
            state.video = val
        },
        setVideos(state, val) {
            state.videos = val
        },
        setMsg(state, val) {
            state.msg = val
        }
    },
    actions: {
        uploadVideo({
            commit
        }, payload) {
            let file = payload.file
            let alt = payload.alt
            let storageRef = storage.ref("videos/" + file.name);
            let uploadTask = storageRef.put(file);

            store.dispatch("global/setLoading", true);

            uploadTask.on(
                "state_changed",
                () => {
                    // snapshot
                },
                () => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        videoCollection
                            .add({
                                name: file.name,
                                createdOn: new Date(),
                                url: downloadURL,
                                alt: alt
                            })
                            .then(doc => {
                                let id = doc.id
                                videoCollection
                                    .doc(id)
                                    .get()
                                    .then(doc => {
                                        let video = doc.data()
                                        video.id = id
                                        commit("setVideo", video)
                                    })
                                    .then(() => {
                                        store.dispatch("global/setLoading", false);
                                        let msg = {
                                            type: "success",
                                            message: "Video sucssesfully uploaded to storage"
                                        }
                                        commit("setMsg", msg)
                                        setTimeout(() => {
                                            commit("setMsg", {})
                                        }, 8000)
                                    })
                                    .catch(err => {
                                        store.dispatch("global/setLoading", false);
                                        let msg = {
                                            type: "warning",
                                            message: err.message
                                        }
                                        commit("setMsg", msg)
                                        setTimeout(() => {
                                            commit("setMsg", {})
                                        }, 8000)
                                    });
                            })
                            .catch(err => {
                                store.dispatch("global/setLoading", false);
                                let msg = {
                                    type: "warning",
                                    message: err.message
                                }
                                commit("setMsg", msg)
                                setTimeout(() => {
                                    commit("setMsg", {})
                                }, 8000)
                            });
                    });
                }
            );
        },
        setVideos({
            commit
        }) {
            videoCollection.orderBy("createdOn").onSnapshot((querySnapshot) => {
                let videoArray = [];

                querySnapshot.forEach((doc) => {
                    let video = doc.data();
                    video.id = doc.id;
                    videoArray.push(video);
                });
                commit("setVideos", videoArray);
            });
        }
    },
    getters: {
        getVideo(state) {
            return state.video
        },
        getVideos(state) {
            return state.videos
        },
        getMsg(state) {
            return state.msg
        }
    }
}

export default videos;