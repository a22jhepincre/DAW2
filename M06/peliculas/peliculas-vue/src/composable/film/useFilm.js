import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, reactive} from 'vue';
import * as comm from "@/communicationManager/communicationManager.js";

export function useFilm() {
    const films = reactive({data:[]})
    const filmSelected = reactive({data:{}})

    const searchInput = ref('');

    const search = async(data)=>{
        console.log(data)
        films.data = await comm.getFilms(data);
    }

    const selectFilm = async(film) => {
        console.log(film)
        filmSelected.data = await comm.getFilm(film.data.imdbID);
        console.log(filmSelected.data);
    }

    onBeforeMount(async () => {
        films.data = await comm.getFilms("batman");

        console.log('onBeforeMount: El componente está a punto de montarse');
    });

    onMounted(() => {
        console.log('onMounted: El componente se ha montado');
    });

    onBeforeUpdate(() => {
    });

    onUpdated(() => {
    });

    return {
        films,
        filmSelected,
        searchInput,

        selectFilm,
        search
    };
}
