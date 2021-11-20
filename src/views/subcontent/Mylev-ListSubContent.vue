<template>
    <v-container>
    <h1>Lista de Matérias</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <MylevTableSubContentCard />
  </v-container>
</template>

<script>
import MylevTableSubContentCard from '@/components/views/subcontent/Mylev-TableSubContentCard.vue';

export default {
    name: 'MylevListSubContent',

    components: {
      MylevTableSubContentCard,
    }
}
</script>