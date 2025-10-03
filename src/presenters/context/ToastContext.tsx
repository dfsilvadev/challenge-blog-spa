import { createContext } from 'react';

import type { Toast } from '../components/ui/toast';

export const ToastContext = createContext<
  { showToast: (toast: Toast) => void } | undefined
>(undefined);
