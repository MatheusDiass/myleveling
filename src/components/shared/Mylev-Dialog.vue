<template>
    <v-dialog :value="true" width="550">
            <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
                <v-form class="paddingCard">
                <h2 class="font-weight-bold">Aviso!</h2><br>
                <h3 class="font-weight-bold">Deseja realmente deletar?</h3><br>
                <v-btn class="mr-10" color="#3898ec">Deletar</v-btn>
                <v-btn color="#3898ec">Cancelar</v-btn>
                </v-form>
            </v-card>
    </v-dialog>
</template>
