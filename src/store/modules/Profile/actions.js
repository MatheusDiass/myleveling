import axios from "axios"
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";

const actions = {
    //Faz a requisição para a API para pegar um perfil pelo ID
    fecthProfileByUid: async ({ commit }, { uid }) => {
        let { data } = await axios.get(`${config.profile}/${uid}`);

        commit(MUTATIONS_TYPES.setProfile, data);
    },
};

export default actions;