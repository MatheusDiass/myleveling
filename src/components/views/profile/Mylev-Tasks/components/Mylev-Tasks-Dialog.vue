<template>
   <v-dialog
      v-model="show"
      :fullscreen="$vuetify.breakpoint.mobile"
      width="550"
      persistent
   >
      <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
         <div class="pa-5">
            <h1>{{ titleDialog }}</h1>

            <br>

            <v-form>
               <label>Título:</label>
               <v-text-field
                  v-model="title"
                  background-color="white"
                  outlined
               ></v-text-field>

               <label>Descrição:</label>
               <v-text-field
                  v-model="description"
                  background-color="white"
                  outlined
               ></v-text-field>

               <label>Data de Vencimento:</label>
               <v-menu
                  v-model="closeCalendar"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="auto"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field
                        v-bind="attrs"
                        v-on="on"
                        :value="taskDueDate(dueDate)"
                        prepend-inner-icon="mdi-calendar"
                        background-color="white"
                        outlined
                     ></v-text-field>
                  </template>
                  <v-date-picker
                     v-model="dueDate"
                     no-title
                     @input="closeCalendar = false"
                  ></v-date-picker>
               </v-menu>

               <v-btn color="#3898ec" class="mr-10" @click="saveEdit"
                  >Salvar</v-btn
               >
               <v-btn color="#3898ec" @click="closeTasksDialog">Cancelar</v-btn>
            </v-form>
         </div>
      </v-card>
   </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { getCookie } from '@/helpers/managerCookies';
import { dateTime } from '@/mixins';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevTasksDialog',

   mixins: [dateTime],

   data() {
      return {
         title: '',
         description: '',
         dueDate: null,
         closeCalendar: false,
      };
   },

   props: {
      show: {
         type: Boolean,
         required: true,
         default: false,
      },

      isEdit: {
         type: Boolean,
         required: true,
         default: false,
      },

      task: {
         type: Object,
         default: () => ({}),
      },
   },

   created() {
      if (this.isEdit) {
         this.title = this.task.data.title;
         this.description = this.task.data.description;
         this.dueDate = this.task.data.duedate;
      }
   },

   computed: {
      titleDialog() {
         if(this.isEdit) {
            return 'Editar tarefa';
         } else {
            return 'Nova tarefa';
         }
      }
   },

   methods: {
      //Actions vuex
      ...mapActions('profile/task', [
         'addTask',
         'editTask',
         'fetchAllTasksByUser',
      ]),

      //Emite um event para o componente pai fechar o dialogo
      closeTasksDialog() {
         this.$emit('closeTasksDialog', false);
      },

      //Salva uma nova tarefa
      async addNewTask(userId) {
         const task = {
            uid: userId,
            title: this.title,
            description: this.description,
            duedate: this.dueDate,
         };

         const res = await this.addTask(task);

         return res;
      },

      //Atualiza a tarefa
      async updateTask() {
         const task = {
            id: this.task.id,
            title: this.title,
            description: this.description,
            duedate: this.dueDate,
         };

         const res = await this.editTask(task);

         return res;
      },

      //Salva ou atualiza a tarefa
      async saveEdit() {
         //Obtem o UID do usuário
         const userId = getCookie('profile').uid;

         let res = '';

         try {
            if (this.isEdit) {
               res = await this.updateTask();
            } else {
               res = await this.addNewTask(userId);
            }

            await this.fetchAllTasksByUser({ uid: userId });

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

         //Limpa os campos do dialogo
         this.clearFields();

         //Fecha o dialogo
         this.closeTasksDialog();
      },

      //Limpa os campos do dialogo
      clearFields() {
         (this.title = ''), (this.description = '');
         this.dueDate = '';
      },
   },
};
</script>
