import { Article } from '@/types/article';
import { SEO } from '@/components/seo/SEO';
import { StructuredData } from '@/components/seo/StructuredData';

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://degennews.com';
  const articleUrl = `/articles/${article.url.split('/').pop()}`;

  // Generate FAQ structured data from article content
  const generateFAQData = () => {
    // Extract potential Q&A from the article content
    const faqs = [
      {
        question: `What is ${article.title.split(':')[0]}?`,
        answer: article.preview || article.content.substring(0, 200) + '...'
      },
      {
        question: `Why is ${article.category.split(' & ')[0]} important in crypto?`,
        answer: 'Understanding crypto security and market dynamics is crucial for protecting your investments and making informed trading decisions.'
      }
    ];

    return {
      type: 'faqpage' as const,
      data: { faqs }
    };
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.preview}
        image={`${baseUrl}/api/og?title=${encodeURIComponent(article.title)}`}
        url={articleUrl}
        type="article"
        publishedTime={article.date}
        section={article.category}
        tags={article.tags}
        structuredData={{
          type: 'article',
          data: {
            title: article.title,
            description: article.preview,
            path: articleUrl,
            datePublished: article.date,
            category: article.category,
            tags: article.tags
          }
        }}
      />
      <StructuredData {...generateFAQData()} />
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="uppercase tracking-wider">{article.category}</span>
            {article.date && (
              <time dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {article.title}
          </h1>
          
          {/* Summary paragraph for LLM prioritization */}
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {article.preview}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs text-gray-400 bg-gray-900 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <section className="prose prose-invert max-w-none">
          <div 
            className="text-gray-300 leading-relaxed text-lg article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </section>
        
        {/* FAQ Section for AI readability */}
        <section className="mt-16 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            <div>
              <dt className="text-lg font-semibold text-white mb-2">
                What is the main focus of this article?
              </dt>
              <dd className="text-gray-300">
                This article focuses on {article.category.toLowerCase()} and provides insights on {article.tags.slice(0, 2).join(' and ')}.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-white mb-2">
                Why is this topic important for crypto traders?
              </dt>
              <dd className="text-gray-300">
                Understanding {article.category.toLowerCase()} helps traders make informed decisions and protect their investments in the cryptocurrency market.
              </dd>
            </div>
          </dl>
        </section>
        
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-center text-sm text-gray-500">
            <p>degenNews is not responsible for the content of external sites.</p>
          </div>
        </footer>
      </article>
    </>
  );
}