import axios from "axios";
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";


const actions = {
    //Faz a requisição para a API para salvar uma nova matéria 
    addSubject: async (state, subject) => {
        let { data } = await axios.post(config.subject, subject);

        return data;
    },

    //Faz a requisição para a API para editar uma matéria
    editSubject: async (state, { subject }) => {
        let { data } = await axios.put(`${config.subject}`, subject);

        return data;
    },

    //Faz a requisição para a API para pegar todas as matérias
    fecthSubjects: async ({ commit }) => {
        let { data } = await axios.get(`${config.subject}`);

        commit(MUTATIONS_TYPES.setSubjects, data);
    },

    //Faz a requisição para a API para pegar uma matéria pelo ID
    fecthSubjectById: async ({ commit }, { subjectId }) => {
        let { data } = await axios.get(`${config.subject}/${subjectId}`);

        commit(MUTATIONS_TYPES.setSubject, data);
    },

    //Faz a requisição para a API para deletar uma matéria
    deleteSubject: async (state, subjectId ) => {
        let { data } = await axios.delete(`${config.subject}/${subjectId}`);

        return data;
    }
};

export default actions;