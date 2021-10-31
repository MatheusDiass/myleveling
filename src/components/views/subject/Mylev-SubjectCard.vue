<template>
   <div class="externalDivBorder">
      <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
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
import { mapActions, mapGetters } from 'vuex'
import subjectValidation from '@/mixins/validations/subjectValidation'
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus'

export default {
   name: 'MylevSubjectCard',

   mixins: [subjectValidation],

   data() {
      return {
         subjectName: '',
      }
   },

   props: {
      isEdit: {
         type: Boolean,
         required: true,
      },
   },

   async created() {
      //Se for página de edição
      if (this.isEdit) {
         let subjectId = this.getSubjectId()

         try {
            //Pega a matéria pelo ID
            await this.fecthSubjectById({ subjectId })

            //Atribui ao campo
            this.subjectName = this.subject.name
         } catch (error) {
            let errorMessage = ''

            if (error.response) {
               errorMessage = error.response.data
            } else {
               errorMessage = 'Não foi possível se conectar com a API!'
            }

            //Exibe o Alert de erro
            this.showAlertMessage({ show: true, message: errorMessage })
         }
      }
   },

   //Remove o Alert de erro ao sair da página
   beforeDestroy() {
      this.showAlertMessage({ show: false, message: '' })
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subject', ['subject']),
   },

   methods: {
      //Actions vuex
      ...mapActions(['showSnackbarMessage', 'showAlertMessage']),
      ...mapActions('subject', [
         'addSubject',
         'editSubject',
         'fecthSubjectById',
      ]),

      //Salva a matéria
      async addNewSubject() {
         let data = {
            name: this.subjectName,
         }

         try {
            let res = await this.addSubject(data)

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.SUCCESS,
               message: res,
            })

            //Muda para a página de listagem das matérias
            this.$router.push({ name: 'ListSubjects' })
         } catch (error) {
            let errorMessage = ''

            if (error.response) {
               errorMessage = error.response.data
            } else {
               errorMessage = 'Não foi possível se conectar com a API!'
            }

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.ERROR,
               message: errorMessage,
            })
         }
      },

      //Atualiza uma matéria
      async updateSubject() {
         let subject = {
            id: this.getSubjectId(),
            name: this.subjectName,
         }

         try {
            let res = await this.editSubject({ subject })

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.SUCCESS,
               message: res,
            })

            //Muda para a página de listagem das matérias
            this.$router.push({ name: 'ListSubjects' })
         } catch (error) {
            let errorMessage = ''

            if (error.response) {
               errorMessage = error.response.data
            } else {
               errorMessage = 'Não foi possível se conectar com a API!'
            }

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.ERROR,
               message: errorMessage,
            })
         }
      },

      //Pega o ID da matéria contida na URL
      getSubjectId() {
         return this.$route.params.id
      },

      //Salva ou atualiza a matéria dependendo da página em que estiver
      async saveEdit() {
         //Se o formulário estiver validado, salva ou atualiza a matéria
         if (this.$refs.form.validate()) {
            //Se estiver na página de edição
            if (this.isEdit) {
               //Atualiza a matéria
               this.updateSubject()

               //Se estiver na página de adicionar
            } else {
               //Adiciona matéria
               this.addNewSubject()
            }
         }
      },
   },
}
</script>

<style scoped></style>
