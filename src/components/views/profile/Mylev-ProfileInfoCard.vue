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
         <v-form>
            <label>Nome:</label>
            <v-text-field
               v-model="name"
               :disabled="isDisable"
               background-color="white"
               outlined
            ></v-text-field>

            <label>Nickname:</label>
            <v-text-field
               v-model="nickname"
               :disabled="isDisable"
               background-color="white"
               outlined
            ></v-text-field>

            <label>Email:</label>
            <v-text-field
               v-model="email"
               :disabled="isDisable"
               background-color="white"
               outlined
            ></v-text-field>

            <label>Senha:</label>
            <v-text-field
               v-model="password"
               :disabled="isDisable"
               background-color="white"
               outlined
            ></v-text-field>
         </v-form>
      </v-card>
   </div>
</template>

<script>
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';
import { mapActions } from 'vuex';

export default {
   name: 'MylevProfileInfoCard',

   data() {
      return {
         name: this.profile.name,
         nickname: this.profile.nickname,
         email: this.profile.email,
         password: '',
         isDisable: true,
      };
   },

   props: {
      profile: {
         type: Object,
         required: true,
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
         if (
            this.email.toLowerCase() != this.profile.email.toLowerCase()
         ) {
            return true;
         }

         return false;
      },

      passwordChanged() {
         if (
            this.password.toLowerCase() != this.profile.email.toLowerCase()
         ) {
            return true;
         }

         return false;
      }
   },

   methods: {
      //Actions Vuex
      ...mapActions(['logout']),
      ...mapActions('profile', ['editName', 'editNickname', 'editEmail', 'editPassword']),

      //Habilita ou desabilita os campos para edição
      enableDisableFields() {
         this.name = this.profile.name;
         this.nickname = this.profile.nickname;
         this.email = this.profile.email;
         this.password = '';
         this.isDisable = !this.isDisable;
      },

      async updateProfile() {
         if (this.nameChanged) {
            await this.updateName();
         }

         if (this.nicknameChanged) {
            await this.updateNickname();
         }

         if(this.emailChanged) {
            await this.updateEmail();
         }

         if(this.passwordChanged) {
            await this.updatePassword();
         }

         if(this.emailChanged || this.passwordChanged) {
            this.logout();
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
            const res = await this.editEmail(this.email);

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

      //Atualiza a senha
      async updatePassword() {
         try {
            const res = await this.editPassword(this.password);

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
   },
};
</script>
