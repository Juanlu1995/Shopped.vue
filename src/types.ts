import type { Component } from 'vue';

export interface Customer {
  readonly id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

enum ToastType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface Toast {
  id: string;
  title?: Component | string;
  description?: Component | string;
  type: keyof typeof ToastType;
}
