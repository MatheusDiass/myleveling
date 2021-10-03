import axios from "axios";
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";


const actions = {
    fecthSubjects: async ({ commit }) => {
        let { data } = await axios.get(`${config.subject}`);

        commit(MUTATIONS_TYPES.setSubjects, data);
    },

    addSubject: async (state, subject) => {
        let { data } = await axios.post(config.subject, subject);

        return data;
    },

    editSubject: async (state, { subjectId, subject }) => {
        let { data } = await axios.post(`${config.subject}/${subjectId}`, subject);

        return data;
    },

    deleteSubject: async (state, subjectId ) => {
        let { data } = await axios.delete(`${config.subject}/${subjectId}`);

        return data;
    }
};

export default actions;