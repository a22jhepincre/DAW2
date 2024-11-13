<script setup>
import {useModalFilmInfo} from "@/composable/film/useModalFilmInfo.js";

const props = defineProps({
  film: {
    type: Object,
    default: {}
  }
});

const modalFilmInfo = useModalFilmInfo(props);
</script>

<template>
  <div class="modal fade" id="modal-info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{modalFilmInfo.film.data.Title}}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4 col-12">
              <img :src="modalFilmInfo.film.data.Poster" :alt="modalFilmInfo.film.data.Title" class="img-fluid">
              <div class="row px-2 py-3">
                <div class="col-lg-12 col-12">
                  <label class="fw-bold fs-6">Rating</label>
                  <p class="m-0 fs-6">{{ modalFilmInfo.film.data.imdbRating }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-8 col-12">
              <div class="row mb-4">
                <div class="col-lg-4 col-6">
                  <label class="fw-bold fs-6">Titulo</label>
                  <p class="m-0 fs-6">{{ modalFilmInfo.film.data.Title }}</p>
                </div>
                <div class="col-lg-4 col-6">
                  <label class="fw-bold fs-6">Genero</label>
                  <p class="m-0 fs-6">{{ modalFilmInfo.film.data.Genre }}</p>
                </div>
                <div class="col-lg-4 col-12">
                  <label class="fw-bold fs-6">Tiempo</label>
                  <p class="m-0 fs-6">{{ modalFilmInfo.film.data.Runtime }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4 col-12">
                  <label class="fw-bold fs-6">Director</label>
                  <p class="m-0 fs-6">{{ modalFilmInfo.film.data.Director }}</p>
                </div>
                <div class="col-lg-4 col-12">
                  <label class="fw-bold fs-6">Escritor</label>
                  <p class="m-0 fs-6">{{ modalFilmInfo.film.data.Writer }}</p>
                </div>
                <div class="col-lg-4 col-12">
                  <label class="fw-bold fs-6">Actores</label>
                  <p class="m-0 fs-6">{{ modalFilmInfo.film.data.Actors }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
