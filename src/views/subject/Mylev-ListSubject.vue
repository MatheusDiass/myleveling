<template>
   <v-container>
      <h1>Lista de Disciplinas</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <MylevTableSubjectCard />
   </v-container>
</template>

<script>
import MylevTableSubjectCard from '@/components/views/subject/Mylev-TableSubjectCard.vue';

export default {
   name: 'MylevListSubject',

   components: {
      MylevTableSubjectCard,
   },
};
</script>
