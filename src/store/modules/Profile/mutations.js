import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setProfile](state, profile) {
        state.profile = profile;
    },
};

export default mutations;