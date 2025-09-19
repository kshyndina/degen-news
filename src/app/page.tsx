import { Header } from '@/components/news/Header';
import { Footer } from '@/components/news/Footer';
import { SEO } from '@/components/seo/SEO';
import { StructuredData } from '@/components/seo/StructuredData';
import { googleSheetsService } from '@/lib/google/sheets';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Article } from '@/types/article';

// ISR: Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function Home() {
  // Fetch articles with caching
  const articles = await googleSheetsService.getAllArticles();

  // Generate structured data for homepage
  const homepageStructuredData = {
    type: 'webpage' as const,
    data: {
      title: 'degenNews - Crypto Security News & Trading Insights',
      description: 'Latest crypto security news, trading insights, whale watching strategies, and market analysis for degens.',
      path: '/',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://degennews.com/'
          }
        ]
      }
    }
  };

  return (
    <>
      <SEO
        title="degenNews - Crypto Security News & Trading Insights"
        description="Latest crypto security news, trading insights, whale watching strategies, and market analysis for degens."
        structuredData={homepageStructuredData}
      />
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8">Latest Crypto Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} href={`/articles/${article.url.split('/').pop()}`} />
              ))}
            </div>
          </section>

          <section className="border-t border-gray-800 pt-12">
            <h2 className="text-2xl font-semibold mb-8">You might also like...</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} href={`/articles/${article.url.split('/').pop()}`} />
              ))}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}