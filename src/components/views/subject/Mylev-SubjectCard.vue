<template>
   <div class="externalDivBorder">
      <v-card class="paddingCard" color="#499fc6" rounded="lg" elevation="6">
         <v-form ref="form">
            <label>Nome:</label>
            <v-text-field
               v-model="subjectName"
               :rules="nameRules"
               counter="30"
               background-color="white"
               outlined
            ></v-text-field>

            <div class="contentCenter">
               <v-btn color="#3898ec" @click="saveEdit">Salvar</v-btn>
            </div>
         </v-form>
      </v-card>
   </div>
</template>

<script>
import { mapActions } from 'vuex';
import subjectValidation from '@/mixins/validations/subjectValidation';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevSubjectCard',

   mixins: [subjectValidation],

   data() {
      return {
         subjectName: '',
         isLoading: false,
      };
   },

   props: {
      isEdit: {
         type: Boolean,
         default: false,
      },

      subject: {
         type: Object,
         default: () => ({}),
      },
   },

   created() {
      //Se for página de edição
      //Atribui ao campo
      if (this.isEdit) {
         this.subjectName = this.subject.name;
      }
   },

   methods: {
      //Actions vuex
      ...mapActions('subject', ['addSubject', 'editSubject']),

      //Salva a disciplina
      async addNewSubject() {
         let data = {
            name: this.subjectName,
         };

         const res = await this.addSubject(data);

         return res;
      },

      //Atualiza uma disciplina
      async updateSubject() {
         let subject = {
            id: this.getSubjectId(),
            name: this.subjectName,
         };

         const res = await this.editSubject({ subject });

         return res;
      },

      //Obtem o ID da disciplina contida na URL
      getSubjectId() {
         return this.$route.params.id;
      },

      //Salva ou atualiza a disciplina dependendo da página em que estiver
      async saveEdit() {
         //Exibe o componente de carregamento
         this.loading(true);

         //Se o formulário estiver validado, adiciona ou atualiza a disciplina
         if (this.$refs.form.validate()) {
            try {
               //Se estiver na página de edição
               if (this.isEdit) {
                  //Atualiza a disciplina
                  const res = await this.updateSubject();

                  //Cria a notificação
                  createNotify({
                     type: NOTIFICATION_TYPE.SUCCESS,
                     message: res,
                  });

                  //Se estiver na página de adicionar
               } else {
                  //Adiciona disciplina
                  const res = await this.addNewSubject();

                  //Cria a notificação
                  createNotify({
                     type: NOTIFICATION_TYPE.SUCCESS,
                     message: res,
                  });
               }
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
         }

         //Remove o componente de carregamento
         this.loading(false);
      },

      //Emite um evento para exibir ou remover o componente de carregamento
      loading(isLoading) {
         this.$emit('loading', isLoading);
      },
   },
};
</script>

<style scoped></style>
