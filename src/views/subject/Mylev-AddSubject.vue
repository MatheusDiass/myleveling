<template>
  <v-container>
    <h1>Adicionar Disciplina</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <MylevSubjectCard />
  </v-container>
</template>

<script>
import MylevSubjectCard from '@/components/views/subject/Mylev-SubjectCard.vue'

export default {
  name: 'MylevSubject',

  components: {
    MylevSubjectCard,
  },
}
</script>