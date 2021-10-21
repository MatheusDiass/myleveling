<template>
  <div>
    <v-card rounded="lg" flat>
      <v-simple-table class="textCenter">
        <thead class="color">
          <tr class="headerBorderLeft">
            <th class="textColor textCenter">Nome da Matéria</th>
            <th class="textColor textCenter">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in subjects" :key="subject.id">
            <td>{{ subject.data.name }}</td>
            <td>
              <div>
                <v-btn
                  class="mx-2"
                  text
                  :to="{ name: 'EditSubject', params: { id: subject.id } }"
                  ><v-icon>mdi-pencil</v-icon>Editar</v-btn
                >
                <v-btn class="mx-2" color="red" text @click="openDialog({index, subjectId: subject.id})"
                  ><v-icon>mdi-delete</v-icon>Deletar</v-btn
                >
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>

    <MylevDialog
        :show="showDialog"
        title="Aviso!"
        content="Deseja realmente deletar a máteria ?"
        :confirmButton="true"
        confirmButtonText="Deletar"
        :cancelButton="true"
        @confirm="removeSubject"
        @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import MylevDialog from '@/components/shared/Mylev-Dialog.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TableSubjectCard',

  data() {
    return {
      //Nome das colunas da tabela
      headers: [{ text: 'Nome da Matéria' }, { text: 'Ações' }],
      showDialog: false,
      subjectToDelete: {},
    }
  },

  components: {
    MylevDialog,
  },

  created() {
    //Pega todas as matérias para serem listadas na tabela
    this.fecthSubjects();
  },

  //Remove o Alert de erro ao sair da página
  beforeDestroy() {
    this.showAlertMessage({ show: false, message: '' });
  },

  computed: {
    //Getters Vuex
    ...mapGetters('subject', ['subjects']),
  },

  methods: {
    //Actions Vuex
    ...mapActions(['showSnackbarMessage', 'showAlertMessage']),
    ...mapActions('subject', ['fecthSubjects', 'deleteSubject']),

    async removeSubject() {
      try {
        //Deleta a matéria
        let res = await this.deleteSubject(this.subjectToDelete.subjectId);
        
        //Remove matéria do array que está listando as matérias
        this.subjects.splice(this.subjectToDelete.index, 1);

        //Abre um Snackbar com a mensagem de sucesso
        this.showSnackbarMessage({ show: true, message: res });
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

      //Fecha o dialogo de deleção da matéria
      this.showDialog = false;
    },

    /*Atribuí uma matéria a variavel "selectedToDelete" (matéria que será deletada)
    e abre o dialogo para a deleção da matéria */
    openDialog(subject) {
      this.subjectToDelete = subject;
      this.showDialog = true;
    },

    /*Remove a matéria da variavel "selectedToDelete" (matéria que não foi excluída)
    e fecha o dialogo de deleção da matéria*/
    closeDialog(event) {
      this.subjectToDelete = {};
      this.showDialog = event;
    }
  },
}
</script>

<style scoped>
th {
  font-size: 20px !important;
}

td {
  font-size: 15px !important;
}

.textCenter {
  text-align: center !important;
}
</style>
