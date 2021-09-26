<template>
  <div class="externalDivBorder">
    <v-card class="paddingCard" color="#499fc6" flat>
      <v-form>
        <label>Nome:</label>
        <v-text-field v-model="subjectName" background-color="white" outlined></v-text-field>

        <div class="contentCenter">
          <v-btn color="#3898ec" @click="addNewSubject">Salvar</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'MylevSubjectCard',

  data() {
    return {
      subjectName: '',
    }
  },

   beforeDestroy() {
    this.showAlertMessage({ show: false, message: '' });
  },

  methods: {
    //Actions vuex
    ...mapActions(["showSnackbarMessage", "showAlertMessage"]),
    ...mapActions("subject", ["addSubject"]),

    //Salva a matéria
    async addNewSubject() {
      let data = {
        name: this.subjectName
      };

      try {
        let res = await this.addSubject(data);

        //Abre um Snackbar com a mensagem de sucesso
        this.showSnackbarMessage({ show: true, message: res });

        //Muda para a página de listagem das matérias
        this.$router.push({ name: "Login" });
      } catch(error) {
        let errorMessage = '';

        if(error.response) {
          errorMessage = error.response.data;
        } else {
          errorMessage = "Não foi possível se conectar com a API!";
        }

        //Exibe o Alert de erro
        this.showAlertMessage({ show: true, message: errorMessage });
      }
    }
  }
}
</script>

<style scoped>
</style>
