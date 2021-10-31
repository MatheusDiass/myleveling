import emailValidation from "../../helpers/emailValidation";
import passwordValidation from "../../helpers/passwordValidation";

export default {
    data() {
        return {
            nameRules: [
                v => !!v || 'Campo nome é obrigatório!',
                v => (v && v.length >= 2) || 'O campo nome deve ter 3 ou mais caracteres!',
                v => (v && v.length <= 20) || 'O campo nome deve ter 20 ou menos caracteres!',
            ],

            nicknameRules: [
                v => !!v || 'Campo nickname é obrigatório!',
                v => (v && v.length >= 5) || 'O campo nome deve ter 5 ou mais caracteres!',
                v => (v && v.length <= 15) || 'O campo nome deve ter 15 ou menos caracteres!',
            ],

            emailRules: [
                v => !!v || 'Campo email é obrigatório!',
                v => emailValidation(v) || 'Digite o email corretamente!'
            ],

            passwordRules: [
                v => !!v || 'Campo senha é obrigatório!',
                v => passwordValidation(v) || 'A senha deve ter 8 caracteres com 1 letra maiuscula, 1 letra minuscula, 1 simbolo e 1 número'
            ]
        } 
    }
}