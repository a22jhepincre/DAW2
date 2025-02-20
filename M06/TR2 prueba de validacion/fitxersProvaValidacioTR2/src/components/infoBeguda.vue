<template>
    <div>
        <img width="100px" alt="{{ props.beguda.strDrink }}" :src="props.beguda.strDrinkThumb">
        <h2>{{ props.beguda.strDrink }}</h2>
        <button @click="afegir">Afegir a favorits</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['beguda'])

const emit = defineEmits(['afegir']);

const afegir = () => {
    emit('afegir', props.beguda);
};
</script>

<style lang="scss" scoped>

</style>