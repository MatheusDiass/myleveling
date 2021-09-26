import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setShowSnackbar](state, { show, message }) {
        state.showSnackbar.show = show;
        state.showSnackbar.message = message;
    },

    [MUTATIONS_TYPES.setShowAlert](state, { show, message }) {
        state.showAlert.show = show;
        state.showAlert.message = message;
    },
};

export default mutations;