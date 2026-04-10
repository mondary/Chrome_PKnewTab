document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.getElementById('news-container');
  const footer = document.querySelector('.custom-footer');
  const fallbackImage = 'logo.png';
  const feedUrl = 'https://mondary.design/feed/';
  const postsApiUrl = 'https://mondary.design/wp-json/wp/v2/posts?per_page=15&_embed=wp:featuredmedia&_fields=link,date,title.rendered,excerpt.rendered,jetpack_featured_media_url,_embedded.wp:featuredmedia.source_url';

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

  function stripHtml(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html || '';
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  function decodeHtmlEntities(html) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html || '';
    return textarea.value;
  }

  function getFeaturedImageFromPost(post) {
    if (post.jetpack_featured_media_url) {
      return post.jetpack_featured_media_url;
    }

    const embeddedMedia = post._embedded?.['wp:featuredmedia']?.[0];
    if (!embeddedMedia) {
      return fallbackImage;
    }

    const largeSource = embeddedMedia.media_details?.sizes?.large?.source_url;
    const fullSource = embeddedMedia.media_details?.sizes?.full?.source_url;
    return largeSource || fullSource || embeddedMedia.source_url || fallbackImage;
  }

  function buildNewsCard(item) {
    const newsElement = document.createElement('div');
    newsElement.className = 'news-item';

    const img = document.createElement('img');
    img.className = 'news-image';
    img.src = item.imgSrc || fallbackImage;
    img.alt = item.title;
    img.addEventListener('error', () => {
      img.src = fallbackImage;
    });

    const content = document.createElement('div');
    content.className = 'news-content';

    const title = document.createElement('h3');
    title.className = 'news-title';
    title.textContent = item.title;

    const date = document.createElement('div');
    date.className = 'news-date';
    date.textContent = item.pubDate.toLocaleDateString();

    const excerpt = document.createElement('div');
    excerpt.className = 'news-excerpt';
    excerpt.textContent = item.excerpt;

    content.appendChild(title);
    content.appendChild(date);
    content.appendChild(excerpt);

    newsElement.appendChild(img);
    newsElement.appendChild(content);

    newsElement.addEventListener('click', () => {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    });

    return newsElement;
  }

  async function fetchNewsFromWpApi() {
    const response = await fetch(postsApiUrl);
    if (!response.ok) {
      throw new Error(`WP API error: ${response.status}`);
    }

    const posts = await response.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      throw new Error('No posts found from WP API');
    }

    return posts.slice(0, 15).map((post) => {
      const rawExcerpt = stripHtml(post.excerpt?.rendered || '');
      const pinIndex = rawExcerpt.indexOf('📌');
      const excerpt = pinIndex !== -1
        ? rawExcerpt.substring(pinIndex + 2).trim().substring(0, 200)
        : rawExcerpt.trim().substring(0, 200);

      return {
        title: decodeHtmlEntities(post.title?.rendered || 'Untitled'),
        link: post.link || 'https://mondary.design/',
        pubDate: new Date(post.date || Date.now()),
        excerpt,
        imgSrc: getFeaturedImageFromPost(post)
      };
    });
  }

  async function fetchNewsFromRssFallback() {
    const response = await fetch(feedUrl, {
      headers: {
        Accept: 'application/rss+xml'
      }
    });

    if (!response.ok) {
      throw new Error(`RSS error: ${response.status}`);
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

    return newsItems.map((item) => {
      const title = item.querySelector('title')?.textContent || 'Untitled';
      const link = item.querySelector('link')?.textContent || 'https://mondary.design/';
      const pubDate = new Date(item.querySelector('pubDate')?.textContent || Date.now());
      const description = item.querySelector('description')?.textContent || '';

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      const pinIndex = textContent.indexOf('📌');
      const excerpt = pinIndex !== -1
        ? textContent.substring(pinIndex + 2).trim().substring(0, 200)
        : textContent.trim().substring(0, 200);

      return {
        title,
        link,
        pubDate,
        excerpt,
        imgSrc: fallbackImage
      };
    });
  }

  async function fetchNews() {
    try {
      const newsItems = await fetchNewsFromWpApi().catch(() => fetchNewsFromRssFallback());

      newsContainer.innerHTML = '';
      newsItems.forEach((item) => {
        newsContainer.appendChild(buildNewsCard(item));
      });

      setTimeout(() => {
        footer.classList.add('visible');
      }, 600);
    } catch (error) {
      newsContainer.innerHTML = '<div class="loading">Error loading news</div>';
      console.error('Feed fetch error:', error);
    }
  }

  createLoadingAnimation();
  fetchNews();
});
