document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.getElementById('news-container');
  const footer = document.querySelector('.custom-footer');
  const feedUrl = 'https://mondary.design/feed/';

  function createLoadingAnimation() {
    const loadingDiv = document.querySelector('.loading');
    const text = 'LOADING';
    loadingDiv.innerHTML = '';
    
    text.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.animationDelay = `${index * 0.2}s`;
      loadingDiv.appendChild(span);
    });
  }

  createLoadingAnimation();

  async function fetchNews() {
    try {
      const response = await fetch(feedUrl, {
        headers: {
          'Accept': 'application/rss+xml'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');
      
      if (xmlDoc.querySelector('parsererror')) {
        throw new Error('Invalid XML format');
      }

      const items = xmlDoc.querySelectorAll('item');
      const newsItems = Array.from(items).slice(0, 15);

      if (newsItems.length === 0) {
        throw new Error('No news items found in the feed');
      }

      newsContainer.innerHTML = '';

      newsItems.forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const pubDate = new Date(item.querySelector('pubDate').textContent);
        const description = item.querySelector('description').textContent;
        
        const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);        
        const imgSrc = imgMatch ? imgMatch[1] : 'default-image.png';

        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        const pinIndex = textContent.indexOf('📌');
        const excerpt = pinIndex !== -1 
          ? textContent.substring(pinIndex + 2).trim().substring(0, 200)
          : textContent.trim().substring(0, 200);
        
        newsElement.innerHTML = `
          <img class="news-image" src="${imgSrc}" alt="${title}" onerror="this.src='default-image.png'">
          <div class="news-content">
            <h3 class="news-title">${title}</h3>
            <div class="news-date">${pubDate.toLocaleDateString()}</div>
            <div class="news-excerpt">${excerpt}</div>
          </div>
        `;

        newsElement.addEventListener('click', () => {
          window.open(link, '_blank');
        });

        newsContainer.appendChild(newsElement);
      });

      // Show footer after news content is loaded
      setTimeout(() => {
        footer.classList.add('visible');
      }, 600); // Wait for news items animation to complete

    } catch (error) {
      newsContainer.innerHTML = `<div class="loading">Error loading news: ${error.message}</div>`;
      console.error('Feed fetch error:', error);
    }
  }

  fetchNews();
});