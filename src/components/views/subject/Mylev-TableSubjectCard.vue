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
   </div>
</template>

<script>
import { mapActions } from 'vuex';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevTableSubjectCard',

   props: {
      subjects: {
         type: Array,
         required: true,
      },
   },

   data() {
      return {
         showDialog: false,
         subjectToDelete: {},
      };
   },

   components: {
      MylevDialog,
   },

   methods: {
      //Actions Vuex
      ...mapActions('subject', ['deleteSubject']),

      async removeSubject() {
         //Fecha o dialogo de deleção da disciplina
         this.showDialog = false;

         //Exibe o componente de carregamento
         this.loading(true);

         try {
            //Deleta a disciplina
            let res = await this.deleteSubject(this.subjectToDelete.subjectId);

            //Remove a disciplina do array que está listando as disciplinas
            const newSubjects = this.subjects.filter(
               (subject) => subject.id != this.subjectToDelete.subjectId
            );

            //Atualiza as disciplinas
            this.$store.commit('subject/setSubjects', newSubjects);

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
         this.loading(false);
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

      //Emite um evento para exibir ou remover o componente de carregamento
      loading(isLoading) {
         this.$emit('loading', isLoading);
      }
   },
};
</script>
