import axios from "axios"
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";

const actions = {
    //Faz a requisição para a API para obter os dados do perfil pelo UID no Firestore
    fecthProfileByUidOnFirestore: async(state, uid) => {
        const { data } = await axios.get(`${config.profile}/${uid}`);

        return data;
    },

    //Faz a requisição para a API para obter os dados do perfil pelo UID no Firestore e no Google
    fetchProfileByUidOnFirestoreGoogle: async({ commit }, { uid }) => {
        const { data } = await axios.get(`${config.profile}/${uid}`);
        const dataGoogle = await axios.get(`${config.profile}/uid/${uid}`);

        const userData = {
            uid: dataGoogle.data.uid,
            name: dataGoogle.data.displayName,
            email: dataGoogle.data.email,
            emailVerified: dataGoogle.data.emailVerified,
            profilePicture: dataGoogle.data.photoURL,
            ...data,
        };

        commit(MUTATIONS_TYPES.setProfile, userData);
    },

    //Faz a requisição para a API para pegar um perfil pelo email
    fetchUserDataByEmail: async(state, email) => {
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