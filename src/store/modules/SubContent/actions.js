import axios from "axios";
//import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";
import MUTATIONS_TYPES from "./mutationTypes";


const actions = {
    //Faz a requisição para a API para salvar uma nova matéria 
    addSubContent: async(state, subContent) => {
        const { data } = await axios.post(config.subContent, subContent);

        return data;
    },

    //Faz a requisição para a API para salvar o video da matéria
    addSubContentVideo: async(state, { subContentId, video }) => {
        const { data } = await axios.post(`${config.subContentVideo}/${subContentId}`, video);

        return data;
    },

    //Faz a requisição para a API para salvar o arquivo da matéria
    addSubContentFile: async(state, { subContentId, file }) => {
        const { data } = await axios.post(`${config.subContentFile}/${subContentId}`, file);

        return data;
    },

    //Faz a requisição para a API para obter uma matéria pelo ID 
    fecthSubContentById: async({ commit }, { subContentId }) => {
        const { data } = await axios.get(`${config.subContent}/${subContentId}`);

        commit(MUTATIONS_TYPES.setSubContent, data);
    },

    //Faz a requisição para a API para obter todas as matérias
    fecthSubContents: async({ commit }) => {
        let { data } = await axios.get(`${config.subContent}`);

        commit(MUTATIONS_TYPES.setSubContents, data);
    },

    //Faz a requisição para a API para obter todas as matérias por uma disciplina
    fecthSubContentsBySubject: async({ commit }, { subjectId }) => {
        const { data } = await axios.get(`${config.subContent}/subject/${subjectId}`);

        commit(MUTATIONS_TYPES.setSubContentsBySubject, data);
    },

    //Faz a requisição para a API para editar uma matéria
    editSubContent: async(state, { subContent, subContentId }) => {
        const { data } = await axios.put(`${config.subContent}/${subContentId}`, subContent);

        return data;
    },

    //Faz a requisição para a API para deletar um arquivo da matéria
    deleteFile: async(state, subContentInfo) => {
        const { data } = await axios.delete(`${config.subContent}/${subContentInfo.subContentId}/${subContentInfo.fileName}/${subContentInfo.typeFile}`);

        return data;
    },

    //Faz a requisição para a API para deletar uma matéria
    deleteSubContent: async(state, subContentInfo) => {
        const { data } = await axios.delete(`${config.subContent}/${subContentInfo.id}/${subContentInfo.data.videoName}/${subContentInfo.data.fileName}`);

        return data;
    }
};

export default actions;