import type { SetToast } from '@/stores/useToastStore/types';
import { parseOptionalStringComponentProp } from '@/stores/useToastStore/utils';
import type { Toast } from '@/types';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([
    {
      title: 'Title',
      id: 'id',
      type: 'ERROR',
    },
  ]);

  const setToast: SetToast = (toast) => {
    if (!toast.id) {
      toast.id = uuidv4();
    }

    toast.title = parseOptionalStringComponentProp(toast.title);
    toast.description = parseOptionalStringComponentProp(toast.description);

    toasts.value = [...toasts.value, toast as Toast];
  };

  /**
   * Removes the toast from the store
   * @param toastToRemove - The toast id to be removed.
   */
  const removeToast = (toastToRemove: Toast | Toast['id']) => {
    const id: string =
      typeof toastToRemove === 'string'
        ? toastToRemove
        : toastToRemove?.id || '';
    if (!id) {
      throw new Error('toast id is not valid');
    }

    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  return {
    toasts,
    setToast,
    removeToast,
  };
});
