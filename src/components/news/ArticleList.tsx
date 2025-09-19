import { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  onArticleClick?: (article: Article) => void;
  useLinks?: boolean;
}

export function ArticleList({ articles, onArticleClick, useLinks = false }: ArticleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={() => onArticleClick?.(article)}
          href={useLinks ? `/articles/${article.url.split('/').pop()}` : undefined}
        />
      ))}
    </div>
  );
}