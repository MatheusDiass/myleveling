import axios from "axios"
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";

const actions = {
    //Faz a requisição para a API para pegar um perfil pelo UID(Firestore)
    fecthProfileByUid: async ({ commit }, { uid }) => {
        let { data } = await axios.get(`${config.profile}/${uid}`);

        commit(MUTATIONS_TYPES.setProfile, data);
    },

    //Faz a requisição para a API para pegar um perfil pelo email
    fecthUserDataByEmail: async(state, email) => {
        let { data } = await axios.get(`${config.profile}/email/${email}`);

        return data;
    },

    //Limpa os dados da variavel onde é armazenado o perfil do usuário
    cleanProfile: ({ commit }) => {
        commit(MUTATIONS_TYPES.setProfile, undefined);
    },

    //Armazena o valor recebido na variavel profile do vuex
    setProfile: ({ commit }, { profile }) => {
        commit(MUTATIONS_TYPES.setProfile, profile);
    }
};

export default actions;