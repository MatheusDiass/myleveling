import Vue from 'vue'

export function getCookie(keyName) {
    return Vue.$cookies.get(keyName);
}

export function setCookie(keyName, data) {
    Vue.$cookies.set(keyName, data);
}

export function removeCookie(keyName) {
    Vue.$cookies.remove(keyName);
}