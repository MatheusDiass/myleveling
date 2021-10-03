import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setSubjects](state, subjects) {
        state.subjects = subjects;
    },
    [MUTATIONS_TYPES.setSubject](state, subject) {
        state.subject = subject;
    }
};

export default mutations;