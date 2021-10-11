<template>
    <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
        <v-form>
            <label>Código:</label>
            <v-text-field background-color="white" outlined></v-text-field>

            <div class="contentCenter">
                <v-btn color="#3898ec">Confirmar</v-btn>
            </div>

            <br>

            <div class="contentCenter">
                <a href="">Gerar um novo código</a>
            </div>
        </v-form>
    </v-card>
</template>

<script>
export default {
    name: 'MylevConfirmRegisterCard',
}
</script>

<style scoped>
a {
    color: black !important;
}
</style>