<template>
   <v-container>
      <h1>Editar Disciplina</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <MylevSubjectCard :isEdit="true" />
   </v-container>
</template>

<script>
import MylevSubjectCard from '@/components/views/subject/Mylev-SubjectCard.vue';

export default {
   name: 'MylevEditSubject',

   components: {
      MylevSubjectCard,
   },
};
</script>
