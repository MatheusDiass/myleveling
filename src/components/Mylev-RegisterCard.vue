<template>
  <div class="externalDivBorder">
    <v-card class="paddingCard" color="#499fc6" flat>
      <v-form>
        <label>Nome:</label>
        <v-text-field background-color="white" outlined></v-text-field>
        <label>Nickname:</label>
        <v-text-field background-color="white" outlined></v-text-field>
        <label>Email:</label>
        <v-text-field background-color="white" outlined></v-text-field>
        <label>Senha</label>
        <v-text-field background-color="white" outlined></v-text-field>

        <div class="contentCenter">
          <v-btn color="#3898ec">Cadastrar</v-btn>
        </div>

        <div>
          <br />
          <v-row class="contentCenter"><label>Outras Opções</label></v-row>
          <v-row class="contentCenter"><v-img max-height="60" max-width="60" :src="require('../assets/logoGoogle.png')"></v-img>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MylevRegisterCard",
};
</script>

<style scoped>

</style>
