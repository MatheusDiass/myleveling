import axios from "axios";
import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";

const actions = {
    showSnackbarMessage: ({ commit }, { show, message }) => {
        commit(MUTATIONS_TYPES.setShowSnackbar, { show, message });
    },

    showAlertMessage: ({ commit }, { show, message }) => {
        commit(MUTATIONS_TYPES.setShowAlert, { show, message });
    },

    saveInititalProfileInformations: async (state, user) => {
        const { data } = await axios.post(`${config.login}`, user);

        return data;
    },
};

export default actions;