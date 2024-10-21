import React, { useEffect, useState } from 'react';
import './NewsUpdates.css';

const NewsUpdates = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://api.gdeltproject.org/api/v2/doc/doc?query=startup%20entrepreneurship&mode=artlist&format=json&maxrecords=10');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news articles');
        }

        const data = await response.json();
        const articles = await Promise.all(data.articles.map(async (article) => {
          const imageUrl = await fetchImageFromUnsplash(article.title);
          return {
            title: article.title,
            description: article.excerpt,
            url: article.url,
            image: imageUrl,
            published: article.datetime,
          };
        }));

        if (articles.length > 0) {
          setNewsArticles(articles);
        } else {
          setNewsArticles([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchImageFromUnsplash = async (query) => {
      try {
        const clientId = "0JPrIWXgy-W8y-YgHlIbxiHIzlm-e7ol0QJ9Lyz1TMI";
        console.log("API Key:", clientId); // Check if API key is loaded
    
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${clientId}`);
        
        if (!response.ok) {
          const errorDetails = await response.text(); // Get the error response text
          console.error('Error Response:', errorDetails); // Log the error details
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        
        // Check if there are results
        if (data.results && data.results.length > 0) {
          console.log("Fetched Image URL:", data.results[0].urls.small); // Log the URL of the first image
          return data.results[0].urls.small; // Return the small image URL
        } else {
          return 'https://via.placeholder.com/350x200'; // Fallback image
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        return 'https://via.placeholder.com/350x200'; // Fallback image on error
      }
    };
    

    fetchNews();
  }, []);

  return (
    <div className="news-updates">
      <h2>News and Updates</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="news-grid">
        {newsArticles.map((article, index) => (
          <div key={index} className="news-item">
            <img src={article.image} alt={article.title} />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p className="news-date">{new Date(article.published).toLocaleDateString()}</p>
              <p className="news-description">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsUpdates;