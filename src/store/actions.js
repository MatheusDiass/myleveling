import MUTATIONS_TYPES from "./mutationTypes"

const actions = {
    showSnackbarMessage({ commit }, { show, message }) {
        commit(MUTATIONS_TYPES.setShowSnackbar, { show, message });
    }
};

export default actions;