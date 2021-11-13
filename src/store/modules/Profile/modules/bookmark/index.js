import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const bookmarkModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

export default bookmarkModule;