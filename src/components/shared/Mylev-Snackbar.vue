<template>
  <v-snackbar
    v-model="showSnackbar.show"
    color="green"
    timeout="4000"
    rounded="lg"
    right
  >
    {{ showSnackbar.message }}
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MylevSnackbar",

  computed: {
    ...mapGetters(["showSnackbar"]),
  },
};
</script>

<style>
.v-sheet.v-snack__wrapper {
  border: 5px solid white !important;
  margin-bottom: 50px;
  margin-right: 12px;
}

.v-snack__content {
  display: flex;
  justify-content: center;
  color: black;
  font-size: 16px !important;
}
</style>