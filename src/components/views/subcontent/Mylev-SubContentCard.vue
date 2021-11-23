<template>
   <div class="externalDivBorder">
      <v-card class="paddingCard" color="#499fc6" rounded="lg" elevation="6">
         <v-form ref="form">
            <label>Título:</label>
            <v-text-field
               v-model="title"
               :rules="titleRules"
               counter="15"
               background-color="white"
               outlined
            ></v-text-field>

            <label>Disciplina:</label>
            <v-select
               v-model="subjectId"
               :rules="sujectRules"
               :items="subjects"
               item-text="data.name"
               item-value="id"
               background-color="white"
               outlined
            ></v-select>

            <label>Conteúdo:</label>
            <Editor
               v-model="content"
               api-key="zffi3dnax0zgaazxgxnnaf92v9t2ks1mi0rgg57nwfry9872"
            />

            <br />

            <label>Video da aula:</label>
            <v-checkbox
               v-model="hasVideo"
               label="Clique para desbloquar a opção"
            ></v-checkbox>
            <v-file-input
               v-model="video"
               :rules="hasVideo ? videoRules : []"
               :disabled="!hasVideo"
               ref="video"
               background-color="white"
               outlined
            ></v-file-input>

            <label>Matériais</label>
            <v-checkbox
               v-model="hasFile"
               label="Clique para desbloquar a opção"
            ></v-checkbox>
            <v-file-input
               v-model="file"
               :rules="hasFile ? fileRules : []"
               :disabled="!hasFile"
               ref="file"
               background-color="white"
               outlined
            ></v-file-input>

            <div class="contentCenter">
               <v-btn color="#3898ec" @click="addNewSubContent">Salvar</v-btn>
            </div>
         </v-form>
      </v-card>

      <MylevLoading :isLoading="isLoading"/>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';
import subContentValidation from '@/mixins/validations/subContentValidation';
import Editor from '@tinymce/tinymce-vue';
import MylevLoading from '../../shared/Mylev-Loading.vue';

const ALLOWEXTENSIONS = ['mp4', 'mkv', 'avi', 'mpeg', 'mov'];

export default {
   name: 'MylevSubContent',

   mixins: [subContentValidation],

   data() {
      return {
         title: '',
         subjectId: '',
         content: '',
         video: null,
         file: null,
         hasVideo: false,
         hasFile: false,
         allowExtensions: ALLOWEXTENSIONS,
         isLoading: false,
      };
   },

   components: {
      Editor,
      MylevLoading,
   },

   async created() {
      //Obtem todas as matérias para serem listadas na tabela
      await this.fecthSubjects();
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subject', ['subjects']),
   },

   methods: {
      //Actions Vuex
      ...mapActions('subject', ['fecthSubjects']),
      ...mapActions('subContent', [
         'addSubContent',
         'addSubContentVideo',
         'addSubContentFile',
      ]),

      //Salva a matéria
      async addNewSubContent() {
         if (this.$refs.form.validate()) {
            //Exibe o componente de carregamento
            this.isLoading = true;

            const subContent = {
               title: this.title,
               subjectId: this.subjectId,
               content: this.content,
            };

            try {
               //Salva no firebase os dados iniciais(Título, conteúdo e o ID da matéria)
               const id = await this.addSubContent(subContent);

               //Compila o video para ser enviado para a API
               const formDataVideo = new FormData();
               formDataVideo.append('video', this.video);

               //Compila o arquivo para ser enviado para a API
               const formDataFile = new FormData();
               formDataFile.append('file', this.file);

               //Faz o upload do video no firebase
               await this.addSubContentVideo({
                  subjectId: this.subjectId,
                  id,
                  video: formDataVideo,
               });

               //Faz o upload do arquivo no firebase
               const res = await this.addSubContentFile({
                  subjectId: this.subjectId,
                  id,
                  file: formDataFile,
               });

               //Cria a notificação
               createNotify({
                  type: NOTIFICATION_TYPE.SUCCESS,
                  message: res,
               });

               //Muda para a página de listagem das matérias
               this.$router.push({ name: 'Home' });
            } catch (error) {
               let errorMessage = '';

               if (error.response) {
                  errorMessage = error.response.data;
               } else {
                  errorMessage = 'Não foi possível se conectar com a API!';
               }

               //Cria a notificação
               createNotify({
                  type: NOTIFICATION_TYPE.ERROR,
                  message: errorMessage,
               });
            }

            //Remove o componente de carregamento
            this.isLoading = false;
         }
      },
   },
};
</script>
