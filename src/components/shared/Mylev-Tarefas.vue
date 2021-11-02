<template>
  <v-card class="mx-auto" color="#499fc6" max-width="500">
      <v-row>
        <v-card-title class="mr-16">
          <h3 class="mr-5">Minhas Tarefas</h3>
        </v-card-title>
        <v-card-title class="mr-4">
          <v-btn color="#499fc6" depressed>Calendário</v-btn>
        </v-card-title>
      </v-row>
      
    <v-list color="#499fc6" two-line>
      <v-list-item-group v-model="selected" active-class="black--text" multiple>
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>

                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-icon class="mr-16" color="black lighten-1">mdi-dots-vertical-outline</v-icon>
                <v-icon class="mr-16" color="black darken-3">mdi-dots-vertical</v-icon>
                
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
          title: 'Estudar Matemática',
        },
        {
          title: 'Estudar Português',
        },
        {
          title: 'Fazer a atividade de sociologia',
        }
      ],
    }),
  }
</script>


