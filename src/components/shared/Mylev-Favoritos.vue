<template>
  <v-card class="mx-auto" color="#499fc6" max-width="500">
  
      <h1 class="contentCenter">Meus Favoritos</h1>

    <v-list color="#499fc6" two-line>
      <v-list-item-group
        v-model="selected"
        active-class="black--text"
        multiple
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon v-if="!active" color="grey lighten-1">mdi-heart-outline</v-icon>

                <v-icon v-else color="red darken-3">mdi-heart</v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selected: [2],
      items: [
        {
          title: 'Matemática',
        },
        {
          title: 'Português',
        },
        {
          title: 'Sociologia',
        }
      ],
    }),
  }
</script>
