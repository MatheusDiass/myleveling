<template>
  <div class="externalDivBorder">
    <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
      <v-form>
        <label>Título:</label>
        <v-text-field
          v-model="title"
          background-color="white"
          outlined
        ></v-text-field>

        <label>Matéria:</label>
        <v-select
          :items="subjects"
          item-text="data.name"
          item-value="id"
          v-model="subjectId"
          background-color="white"
          outlined
        ></v-select>

        <label>Conteúdo:</label>
        <v-textarea
          v-model="content"
          background-color="white"
          outlined
        ></v-textarea>

        <label>Video da aula:</label>
        <v-checkbox label="Clique para desbloquar a opção"></v-checkbox>
        <v-file-input
          v-model="video"
          ref="video"
          background-color="white"
          outlined
        ></v-file-input>

        <label>Matériais</label>
        <v-checkbox label="Clique para desbloquar a opção"></v-checkbox>
        <v-file-input
          v-model="file"
          background-color="white"
          outlined
        ></v-file-input>

        <div class="contentCenter">
          <v-btn color="#3898ec" @click="addNewSubContent">Salvar</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MylevSubContent',

  data() {
    return {
      title: '',
      subjectId: '',
      content: '',
      video: [],
      file: [],
    }
  },

  async created() {
    //Pega todas as matérias para serem listadas na tabela
    await this.fecthSubjects();
  },

  computed: {
    //Getters Vuex
    ...mapGetters('subject', ['subjects']),
  },

  methods: {
    //Actions Vuex
    ...mapActions(["showSnackbarMessage", "showAlertMessage"]),
    ...mapActions('subject', ['fecthSubjects']),
    ...mapActions('subContent', ['addSubContent', 'addSubContentVideo']),

    async addNewSubContent() {
      const subContent = {
        title: this.title,
        subjectId: this.subjectId,
        content: this.content,
      };

      try {
        const id = await this.addSubContent(subContent);

        const formData = new FormData();
        formData.append('video', this.video)

        const res = await this.addSubContentVideo({
          subjectId: this.subjectId,
          id,
          video: formData,
        });

        //Abre um Snackbar com a mensagem de sucesso
        this.showSnackbarMessage({ show: true, message: res });

        //Muda para a página de listagem das matérias
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
}
</script>
