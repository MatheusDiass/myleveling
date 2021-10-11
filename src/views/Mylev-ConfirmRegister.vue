<template>
  <v-container>
    <h1>Confirmar Cadastro</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <MylevConfirmRegister />
  </v-container>
</template>

<script>
import MylevConfirmRegister from '../components/views/confirmregister/Mylev-ConfirmRegisterCard.vue';

export default {
  name: 'MylevEditSubject',

  components: {
    MylevConfirmRegister,
  }
}
</script>