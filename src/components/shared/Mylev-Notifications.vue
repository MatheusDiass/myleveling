<template>
  <div class="notifications">
    <transition-group>
      <v-card
        v-for="item in listNotifications"
        :key="item.id"
        :class="['notification', 'mb-3', `${item.type}Color`]"
        width="300"
        rounded="lg"
        elevation="6"
      >
        <v-card-text class="textColor">{{ item.message }}</v-card-text>
        <v-icon @click="deleteNotify(item.id)" class="textColor mr-3">mdi-close</v-icon>
      </v-card>
    </transition-group>
  </div>
</template>

<script>
import EventBus from '@/helpers/EventBus'

export default {
  name: 'MylevNotification',

  data() {
    return {
      //Lista de notificações
      listNotifications: [],
    }
  },

  mounted() {
    //Recebe os dados emitidos pelo event bus
    EventBus.$on('notify', this.createNotify)
  },

  methods: {
    //Cria a notificação - Adiciona na lista de notificações para ser exibida
    createNotify(info) {
      const notifyId = setTimeout(this.deleteNotify, info.delay, info.id)

      this.listNotifications.push({
        notifyId,
        ...info,
      })
    },

    //Deleta a notificação - Remove da lista
    deleteNotify(id) {
      const notify = this.listNotifications.find((item) => item.id === id)

      if (!notify) {
        return
      }

      clearTimeout(notify.notifyId)
      this.listNotifications = this.listNotifications.filter(
        (item) => item.id !== id
      )
    },
  },
}
</script>

<style scoped>
.notifications {
  display: block;
  position: fixed;
  right: 15px;
  z-index: 5000;
  bottom: 40px;
}

.notification {
  display: flex;
}

.successColor {
  background-color: #40bb27 !important;
}

.informationColor {
  background-color: #2475dd !important;
}

.warningColor {
  background-color: orange !important;
}

.errorColor {
  background-color: red !important;
}

/* Animação para rotacionar */
.v-enter-active {
  animation: notifyRotate 0.5s;
}

.v-leave-active {
  animation: notifyRotate 0.5s reverse;
}

.v-move {
  transition: all 0.2s;
}

@keyframes notifyRotate {
  0% {
    transform: rotate(0deg) scale(0);

  }

  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>
