import {
    aboutPage
} from "../../../firebase"
const about = {
    namespaced: true,
    state: {
        content: {}
    },
    mutations: {
        setContent(state, val) {
            state.content = val
        }
    },
    actions: {
        setContent({
            commit
        }) {
            aboutPage.onSnapshot((querySnapshot) => {
                let contentArray = [];

                querySnapshot.forEach((doc) => {
                    let content = doc.data();
                    content.id = doc.id;
                    contentArray.push(content);
                });
                commit("setContent", contentArray[0]);
            });
        }
    },
    getters: {
        getContent(state) {
            return state.content
        }
    }
}

export default about