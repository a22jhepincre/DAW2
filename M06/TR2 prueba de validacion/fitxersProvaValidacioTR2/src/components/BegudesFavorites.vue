<template>
    <div>
        <h1>Begudes Favorites</h1>
    </div>

  <div v-for="favBegudes in data.data">
    <div>
      <img width="100px" alt="{{ favBegudes.strDrink }}" :src="favBegudes.strDrinkThumb">
      <h2>{{ favBegudes.strDrink }}</h2>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, reactive} from 'vue';
import {useBegudesStore} from "@/stores/begudes.js";
import InfoBeguda from "@/components/infoBeguda.vue";
// Aquí puedes definir las propiedades reactivas, métodos o computadas si lo necesitas en el futuro
const data = reactive({data:[]});

onMounted(() => {
    // Código que se ejecuta al montar el componente
    data.data = useBegudesStore().getArrayBegudes
    console.log(data.data)
});
</script>

<style lang="scss" scoped>

</style>
