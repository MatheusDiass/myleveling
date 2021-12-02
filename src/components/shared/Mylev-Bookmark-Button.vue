<template>
   <v-btn class="mt-1" @click="addNewBookmark" v-if="!isBookmarked" icon><v-icon size="35">mdi-heart-outline</v-icon></v-btn>
   <v-btn class="mt-1" @click="removeBookmark" v-else icon><v-icon size="35" color="red"
      >mdi-heart</v-icon
   ></v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getCookie } from '@/helpers/managerCookies';
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';

export default {
   name: 'MylevBookmarkButton',

   data() {
      return {
         isBookmarked: false,
         userId: '',
      };
   },

   props: {
      contentId: {
         type: String,
         required: true,
      },

      contentTitle: {
         type: String,
         required: true,
      },
   },

   async created() {
      //Obtem o UID do usuário
      this.userId = getCookie('profile').uid;

      //Obtem os favoritos do usuário
      await this.fetchAllBookmarksByUser({ uid: this.userId });

      //Verifica se a matéria atual da página está nos favoritos
      this.isBookmarked = this.bookmarks.some(
         (bookmark) => bookmark.data.id === this.contentId
      );
   },

   computed: {
      //Getters Vuex
      ...mapGetters('profile/bookmark', ['bookmarks']),
   },

   methods: {
      //Actions Vuex
      ...mapActions('profile/bookmark', [
         'fetchAllBookmarksByUser',
         'deleteBookmark',
         'addBookmark'
      ]),

      async addNewBookmark() {
         const bookmark = {
            uid: this.userId,
            id: this.contentId,
            name: this.contentTitle
         }

         try {
            const res = await this.addBookmark(bookmark);

            this.isBookmarked = true;

            this.fetchAllBookmarksByUser({ uid: this.userId });

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
      },

      async removeBookmark() {
         const bookmark = this.bookmarks.find(
            (bookmark) => bookmark.data.id === this.contentId
         );

         try {
            const res = await this.deleteBookmark(bookmark.id);

            //Remove o favorito do array do vuex
            const newBookmarks = this.bookmarks.filter(
               (bookmark) => bookmark.data.id != this.contentId
            );
            this.$store.commit('profile/bookmark/setBookmarks', newBookmarks);

            this.isBookmarked = false;

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
      },
   },
};
</script>
