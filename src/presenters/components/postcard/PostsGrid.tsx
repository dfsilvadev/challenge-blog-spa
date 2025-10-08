import { getColorFromCategory } from '../../../utils/colorCategory';
import type { Detail } from '../../components/ui/posts';
import PostCard from '../postcard/PostCard';

interface PostsGridProps {
  posts: Detail[];
  isLandscape: boolean;
  onDelete: (id: string) => void;
}

export const PostsGrid = ({ posts, isLandscape, onDelete }: PostsGridProps) => {
  if (posts.length === 0) return <p>Nenhum post encontrado.</p>;

  return (
    <div
      className={`mt-12 mx-auto max-w-[1800px] px-4 ${
        isLandscape
          ? 'flex flex-col gap-6'
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 gap-6'
      }`}
    >
      {posts.map(post => (
        <PostCard
          key={post.id}
          postId={post.id}
          title={post.title}
          description={post.content}
          author={post.user_name}
          createDate={post.created_at}
          category={getColorFromCategory(post.category_name)}
          isLandscape={isLandscape}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
