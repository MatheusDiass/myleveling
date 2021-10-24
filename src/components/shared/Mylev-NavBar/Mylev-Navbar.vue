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
                :to="{ name: 'Profile' }"
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
                      :to="{ name: 'Profile' }"
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
import { getCookie, removeCookie, hasKey } from '@/helpers/managerCookies'
import { mapActions, mapGetters } from 'vuex'

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
    }
  },

  mounted() {
    this.checkPermissionUser()
  },

  watch: {
    /*Verifica se alguma mudança ocorreu na variavel "profile" do vuex
    e executa o metódo "checkPermissionUser"*/
    profile() {
      this.checkPermissionUser()
    } 
  },

  computed: {
    //Getters Vuex
    ...mapGetters('profile', ['profile']),

    username() {
      return this.profile.name || "Anônimo";
    },
  },

  methods: {
    //Actions Vuex
    ...mapActions('profile', ['cleanProfile', 'setProfile']),

    //Verifica se o usuário está logado e se o mesmo tem permissão de admin
    //Utiliza os cookies do navegador
    checkPermissionUser() {
      if (!this.profile) {
        if(hasKey('profile')) {
          const profile = getCookie('profile');

          this.setProfile({ profile });
        } else {
          //Desabilita a visualização de alguns menus
          this.isLogged = false;
          this.isAdmin = false;
        }
      } else {
        this.isLogged = true
        if (this.profile.role === 'ADMIN') {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      }
    },

    //Encerra a seção do usuário
    logout() {
      //Remove os cookies do navegador
      removeCookie('profile');
      removeCookie('token');

      //Desabilita a visualização de alguns menus
      this.isLogged = false;
      this.isAdmin = false;

      //Limpa a variavel onde é armazenado o perfil do usuário
      this.cleanProfile();

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
