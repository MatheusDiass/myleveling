<template>
   <div>
      <v-card rounded="lg" elevation="6">
         <v-simple-table class="textCenter">
            <thead class="color">
               <tr class="headerBorderLeft">
                  <th class="textColor textCenter">Nome da Disciplina</th>
                  <th class="textColor textCenter">Ações</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(subject, index) in subjects" :key="subject.id">
                  <td>{{ subject.data.name }}</td>
                  <td>
                     <div>
                        <v-btn
                           class="mx-2"
                           text
                           :to="{
                              name: 'EditSubject',
                              params: { id: subject.id },
                           }"
                           ><v-icon>mdi-pencil</v-icon>Editar</v-btn
                        >
                        <v-btn
                           class="mx-2"
                           color="red"
                           text
                           @click="openDialog({ index, subjectId: subject.id })"
                           ><v-icon>mdi-delete</v-icon>Deletar</v-btn
                        >
                     </div>
                  </td>
               </tr>
            </tbody>
         </v-simple-table>
      </v-card>

      <MylevDialog
         :show="showDialog"
         title="Aviso!"
         content="Deseja realmente deletar a disciplina ?"
         :confirmButton="true"
         confirmButtonText="Deletar"
         :cancelButton="true"
         @confirm="removeSubject"
         @closeDialog="closeDialog"
      />

      <MylevLoading :isLoading="isLoading" />
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import MylevLoading from '../../shared/Mylev-Loading.vue';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevTableSubjectCard',

   data() {
      return {
         showDialog: false,
         subjectToDelete: {},
         isLoading: false,
      };
   },

   components: {
      MylevDialog,
      MylevLoading,
   },

   async created() {
      //Obtem todas as disciplinas para serem listadas na tabela
      await this.fecthSubjects();
   },

   //Remove o Alert de erro ao sair da página
   beforeDestroy() {
      this.showAlertMessage({ show: false, message: '' });
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subject', ['subjects']),
   },

   methods: {
      //Actions Vuex
      ...mapActions(['showSnackbarMessage', 'showAlertMessage']),
      ...mapActions('subject', ['fecthSubjects', 'deleteSubject']),

      async removeSubject() {
         //Fecha o dialogo de deleção da disciplina
         this.showDialog = false;

         //Exibe o componente de carregamento
         this.isLoading = true;

         try {
            //Deleta a disciplina
            let res = await this.deleteSubject(this.subjectToDelete.subjectId);

            //Remove a disciplina do array que está listando as disciplinas
            this.subjects.splice(this.subjectToDelete.index, 1);

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.SUCCESS,
               message: res,
            });
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
      },

      /*Atribuí uma disciplina a variavel "subjectToDelete" (disciplina que será deletada)
      e abre o dialogo para a deleção da disciplina */
      openDialog(subject) {
         this.subjectToDelete = subject;
         this.showDialog = true;
      },

      /*Remove a disciplina da variavel "subjectToDelete" (disciplina que não foi excluída)
      e fecha o dialogo de deleção da disciplina*/
      closeDialog(event) {
         this.subjectToDelete = {};
         this.showDialog = event;
      },
   },
};
</script>
