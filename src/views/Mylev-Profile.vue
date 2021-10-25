<template>
    <v-container>
        <h1 class="text-center">Meu Perfil</h1>

        <br>

        <div class="text-center">
            <MylevUserImage :hasBorder="true" :profile="profile"/>
            <h3>{{ profile.name }}</h3>
        </div>

        <br><br>

        <MylevProfileInfoCard />
    </v-container>
</template>

<script>
import MylevUserImage from '@/components/shared/Mylev-UserImage.vue'
import MylevProfileInfoCard from '@/components/views/profile/Mylev-ProfileInfoCard.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'MylevProfile',

    components: {
        MylevUserImage,
        MylevProfileInfoCard,
    },

    computed: {
    //Getters Vuex
    ...mapGetters('profile', ['profile']),
  },
}
</script>