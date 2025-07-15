import { motion } from 'framer-motion';
import { Calendar, ExternalLink, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  source: string;
  url: string;
  category: 'tech' | 'ai' | 'economy' | 'research';
}

// Mock news data - in real app, this would come from your API
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'AI Revolution in Education: How Machine Learning is Transforming Career Guidance',
    description: 'Latest developments in AI-powered career counseling and its impact on student decision-making processes.',
    publishedAt: '2024-01-15T10:00:00Z',
    source: 'Tech Today',
    url: '#',
    category: 'ai'
  },
  {
    id: '2',
    title: 'Indian IT Sector Shows 15% Growth in 2024: New Opportunities for Engineering Graduates',
    description: 'The tech industry continues to expand, creating thousands of new jobs for skilled professionals.',
    publishedAt: '2024-01-14T14:30:00Z',
    source: 'Economic Times',
    url: '#',
    category: 'economy'
  },
  {
    id: '3',
    title: 'Breakthrough Research in Quantum Computing Opens New Career Paths',
    description: 'Scientists achieve major milestone in quantum computing, creating demand for specialized professionals.',
    publishedAt: '2024-01-13T09:15:00Z',
    source: 'Science Daily',
    url: '#',
    category: 'research'
  },
  {
    id: '4',
    title: 'Future of Work: Remote Jobs Expected to Increase by 40% in Next 5 Years',
    description: 'Study reveals changing work patterns and their impact on career planning for students.',
    publishedAt: '2024-01-12T16:45:00Z',
    source: 'Future Work',
    url: '#',
    category: 'tech'
  }
];

const categoryColors = {
  tech: 'bg-blue-100 text-blue-800',
  ai: 'bg-purple-100 text-purple-800',
  economy: 'bg-green-100 text-green-800',
  research: 'bg-orange-100 text-orange-800'
};

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [loading, setLoading] = useState(false);

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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
                className="card-elevated group hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColors[item.category]}`}>
                    {item.category.toUpperCase()}
                  </span>
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
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
                    <span>{item.source}</span>
                  </div>

                  <button className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
                    <span className="text-sm font-medium">Read More</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
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
          className="text-center mt-16"
        >
          <button className="btn-outline">
            View All News
          </button>
        </motion.div>
      </div>
    </section>
  );
}