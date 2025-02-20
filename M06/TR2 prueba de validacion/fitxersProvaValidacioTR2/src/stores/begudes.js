import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useBegudesStore = defineStore('begudes', () => {
  const arrayBegudes = ref([]);

  const getArrayBegudes = computed(() => arrayBegudes.value);

  const addBeguda = (beguda) => {
    arrayBegudes.value.push(beguda);
    console.log("añadido")
    console.log(beguda)
  };

  return { arrayBegudes, getArrayBegudes, addBeguda };
});