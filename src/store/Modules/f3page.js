import {
    f3Page
} from "../../../firebase"
const f3page = {
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
            f3Page.onSnapshot((querySnapshot) => {
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

export default f3page