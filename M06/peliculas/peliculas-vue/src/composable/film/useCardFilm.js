import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive} from 'vue';

export function useCardFilm(props) {
    // const title = ref(props.title);
    const film = reactive({data:props.film});

    // onBeforeMount: se ejecuta antes de que el componente se monte en el DOM
    onBeforeMount(() => {
        console.log('onBeforeMount: El componente está a punto de montarse');
    });

    // onMounted: se ejecuta cuando el componente ya se ha montado en el DOM
    onMounted(() => {
        console.log('onMounted: El componente se ha montado');
        // Puedes inicializar algo aquí, como cargar datos
    });

    // onBeforeUpdate: se ejecuta antes de que el componente se actualice debido a cambios reactivos
    onBeforeUpdate(() => {
        console.log('onBeforeUpdate: El componente está a punto de actualizarse');
    });

    // onUpdated: se ejecuta después de que el componente se haya actualizado
    onUpdated(() => {
        console.log('onUpdated: El componente se ha actualizado');
    });

    return {
        film,
    };
}
