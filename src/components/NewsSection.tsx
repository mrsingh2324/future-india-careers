import { motion } from 'framer-motion';
import { Calendar, ExternalLink, TrendingUp, Loader, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  url: string;
  category: string;
  imageUrl?: string;
}

const categoryColors: Record<string, string> = {
  Technology: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Business: 'bg-green-500/20 text-green-300 border-green-500/30',
  Environment: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Education: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Health: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Economy: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Career: 'bg-primary/20 text-primary border-primary/30',
};

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLiveNews();
  }, []);

  const fetchLiveNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.functions.invoke('fetch-news');
      
      if (error) throw error;
      
      if (data?.news) {
        setNews(data.news);
      }
    } catch (err: any) {
      console.error('Error fetching news:', err);
      setError('Failed to load latest news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest Career <span className="text-gradient">News</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest trends in technology, AI, economy, and research that shape career opportunities
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader className="animate-spin h-12 w-12 text-primary mb-4" />
            <p className="text-muted-foreground">Loading latest career news...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchLiveNews} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-gradient-card border border-border rounded-xl hover:shadow-glow transition-all duration-500"
              >
                {item.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[item.category] || categoryColors.Career}`}>
                      {item.category.toUpperCase()}
                    </span>
                    <TrendingUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(item.publishedAt)}
                      </div>
                      <span>•</span>
                      <span className="truncate max-w-[100px]">{item.source}</span>
                    </div>

                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary-light transition-colors group/link"
                    >
                      <span className="text-sm font-medium">Read More</span>
                      <ExternalLink className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 space-y-4"
        >
          <Button 
            onClick={fetchLiveNews}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 mr-4"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh News
          </Button>
          <Button variant="outline" className="btn-outline">
            View All News
          </Button>
        </motion.div>
      </div>
    </section>
  );
}