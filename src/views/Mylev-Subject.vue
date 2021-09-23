<template>
    <v-container>
        <h1>Adicionar Matéria</h1>

        <br>

        <v-divider></v-divider>

        <br>

        <MylevSubjectCard/>
    </v-container>
</template>

<script>
import MylevSubjectCard from "../components/Mylev-SubjectCard.vue"
    export default {
        data() {
            return {}
        },
        components: {
            MylevSubjectCard
        }
    }
</script>

<style scoped>

</style>