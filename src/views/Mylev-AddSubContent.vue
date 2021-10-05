<template>
  <v-container>
    <h1>Adicionar SubConteúdo</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <MylevSubContent />
  </v-container>
</template>

<script>
import MylevSubContent from '../components/views/subcontent/Mylev-SubContentCard.vue'

export default {
  name: 'MylevSubject',

  components: {
      MylevSubContent,
  },
}
</script>