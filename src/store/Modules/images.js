import {
    imageCollection,
    storage
} from "../../../firebase";

import store from "../store";

const images = {
    namespaced: true,
    state: {
        image: {},
        images: [],
        msg: {}
    },
    mutations: {
        setImage(state, val) {
            state.image = val
        },
        setImages(state, val) {
            state.images = val
        },
        setMsg(state, val) {
            state.msg = val
        }
    },
    actions: {
        uploadImage({
            commit
        }, payload) {
            return new Promise((resolve) => {
                
     
            let file = payload.file
            let alt = payload.alt
            let storageRef = storage.ref("images/" + file.name);
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
                        imageCollection
                            .add({
                                name: file.name,
                                createdOn: new Date(),
                                url: downloadURL,
                                alt: alt
                            })
                            .then(doc => {
                                let id = doc.id
                                imageCollection
                                    .doc(id)
                                    .get()
                                    .then(doc => {
                                        let img = doc.data()
                                        img.id = id
                                        commit("setImage", img)
                                        resolve(img)
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
        }) 
                     
        },
        setImages({
            commit
        }) {
            imageCollection.orderBy("createdOn", "desc").onSnapshot((querySnapshot) => {
                let imagesArray = [];

                querySnapshot.forEach((doc) => {
                    let image = doc.data();
                    image.id = doc.id;
                    imagesArray.push(image);
                });
                commit("setImages", imagesArray);
            });
        }
    },
    getters: {
        getImage(state) {
            return state.image
        },
        getImages(state) {
            return state.images
        },
        getMsg(state) {
            return state.msg
        }
    }
}

export default images