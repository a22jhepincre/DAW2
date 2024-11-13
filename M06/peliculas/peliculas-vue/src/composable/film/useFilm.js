import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive} from 'vue';
import * as comm from "@/communicationManager/communicationManager.js";

export function useFilm() {
    const films = reactive({data:[]})
    const filmSelected = reactive({data:{}})

    const selectFilm = async(film) => {
        console.log(film)
        filmSelected.data = await comm.getFilm(film.data.imdbID);
        console.log(filmSelected.data);
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
        films,
        filmSelected,

        selectFilm
    };
}
