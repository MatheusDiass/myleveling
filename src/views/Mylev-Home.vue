<template>
  <v-container>
    <h1>Home</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <h3>Cursos</h3>

    <br />

    <MylevContentName title="Matemática" color="#499fc6"/>

    <br />

    <MylevContentName title="Português" color="#93d7f5"/>
  </v-container>
</template>

<script>
import MylevContentName from "../components/Mylev-ContentName.vue"

export default {
  name: "MylevHome",
  
  components: {
      MylevContentName,
  }
};
</script>
