import axios from "axios";
import config from "@/configuration/configuration.json";
import { getCookie } from './managerCookies';
import store from '../store';

/*
Helper para verificar se o token é valido e se o usuário tem
permissão para acessar a rota
*/
export default async function checkPermission(to, from, next) {
    const profile = getCookie('profile');
    const token = getCookie('token');

    if (!profile || !token) {
        next({ name: 'Login' });
        return;
    } else {
        try {
            await axios.post(`${config.checkToken}`, { token });

            if (to.path.includes('admin') && profile.role === "ADMIN") {
                next(true);
            } else if (to.path.includes('admin') && profile.role === "STUDENT") {
                next({ name: 'Home' });
            } else {
                next(true);
            }
        } catch (error) {
            store.dispatch('logout');
            return;
        }
    }
}