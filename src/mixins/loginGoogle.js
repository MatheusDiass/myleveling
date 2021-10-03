import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('profile', ['profile']),
  },

  methods: {
    ...mapActions(['saveInititalProfileInformations', 'showAlertMessage']),
    ...mapActions('profile', ['fecthSubjectByUid']),

    async login() {
      try {
        const auth = getAuth()

        //Provedor de login(Google)
        const provider = new GoogleAuthProvider()

        //Abre popup de login(Google)
        let data = await signInWithPopup(auth, provider)

        //Caso o login seja feito corretamente é gerado um token e recebido algumas informações do usuário
        const credential = GoogleAuthProvider.credentialFromResult(data)
        const token = credential.accessToken
        const userData = data.user

        //Pega informações do usuário no firebase
        await this.fecthSubjectByUid({ uid: userData.uid })

        //Dados do usuário
        const user = {
          uid: userData.uid,
          name: userData.displayName,
          nickname: '',
          profilePicture: userData.photoURL,
          emailVerified: userData.emailVerified,
          verificationCode: 0,
        }

        //Se o usuário não tiver um perfil salvo no firebase, o perfil é criado
        if (!this.profile) {
          //Salva as informações do usuário no firebase
          const res = await this.saveInititalProfileInformations(user)
          console.log(res)
          if (res) {
            //Salva nos cookies do navegador os dados do usuário e seu token
            this.$cookies.set('profile', JSON.stringify(user))
            this.$cookies.set('token', token)

            console.log(this.$cookies.get('profile'))
          } else {
            //Exibe o Alert de erro
            this.showAlertMessage({ show: true, message: res })
          }
        } else {
          //Salva nos cookies do navegador os dados do usuário e seu token
          this.$cookies.set('profile', user)
          this.$cookies.set('token', token)
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

        //Exibe o Alert de erro
        this.showAlertMessage({ show: true, message: errorMessage });
      }
    },
  },
}
