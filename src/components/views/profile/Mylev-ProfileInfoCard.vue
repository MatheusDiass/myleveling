<template>
   <div>
      <v-row class="justify-start">
         <v-btn v-if="isDisable" color="#499fc6" @click="enableDisableFields"
            ><v-icon>mdi-pencil</v-icon>Editar Informações</v-btn
         >
         <v-btn
            class="mr-10"
            v-if="!isDisable"
            color="#499fc6"
            @click="enableDisableFields"
            ><v-icon>mdi-close-circle</v-icon>Cancelar</v-btn
         >
         <v-btn v-if="!isDisable" @click="updateProfile" color="#499fc6"
            >Salvar</v-btn
         >
      </v-row>

      <br />

      <v-card class="paddingCard" color="#499fc6" rounded="lg" elevation="6">
         <v-form ref="form">
            <label>Nome:</label>
            <v-text-field
               v-model="name"
               :disabled="isDisable"
               :rules="nameRules"
               counter="20"
               background-color="white"
               outlined
            ></v-text-field>

            <label>Nickname:</label>
            <v-text-field
               v-model="nickname"
               :disabled="isDisable"
               :rules="nicknameRules"
               :error-messages="nicknameExistMessage"
               counter="15"
               background-color="white"
               outlined
            >
               <template v-slot:append>
                  <v-progress-circular
                     v-if="nicknameLoading"
                     size="24"
                     color="#499fc6"
                     indeterminate
                  ></v-progress-circular>
               </template>
            </v-text-field>

            <label>Email:</label>
            <v-text-field
               v-model="email"
               :disabled="isDisable"
               :rules="emailRules"
               background-color="white"
               outlined
            ></v-text-field>

            <label>Senha:</label>
            <v-text-field
               v-model="password"
               :disabled="isDisable"
               :rules="passwordChanged ? passwordRules : []"
               background-color="white"
               outlined
            ></v-text-field>
         </v-form>
      </v-card>

      <MylevLoading :isLoading="isLoading"/>
   </div>
</template>

<script>
import registerValidation from '@/mixins/validations/registerValidation';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';
import { mapActions } from 'vuex';
import MylevLoading from '../../shared/Mylev-Loading.vue';

export default {
   name: 'MylevProfileInfoCard',

   mixins: [registerValidation],

   data() {
      return {
         name: this.profile.name,
         nickname: this.profile.nickname,
         email: this.profile.email,
         password: '',
         oldPassword: '',
         passwordChanged: false,
         isDisable: true,
         isLoading: false,
         passwordErrorMessage: '',
      };
   },

   props: {
      profile: {
         type: Object,
         required: true,
      },
   },

   components: {
      MylevLoading ,
   },

   watch: {
      password(value) {
         if (this.oldPassword != value) {
            this.passwordChanged = true;
         } else {
            this.passwordChanged = false;
         }
      },
   },

   computed: {
      nameChanged() {
         if (this.name.toLowerCase() != this.profile.name.toLowerCase()) {
            return true;
         }

         return false;
      },

      nicknameChanged() {
         if (
            this.nickname.toLowerCase() != this.profile.nickname.toLowerCase()
         ) {
            return true;
         }

         return false;
      },

      emailChanged() {
         if (this.email.toLowerCase() != this.profile.email.toLowerCase()) {
            return true;
         }

         return false;
      },
   },

   methods: {
      //Actions Vuex
      ...mapActions(['logout']),
      ...mapActions('profile', [
         'editName',
         'editNickname',
         'editEmail',
         'editPassword',
         'fetchProfileByUidOnFirestoreGoogle',
         'updateEmailSendConfirmation',
      ]),

      //Habilita ou desabilita os campos para edição
      enableDisableFields() {
         this.name = this.profile.name;
         this.nickname = this.profile.nickname;
         this.email = this.profile.email;
         this.password = '';
         this.isDisable = !this.isDisable;
      },

      async updateProfile() {
         if (this.$refs.form.validate()) {
            //Exibe o componente de carregamento
            this.isLoading = true;

            this.isDisable = true;

            if (this.nameChanged) {
               await this.updateName();
            }

            if (this.nicknameChanged) {
               await this.updateNickname();
            }

            if (this.emailChanged) {
               await this.updateEmail();
            }

            if (this.passwordChanged) {
               await this.updatePassword();
            }

            if((this.emailChanged && !this.passwordChanged) || (this.emailChanged && this.passwordChanged)) {
               //Muda para a página de "Confirmar Email
               this.$router.push({
                  name: 'ConfirmRegister',
                  params: { id: this.profile.uid },
               });
            } else if((!this.nameChanged && !this.nicknameChanged && !this.emailChanged) && this.passwordChanged) {
               this.logout();
            } else {
               await this.fetchProfileByUidOnFirestoreGoogle({ uid: this.profile.uid });
            }

            //Remove o componente de carregamento
            this.isLoading = false;
         }
      },

      //Atualiza o nome
      async updateName() {
         try {
            await this.editName(this.name);

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.SUCCESS,
               message: 'Nome atualizado com sucesso!',
            });
         } catch (error) {
            let errorMessage = '';

            switch (error.code) {
               case 4:
                  errorMessage = 'Erro de conexão com o Firebase!';
                  break;

               default:
                  if (error.response) {
                     errorMessage = error.response.data;
                  } else {
                     errorMessage = 'Não foi possível se conectar com a API!';
                  }
            }

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.ERROR,
               message: errorMessage,
            });
         }
      },

      //Atualiza o nickname
      async updateNickname() {
         try {
            const res = await this.editNickname({
               uid: this.profile.uid,
               nickname: this.nickname,
            });

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
      },

      //Atualiza o email
      async updateEmail() {
         try {
            await this.editEmail(this.email);
            await this.updateEmailSendConfirmation(this.profile.uid);

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.SUCCESS,
               message: 'Email atualizado com sucesso, verifique seu email!',
            });
         } catch (error) {
            let errorMessage = '';

            switch (error.code) {
               case 'auth/email-already-in-use':
                  errorMessage = 'O email informado já existe!';
                  break;
               case 4:
                  errorMessage = 'Erro de conexão com o Firebase!';
                  break;

               default:
                  if (error.response) {
                     errorMessage = error.response.data;
                  } else {
                     errorMessage = 'Não foi possível se conectar com a API!';
                  }
            }

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.ERROR,
               message: errorMessage,
            });
         }
      },

      //Atualiza a senha
      async updatePassword() {
         try {
            await this.editPassword(this.password);

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.SUCCESS,
               message: 'Senha atualizada com sucesso!',
            });
         } catch (error) {
            let errorMessage = '';

            switch (error.code) {
               case 4:
                  errorMessage = 'Erro de conexão com o Firebase!';
                  break;

               default:
                  if (error.response) {
                     errorMessage = error.response.data;
                  } else {
                     errorMessage = 'Não foi possível se conectar com a API!';
                  }
            }

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.ERROR,
               message: errorMessage,
            });
         }
      },
   },
};
</script>
