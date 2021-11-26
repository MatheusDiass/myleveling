import axios from "axios";
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";
import { removeCookie } from '@/helpers/managerCookies';
import router from '../router';
import store from './index';

const actions = {
    saveInititalProfileInformations: async(state, user) => {
        const { data } = await axios.post(`${config.login}`, user);

        return data;
    },

    //Encerra a seção do usuário
    logout: ({ commit }) => {
        //Remove os cookies do navegador
        removeCookie('profile');
        removeCookie('token');

        //Desabilita a visualização de alguns menus
        commit(MUTATIONS_TYPES.setIsLogged, false);
        commit(MUTATIONS_TYPES.setIsAdmin, false);

        //Limpa a variavel onde é armazenado o perfil do usuário
        store.dispatch('profile/cleanProfile');
        this.cleanProfile();

        //Muda para a página de login
        router.push({ name: 'Login' });
    }
};

export default actions;