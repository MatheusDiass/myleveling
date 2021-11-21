<template>
   <v-container>
      <v-row justify="start">
         <h1 class="mr-5">{{ subContent.title }}</h1>
         <MylevBookmarkButton
            v-if="subContent.title"
            :contentId="subContentId"
            :contentTitle="subContent.title"
         />
      </v-row>

      <br />

      <v-divider></v-divider>

      <br />

      <div v-html="subContent.content"></div>

      <br />

      <v-expansion-panels multiple accordion>
         <v-expansion-panel class="color">
            <v-expansion-panel-header
               ><h2>Video Complementar</h2></v-expansion-panel-header
            >
            <v-expansion-panel-content>
               <MylevPlayerVideo :linkVideo="subContent.videoLink" />
            </v-expansion-panel-content>
         </v-expansion-panel>

         <v-expansion-panel class="color">
            <v-expansion-panel-header
               ><h2>Download do Material</h2></v-expansion-panel-header
            >
            <v-expansion-panel-content>
               <v-btn color="#3898ec" :href="subContent.fileLink"
                  >Clique aqui!</v-btn
               >
            </v-expansion-panel-content>
         </v-expansion-panel>
      </v-expansion-panels>

      <MylevLoading :isLoading="isLoading"/>
   </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevPlayerVideo from '@/components/shared/Mylev-PlayerVideo';
import MylevBookmarkButton from '@/components/shared/Mylev-Bookmark-Button.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';

export default {
   name: 'MylevSubContent',

   data() {
      return {
         isLoading: false,
      };
   },

   components: {
      MylevPlayerVideo,
      MylevBookmarkButton,
      MylevLoading,
   },

   //Obtem o todos os dados da matéria ao entrar na página
   async created() {
      //Exibe o componente de carregamento
      this.isLoading = true;

      //Obtem os dados da matéria
      await this.fecthSubContentById({ subContentId: this.subContentId });

      //Remove o componente de carregamento
      this.isLoading = false;
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subContent', ['subContent']),

      //Obtem o ID da matéria contida na URL
      subContentId() {
         return this.$route.params.id;
      },
   },

   methods: {
      //Actions Vuex
      ...mapActions('subContent', ['fecthSubContentById']),
   },
};
</script>
