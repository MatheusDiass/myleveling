import axios from "axios";
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";


const actions = {
    //Faz a requisição para a API para salvar uma nova disciplina
    addSubject: async(state, subject) => {
        const { data } = await axios.post(config.subject, subject);

        return data;
    },

    //Faz a requisição para a API para editar uma disciplina
    editSubject: async(state, { subject }) => {
        const { data } = await axios.put(`${config.subject}`, subject);

        return data;
    },

    //Faz a requisição para a API para pegar todas as disciplinas
    fecthSubjects: async({ commit }) => {
        const { data } = await axios.get(`${config.subject}`);

        commit(MUTATIONS_TYPES.setSubjects, data);
    },

    //Faz a requisição para a API para pegar uma disciplina pelo ID
    fecthSubjectById: async({ commit }, { subjectId }) => {
        const { data } = await axios.get(`${config.subject}/${subjectId}`);

        commit(MUTATIONS_TYPES.setSubject, data);
    },

    //Faz a requisição para a API para deletar uma disciplina
    deleteSubject: async(state, subjectId) => {
        const { data } = await axios.delete(`${config.subject}/${subjectId}`);

        return data;
    }
};

export default actions;