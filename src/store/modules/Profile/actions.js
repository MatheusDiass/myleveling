import axios from "axios"
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";

const actions = {
    fecthSubjectByUid: async ({ commit }, { uid }) => {
        let { data } = await axios.get(`${config.profile}/${uid}`);

        commit(MUTATIONS_TYPES.setProfile, data);
    },
};

export default actions;