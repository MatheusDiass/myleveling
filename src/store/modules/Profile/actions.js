import axios from "axios"
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';

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

    //Faz a requisição para a API para obter um perfil pelo email
    fetchUserDataByEmail: async(state, email) => {
        let { data } = await axios.get(`${config.profile}/email/${email}`);

        return data;
    },

    //Atualiza o nome do usuário
    editName: async(state, name) => {
        const firebaseUser = getAuth().currentUser;

        await updateProfile(firebaseUser, {
            displayName: name,
        });
    },

    //Atualiza o nickname
    editNickname: async(state, nickname) => {
        let { data } = await axios.put(`${config.profile}/updatenickname`, nickname);

        return data;
    },

    //Atualiza o email
    editEmail: async(state, email) => {
        const firebaseUser = getAuth().currentUser;

        await updateEmail(firebaseUser, email);
    },

    //Atualiza a senha
    editPassword: async(state, password) => {
        const firebaseUser = getAuth().currentUser;

        await updatePassword(firebaseUser, password);
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