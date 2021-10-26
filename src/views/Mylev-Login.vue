<template>
    <v-container>
        <h1>Login</h1>

        <br>

        <v-divider></v-divider>

        <br>

        <MylevLoginCard />
    </v-container>
</template>

<script>
import MylevLoginCard from "../components/views/login/Mylev-LoginCard.vue";

export default {
    name: "MylevLogin",

    components: {
        MylevLoginCard,
    }
}
</script>