<template>
   <div>
      <v-card rounded="lg" elevation="6">
         <v-simple-table class="textCenter">
            <thead class="color">
               <tr class="headerBorderLeft">
                  <th class="textColor textCenter">Nome da Matéria</th>
                  <th class="textColor textCenter">Ações</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="subContent in subContents" :key="subContent.id">
                  <td>{{ subContent.data.title }}</td>
                  <td>
                     <div>
                        <v-btn
                           class="mx-2"
                           text
                           :to="{
                              name: 'EditSubject',
                              params: { id: subContent.id },
                           }"
                           ><v-icon>mdi-pencil</v-icon>Editar</v-btn
                        >
                        <v-btn
                           class="mx-2"
                           color="red"
                           text
                           @click="openDialog(subContent)"
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
         content="Deseja realmente deletar a matéria ?"
         :confirmButton="true"
         confirmButtonText="Deletar"
         :cancelButton="true"
         @confirm="removeSubContent"
         @closeDialog="closeDialog"
      />

      <MylevLoading :isLoading="isLoading" />

      <MylevAlert
         :show="isError"
         :styleClasses="['contentCenter']"
         :type="'error'"
         :message="errorMessage"
      />
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import MylevLoading from '../../shared/Mylev-Loading.vue';
import MylevAlert from '../../shared/Mylev-Alert.vue';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevTableSubContentCard',

   data() {
      return {
         showDialog: false,
         subContentToDelete: {},
         isLoading: false,
         isError: false,
         errorMessage: '',
      };
   },

   components: {
      MylevDialog,
      MylevLoading,
      MylevAlert,
   },

   async created() {
      //Exibe o componente de carregamento
      this.isLoading = true;

      try {
         //Obtem todas as matérias para serem listadas na tabela
         await this.fecthSubContents();
      } catch (error) {
         this.isError = true;

         let errorMessage = '';

         if (error.response) {
            errorMessage = error.response.data;
         } else {
            errorMessage = 'Não foi possível se conectar com a API!';
         }

         this.errorMessage = errorMessage;
      }

      //Remove o componente de carregamento
      this.isLoading = false;
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subContent', ['subContents']),
   },

   methods: {
      //Actions Vuex
      ...mapActions('subContent', ['fecthSubContents', 'deleteSubContent']),

      async removeSubContent() {
         //Fecha o dialogo de deleção da disciplina
         this.showDialog = false;

         //Exibe o componente de carregamento
         this.isLoading = true;

         try {
            //Deleta a matéria
            let res = await this.deleteSubContent(this.subContentToDelete);

            //Remove a matéria do array que está listando as matérias
            const newSubContents = this.subContents.filter(
               (subContent) => subContent.id != this.subContentToDelete.id
            );

            //Atualiza as matérias
            this.$store.commit('subContent/setSubContents', newSubContents);

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

      /*Atribuí uma matéria a variavel "subContentToDelete" (matéria que será deletada)
      e abre o dialogo para a deleção da matéria */
      openDialog(subContent) {
         this.subContentToDelete = subContent;
         this.showDialog = true;
      },

      /*Remove a matéria da variavel "subContentToDelete" (matéria que não foi excluída)
      e fecha o dialogo de deleção da matéria*/
      closeDialog(event) {
         this.subContentToDelete = {};
         this.showDialog = event;
      },
   },
};
</script>
