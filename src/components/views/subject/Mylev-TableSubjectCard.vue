<template>
  <v-card rounded="lg" flat>
    <v-simple-table class="textCenter">
      <thead class="color">
        <tr class="headerBorderLeft">
          <th class="textColor textCenter">Nome da Matéria</th>
          <th class="textColor textCenter">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subject in subjects" :key="subject.id">
          <td>{{ subject.data.name }}</td>
          <td>
            <div>
              <v-btn
                class="mx-2"
                text
                :to="{ name: 'EditSubject', params: { id: subject.id } }"
                ><v-icon>mdi-pencil</v-icon>Editar</v-btn
              >
              <v-btn class="mx-2" color="red" text
                ><v-icon>mdi-delete</v-icon>Deletar</v-btn
              >
            </div>
          </td>
        </tr>
        <tr>
          <td>Português</td>
          <td>
            <div>
              <v-btn class="mx-2" text><v-icon>mdi-pencil</v-icon>Editar</v-btn>
              <v-btn class="mx-2" color="red" text
                ><v-icon>mdi-delete</v-icon>Deletar</v-btn
              >
            </div>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TableSubjectCard',

  data() {
    return {
      //Nome das colunas da tabela
      headers: [{ text: 'Nome da Matéria' }, { text: 'Ações' }],
    }
  },

  created() {
    //Pega todas as matérias para serem listadas na tabela
    this.fecthSubjects()
  },

  computed: {
    //Getters Vuex
    ...mapGetters('subject', ['subjects']),
  },

  methods: {
    //Actions Vuex
    ...mapActions(['showSnackbarMessage', 'showAlertMessage']),
    ...mapActions('subject', ['fecthSubjects']),
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
