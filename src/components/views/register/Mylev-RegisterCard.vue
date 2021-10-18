<template>
  <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
    <v-form>
      <label>Nome:</label>
      <v-text-field v-model="name" background-color="white" outlined></v-text-field>

      <label>Nickname:</label>
      <v-text-field v-model="nickname" background-color="white" outlined></v-text-field>

      <label>Email:</label>
      <v-text-field v-model="email" background-color="white" outlined></v-text-field>

      <label>Senha</label>
      <v-text-field v-model="password" background-color="white" outlined></v-text-field>

      <div class="contentCenter">
        <v-btn @click="register" color="#3898ec">Cadastrar</v-btn>
      </div>

      <div>
        <br />
        <v-row class="contentCenter"><label>Outras Opções</label></v-row>
        <v-row class="contentCenter">
          <a @click="login">
            <v-img
              max-height="60"
              max-width="60"
              :src="require('../../../assets/logoGoogle.png')"
            ></v-img>
          </a>
        </v-row>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';
import config from '@/configuration/configuration.json';
import { loginGoogle } from '@/mixins';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
  name: 'MylevRegisterCard',

  mixins: [loginGoogle],

  data() {
    return {
      name: '',
      nickname: '',
      email: '',
      password: ''
    }
  },

  methods: {
    //Cadastro de usuários
    async register() {
        const data = {
          name: this.name,
          nickname: this.nickname,
          email: this.email,
          password: this.password,
        };

        try {
          const res = await axios.post(`${config.register}`, data);

          //Obtem o UID do usuário retornado após fazer o cadastro
          const uid = res.data.uid;

          //Cria a notificação
          createNotify({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: 'Cadastro realizado com sucesso!',
          });

          //Muda para a página de "Confirmar Email"
          this.$router.push({ name: 'ConfirmRegister', params: { id: uid } });
        } catch(error) {
          let errorMessage = '';

          if(error.response) {
            errorMessage = error.response.data;
          } else {
            errorMessage = "Não foi possível se conectar com a API!";
          }

          //Cria a notificação
          createNotify({
            type: NOTIFICATION_TYPE.ERROR,
            message: errorMessage,
          });
        }
    },
  }
}
</script>
