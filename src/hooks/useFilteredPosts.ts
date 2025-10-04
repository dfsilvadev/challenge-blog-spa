import { useState, useMemo } from 'react';
import type { Detail } from '../presenters/components/ui/posts';

export function useFilteredPosts(posts: Detail[], initialSearch: string = '') {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !selectedCategory ||
        post.category_name.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [posts, search, selectedCategory]);

  return {
    filteredPosts,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
  };
}
