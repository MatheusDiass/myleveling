<template>
  <vue-plyr>
    <video class="playerSize" controls crossorigin playsinline>
      <source :src="linkVideo" type="video/mp4" />
    </video>
  </vue-plyr>
</template>

<script>
export default {
  name: 'MylevSubContentVideo',

  props: {
    linkVideo: {
      type: String,
      required: true,
    },
  }
}
</script>

<style scoped>
.playerSize {
  width: 100%;
  height: 600px;
}
</style>