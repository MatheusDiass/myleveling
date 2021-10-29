<template>
  <v-card class="paddingCard" color="#499fc6" rounded="lg" flat>
    <v-form>
      <label>Email:</label>
      <v-text-field
        v-model="email"
        background-color="white"
        outlined
      ></v-text-field>

      <label>Senha:</label>
      <v-text-field
        v-model="password"
        background-color="white"
        outlined
      ></v-text-field>

      <div class="contentCenter">
        <v-btn @click="loginEmailAndPassword" color="#3898ec">Login</v-btn>
      </div>

      <div>
        <br />
        <v-row class="contentCenter"><label>Outras Opções</label></v-row>
        <v-row class="contentCenter">
          <a @click="loginGoogle"
            ><v-img
              max-height="60"
              max-width="60"
              :src="require('../../../assets/logoGoogle.png')"
            ></v-img
          ></a>
        </v-row>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';
import { loginGoogle } from '@/mixins'
import { mapActions } from 'vuex'

export default {
  name: 'MylevLoginCard',

  mixins: [loginGoogle],

  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    //Actions Vuex
    ...mapActions('profile', ['fecthUserDataByEmail']),
    
    async loginEmailAndPassword() {
      try {
        const auth = getAuth()
        
        const userData = await this.fecthUserDataByEmail(this.email);

        if(userData.emailVerified) {
          //Realiza o login e recebe os dados de retorno
          const data = await signInWithEmailAndPassword(
            auth,
            this.email,
            this.password
          )

          //Recebe o token
          const token = data.user.accessToken

          //Recebe o UID do usuário
          const uidUser = data._tokenResponse.localId

          //Pega informações do usuário no firebase
          await this.fecthProfileByUid({ uid: uidUser })

          //Salva nos cookies do navegador os dados do usuário e seu token
          this.$cookies.set('profile', JSON.stringify(this.profile))
          this.$cookies.set('token', token)

          //Cria a notificação
          createNotify({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: 'Login realizado com sucesso!',
          });

          //Muda para a página de listagem das matérias
          this.$router.push({ name: 'Home' })
        } else {
          //Cria a notificação
          createNotify({
            type: NOTIFICATION_TYPE.ERROR,
            message: 'Confirme seu email antes de fazer login!',
          });
        }

        
      } catch (error) {
        let errorMessage = '';

        //Verifica se existe algum erro referente ao login com o google
        if(error.code) {
          switch (error.code) {
            case 'auth/invalid-email':
              errorMessage = 'Email inválido!';
              break;

            case 'auth/user-not-found':
              errorMessage = 'Email não cadastrado!';
              break;
          }
        } else {
          //Se não verifica se existe algum erro refente ao backend
          if (error.response) {
            errorMessage = error.response.data
          } else {
            errorMessage = 'Não foi possível se conectar com a API!'
          }
        }
        
        //Cria a notificação
        createNotify({
          type: NOTIFICATION_TYPE.ERROR,
          message: errorMessage,
        });
      }
    },
  },
}
</script>
