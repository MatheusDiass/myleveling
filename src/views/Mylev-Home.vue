<template>
  <v-container>
    <h1>Home</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <h3>Cursos</h3>

    <br />

    <v-row align="center" justify="start">
      <v-col cols="12" sm="6" md="4" v-for="subject in subjects" :key="subject.name">
        <MylevContentName :title="subject.name" color="#499fc6"/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import MylevContentName from "../components/Mylev-ContentName.vue";
import config from "@/configuration/configuration.json";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MylevHome",
  
  components: {
      MylevContentName,
  },

  created() {
    this.listSubjects();
  },

  computed: {
    ...mapGetters("subject", ["subjects"]),
  },

  methods: {
    ...mapActions("subject", ["fecthSubjects"]),
    async listSubjects() {
      let route = config.subject;

      try {
        await this.fecthSubjects({ route });
      } catch(error) {
        console.log(error);
      }
    }
  }
};
</script>
