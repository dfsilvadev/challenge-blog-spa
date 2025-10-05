import PostCard from '../postcard/PostCard';
import { getColorFromCategory } from '../../../utils/colorCategory';
import type { Detail } from '../../components/ui/posts';

interface PostsGridProps {
  posts: Detail[];
  isLandscape: boolean;
  onDelete: (id: string) => void;
}

export const PostsGrid = ({ posts, isLandscape, onDelete }: PostsGridProps) => {
  if (posts.length === 0) return <p>Nenhum post encontrado.</p>;

  return (
    <div
      className={`mt-12 gap-10 xl:gap-2 ${
        isLandscape
          ? 'grid'
          : 'grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] lg:grid-cols-[repeat(auto-fill,minmax(200px,auto))] 2xl:grid-cols-[repeat(auto-fill,minmax(400px,auto))]'
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
          onDelete={() => onDelete(post.id)}
        />
      ))}
    </div>
  );
};
