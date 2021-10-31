//Validação de email com regex
export default function emailValidation(email) {
   const reg =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

   if (reg.test(email)) {
      return true
   } else {
      return false
   }
}
