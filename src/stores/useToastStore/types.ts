import type { Toast } from '@/types';

export type SetToast = (
  toast: Omit<Toast, 'id'> & {
    id?: Toast['id'];
  },
) => void;
