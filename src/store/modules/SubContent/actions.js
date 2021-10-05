import axios from "axios";
//import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";


const actions = {
    //Faz a requisição para a API para salvar um novo subconteúdo 
    addSubContent: async (state, subContent) => {
        const { data } = await axios.post(config.subContent, subContent);

        return data;
    },

    //Faz a requisição para a API para salvar o video do subconteúdo 
    addSubContentVideo: async (state, { subjectId, id, video }) => {
        const { data } = await axios.post(`${config.subContentVideo}/${subjectId}/${id}`, video);

        return data;
    }
};

export default actions;