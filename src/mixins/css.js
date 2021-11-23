export default {
    computed: {
        //Used by Mylev-Tasks and Mylev-Bookmarks
        smallScreenMargin() {
            const width = this.$vuetify.breakpoint.width;

            if(width < 1245 && width > 952 || width < 494) {
                return 'smallScreenMargin';
            } else {
                return ''
            }
         }
    }
}