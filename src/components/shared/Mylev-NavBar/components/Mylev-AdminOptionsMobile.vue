<template>
  <div>
    <v-list-item>
      <v-menu offset-x left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="textColor" v-bind="attrs" v-on="on" elevation="0" text
            >Disciplinas</v-btn
          >
        </template>
        <v-list class="color">
          <v-list-item
            ><v-btn
              :to="{ name: 'AddSubject' }"
              elevation="0"
              class="textColor"
              text
              exact
              >Adicionar</v-btn
            ></v-list-item
          >
          <v-list-item
            ><v-btn
              :to="{ name: 'ListSubjects' }"
              elevation="0"
              class="textColor"
              text
              exact
              >Listar</v-btn
            ></v-list-item
          >
        </v-list>
      </v-menu>
    </v-list-item>

    <v-list-item>
      <v-menu offset-x left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="textColor" v-bind="attrs" v-on="on" elevation="0" text
            >Matérias</v-btn
          >
        </template>
        <v-list class="color">
          <v-list-item
            ><v-btn
              :to="{ name: 'AddSubContent' }"
              elevation="0"
              class="textColor"
              text
              exact
              >Adicionar</v-btn
            ></v-list-item
          >
          <v-list-item
            ><v-btn elevation="0" class="textColor" text exact
              >Listar</v-btn
            ></v-list-item
          >
        </v-list>
      </v-menu>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'MylevAdminOptionsMobile',
}
</script>
