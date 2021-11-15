import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

//Modules
import bookmarkModule from './modules/bookmark';
import taskModule from './modules/tasks';

Vue.use(Vuex);

const profileModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {
        bookmark: bookmarkModule,
        task: taskModule,
    }
};

export default profileModule;