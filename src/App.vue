<template>
  <v-app>
    <MylevNavbar />

    <v-main class="backgroudColor">
      <router-view />
    </v-main>

    <MylevFooter />
    <MylevSnackbar />
  </v-app>
</template>

<script>
import MylevNavbar from "./components/shared/Mylev-Navbar.vue";
import MylevFooter from "./components/shared/Mylev-Footer.vue";
import MylevSnackbar from "./components/shared/Mylev-Snackbar.vue";

export default {
  name: "App",

  components: {
    MylevNavbar,
    MylevFooter,
    MylevSnackbar,
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
  color: black !important;
}

.backgroudColor {
  background-color: #899397;
}

.contentCenter {
  display: flex !important;
  justify-content: center;
}
.paddingCard {
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 25px;
  padding-bottom: 25px;
}

.v-sheet.v-card {
  border: 5px solid white !important;
}

.container {
  width: 75%;
}
</style>
