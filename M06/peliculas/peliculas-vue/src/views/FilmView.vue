<script setup>
import { ref } from 'vue';

import { useFilm } from "@/composable/film/useFilm.js";
const film = useFilm();

import CardFilm from "@/components/CardFilm.vue";
import ModalFilmInfo from "@/components/ModalFilmInfo.vue";
</script>

<template>
  <div class="container">
    <div class="fs-3 mb-2">
      Films
    </div>

    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="search-input" placeholder="Buscar..." v-model="film.searchInput.value" @blur="film.search(film.searchInput.value)">
      <label for="search-input">Buscar...</label>
    </div>

    <div class="row">
      <div v-for="(f, index) in film.films.data" class="col-lg-4 col-6">
        <card-film :film="f"
                   @film="film.selectFilm($event)"

        />
      </div>
    </div>
  </div>

  <modal-film-info :film="film.filmSelected"/>
</template>
