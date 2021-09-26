<template>
  <div class="contentCenter alertMargin" v-if="showAlert.show">
    <v-alert class="contentCenter" type="error" width="400"
      >{{ showAlert.message }}</v-alert
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MylevAlert",

  computed: {
    ...mapGetters(["showAlert"]),
  },
};
</script>

<style scoped>
.alertMargin {
  margin-top: 30px;
}
</style>