<template>
  <div>
    <v-app-bar class="color heightNavFooter" flat dense>
      <v-toolbar-title
        ><v-img
          max-height="60"
          max-width="60"
          :src="require('../assets/logo.png')"
        ></v-img
      ></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-row class="hidden-sm-and-down">
        <v-btn :to="{ name: 'Home' }" elevation="0" class="textColor" text exact>Home</v-btn>
        <v-btn elevation="0" class="textColor" text>Área do Aluno</v-btn>
        <v-btn :to="{ name: 'Login' }" elevation="0" class="textColor" text>Login</v-btn>
      </v-row>

      <v-row class="hidden-md-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="float-right color" v-bind="attrs" v-on="on"
              ><v-icon>mdi-menu</v-icon></v-btn
            >
          </template>

          <v-list class="color">
            <v-list-item>
              <v-btn :to="{ name: 'Home' }" elevation="0" class="textColor" text exact>Home</v-btn>
            </v-list-item>

            <v-list-item>
              <v-btn elevation="0" class="textColor" text>Área do Aluno</v-btn>
            </v-list-item>

            <v-list-item>
              <v-btn :to="{ name: 'Login' }" elevation="0" class="textColor" text>Login</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "MylevNavBar",
};
</script>

<style>
.v-toolbar__content {
  padding-top: 32px !important;
}

.row {
  margin: 0 !important;
  justify-content: end;
}
</style>
