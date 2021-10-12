<template>
<v-avatar :size="avatarSize" color="#499fc6">
<span></span>
</v-avatar>
</template>

<script>
export default {
    name: "MylevUserImage",
    data(){
        return{

        }
    },
    props: {
        isSmall: {
            type: Boolean,
            default: false
        },
        isLarge: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        avatarSize(){
            if (this.isSmall){
                return 28
            } else if (this.isLarge){
                return 60
            } else {
                return 38
            }
        }
    }
}
</script>
