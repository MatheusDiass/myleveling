<template>
   <v-container>
      <h1 class="text-center">Meu Perfil</h1>

      <br />

      <div class="text-center">
         <MylevUserImage :hasBorder="true" :profile="profile" />
         <h3>{{ profile.name }}</h3>
      </div>

      <br /><br />

      <v-row>
         <v-col cols="12">
            <div>
               <MylevProfileInfoCard />
            </div>
         </v-col>
      </v-row>

      <v-row>
         <v-col cols="12" lg="6" md="6" sm="12">
            <MylevBookmarks />
         </v-col>

         <v-col cols="12" lg="6" md="6" sm="12">
            <MylevTasks />
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import MylevUserImage from '@/components/shared/Mylev-UserImage.vue';
import MylevProfileInfoCard from '@/components/views/profile/Mylev-ProfileInfoCard.vue';
import MylevBookmarks from '@/components/views/profile/Mylev-Bookmarks.vue';
import MylevTasks from '@/components/views/profile/Mylev-Tasks/Mylev-Tasks.vue'
import { mapGetters } from 'vuex';

export default {
   name: 'MylevProfile',

   components: {
      MylevUserImage,
      MylevProfileInfoCard,
      MylevBookmarks,
      MylevTasks
   },

   computed: {
      //Getters Vuex
      ...mapGetters('profile', ['profile']),
   },
}
</script>