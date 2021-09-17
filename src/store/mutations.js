import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setShowSnackbar](state, { show, message }) {
        state.showSnackbar.show = show;
        state.showSnackbar.message = message;
    },
};

export default mutations;