<script setup>
import {useCardFilm} from "@/composable/film/useCardFilm.js";

const props = defineProps({
  film: {
    type: Object,
    default: {}
  }
});
const emit = defineEmits([
    'film'
])

const cardFilm = useCardFilm(props, emit);
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
        <button @click="cardFilm.selectFilm" class="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modal-info"
        >
          <i class="bi bi-info-circle-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>
