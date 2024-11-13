<script setup>
import { ref } from 'vue';

import { useFilm } from "@/composable/film/useFilm.js";
const film = useFilm();

import CardFilm from "@/components/CardFilm.vue";
</script>

<template>
  <div class="container">
    <div class="fs-3 mb-2">
      Films
    </div>

    <div class="row">
      <div v-for="(f, index) in film.films.data" class="col-lg-4 col-6">
        <card-film :film="f"/>
      </div>
    </div>
  </div>
</template>
