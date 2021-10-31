export default {
    data() {
        return {
            nameRules: [
                v => !!v || 'Campo nome é obrigatório!',
                v => (v && v.length >= 5) || 'O campo nome deve ter 5 ou mais caracteres!',
                v => (v && v.length <= 30) || 'O campo nome deve ter 30 ou menos caracteres!',
            ],
        } 
    }
}