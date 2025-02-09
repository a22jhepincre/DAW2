import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive} from 'vue';

export function useCardFilm(props, emit) {
    const film = reactive({data:props.film});

    const selectFilm = ()=>{
        console.log(film);
        emit('film', film);
    }
    onBeforeMount(() => {
        console.log('onBeforeMount: El componente está a punto de montarse');
    });

    onMounted(() => {
        console.log('onMounted: El componente se ha montado');
    });

    onBeforeUpdate(() => {
        console.log('onBeforeUpdate: El componente está a punto de actualizarse');
    });

    onUpdated(() => {
        console.log('onUpdated: El componente se ha actualizado');
    });

    return {
        film,

        selectFilm
    };
}
