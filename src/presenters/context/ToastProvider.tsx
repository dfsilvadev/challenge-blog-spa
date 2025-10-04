// ToastProvider.tsx
import React, { useState, useMemo, useCallback, type ReactNode } from 'react';
import { ToastAll } from '../components/toast/';
import {
  TOAST_DEFAULT_TIMEOUT,
  formatToastMessage,
} from '../../utils/toastUtils';
import type { Toast } from '../components/ui/toast';
import { ToastContext } from './ToastContext';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((toast: Toast) => {
    setToast({ ...toast, message: formatToastMessage(toast.message) });
    setTimeout(() => setToast(null), TOAST_DEFAULT_TIMEOUT);
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && (
        <div className="fixed top-30 right-8 z-50">
          <ToastAll type={toast.type} message={toast.message} />
        </div>
      )}
    </ToastContext.Provider>
  );
};
