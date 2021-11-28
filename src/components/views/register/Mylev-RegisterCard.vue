<template>
   <div>
      <v-card class="paddingCard" color="#499fc6" rounded="lg" elevation="6">
      <v-form ref="form">
         <label>Nome:</label>
         <v-text-field
            v-model="name"
            :rules="nameRules"
            counter="20"
            background-color="white"
            outlined
         ></v-text-field>

         <label>Nickname:</label>
         <v-text-field
            v-model="nickname"
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
            :rules="emailRules"
            background-color="white"
            outlined
         ></v-text-field>

         <label>Senha:</label>
         <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            background-color="white"
            outlined
         ></v-text-field>

         <div class="contentCenter">
            <v-btn @click="register" color="#3898ec">Cadastrar</v-btn>
         </div>

         <div>
            <br />
            <v-row class="contentCenter"><label>Outras Opções</label></v-row>
            <v-row class="contentCenter">
               <a @click="loginGoogle">
                  <v-img
                     max-height="60"
                     max-width="60"
                     :src="require('../../../assets/img/logoGoogle.png')"
                  ></v-img>
               </a>
            </v-row>
         </div>
      </v-form>
   </v-card>

   <MylevLoading :isLoading="isLoading"/>
   </div>
</template>

<script>
import axios from 'axios';
import config from '@/configuration/configuration.json';
import { loginGoogle } from '@/mixins';
import registerValidation from '@/mixins/validations/registerValidation';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';
import MylevLoading from '../../shared/Mylev-Loading.vue';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default {
   name: 'MylevRegisterCard',

   mixins: [loginGoogle, registerValidation],

   data() {
      return {
         name: '',
         nickname: '',
         email: '',
         password: '',
         showPassword: false,
         isLoading: false,
      };
   },

   components: {
      MylevLoading,
   },

   methods: {
      //Cadastro de usuários
      async register() {
         //Se o formulário estiver validado, realiza o cadastro
         if (this.$refs.form.validate()) {
            //Exibe o componente de carregamento
            this.isLoading = true;

            const auth = getAuth();

            //Cria a conta no firebase(email)
            const { user } = await createUserWithEmailAndPassword(auth, this.email, this.password);

            //Atualiza os dados do perfil do usuário(displayName)
            await updateProfile(user, {
               displayName: this.name,
            });

            const data = {
               uid: user.uid,
               name: this.name,
               nickname: this.nickname,
               email: this.email,
            };

            try {
               const res = await axios.post(`${config.register}`, data);

               //Obtem o UID do usuário retornado após fazer o cadastro
               const uid = res.data;

               //Cria a notificação
               createNotify({
                  type: NOTIFICATION_TYPE.SUCCESS,
                  message: 'Cadastro realizado com sucesso!',
               });

               //Muda para a página de "Confirmar Email
               this.$router.push({
                  name: 'ConfirmRegister',
                  params: { id: uid },
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
         }
      },
   },
};
</script>
