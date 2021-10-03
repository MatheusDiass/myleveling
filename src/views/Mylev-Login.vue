<template>
    <v-container>
        <h1>Login</h1>

        <br>

        <v-divider></v-divider>

        <br>

        <MylevLoginCard />
        
        <MylevAlert />
    </v-container>
</template>

<script>
import MylevLoginCard from "../components/views/login/Mylev-LoginCard.vue";
import MylevAlert from '../components/shared/Mylev-Alert.vue'

export default {
    name: "MylevLogin",

    components: {
        MylevLoginCard,
        MylevAlert,
    }
}
</script>