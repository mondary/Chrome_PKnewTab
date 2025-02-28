document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.getElementById('news-container');
  const feedUrl = 'https://mondary.design/feed/';

  async function fetchNews() {
    try {
      const response = await fetch(feedUrl);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      const newsItems = Array.from(items).slice(0, 15);

      newsContainer.innerHTML = '';

      newsItems.forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const pubDate = new Date(item.querySelector('pubDate').textContent);

        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        newsElement.innerHTML = `
          <div class="news-title">${title}</div>
          <div class="news-date">${pubDate.toLocaleDateString()}</div>
        `;

        newsElement.addEventListener('click', () => {
          window.open(link, '_blank');
        });

        newsContainer.appendChild(newsElement);
      });
    } catch (error) {
      newsContainer.innerHTML = `<div class="loading">Error loading news: ${error.message}</div>`;
    }
  }

  fetchNews();
}));