import { ToastType } from '@/types';

export const TOAST_TYPE_CLASS: Record<ToastType, string> = {
  [ToastType.ERROR]: 'bg-red-600/80',
  [ToastType.INFO]: 'bg-cyan-600/80',
  [ToastType.SUCCESS]: 'bg-green-600/80',
  [ToastType.WARNING]: 'bg-yellow-600/80',
};
