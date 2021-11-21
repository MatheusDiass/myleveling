<template>
  <v-card class="paddingCard" color="#499fc6" rounded="lg" elevation="6">
    <v-form ref="form">
      <label>Código:</label>
      <v-text-field
        v-model="code"
        :rules="codeRules"
        counter="6"
        background-color="white"
        outlined
      ></v-text-field>

      <div class="contentCenter">
        <v-btn color="#3898ec" @click="confirmEmail">Confirmar</v-btn>
      </div>

      <br />

      <div class="contentCenter">
        <a href="">Gerar um novo código</a>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios'
import config from '@/configuration/configuration.json'
import confirmEmailValidation from '@/mixins/validations/confirmEmailValidation'
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus'

export default {
  name: 'MylevConfirmRegisterCard',

  mixins: [confirmEmailValidation],

  data() {
    return {
      code: null,
    }
  },

  methods: {
    async confirmEmail() {
      //Obtem o UID da usuário contido na URL
      const uidUser = this.getUserUid()

      try {
        const { data } = await axios.post(`${config.confirmEmail}/${uidUser}`, {
          code: this.code,
        })

        //Cria a notificação
        createNotify({
          type: NOTIFICATION_TYPE.SUCCESS,
          message: data,
        });

        //Muda para a página de listagem das matérias
        this.$router.push({ name: 'Login' })
      } catch (error) {
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

    //Obtem o UID da usuário contido na URL
    getUserUid() {
      return this.$route.params.id
    },
  },
}
</script>

<style scoped>
a {
  color: black !important;
}
</style>