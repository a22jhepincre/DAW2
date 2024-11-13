import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive} from 'vue';
import * as comm from "@/communicationManager/communicationManager.js";

export function useFilm() {
    const title = ref('Hola'); // Título para el card
    const films = reactive({data:[]})
    function updateTitle(newTitle) {
        title.value = newTitle;
    }

    onBeforeMount(async () => {
        films.data = await comm.getFilms();

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
        title,
        updateTitle,
        films
    };
}
