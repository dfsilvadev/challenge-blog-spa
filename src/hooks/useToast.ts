import { useContext } from 'react';
import { ToastContext } from '../presenters/context/ToastContext';
import type { Toast } from '../presenters/components/ui/toast';

export const useToast = () => {
  const context = useContext<{ showToast: (toast: Toast) => void } | undefined>(
    ToastContext
  );
  if (!context)
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  return context;
};
