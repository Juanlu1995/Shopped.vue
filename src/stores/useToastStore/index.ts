import type { SetToast, SetToastType } from '@/stores/useToastStore/types';
import { parseOptionalStringComponentProp } from '@/stores/useToastStore/utils';
import type { Toast } from '@/types';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);

  const setToast: SetToast = (toast) => {
    if (!toast.id) {
      toast.id = uuidv4();
    }

    toast.title = parseOptionalStringComponentProp(toast.title);
    toast.description = parseOptionalStringComponentProp(toast.description);
    toast.footer = parseOptionalStringComponentProp(toast.footer);

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

  const setToastError: SetToastType = (toast) => {
    setToast({ ...toast, type: 'ERROR' });
  };
  const setToastInfo: SetToastType = (toast) => {
    setToast({ ...toast, type: 'INFO' });
  };
  const setToastSuccess: SetToastType = (toast) => {
    setToast({ ...toast, type: 'SUCCESS' });
  };
  const setToastWarning: SetToastType = (toast) => {
    setToast({ ...toast, type: 'WARNING' });
  };

  return {
    removeToast,
    setToast,
    setToastError,
    setToastInfo,
    setToastSuccess,
    setToastWarning,
    toasts,
  };
});
