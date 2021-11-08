<template>
  <v-container>
    <h1>Editar Disciplina</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <MylevSubjectCard :isEdit="true"/>

    <MylevAlert />
  </v-container>
</template>

<script>
import MylevSubjectCard from '@/components/views/subject/Mylev-SubjectCard.vue'
import MylevAlert from '@/components/shared/Mylev-Alert.vue'

export default {
  name: 'MylevEditSubject',

  components: {
    MylevSubjectCard,
    MylevAlert
  }
}
</script>