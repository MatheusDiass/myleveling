import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setIsLogged](state, isLogged) {
        state.isLogged = isLogged;
    },
    [MUTATIONS_TYPES.setIsAdmin](state, isAdmin) {
        state.isAdmin = isAdmin;
    }
};

export default mutations;