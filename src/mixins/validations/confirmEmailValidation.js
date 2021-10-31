export default {
    data() {
        return {
            codeRules: [
                v => !!v || 'Campo código é obrigatório!',
                v => (v && v.length > 0 && v.length == 6) || 'O campo código deve ter 6 caracteres!',
            ],
        } 
    }
}