<template>
   <div>
      <v-dialog
         v-model="show"
         :fullscreen="$vuetify.breakpoint.mobile"
         width="550"
         persistent
      >
         <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
            <div class="pa-5">
               <h1>{{ title }}</h1>

               <br />

               <h3>{{ content }}</h3>

               <br />

               <v-btn
                  v-if="confirmButton"
                  color="#3898ec"
                  class="mr-10"
                  @click="confirm"
                  >{{ confirmButtonText }}</v-btn
               >
               <v-btn
                  v-if="cancelButton"
                  color="#3898ec"
                  @click="closeDialog"
                  >{{ cancelButtonText }}</v-btn
               >
            </div>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
export default {
   name: 'Mylev-Dialog',

   data() {
      return {
         isLoading: false,
      };
   },

   props: {
      show: {
         type: Boolean,
         required: true,
      },

      title: {
         type: String,
         required: true,
      },

      content: {
         type: String,
         required: true,
      },

      confirmButton: {
         type: Boolean,
         required: true,
      },

      confirmButtonText: {
         type: String,
         default: 'Ok',
      },

      cancelButton: {
         type: Boolean,
         required: true,
      },

      cancelButtonText: {
         type: String,
         default: 'Cancelar',
      },
   },

   methods: {
      //Emite um event para o componente pai fechar o dialogo
      closeDialog() {
         this.$emit('closeDialog', false);
      },

      /*Emite um event para o componente pai informando que
      o botão de confirmação foi apertado*/
      confirm() {
         this.$emit('confirm');
      },
   },
};
</script>
