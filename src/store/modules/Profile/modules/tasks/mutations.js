import MUTATIONS_TYPES from "./mutationTypes";

const mutations = {
    [MUTATIONS_TYPES.setTasks](state, tasks) {
        state.tasks = tasks;
    }
}

export default mutations;