<template>
  <v-avatar :class="[border]" :size="avatarSize" color="white">
    <v-img v-if="picture" :src="picture" :alt="username" />
    <span v-else>{{ getNameFirstChars }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: 'MylevUserImage',

  data() {
    return {}
  },

  props: {
    isSmall: {
      type: Boolean,
      default: false,
    },

    hasBorder: {
      type: Boolean,
      default: false,
    },

    profile: {
        type: Object,
        required: true,
    }
  },

  computed: {
    //Tamamnho do avatar do usuário
    avatarSize() {
      if (this.isSmall) {
        return 28
      } else {
        return 100
      }
    },

    //Retona a foto do usuário
    picture() {
        return this.profile.profilePicture;
    },

    username() {
        return this.profile.name || "Anônimo";
    },

    //Pega a primeira letra do nome e do sobrenome para colocar na imagem do usuário
    //Caso o usuário não tenha foto
    getNameFirstChars() {
        let firstNameChar = 'M';
        let lastNameChar = 'L';

        if(!this.profile.name) {
            return `${firstNameChar}${lastNameChar}`;
        } else {
            const arrayName = this.profile.name.split(' ');

            if(arrayName.length > 1) {
                firstNameChar = arrayName[0][0];
                lastNameChar = arrayName[1][0];

                return `${firstNameChar}${lastNameChar}`;
            } else {
                firstNameChar = arrayName[0][0];

                return firstNameChar;
            }
        }
    },

    //Com base na computed "hasBorder" adiciona uma bordar no avatar
    border() {
      return this.hasBorder ? 'whiteBorder' : '';
    }
  },
}
</script>

<style>
.whiteBorder {
  border: 5px solid white;
}
</style>