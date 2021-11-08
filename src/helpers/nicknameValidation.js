import axios from 'axios'
import config from '@/configuration/configuration.json'

export default async function nicknameValidation(nickname) {
   const { data } = await axios.post(`${config.checkNickname}`, { nickname })

   return data
}
