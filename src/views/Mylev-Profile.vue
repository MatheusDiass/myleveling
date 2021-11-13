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
         <v-col lg="8" md="8" sm="12">
            <div>
               <MylevProfileInfoCard />
            </div>
         </v-col>
         <v-col lg="4" md="4" sm="12" class="mb-9">
            <div class="mt-15">
               <MylevFavorites />
            </div>
         </v-col>
      </v-row>

      <MylevDialog />
   </v-container>
</template>

<script>
import MylevUserImage from '@/components/shared/Mylev-UserImage.vue';
import MylevProfileInfoCard from '@/components/views/profile/Mylev-ProfileInfoCard.vue';
import MylevFavorites from '@/components/views/profile/Mylev-Favorites.vue';
import MylevDialog from '@/components/shared/Mylev-Dialog.vue';
import { mapGetters } from 'vuex';

export default {
   name: 'MylevProfile',

   components: {
      MylevUserImage,
      MylevProfileInfoCard,
      MylevFavorites,
      MylevDialog,
   },

   computed: {
      //Getters Vuex
      ...mapGetters('profile', ['profile']),
   },
}
</script>