import { defineStore } from 'pinia';
import { ref } from 'vue';

const useModalStore = defineStore('modal', () => {
  const isModalShown = ref(false);
  const setModalShown = (isShown: boolean) => {
    isModalShown.value = isShown;
  };
  return { isModalShown, setModalShown };
});

export default useModalStore;
