import emailValidation from '../../helpers/emailValidation';
import passwordValidation from '../../helpers/passwordValidation';
import nicknameValidation from '@/helpers/nicknameValidation';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
    data() {
        return {
            //Armazenado a mensagem de erro quando o nickname já existe
            nicknameExistMessage: '',

            nicknameLoading: false,

            nameRules: [
                (v) => !!v || 'Campo nome é obrigatório!',
                (v) =>
                (v && v.length >= 2) ||
                'O campo nome deve ter 3 ou mais caracteres!',
                (v) =>
                (v && v.length <= 20) ||
                'O campo nome deve ter 20 ou menos caracteres!',
            ],

            nicknameRules: [
                (v) => !!v || 'Campo nickname é obrigatório!',
                (v) =>
                (v && v.length >= 5) ||
                'O campo nome deve ter 5 ou mais caracteres!',
                (v) =>
                (v && v.length <= 15) ||
                'O campo nome deve ter 15 ou menos caracteres!',
            ],

            emailRules: [
                (v) => !!v || 'Campo email é obrigatório!',
                (v) => emailValidation(v) || 'Digite o email corretamente!',
            ],

            passwordRules: [
                (v) => !!v || 'Campo senha é obrigatório!',
                (v) =>
                passwordValidation(v) ||
                'A senha deve ter 8 caracteres com 1 letra maiuscula, 1 letra minuscula, 1 simbolo e 1 número',
            ],
        };
    },

    watch: {
        //Utilizado para fazer a validação do nickname junto com o metódo "nicknameValidation"
        nickname(value) {
            if (value.length >= 5 && value.length <= 15) {
                this.nicknameValidation(value);
            } else {
                this.nicknameExistMessage = '';
            }
        },
    },

    methods: {
        //Faz a verificação para ver se o nickname existe ou não (validação do campo "nickname")
        async nicknameValidation(nickname) {
            this.nicknameLoading = true;

            try {
                //Faz a validação do nickname, chamando a API
                const res = await nicknameValidation(nickname);

                if (res) {
                    this.nicknameExistMessage = '';
                } else {
                    this.nicknameExistMessage = 'Nickname já existe!';
                }
            } catch (error) {
                let errorMessage = '';

                if (error.response) {
                    //Se a API retornar "NICKNAMEFIREBASEERROR" ocorreu um erro ao obter o nickname no firebase
                    if (error.response.data === 'NICKNAMEFIREBASEERROR') {
                        errorMessage = 'Não foi possível validar o nickname';
                    }
                } else {
                    errorMessage = 'Não foi possível se conectar com a API!';
                }

                //Cria a notificação
                createNotify({
                    type: NOTIFICATION_TYPE.ERROR,
                    message: errorMessage,
                });
            }

            this.nicknameLoading = false;
        },
    },
};