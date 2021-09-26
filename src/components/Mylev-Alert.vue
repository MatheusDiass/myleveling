<template>
  <div class="contentCenter alertMargin" v-if="show">
    <v-alert class="contentCenter" type="error" width="400"
      >{{ message }}</v-alert
    >
  </div>
</template>

<script>
export default {
  name: "MylevAlert",

  props: {
      show: {
          type: Boolean,
          required: true,
      },
      message: {
          type: String,
          required: true,
      },
  }
};
</script>

<style scoped>
.alertMargin {
  margin-top: 30px;
}
</style>