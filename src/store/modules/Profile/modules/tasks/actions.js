import axios from 'axios';
import MUTATIONS_TYPES from './mutationTypes';
import config from '@/configuration/configuration.json';

const actions = {
    //Faz a requisição para a API para obter todos as tarefas de um usuário
    fetchAllTasksByUser: async({ commit }, { uid }) => {
        const { data } = await axios.get(`${config.task}/${uid}`);

        commit(MUTATIONS_TYPES.setTasks, data);
    },
    //Faz a requisição para a API para deletar uma tarefa
    addTask: async(state, task) => {
        const { data } = await axios.post(`${config.task}`, task);

        return data;
    },

    //Faz a requisição para a API para editar uma tarefa
    editTask: async(state, task) => {
        const { data } = await axios.put(`${config.task}`, task);

        return data;
    },

    //Faz a requisição para a API para deletar uma tarefa
    deleteTask: async(state, taskId) => {
        const { data } = await axios.delete(`${config.task}/${taskId}`);

        return data;
    }
}

export default actions;