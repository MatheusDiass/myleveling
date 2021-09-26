<template>
    <v-container>
        <h1>Cadastro</h1>

        <br>

        <v-divider></v-divider>

        <br>

        <MylevRegisterCard/>
    </v-container>
</template>

<script>
import MylevRegisterCard from "../components/views/register/Mylev-RegisterCard.vue"

export default {
    name: "MylevRegister",
    
    components: {
        MylevRegisterCard,
    }
}
</script>

