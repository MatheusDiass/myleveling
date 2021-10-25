<template>
    <div>
        <v-row class="justify-start">
            <v-btn v-if="isDisable" color="#499fc6" @click="enableDisableFields"><v-icon>mdi-pencil</v-icon>Editar Informações</v-btn>
            <v-btn class="mr-10" v-if="!isDisable" color="#499fc6" @click="enableDisableFields"><v-icon>mdi-close-circle</v-icon>Cancelar</v-btn>
            <v-btn v-if="!isDisable" color="#499fc6">Salvar</v-btn>
        </v-row>

        <br>

        <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
            <v-form>
                <label>Nome:</label>
                <v-text-field v-model="name" :disabled="isDisable" background-color="white" outlined></v-text-field>

                <label>Nickname:</label>
                <v-text-field v-model="nickname" :disabled="isDisable" background-color="white" outlined></v-text-field>

                <label>Email:</label>
                <v-text-field v-model="email" :disabled="isDisable" background-color="white" outlined></v-text-field>

                <label>Senha:</label>
                <v-text-field v-model="password" :disabled="isDisable" background-color="white" outlined></v-text-field>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'MylevProfileInfoCard',

    data() {
        return {
            name: 'Matheus',
            nickname: '',
            email: '',
            password: '',
            isDisable: true,
        }
    },

    methods: {
        //Habilita ou desabilita os campos para edição
        enableDisableFields() {
            this.isDisable = !this.isDisable;
        },
    },
}
</script>