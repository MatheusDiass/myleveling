import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setSubContents](state, subContents) {
        state.subContents = subContents;
    },

    [MUTATIONS_TYPES.setSubContent](state, subContent) {
        state.subContent = subContent;
    },

    [MUTATIONS_TYPES.setSubContentsBySubject](state, subContentsBySubject) {
        state.subContentsBySubject = subContentsBySubject;
    }
};

export default mutations;