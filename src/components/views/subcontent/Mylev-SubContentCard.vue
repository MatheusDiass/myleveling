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
               <v-btn color="#3898ec" @click="saveEdit">Salvar</v-btn>
            </div>
         </v-form>
      </v-card>

      <MylevLoading :isLoading="isLoading" />
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

   props: {
      isEdit: {
         type: Boolean,
         default: false,
      },

      subContent: {
         type: Object,
         default: () => ({}),
      },
   },

   components: {
      Editor,
      MylevLoading,
   },

   async created() {
      //Se for página de edição
      //Atribui ao campo
      if (this.isEdit) {
         this.title = this.subContent.title;
         this.subjectId = this.subContent.subjectId;
         this.content = this.subContent.content;
      }

      //Exibe o componente de carregamento
      this.loading(true);

      try {
         //Obtem todas as matérias para serem listadas no dropdown
         await this.fecthSubjects();
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
      this.loading(false);
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
         'editSubContent',
         'deleteFile',
      ]),

      //Salva a matéria
      async addNewSubContent() {
         const subContent = {
            title: this.title,
            subjectId: this.subjectId,
            content: this.content,
         };

         //Salva no firebase os dados iniciais(Título, conteúdo e o ID da matéria)
         const id = await this.addSubContent(subContent);

         //Compila o video para ser enviado para a API
         const formDataVideo = new FormData();
         formDataVideo.append('video', this.video);

         //Compila o arquivo para ser enviado para a API
         const formDataFile = new FormData();
         formDataFile.append('file', this.file);

         //Faz o upload do video no storage
         await this.addSubContentVideo({
            id,
            video: formDataVideo,
         });

         //Faz o upload do arquivo no storage
         await this.addSubContentFile({
            id,
            file: formDataFile,
         });
      },

      async updateSubContent() {
         //Obtem o ID da disciplina contida na URL
         const subContentId = this.getSubContentId();

         const subContent = {
            title: this.title,
            subjectId: this.subjectId,
            content: this.content,
         };

         //Atualiza a matéria
         await this.editSubContent({
            subContent,
            subContentId,
         });

         if (this.hasVideo) {
            const subContentInfoVideo = {
               subContentId,
               fileName: this.subContent.videoName,
               typeFile: 'VIDEO',
            };

            //Deleta o video no storage
            await this.deleteFile(subContentInfoVideo);

            //Compila o video para ser enviado para a API
            const formDataVideo = new FormData();
            formDataVideo.append('video', this.video);

            //Faz o upload do video no storage
            await this.addSubContentVideo({
               subContentId,
               video: formDataVideo,
            });
         } 
         
         if (this.hasFile) {
            const subContentInfoFile = {
               subContentId,
               fileName: this.subContent.fileName,
               typeFile: 'FILE',
            };

            //Deleta o video no storage
            await this.deleteFile(subContentInfoFile);

            //Compila o arquivo para ser enviado para a API
            const formDataFile = new FormData();
            formDataFile.append('file', this.file);

            //Faz o upload do arquivo no storage
            await this.addSubContentFile({
               subContentId,
               file: formDataFile,
            });
         }
      },

      async saveEdit() {
         //Exibe o componente de carregamento
         this.loading(true);

         //Se o formulário estiver validado, adiciona ou atualiza a matéria
         if (this.$refs.form.validate()) {
            try {
               if (this.isEdit) {
                  await this.updateSubContent();

                  //Cria a notificação
                  createNotify({
                     type: NOTIFICATION_TYPE.SUCCESS,
                     message: 'Matéria atualizada com sucesso',
                  });
               } else {
                  await this.addNewSubContent();

                  //Cria a notificação
                  createNotify({
                     type: NOTIFICATION_TYPE.SUCCESS,
                     message: 'Matéria adicionada com sucesso',
                  });
               }

               //Muda para a página de listagem das matérias
               this.$router.push({ name: 'ListSubContents' });
            } catch (error) {
               console.log('matheus', error);
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
         }

         //Remove o componente de carregamento
         this.loading(false);
      },

      //Emite um evento para exibir ou remover o componente de carregamento
      loading(isLoading) {
         this.$emit('loading', isLoading);
      },

      //Obtem o ID da disciplina contida na URL
      getSubContentId() {
         return this.$route.params.id;
      },
   },
};
</script>
