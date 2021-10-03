<template>
    <v-container>
    <h1>Lista de Matérias</h1>

    <br />

    <v-divider></v-divider>

    <br />

    <MylevAlert />
    
    <MylevTableSubjectCard />
  </v-container>
</template>

<script>
import MylevTableSubjectCard from '../components/views/subject/Mylev-TableSubjectCard.vue'
import MylevAlert from '../components/shared/Mylev-Alert.vue'

export default {
    name: 'MylevListSubject',

    components: {
        MylevTableSubjectCard,
        MylevAlert
    },
}
</script>