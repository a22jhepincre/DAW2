import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive} from 'vue';

export function useModalFilmInfo(props) {

    const film = reactive(props.film);

    onBeforeMount(() => {
        console.log(film)
        console.log('onBeforeMount: El componente está a punto de montarse');
    });

    onMounted(() => {

        console.log('onMounted: El componente se ha montado');
    });

    onBeforeUpdate(() => {
        console.log(film)

        console.log('onBeforeUpdate: El componente está a punto de actualizarse');
    });

    onUpdated(() => {
        console.log('onUpdated: El componente se ha actualizado');
    });

    return {
        film,

    };
}
