import dayjs from 'dayjs';

export default {
    methods: {
        //Tasks
        taskDueDate(date) {
            if(!date) {
                return '';
            } else {
                return dayjs(date).format('DD/MM/YYYY');
            }
        }
    }
}