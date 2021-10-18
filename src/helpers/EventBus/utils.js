import EventBus from './index'

//Cria notificação
export function createNotify(obj) {
    const notifyObject = {
        id: Date.now(),
        delay: 5000,
        ...obj,
    };

    //Emit o evento passando os dados da notificação
    EventBus.$emit('notify', notifyObject);
}