<template>
   <v-container>
      <div v-if="!isError">
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
      </div>

      <MylevLoading :isLoading="isLoading" />

      <MylevAlert
         :show="isError"
         :styleClasses="['contentCenter']"
         :type="'error'"
         :message="errorMessage"
      />
   </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevPlayerVideo from '@/components/shared/Mylev-PlayerVideo';
import MylevBookmarkButton from '@/components/shared/Mylev-Bookmark-Button.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import MylevAlert from '@/components/shared/Mylev-Alert.vue';

export default {
   name: 'MylevSubContent',

   data() {
      return {
         isLoading: false,
         isError: false,
         errorMessage: '',
      };
   },

   components: {
      MylevPlayerVideo,
      MylevBookmarkButton,
      MylevLoading,
      MylevAlert,
   },

   //Obtem o todos os dados da matéria ao entrar na página
   async created() {
      //Exibe o componente de carregamento
      this.isLoading = true;

      try {
         //Obtem os dados da matéria
         await this.fecthSubContentById({ subContentId: this.subContentId });
      } catch (error) {
         this.isError = true;

         let errorMessage = '';

         if (error.response) {
            errorMessage = error.response.data;
         } else {
            errorMessage = 'Não foi possível se conectar com a API!';
         }

         this.errorMessage = errorMessage;
      }

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
