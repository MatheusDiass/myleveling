import axios from "axios"
import MUTATIONS_TYPES from "./mutationsTypes";


const actions = {
    fecthSubjects: async ({ commit }, { route }) => {
        let { data } = await axios.get(route);

        commit(MUTATIONS_TYPES.setSubjects, data);
    },
};

export default actions;