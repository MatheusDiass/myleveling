<template>
  <v-card color="#499fc6" rounded="lg" flat>
    <v-row>
      <v-col>
        <v-card-title class="ml-3 contentCenter" style="justify-content: start"
          >Tarefas</v-card-title
        >
      </v-col>
      <v-col
        ><v-card-title class="mr-4 contentCenter" style="justify-content: end"
          ><v-icon @click="toggleCalendar">mdi-calendar</v-icon></v-card-title
        ></v-col
      >
    </v-row>

    <v-divider v-show="displayCalendar"></v-divider>

    <v-expand-transition>
      <div class="ma-2" v-show="displayCalendar">
        <v-date-picker width="" no-title></v-date-picker>
        <v-divider />
      </div>
    </v-expand-transition>

    <v-virtual-scroll :bench="5" :items="items" height="200" item-height="64">
      <template v-slot:default="{ item }">
        <v-list-item class="mb-2 pl-10 pr-10" :key="item.title">
          <v-row>
            <v-list-item-content>{{ item.title }}</v-list-item-content>
            <v-list-item-action style="display: contents">

              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mt-2" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list class="color">
                  <v-list-item>
                    <v-btn elevation="0" class="textColor" text>Editar</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn elevation="0" class="textColor" text>Deletar</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-list-item-action>
          </v-row>
        </v-list-item>

        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
export default {
  name: 'MylevTasks',

  data() {
    return {
      displayCalendar: false,
      items: [
        {
          title: 'Estudar Matemática',
        },
        {
          title: 'Estudar Português',
        },
        {
          title: 'Fazer a atividade de sociologia',
        },
      ],
    }
  },

  methods: {
    toggleCalendar() {
      if (!this.displayCalendar) {
        this.displayCalendar = !this.displayCalendar
      } else {
        this.displayCalendar = false
      }
    },
  },
}
</script>
