import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setBookmarks](state, bookmarks) {
        state.bookmarks = bookmarks;
    }
};

export default mutations;