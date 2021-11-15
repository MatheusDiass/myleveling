<template>
   <v-card color="#499fc6" rounded="lg" flat>
      <v-row>
         <v-col cols="7">
            <v-card-title
               class="ml-3 contentCenter"
               style="justify-content: start"
               >Tarefas</v-card-title
            >
         </v-col>
         <v-col cols="5"
            ><v-card-title
               class="mr-4 contentCenter"
               style="justify-content: end"
               ><v-icon @click="toggleCalendar"
                  >mdi-calendar</v-icon
               ></v-card-title
            ></v-col
         >
      </v-row>

      <v-divider v-show="displayCalendar"></v-divider>

      <v-expand-transition>
         <div class="ma-2" v-show="displayCalendar">
            <v-date-picker width="" no-title></v-date-picker>
            <v-divider />
         </div>
      </v-expand-transition>

      <v-virtual-scroll :bench="5" :items="tasks" height="200" item-height="64">
         <template v-slot:default="{ item }">
            <v-list-item class="mb-2 pl-10 pr-10" :key="item.id">
               <v-row>
                  <v-list-item-content>{{
                     item.data.title
                  }}</v-list-item-content>
                  <v-list-item-action style="display: contents">
                     <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn class="mt-2" icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-dots-vertical</v-icon>
                           </v-btn>
                        </template>

                        <v-list class="color">
                           <v-list-item>
                              <v-btn elevation="0" class="textColor" text
                                 >Editar</v-btn
                              >
                           </v-list-item>
                           <v-list-item>
                              <v-btn
                                 elevation="0"
                                 class="textColor"
                                 text
                                 @click="openDialog(item)"
                                 >Deletar</v-btn
                              >
                           </v-list-item>
                        </v-list>
                     </v-menu>
                  </v-list-item-action>
               </v-row>
            </v-list-item>

            <v-divider></v-divider>
         </template>
      </v-virtual-scroll>

      <MylevDialog
         :show="showDialog"
         title="Aviso!"
         content="Deseja realmente deletar a tarefa ?"
         :confirmButton="true"
         confirmButtonText="Deletar"
         :cancelButton="true"
         @confirm="removeTask"
         @closeDialog="closeDialog"
      />
   </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevTasks',

   data() {
      return {
         showDialog: false,
         displayCalendar: false,
         taskToDelete: {},
      };
   },

   components: {
      MylevDialog,
   },

   async created() {
      //Obtem todos as tarefas de um usuário
      await this.fetchAllTasksByUser({ uid: this.profile.uid });
   },

   computed: {
      //Getters vuex
      ...mapGetters('profile', ['profile']),
      ...mapGetters('profile/task', ['tasks']),
   },

   methods: {
      //Actions vuex
      ...mapActions('profile/task', ['fetchAllTasksByUser', 'deleteTask']),

      toggleCalendar() {
         if (!this.displayCalendar) {
            this.displayCalendar = !this.displayCalendar;
         } else {
            this.displayCalendar = false;
         }
      },

      async removeTask() {
         try {
            //Deleta a tarefa
            const res = await this.deleteTask(this.taskToDelete.id);

            //Remove a tarefa do array que está listando as tarefas
            const newTasks = this.tasks.filter(
               (task) => task.id != this.taskToDelete.id
            );

            this.$store.commit('profile/task/setTasks', newTasks);

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

         //Fecha o dialogo de deleção da tarefa
         this.showDialog = false;
      },

      /*Atribuí uma tarefa a variavel "taskToDelete" (tarefa que será deletada)
      e abre o dialogo para a deleção da tarefa */
      openDialog(task) {
         this.taskToDelete = task;
         this.showDialog = true;
      },

      /*Remove a tarefa da variavel "taskToDelete" (tarefa que não foi excluída)
      e fecha o dialogo de deleção da tarefa*/
      closeDialog(event) {
         this.taskToDelete = {};
         this.showDialog = event;
      },
   },
};
</script>
