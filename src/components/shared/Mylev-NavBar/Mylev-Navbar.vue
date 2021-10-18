<template>
  <div>
    <v-app-bar class="color heightNavFooter" flat dense>
      <v-toolbar-title
        ><v-img
          max-height="60"
          max-width="60"
          :src="require('../../../assets/logo.png')"
        ></v-img
      ></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-row class="hidden-sm-and-down">
        <v-btn :to="{ name: 'Home' }" elevation="0" class="textColor" text exact
          >Home</v-btn
        >

        <!-- Exibe as opções de gerenciamento do conteúso do site caso o usuário for admin -->
        <div v-if="isAdmin">
          <MylevAdminOptionsDesktop />
        </div>

        <!-- Botão com o imagem e o nome do usuário, com as opções de Perfil e Logout -->
        <v-menu v-if="isLogged" offset-y>
          <template v-slot:activator="{ on, attrs }">
            
            <v-btn class="textColor" v-bind="attrs" v-on="on" elevation="0" text
              ><MylevUserImage class="mr-1" :isSmall="true" :profile="profile" /><span>{{ username }}</span></v-btn
            >
          </template>
          <v-list class="color">
            <v-list-item
              ><v-btn
                elevation="0"
                class="textColor"
                text
                exact
                >Perfil</v-btn
              ></v-list-item
            >

            <v-list-item
              ><v-btn
                @click="logout"
                elevation="0"
                class="textColor"
                text
                exact
                >Logout</v-btn
              ></v-list-item
            >
          </v-list>
        </v-menu>

        <!-- Se o usuário não estiver logado as opções(Cadastro, Login) abaixo também são exibidas -->
        <div v-if="!isLogged">
          <v-btn :to="{ name: 'Register' }" elevation="0" class="textColor" text
            >Cadastrar</v-btn
          >
          <v-btn :to="{ name: 'Login' }" elevation="0" class="textColor" text
            >Login</v-btn
          >
        </div>
      </v-row>

      <v-row class="hidden-md-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="float-right color" v-bind="attrs" v-on="on"
              ><v-icon>mdi-menu</v-icon></v-btn
            >
          </template>

          <v-list class="color">
            <v-list-item>
              <v-btn
                :to="{ name: 'Home' }"
                elevation="0"
                class="textColor"
                text
                exact
                >Home</v-btn
              >
            </v-list-item>

            <!-- Exibe as opções de gerenciamento do conteúso do site caso o usuário for admin -->
            <div v-if="isAdmin">
              <MylevAdminOptionsMobile />
            </div>

            <!-- Botão com o imagem e o nome do usuário, com as opções de Perfil e Logout -->
            <v-list-item v-if="isLogged">
              <v-menu offset-x left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="textColor" v-bind="attrs" v-on="on" elevation="0" text
                    ><MylevUserImage class="mr-1" :isSmall="true" :profile="profile" /><span>{{ username }}</span></v-btn
                  >
                </template>
                <v-list class="color">
                  <v-list-item
                    ><v-btn
                      elevation="0"
                      class="textColor"
                      text
                      exact
                      >Perfil</v-btn
                    ></v-list-item
                  >
                  <v-list-item
                    ><v-btn
                      @click="logout"
                      elevation="0"
                      class="textColor"
                      text
                      exact
                      >Logout</v-btn
                    ></v-list-item
                  >
                </v-list>
              </v-menu>
            </v-list-item>

            <!-- Se o usuário não estiver logado as opções(Cadastro, Login) abaixo também são exibidas -->
            <div v-if="!isLogged">
              <v-list-item>
                <v-btn
                  :to="{ name: 'Register' }"
                  elevation="0"
                  class="textColor"
                  text
                  >Cadastrar</v-btn
                >
              </v-list-item>

              <v-list-item>
                <v-btn
                  :to="{ name: 'Login' }"
                  elevation="0"
                  class="textColor"
                  text
                  >Login</v-btn
                >
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import MylevAdminOptionsDesktop from './components/Mylev-AdminOptionsDesktop.vue'
import MylevAdminOptionsMobile from './components/Mylev-AdminOptionsMobile.vue'
import MylevUserImage from '../Mylev-UserImage.vue'
import { getCookie, removeCookie } from '@/helpers/managerCookies'

export default {
  name: 'MylevNavBar',

  components: {
    MylevAdminOptionsDesktop,
    MylevAdminOptionsMobile,
    MylevUserImage,
  },

  data() {
    return {
      isLogged: false,
      isAdmin: false,
      profile: {},
    }
  },

  created() {
    this.checkPermissionUser()
  },

  computed: {
    username() {
        return this.profile.name || "Anônimo";
    },
  },

  methods: {
    //Verifica se o usuário está logado e se o mesmo tem permissão de admin
    //Utiliza os cookies do navegador
    checkPermissionUser() {
      const profile = getCookie('profile')

      if (!profile) {
        this.isLogged = false
      } else {
        this.profile = profile;
        this.isLogged = true
        if (profile.role === 'ADMIN') {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      }
    },

    //Encerra a seção do usuário
    logout() {
      removeCookie('profile');
      removeCookie('token');

      //Muda para a página de login
      this.$router.push({ name: "Login" });
    }
  },
}
</script>

<style>
.v-toolbar__content {
  padding-top: 32px !important;
}

.row {
  margin: 0 !important;
  justify-content: end;
}
</style>
