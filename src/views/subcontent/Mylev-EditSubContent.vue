<template>
   <v-container>
      <h1>Editar Matéria</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <MylevSubContentCard
         v-if="!isError && subContent"
         :isEdit="true"
         :subContent="subContent"
         @loading="loading"
      />

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
import MylevSubContentCard from '@/components/views/subcontent/Mylev-SubContentCard.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import MylevAlert from '@/components/shared/Mylev-Alert.vue';

export default {
   name: 'MylevEditSubContent',

   components: {
      MylevSubContentCard,
      MylevLoading,
      MylevAlert,
   },

   data() {
      return {
         isError: false,
         errorMessage: '',
         isLoading: false,
      };
   },

   async created() {
      //Marca como undefined para ser atribuída ao campo corretamente
      this.$store.commit('subContent/setSubContent', undefined);

      //Exibe o componente de carregamento
      this.isLoading = true;

      let subContentId = this.getSubContentId();

      try {
         //Obtem a disciplina pelo ID
         await this.fecthSubContentById({ subContentId });
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
   },

   methods: {
      //Actions Vuex
      ...mapActions('subContent', ['fecthSubContentById']),

      //Obtem o ID da disciplina contida na URL
      getSubContentId() {
         return this.$route.params.id;
      },

      //Exibe ou remove o componente de carregamento
      loading(event) {
         this.isLoading = event;
      },
   }
};
</script>
