<template>
   <v-card color="#499fc6" rounded="lg" flat>
      <v-card-title class="contentCenter">Meu Favoritos</v-card-title>

      <v-list color="#499fc6" two-line>
        <v-list-item class="pl-10 pr-10" v-for="bookmark in bookmarks" :key="bookmark.id">
          <v-row>
            <v-list-item-content>{{ bookmark.data.name }}</v-list-item-content>
            <v-icon color="red darken-3" @click="openDialog">mdi-heart</v-icon>
          </v-row>
        </v-list-item>
      </v-list>

      <MylevDialog
        :show="showDialog"
        title="Aviso!"
        content="Deseja realmente deletar a favorito ?"
        :confirmButton="true"
        confirmButtonText="Deletar"
        :cancelButton="true"
        @confirm="removeFavorite"
        @closeDialog="closeDialog"
    />
   </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevFavorites',

   data() {
      return {
        showDialog: false,
        favoriteToDelete: {},
      }
   },

   components: {
     MylevDialog,
   },

   created() {
      //Obtem todos os favoritos de um usuário
      this.fetchAllBookmarksByUser({ uid: this.profile.uid });
   },

   computed: {
      //Getters Vuex
      ...mapGetters('profile', ['profile']),
      ...mapGetters('profile/bookmark', ['bookmarks', 'deleteFavorite']),
   },

   methods: {
      //Actions Vuex
      ...mapActions('profile/bookmark', ['fetchAllBookmarksByUser']),

      async removeFavorite() {
        try {
          //Deleta o favorito
          const res = await this.deleteFavorite(this.favoriteToDelete.favoriteId);

          //Remove o favorito do array que está listando os favoritos
          this.bookmarks.splice(this.favoriteToDelete.index, 1);

          //Cria a notificação
          createNotify({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: res,
          });
        } catch(error) {
          let errorMessage = '';

          if(error.response) {
            errorMessage = error.response.data;
          } else {
            errorMessage = "Não foi possível se conectar com a API!";
          }

          //Cria a notificação
          createNotify({
            type: NOTIFICATION_TYPE.ERROR,
            message: errorMessage,
          });
        }
      },

    /*Atribuí um favorito a variavel "favoriteToDelete" (favorito que será deletado)
    e abre o dialogo para a deleção do favorito */
    openDialog(favorite) {
      this.favoriteToDelete = favorite;
      this.showDialog = true;
    },

    /*Remove o favorito da variavel "favoriteToDelete" (favorito que não foi excluída)
    e fecha o dialogo de deleção do favorito*/
    closeDialog(event) {
      this.favoriteToDelete = {};
      this.showDialog = event;
    }
   },
}
</script>
