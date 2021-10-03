import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setSubjects](state, subjects) {
        state.subjects = subjects;
    }
};

export default mutations;