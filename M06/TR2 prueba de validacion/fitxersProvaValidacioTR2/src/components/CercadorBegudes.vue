<template>
    <div>
        <h1>Cercador Begudes</h1>
        <button v-for="item in ['A','B','C','D','E']" :key="item" @click="seleccionar(item)">
            {{ item }}
        </button>
    </div>

    <div v-for="beguda in resultado.data">
      <InfoBeguda :beguda="beguda" @afegir="storeBegudes.addBeguda" />
    </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue';
import InfoBeguda from "@/components/infoBeguda.vue";
import {useBegudesStore} from "@/stores/begudes.js";

const storeBegudes = useBegudesStore();
const resultado = reactive({data:[]});

const seleccionar = (letter) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then(data => {
            resultado.data = data.drinks;
            console.log(data);
            console.log(resultado);
        });
};
onMounted(() => {
  console.log(useBegudesStore().getArrayBegudes)
});

</script>

<style lang="scss" scoped>

</style>
