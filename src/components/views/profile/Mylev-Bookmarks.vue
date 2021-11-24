<template>
   <v-card
      color="#499fc6"
      rounded="lg"
      elevation="6"
      :height="!hasBookmarks ? 236 : ''"
   >
      <v-row>
         <v-col>
            <v-card-title
               class="ml-3 contentCenter"
               style="justify-content: start"
               >Favoritos</v-card-title
            >
         </v-col>
      </v-row>

      <v-virtual-scroll
         v-if="!isError && hasBookmarks"
         :bench="5"
         :items="bookmarks"
         height="256"
         item-height="64"
      >
         <template v-slot:default="{ item }">
            <v-list-item class="mb-2 pl-10 pr-10" :key="item.id">
               <v-row>
                  <v-list-item-content @click="goToFavorite(item.data.id)">{{
                     item.data.name
                  }}</v-list-item-content>
                  <v-list-item-action style="display: contents">
                     <v-btn
                        elevation="0"
                        class="textColor mt-2"
                        color="red darken-3"
                        text
                        @click="openDialog(item)"
                        ><v-icon>mdi-delete</v-icon>Deletar</v-btn
                     >
                  </v-list-item-action>
               </v-row>
            </v-list-item>

            <v-divider></v-divider>
         </template>
      </v-virtual-scroll>

      <MylevAlert
         :show="isError || !hasBookmarks"
         :styleClasses="['contentCenter', smallScreenMargin]"
         :type="alertType"
         :message="alertMessage"
      />

      <MylevDialog
         :show="showDialog"
         title="Aviso!"
         content="Deseja realmente deletar o favorito ?"
         :confirmButton="true"
         confirmButtonText="Deletar"
         :cancelButton="true"
         @confirm="removeBookmark"
         @closeDialog="closeDialog"
      />
   </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import MylevAlert from '../../shared/Mylev-Alert.vue';
import { css } from '@/mixins';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevBookmarks',

   mixins: [css],

   data() {
      return {
         showDialog: false,
         bookmarkToDelete: {},
         isError: false,
         errorMessage: '',
      };
   },

   components: {
      MylevDialog,
      MylevAlert,
   },

   async created() {
      try {
         //Obtem todos os favoritos de um usuário
         await this.fetchAllBookmarksByUser({ uid: this.profile.uid });
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
   },

   computed: {
      //Getters Vuex
      ...mapGetters('profile', ['profile']),
      ...mapGetters('profile/bookmark', ['bookmarks']),

      hasBookmarks() {
         return this.bookmarks.length > 0 ? true : false;
      },

      alertType() {
         console.log('Bookmark', this.isError);
         if (this.isError) {
            return 'error';
         } else {
            return 'info';
         }
      },

      alertMessage() {
         console.log('Bookmark', this.isError);
         if (this.isError) {
            return this.errorMessage;
         } else {
            return 'Você ainda não tem favoritos!';
         }
      },
   },

   methods: {
      //Actions Vuex
      ...mapActions('profile/bookmark', [
         'fetchAllBookmarksByUser',
         'deleteBookmark',
      ]),

      async removeBookmark() {
         try {
            //Deleta o favorito
            const res = await this.deleteBookmark(this.bookmarkToDelete.id);

            //Remove o favorito do array que está listando os favoritos
            const newBookmarks = this.bookmarks.filter(
               (bookmark) => bookmark.id != this.bookmarkToDelete.id
            );

            //Atualiza os favoritos
            this.$store.commit('profile/bookmark/setBookmarks', newBookmarks);

            //Cria a notificação
            createNotify({
               type: NOTIFICATION_TYPE.SUCCESS,
               message: res,
            });
         } catch (error) {
            let errorMessage = '';

            if (error.response) {
               errorMessage = error.response.data;
            } else {
               errorMessage = 'Não foi possível se conectar com a API!';
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

      /*Remove o favorito da variavel "bookmarkToDelete" (favorito que não foi excluído)
      e fecha o dialogo de deleção do favorito*/
      closeDialog(event) {
         this.bookmarkToDelete = {};
         this.showDialog = event;
      },

      //Abre a página do favorito
      goToFavorite(id) {
         this.$router.push({ name: 'SubContent', params: { id } });
      },
   },
};
</script>

<style>
.v-list-item__content {
   cursor: pointer;
}
</style>
