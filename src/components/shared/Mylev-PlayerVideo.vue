<template>
  <vue-plyr>
    <video controls crossorigin playsinline>
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
