import { useEffect, useState } from 'react';
import type { Category } from '../presenters/components/ui/subjects';
import { getAllCategories } from '../resources/categoryResources';
import { useToast } from './useToast';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllCategories()
      .then(res => {
        if (!mounted) return;
        const list = Array.isArray(res.data.details) ? res.data.details : [];
        setCategories(list);
      })
      .catch(() => {
        showToast({ type: 'error', message: 'Falha ao carregar categorias.' });
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, [showToast]);

  return { categories, loading } as const;
}
