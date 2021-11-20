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
    addSubContentVideo: async(state, { subjectId, id, video }) => {
        const { data } = await axios.post(`${config.subContentVideo}/${subjectId}/${id}`, video);

        return data;
    },

    //Faz a requisição para a API para salvar o arquivo da matéria
    addSubContentFile: async(state, { subjectId, id, file }) => {
        const { data } = await axios.post(`${config.subContentFile}/${subjectId}/${id}`, file);

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

    //Faz a requisição para a API para deletar uma matéria
    deleteSubContent: async(state, subContentInfo) => {
        let { data } = await axios.delete(`${config.subContent}/${subContentInfo.data.subjectId}/${subContentInfo.id}/${subContentInfo.data.videoName}/${subContentInfo.data.fileName}`);

        return data;
    }
};

export default actions;