import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setShowAlert](state, { show, message }) {
        state.showAlert.show = show;
        state.showAlert.message = message;
    },
};

export default mutations;