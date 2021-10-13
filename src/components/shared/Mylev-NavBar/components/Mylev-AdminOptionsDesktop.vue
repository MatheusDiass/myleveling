<template>
    <div>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="textColor" v-bind="attrs" v-on="on" elevation="0" text>Matérias</v-btn>
          </template>
          <v-list class="color">
            <v-list-item><v-btn elevation="0" class="textColor" text>Adicionar</v-btn></v-list-item>
            <v-list-item><v-btn elevation="0" class="textColor" text>Listar</v-btn></v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="textColor" v-bind="attrs" v-on="on" elevation="0" text>Subconteúdos</v-btn>
          </template>
          <v-list class="color">
            <v-list-item><v-btn elevation="0" class="textColor" text>Adicionar</v-btn></v-list-item>
            <v-list-item><v-btn elevation="0" class="textColor" text>Listar</v-btn></v-list-item>
          </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'MylevAdminOptionsDesktop',
}
</script>