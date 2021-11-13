import axios from 'axios';
import MUTATIONS_TYPES from './mutationTypes';
import config from '@/configuration/configuration.json';

const actions = {
    //Faz a requisição para a API para obter todos os favoritos de um usuário
    fetchAllBookmarksByUser: async({ commit }, { uid }) => {
        const { data } = await axios.get(`${config.bookmark}/${uid}`);

        commit(MUTATIONS_TYPES.setBookmarks, data);
    },

    //Faz a requisição para a API para deletar um favorito
    deleteFavorite: async(state, favoriteId) => {
        const { data } = await axios.delete(`${config.bookmark}/${favoriteId}`);

        return data;
    }
};

export default actions;