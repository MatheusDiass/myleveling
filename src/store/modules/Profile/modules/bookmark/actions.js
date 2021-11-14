import axios from 'axios';
import MUTATIONS_TYPES from './mutationTypes';
import config from '@/configuration/configuration.json';

const actions = {
    //Faz a requisição para a API para obter todos os favoritos de um usuário
    fetchAllBookmarksByUser: async({ commit }, { uid }) => {
        const { data } = await axios.get(`${config.bookmark}/${uid}`);

        commit(MUTATIONS_TYPES.setBookmarks, data);
    },

    //Faz a requisição para a API para adicionar um favorito
    addBookmark: async(state, bookmark) => {
        const { data } = await axios.post(`${config.bookmark}`, bookmark);

        return data;
    },

    //Faz a requisição para a API para deletar um favorito
    deleteBookmark: async(state, bookmarkId) => {
        const { data } = await axios.delete(`${config.bookmark}/${bookmarkId}`);

        return data;
    }
};

export default actions;