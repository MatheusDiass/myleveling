import dayjs from "dayjs";

export default {
    data() {
        return {
            titleRules: [
                (v) => !!v || 'O campo títilo é obrigatório!',
                (v) =>
                (v && v.length >= 5 && v.length <= 15) ||
                'O campo título deve ter entre 5 e 15 caracteres!',
            ],

            descriptionRules: [
                (v) => !!v || 'O campo descrição é obrigatório!',
                (v) =>
                (v && v.length >= 5 && v.length <= 30) ||
                'O campo descrição deve ter entre 5 e 30 caracteres!',
            ],

            dueDateRules: [
                (v) => !!v || 'O campo data de vencimento é obrigatório!',
                (v) =>
                (v &&
                    dayjs(v.split('/').reverse().join('-')) >=
                    dayjs(dayjs().format('YYYY-MM-DD'))) ||
                'A data de vencimento informada é inválida, ela deve ser maior ou igual a data atual!',
            ],
        };
    },
}