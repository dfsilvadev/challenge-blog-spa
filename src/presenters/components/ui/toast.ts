export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
  type: ToastType;
  message: string;
}
