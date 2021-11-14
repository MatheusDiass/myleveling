<template>
   <v-card color="#499fc6" rounded="lg" flat>
      <v-card-title class="contentCenter">Meu Favoritos</v-card-title>

      <v-virtual-scroll :bench="5" :items="bookmarks" height="200" item-height="64">
        <template v-slot:default="{ item }">
          <v-list-item class="mb-2 pl-10 pr-10" key="item.id">
            <v-row>
              <v-list-item-content @click="goToFavorite(item.data.id)">{{ item.data.name }}</v-list-item-content>
              <v-list-item-action style="display: contents;">
                <v-icon color="red darken-3" @click="openDialog(item)">mdi-delete</v-icon>
              </v-list-item-action>
            </v-row>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>

      <MylevDialog
        :show="showDialog"
        title="Aviso!"
        content="Deseja realmente deletar o favorito ?"
        :confirmButton="true"
        confirmButtonText="Deletar"
        :cancelButton="true"
        @confirm="removeFavorite"
        @closeDialog="closeDialog"
    />
   </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevBookmarks',

   data() {
      return {
        showDialog: false,
        bookmarkToDelete: {},
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
      ...mapGetters('profile/bookmark', ['bookmarks']),
   },

   methods: {
      //Actions Vuex
      ...mapActions('profile/bookmark', ['fetchAllBookmarksByUser', 'deleteBookmark']),

      async removeFavorite() {
        try {
          //Deleta o favorito
          const res = await this.deleteBookmark(this.bookmarkToDelete.id);

          //Remove o favorito do array que está listando os favoritos
          const newBookmarks = this.bookmarks.filter(
              (bookmark) => bookmark.data.id != this.contentId
          );
          this.$store.commit('profile/bookmark/setBookmarks', newBookmarks);

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

        //Fecha o dialogo de deleção de favorito
        this.showDialog = false;
      },

    /*Atribuí um favorito a variavel "bookmarkToDelete" (favorito que será deletado)
    e abre o dialogo para a deleção do favorito */
    openDialog(bookmark) {
      this.bookmarkToDelete = bookmark;
      this.showDialog = true;
    },

    /*Remove o favorito da variavel "bookmarkToDelete" (favorito que não foi excluída)
    e fecha o dialogo de deleção do favorito*/
    closeDialog(event) {
      this.bookmarkToDelete = {};
      this.showDialog = event;
    },

    //Abre a página do favorito
    goToFavorite(id) {
      this.$router.push({ name: 'SubContent', params: { id } });
    }
   },
}
</script>

<style>
.v-list-item__content {
  cursor: pointer;
}
</style>