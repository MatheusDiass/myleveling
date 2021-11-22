<template>
   <div>
      <div v-if="isCentralized" class="contentCenter">
         <v-card
            v-if="show"
            class="contentCenter"
            width="400"
            rounded="lg"
            elevation="6"
         >
            <v-alert
               class="contentCenter removeMarginBottom"
               :type="type"
               width="400"
               rounded="sm"
               >{{ message }}</v-alert
            >
         </v-card>
      </div>

      <div v-else>
         <v-card
            v-if="show"
            class="contentCenter"
            width="400"
            rounded="lg"
            elevation="6"
         >
            <v-alert
               class="contentCenter removeMarginBottom"
               :type="type"
               width="400"
               rounded="sm"
               >{{ message }}</v-alert
            >
         </v-card>
      </div>
   </div>
</template>

<script>
export default {
   name: 'MylevAlert',

   props: {
      show: {
         type: Boolean,
         default: false,
      },

      type: {
         type: String,
         required: true,
      },

      message: {
         type: String,
         required: true,
      },

      isCentralized: {
         type: Boolean,
         default: false,
      },
   },
};
</script>

<style scoped>
.alertMargin {
   margin-top: 30px;
}

.removeMarginBottom {
   margin-bottom: 0;
}
</style>
