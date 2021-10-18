<template>
  <v-container>
    <h1>{{ subContent.title }}</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <div>{{ subContent.content }}</div>

    <br />

    <v-expansion-panels multiple accordion>
      <v-expansion-panel class="color">
        <v-expansion-panel-header><h2>Video Complementar</h2></v-expansion-panel-header>
        <v-expansion-panel-content>
          <MylevPlayerVideo :linkVideo="subContent.videoLink" />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel class="color">
        <v-expansion-panel-header><h2>Download do Material</h2></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn color="#3898ec" :href="subContent.fileLink">Clique aqui!</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>    
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MylevPlayerVideo from '@/components/shared/Mylev-PlayerVideo'

export default {
  name: 'Mylev-SubContent',

  components: {
    MylevPlayerVideo,
  },

  //Obtem o todos os dados do Subconteúdo ao entrar na página
  async created() {
    //Obtem o ID passado pela url
    const subContentId = this.getSubjectId();

    //Obtem os dados do SubConteúdo
    await this.fecthSubContentById({ subContentId });
  },

  computed: {
    //Getters Vuex
    ...mapGetters('subContent', ['subContent']),
  },

  methods: {
    //Actions Vuex
    ...mapActions('subContent', ['fecthSubContentById']),

    //Pega o ID do SubConteúdo contido na URL
    getSubjectId() {
      return this.$route.params.id;
    },
  }
}
</script>
