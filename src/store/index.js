import Vue from "vue";
import Vuex from "vuex";

import state from "./state"
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

//Modules
import profileModule from "./modules/Profile";
import subjectModule from "./modules/Subject";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    subject: subjectModule,
    profile: profileModule,
  }
});
