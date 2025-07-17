import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const newsApiKey = Deno.env.get('NEWS_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const careerKeywords = 'career development OR job market OR employment trends OR skills training OR professional development';
    
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(careerKeywords)}&sortBy=publishedAt&language=en&pageSize=6&apiKey=${newsApiKey}`
    );

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();
    
    const formattedNews = data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      source: article.source.name,
      url: article.url,
      imageUrl: article.urlToImage,
      category: 'Career'
    }));

    return new Response(JSON.stringify({ news: formattedNews }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});