<template>
  <v-app>
    <MylevNavbar />

    <v-main class="backgroudColor">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MylevNavbar from "./components/Mylev-Navbar.vue";

export default {
  name: "App",

  components: {
    MylevNavbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Changa+One&display=swap');

.heightNavFooter {
  height: 80px !important;
}

.color {
  background-color: #499fc6 !important;
}

.v-application {
  font-family: 'Changa One';
}

.textColor {
  color: #333 !important;
}

.backgroudColor {
  background-color: #899397;
}
</style>
