import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { createNotify, NOTIFICATION_TYPE } from '@/helpers/EventBus';
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    //Getters Vuex
    ...mapGetters('profile', ['profile']),
  },

  methods: {
    //Actions Vuex
    ...mapActions(['saveInititalProfileInformations']),
    ...mapActions('profile', ['fecthProfileByUid']),

    async loginGoogle() {
      try {
        const auth = getAuth();

        //Provedor de login(Google)
        const provider = new GoogleAuthProvider()

        //Abre popup de login(Google)
        let data = await signInWithPopup(auth, provider)

        //Caso o login seja feito corretamente é gerado um token e recebido algumas informações do usuário
        const token = data.user.accessToken;
        const userData = data.user;

        //Pega informações do usuário no firebase
        await this.fecthProfileByUid({ uid: userData.uid })

        //Dados do usuário
        const user = {
          uid: userData.uid,
          name: userData.displayName,
          nickname: '',
          profilePicture: userData.photoURL,
          role: "STUDENT",
          emailVerified: userData.emailVerified,
          verificationCode: 0,
        }

        //Se o usuário não tiver um perfil salvo no firebase, o perfil é criado
        if (!this.profile) {
          //Salva as informações do usuário no firebase
          const res = await this.saveInititalProfileInformations(user)

          if (res) {
            //Salva nos cookies do navegador os dados do usuário e seu token
            this.$cookies.set('profile', JSON.stringify(user))
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
              message: res,
            });
          }
        } else {
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
        }
      } catch (error) {
        let errorMessage = ''

        //Verifica se existe algum erro referente ao login com o google
        if (error.code) {
          if(error.code == 'auth/popup-closed-by-user') {
            errorMessage = 'Login cancelado!';
          }

          //Se não verifica se existe algum erro refente ao backend
        } else {
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
