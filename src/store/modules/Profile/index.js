import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const profileModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

export default profileModule;