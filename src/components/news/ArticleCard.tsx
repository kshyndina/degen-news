import Link from 'next/link';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
  href?: string;
  key?: string;
}

export function ArticleCard({ article, onClick, href }: ArticleCardProps) {
  const CardContent = (
    <div
      className="border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer p-4 group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {article.category}
        </span>
        {article.date && (
          <span className="text-xs text-gray-500">
            {new Date(article.date).toLocaleDateString()}
          </span>
        )}
      </div>
      
      <h3 className="text-white text-lg font-medium mb-2 group-hover:text-gray-300 transition-colors">
        {article.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
        {article.preview || article.content.substring(0, 150)}...
      </p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {article.tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index}
            className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <button className="text-xs text-gray-400 hover:text-white transition-colors">
        MORE →
      </button>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}