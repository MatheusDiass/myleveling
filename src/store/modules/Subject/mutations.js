import MUTATIONS_TYPES from "./mutationsTypes";

const mutations = {
    [MUTATIONS_TYPES.setSubjects](state, subjects) {
        state.subjects = subjects;
    }
};

export default mutations;