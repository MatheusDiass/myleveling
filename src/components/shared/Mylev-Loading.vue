<template>
   <v-overlay v-model="isLoading" opacity="0.95">
      <div class="contentCenter">
         <v-img
            max-height="200"
            max-width="200"
            :src="require('../../assets/img/Myleveling_Logo_White.png')"
         ></v-img>
      </div>
      <div class="contentCenter">
         <v-progress-circular indeterminate size="64"> </v-progress-circular>
      </div>
   </v-overlay>
</template>

<script>
export default {
   name: 'MylevLoading',

   props: {
      isLoading: {
         type: Boolean,
         required: true,
      },
   },
};
</script>
