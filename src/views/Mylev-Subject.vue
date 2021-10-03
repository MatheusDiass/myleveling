<template>
  <v-container>
    <h1>Adicionar Matéria</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <MylevSubjectCard :isEdit="false"/>

    <MylevAlert />
  </v-container>
</template>

<script>
import MylevSubjectCard from '../components/views/subject/Mylev-SubjectCard.vue'
import MylevAlert from '../components/shared/Mylev-Alert.vue'

export default {
  name: 'MylevSubject',

  components: {
    MylevSubjectCard,
    MylevAlert,
  },
}
</script>