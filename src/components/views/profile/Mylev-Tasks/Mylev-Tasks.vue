<template>
   <v-card color="#499fc6" rounded="lg" elevation="6">
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
            <v-date-picker
               event-color="#499fc6"
               :events="events"
               width=""
               no-title
            ></v-date-picker>
            <v-divider />
         </div>
      </v-expand-transition>

      <v-virtual-scroll
         v-if="hasTasks"
         :bench="5"
         :items="tasks"
         height="200"
         item-height="64"
      >
         <template v-slot:default="{ item }">
            <v-list-item class="pl-10 pr-10" :key="item.id">
               <v-row>
                  <v-list-item-content>
                     <v-list-item-title>{{
                        item.data.title
                     }}</v-list-item-title>
                     <v-list-item-subtitle>{{
                        taskDueDate(item.data.duedate)
                     }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action style="display: contents">
                     <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn class="mt-3" icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-dots-vertical</v-icon>
                           </v-btn>
                        </template>

                        <v-list class="color">
                           <v-list-item>
                              <v-btn
                                 elevation="0"
                                 class="textColor"
                                 text
                                 @click="openTasksDialog(true, item)"
                                 ><v-icon>mdi-pencil</v-icon>Editar</v-btn
                              >
                           </v-list-item>
                           <v-list-item>
                              <v-btn
                                 elevation="0"
                                 class="textColor"
                                 color="red darken-3"
                                 text
                                 @click="openDialog(item)"
                                 ><v-icon>mdi-delete</v-icon>Deletar</v-btn
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

      <MylevAlert
         :show="!hasTasks"
         :styleClasses="[
            'contentCenter',
            smallScreenMargin,
            smallScreenMarginBtn,
         ]"
         :type="'info'"
         :message="'Você ainda não tem tarefas'"
      />

      <v-btn @click="openTasksDialog(false)" class="ml-7 mb-5" text
         >Nova Tarefa</v-btn
      >

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

      <MylevTasksDialog
         v-if="showTasksDialog"
         :show="showTasksDialog"
         :isEdit="isEdit"
         :task="task"
         @closeTasksDialog="closeTasksDialog"
      />
   </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { dateTime, css } from '@/mixins';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import MylevTasksDialog from './components/Mylev-Tasks-Dialog.vue';
import MylevAlert from '../../../shared/Mylev-Alert.vue';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevTasks',

   mixins: [dateTime, css],

   data() {
      return {
         showDialog: false,
         showTasksDialog: false,
         isEdit: false,
         displayCalendar: false,
         taskToDelete: {},
         task: {},
         events: [],
      };
   },

   components: {
      MylevDialog,
      MylevTasksDialog,
      MylevAlert,
   },

   async created() {
      //Obtem todos as tarefas de um usuário
      await this.fetchAllTasksByUser({ uid: this.profile.uid });

      this.createEventsCalendar(this.tasks);
   },

   computed: {
      //Getters vuex
      ...mapGetters('profile', ['profile']),
      ...mapGetters('profile/task', ['tasks']),

      hasTasks() {
         return this.tasks.length > 0 ? true : false;
      },

      smallScreenMarginBtn() {
         return this.hasTasks ? '' : 'mb-4';
      },
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

            //Atualiza as tarefas
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

      //Crios evetos para o calendário
      createEventsCalendar(tasks) {
         this.events = [];

         tasks.forEach((task) => {
            this.events.push(task.data.duedate);
         });
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

      //Abre o dialogo para adiconar ou editar uma tarefa
      openTasksDialog(isEdit, task) {
         this.task = task;
         this.showTasksDialog = true;
         this.isEdit = isEdit;
      },

      //Fecha o dialogo
      closeTasksDialog(event) {
         this.showTasksDialog = event;
      },
   },
};
</script>
