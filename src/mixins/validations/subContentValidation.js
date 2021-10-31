import { videoValidation } from "../../helpers/filesValidation";
import { fileValidation } from "../../helpers/filesValidation";

export default {
    data() {
        return {
            titleRules: [
                v => !!v || 'Campo títilo é obrigatório!',
                v => (v && v.length >= 4) || 'O campo nome deve ter 4 ou mais caracteres!',
                v => (v && v.length <= 15) || 'O campo nome deve ter 15 ou menos caracteres!',
            ],

            sujectRules: [
                v => !!v || 'Campo matéria é obrigatório!'
            ],

            videoRules: [
                v => !!v || 'Campo vídeo é obrigatório!',
                v => (v && videoValidation(v)) || 'A extensão de videos permitidos são: mp4, mkv, avi, mpeg, mov!',
            ],

            fileRules: [
                v => !!v || 'Campo materiais é obrigatório!',
                v => (v && fileValidation(v)) || 'A extensão de arquivos permitidos são: docx, pdf, txt!',
            ]
        } 
    }
}