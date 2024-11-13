<script setup>
import {useCardFilm} from "@/composable/film/useCardFilm.js";

const props = defineProps({
  film: {
    type: Object,
    default: {}
  }
});

const cardFilm = useCardFilm(props);
</script>

<template>
  <div class="card mb-4">
    <div class="card-body p-0">
      <div class="w-100">
        <img :src="cardFilm.film.data.Poster" class="img-fluid card-img" alt="Poster">
      </div>
      <div class="px-3 py-2">
        <p class="fs-4 fw-bold">{{ cardFilm.film.data.Title }}</p>
        <p class="fs-6">{{ cardFilm.film.data.Year }}</p>
      </div>
    </div>
  </div>
</template>
