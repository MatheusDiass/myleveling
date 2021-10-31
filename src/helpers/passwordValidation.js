//Validação de senha com regex
export default function passwordValidation(password) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    
    if(reg.test(password)) {
        return true;
    } else {
        return false;
    }
}