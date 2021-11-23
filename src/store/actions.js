import axios from "axios";
//import MUTATIONS_TYPES from "./mutationTypes";
import config from "@/configuration/configuration.json";

const actions = {
    saveInititalProfileInformations: async(state, user) => {
        const { data } = await axios.post(`${config.login}`, user);

        return data;
    },
};

export default actions;